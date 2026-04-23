import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from './SoundContext';

const AudioPlayer = () => {
  const { isMuted, toggleMute } = useSound();

  return (
    <motion.button
      onClick={toggleMute}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      title={isMuted ? 'Unmute music' : 'Mute music'}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 50,
        height: 50,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.15)',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 1000,
        color: isMuted ? 'rgba(255,255,255,0.35)' : '#ff6b9d',
        boxShadow: isMuted
          ? '0 4px 20px rgba(0,0,0,0.3)'
          : '0 4px 24px rgba(255,107,157,0.35)',
        transition: 'box-shadow 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Pulsing ring when playing */}
      {!isMuted && (
        <motion.div
          animate={{ scale: [1, 1.7], opacity: [0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,107,157,0.6)',
            pointerEvents: 'none',
          }}
        />
      )}
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </motion.button>
  );
};

export default AudioPlayer;
