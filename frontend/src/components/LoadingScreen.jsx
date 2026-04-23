import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Preparing your surprise');

  const texts = [
    'Preparing your surprise',
    'Sprinkling some love',
    'Wrapping gifts with care',
    'Almost ready...',
  ];

  useEffect(() => {
    const duration = 2800;
    const interval = 28;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const p = Math.min(100, Math.floor((currentStep / steps) * 100));
      setProgress(p);
      setLoadingText(texts[Math.floor(p / 25)] || texts[3]);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ type: 'spring', damping: 25, stiffness: 120, mass: 0.8 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #0f0c1e 0%, #1a0a2e 50%, #16213e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        overflow: 'hidden',
      }}
    >
      {/* Animated Orbs */}
      {[
        { x: '15%', y: '20%', size: 'clamp(200px, 35vw, 400px)', color: 'rgba(255,107,157,0.12)', dur: 8 },
        { x: '70%', y: '60%', size: 'clamp(180px, 30vw, 350px)', color: 'rgba(199,125,255,0.10)', dur: 10 },
        { x: '50%', y: '80%', size: 'clamp(150px, 25vw, 300px)', color: 'rgba(6,214,160,0.08)', dur: 12 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
          style={{
            position: 'absolute',
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: orb.color,
            filter: 'blur(60px)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', zIndex: 1 }}
      >
        {/* Pulsing Heart Ring */}
        <div style={{ position: 'relative', width: 120, height: 120 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: '#ff6b9d',
              borderRightColor: 'rgba(255,107,157,0.3)',
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: 8,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: '#c77dff',
              borderLeftColor: 'rgba(199,125,255,0.3)',
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: '48px', filter: 'drop-shadow(0 0 12px rgba(255,107,157,0.8))' }}
            >
              🎀
            </motion.span>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ff6b9d, #c77dff, #ffbe0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '8px',
          }}>
            Happy Birthday
          </h1>
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.06em',
            }}
          >
            {loadingText}...
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div style={{ width: 'min(320px, 80vw)' }}>
          <div style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '10px',
          }}>
            <motion.div
              style={{
                height: '100%',
                borderRadius: '2px',
                background: 'linear-gradient(90deg, #ff6b9d, #c77dff)',
                boxShadow: '0 0 12px rgba(255,107,157,0.7)',
                width: `${progress}%`,
                transition: 'width 0.15s ease-out',
              }}
            />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.35)',
          }}>
            <span>Loading</span>
            <span>{progress}%</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
