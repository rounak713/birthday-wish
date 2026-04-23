import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { useConfig } from '../hooks/useConfig';

// Helper to convert Google Drive 'view' links into direct audio stream links
const formatAudioUrl = (url) => {
  if (!url) return '';
  const driveRegex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    return `https://docs.google.com/uc?export=download&id=${match[1]}`;
  }
  return url;
};

const SoundContext = createContext(null);

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const { config } = useConfig();
  
  const bgMusicRef = useRef(null);
  const bgMusicUrlRef = useRef(formatAudioUrl(config.sounds.backgroundMusic));
  const soundsRef = useRef({});

  // Initialize SFX once
  useEffect(() => {
    soundsRef.current = {
      click: new Howl({ src: [config.sounds.click], volume: 0.5 }),
      unwrap: new Howl({ src: [config.sounds.unwrap], volume: 0.5 }),
      error: new Howl({ src: [config.sounds.error], volume: 0.5 }),
      blow: new Howl({ src: [config.sounds.blow], volume: 0.5 }),
      chime: new Howl({ src: [config.sounds.chime], volume: 0.5 }),
      swoosh: new Howl({ src: [config.sounds.swoosh], volume: 0.5 }),
    };

    return () => {
      Object.values(soundsRef.current).forEach(sound => sound.unload());
    };
  }, []); // SFX rely on initial config, usually don't change in realtime

  // Dynamic Background Music Listener
  useEffect(() => {
    const formattedUrl = formatAudioUrl(config.sounds.backgroundMusic);

    // If music URL changed, or it's the first load
    if (!bgMusicRef.current || bgMusicUrlRef.current !== formattedUrl) {
      const wasPlaying = bgMusicRef.current ? bgMusicRef.current.playing() : false;
      
      // Unload old music
      if (bgMusicRef.current) {
        bgMusicRef.current.unload();
      }

      console.log("Loading new background music:", formattedUrl);
      // Load new music
      bgMusicUrlRef.current = formattedUrl;
      bgMusicRef.current = new Howl({
        src: [formattedUrl],
        format: ['mp3', 'ogg', 'wav'], 
        loop: true,
        volume: 0.3,
        html5: true, 
        onload: () => console.log("Music loaded successfully"),
        onloaderror: (id, err) => console.error("Error loading music:", err),
        onplayerror: (id, err) => console.error("Error playing music:", err)
      });

      // If the old one was playing, instantly start the new one
      if (wasPlaying && !isMuted) {
        bgMusicRef.current.play();
      }
    }

    return () => {
      // Don't unload on cleanup unless unmounting provider entirely, 
      // Howler handles memory well. We unload explicitly above when URL changes.
    };
  }, [config.sounds.backgroundMusic, isMuted]);

  const playMusic = () => {
    console.log("playMusic called. Current ref:", !!bgMusicRef.current, "Playing:", bgMusicRef.current?.playing(), "Muted:", isMuted);
    if (bgMusicRef.current && !bgMusicRef.current.playing() && !isMuted) {
      console.log("Starting playback...");
      bgMusicRef.current.play();
    }
  };

  const stopMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.stop();
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    Howler.mute(newMutedState);
    
    if (!newMutedState && bgMusicRef.current && !bgMusicRef.current.playing()) {
      bgMusicRef.current.play();
    }
  };

  const playSound = (name) => {
    if (soundsRef.current[name] && !isMuted) {
      soundsRef.current[name].play();
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound, playMusic, stopMusic }}>
      {children}
    </SoundContext.Provider>
  );
};
