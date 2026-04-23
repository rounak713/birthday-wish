import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useConfig } from '../hooks/useConfig';
import { useSound } from './SoundContext';

const TrapScreen = ({ onRetry }) => {
  const { config } = useConfig();
  const { playSound } = useSound();

  useEffect(() => { playSound('error'); }, [playSound]);

  const handleRetry = () => { playSound('click'); onRetry(); };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #1a0a0a 0%, #2d0d1a 50%, #1a0a2e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        overflow: 'hidden',
        padding: '24px',
      }}
    >
      {/* Ambient red glow */}
      <div style={{
        position: 'absolute', left: '50%', top: '40%',
        transform: 'translate(-50%,-50%)',
        width: 'clamp(300px, 50vw, 600px)', height: 'clamp(300px, 50vw, 600px)', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,71,87,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      {/* Card */}
      <motion.div
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,71,87,0.2)',
          borderRadius: '28px',
          padding: 'clamp(36px, 6vw, 60px)',
          maxWidth: 440,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(255,71,87,0.1)',
        }}
      >
        {/* Shaking emoji */}
        <motion.div
          animate={{ x: [-5, 5, -5, 5, 0], y: [-2, 2, -2, 2, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
          style={{ fontSize: '80px', marginBottom: '24px', display: 'block', lineHeight: 1 }}
        >
          {config.trap?.image ? (
            <img
              src={config.trap.image}
              alt="Angry"
              style={{ width: 140, height: 140, objectFit: 'contain', borderRadius: '50%' }}
            />
          ) : (
            <span>😡</span>
          )}
        </motion.div>

        <motion.h1
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ff4757, #ff6b9d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px',
          }}
        >
          HOW DARE YOU!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '36px',
          }}
        >
          You clicked NO? Really?! 😤
        </motion.p>

        <motion.button
          onClick={handleRetry}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          style={{
            padding: '14px 44px',
            borderRadius: '999px',
            border: 'none',
            background: 'linear-gradient(135deg, #ff4757, #ff6b9d)',
            color: '#ffffff',
            fontSize: '1rem',
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(255,71,87,0.4)',
          }}
        >
          I'M SORRY! 🙏
        </motion.button>
      </motion.div>

      {/* Floating angry emojis */}
      {['💢', '😤', '🔥', '⚡', '💣'].map((em, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          style={{
            position: 'absolute',
            fontSize: `${16 + i * 4}px`,
            left: `${5 + i * 20}%`,
            top: `${10 + (i % 3) * 25}%`,
            pointerEvents: 'none',
          }}
        >
          {em}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TrapScreen;
