import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useConfig } from '../hooks/useConfig';
import { useSound } from './SoundContext';

const FinalScreen = ({ onReset }) => {
  const { playSound } = useSound();
  const { config } = useConfig();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    playSound('chime');

    const duration = 4000;
    const end = Date.now() + duration;

    const shootConfetti = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.6 },
        colors: ['#ff6b9d', '#c77dff', '#ffbe0b', '#06d6a0', '#ffffff'],
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.6 },
        colors: ['#ff6b9d', '#c77dff', '#ffbe0b', '#06d6a0', '#ffffff'],
        disableForReducedMotion: true,
      });
      if (Date.now() < end) requestAnimationFrame(shootConfetti);
    };
    shootConfetti();
  }, [playSound]);

  const handleReset = () => { playSound('click'); onReset(); };

  const message = config.final.message;

  // Character-by-character typewriter
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { delay: 1.2, staggerChildren: 0.035 },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 120, mass: 0.8 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #0f0c1e 0%, #1a0a2e 50%, #16213e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        overflow: 'hidden',
        padding: '24px',
      }}
    >
      {/* Large pulsing orb */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
          width: 'clamp(300px, 60vw, 700px)', height: 'clamp(300px, 60vw, 700px)', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,157,0.14) 0%, rgba(199,125,255,0.08) 50%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />

      {/* Content card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '32px',
          padding: 'clamp(36px, 6vw, 64px)',
          maxWidth: 580,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Shimmer line at top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(255,107,157,0.8), rgba(199,125,255,0.8), transparent)',
          borderRadius: '32px 32px 0 0',
        }} />

        {/* Big emoji */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '72px', marginBottom: '24px', lineHeight: 1, display: 'block' }}
        >
          🎉
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ff6b9d, #c77dff, #ffbe0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200% auto',
            marginBottom: '28px',
            lineHeight: 1.2,
          }}
        >
          {config.final.title}
        </motion.h1>

        {/* Divider */}
        <div style={{
          width: 60, height: 2, margin: '0 auto 28px',
          background: 'linear-gradient(90deg, #ff6b9d, #c77dff)',
          borderRadius: '1px',
          boxShadow: '0 0 12px rgba(255,107,157,0.5)',
        }} />

        {/* Typewriter message */}
        <motion.div
          variants={sentence}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
            lineHeight: 1.85,
            color: 'rgba(255,255,255,0.72)',
            fontWeight: 400,
            marginBottom: '44px',
            letterSpacing: '0.01em',
          }}
        >
          {message.split('').map((char, index) => (
            <motion.span key={char + '-' + index} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Reset Button */}
        <motion.button
          onClick={handleReset}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: message.length * 0.035 + 1.4 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          style={{
            padding: '15px 50px',
            borderRadius: '999px',
            border: 'none',
            background: 'linear-gradient(135deg, #ff6b9d, #c77dff)',
            color: '#ffffff',
            fontSize: '0.95rem',
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 12px 40px rgba(255,107,157,0.45)',
          }}
        >
          🔁 {config.final.replayButtonText}
        </motion.button>

        {/* Decorative corner emojis */}
        <span style={{ position: 'absolute', top: 16, left: 20, fontSize: '22px', opacity: 0.5 }}>✨</span>
        <span style={{ position: 'absolute', top: 16, right: 20, fontSize: '22px', opacity: 0.5 }}>🌸</span>
        <span style={{ position: 'absolute', bottom: 16, left: 20, fontSize: '22px', opacity: 0.5 }}>💖</span>
        <span style={{ position: 'absolute', bottom: 16, right: 20, fontSize: '22px', opacity: 0.5 }}>🎊</span>
      </motion.div>

      {/* Floating stars */}
      {['⭐', '✨', '💫', '🌟', '💖', '🎉'].map((em, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 15, -15, 0],
          }}
          transition={{ duration: 3 + i * 0.6, repeat: Infinity, delay: i * 0.5 }}
          style={{
            position: 'absolute',
            fontSize: `${16 + i * 4}px`,
            left: `${6 + i * 16}%`,
            top: `${8 + (i % 3) * 25}%`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {em}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default FinalScreen;
