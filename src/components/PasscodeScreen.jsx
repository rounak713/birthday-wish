import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete } from 'lucide-react';
import { useConfig } from '../hooks/useConfig';
import { useSound } from './SoundContext';

const PasscodeScreen = ({ onNext, onAdmin }) => {
  const [input, setInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { config } = useConfig();
  const { playSound, playMusic } = useSound();
  const PIN_LENGTH = 4;

  const handleKeyPress = (num) => {
    if (input.length < PIN_LENGTH && !isSuccess) {
      playSound('click');
      const newInput = input + num;
      setInput(newInput);
      setIsError(false);

      if (newInput.length === PIN_LENGTH) {
        if (newInput === '0000') {
          playSound('chime');
          setTimeout(() => { onAdmin(); setInput(''); }, 500);
        } else if (newInput === config.passcode.pin) {
          setIsSuccess(true);
          playSound('chime');
          playMusic(); // Now called synchronously within click event!
          setTimeout(() => onNext(), 900);
        } else {
          playSound('error');
          setIsError(true);
          if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
          setTimeout(() => { setInput(''); setIsError(false); }, 900);
        }
      }
    }
  };

  const handleDelete = () => {
    if (input.length > 0) {
      playSound('click');
      setInput((prev) => prev.slice(0, -1));
      setIsError(false);
    }
  };

  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'];

  return (
    <motion.div
      className="responsive-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #0f0c1e 0%, #1a0a2e 55%, #16213e 100%)',
        alignItems: 'stretch',
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: '-10%', top: '10%',
          width: 'clamp(250px, 45vw, 500px)', height: 'clamp(250px, 45vw, 500px)', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,157,0.14) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{
          position: 'absolute', right: '-5%', bottom: '5%',
          width: 'clamp(200px, 35vw, 400px)', height: 'clamp(200px, 35vw, 400px)', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(199,125,255,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }}
      />

      {/* LEFT — Photo Panel */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 40px',
          position: 'relative',
        }}
      >
        {/* Floating Polaroid */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'relative' }}
        >
          {/* Decorative ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', inset: -20,
              borderRadius: '24px',
              border: '2px dashed rgba(255,107,157,0.25)',
              pointerEvents: 'none',
            }}
          />
          {/* Polaroid */}
          <div style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '18px',
            padding: '14px 14px 44px',
            boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
            transform: 'rotate(-4deg)',
            width: 'clamp(180px, 45vw, 260px)',
          }}>
            <img
              src={config.passcode.photoUrl}
              alt="Memory"
              style={{
                width: '100%',
                height: 'clamp(140px, 35vw, 210px)',
                objectFit: 'cover',
                borderRadius: '10px',
                display: 'block',
              }}
            />
            {config.passcode.photoCaption && (
              <p style={{
                fontFamily: "'Dancing Script', cursive",
                textAlign: 'center',
                marginTop: '12px',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1.1rem',
              }}>
                {config.passcode.photoCaption}
              </p>
            )}
          </div>

          {/* Sticker badge */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              position: 'absolute', top: -16, right: -16,
              width: 52, height: 52, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff6b9d, #c77dff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px',
              boxShadow: '0 4px 20px rgba(255,107,157,0.5)',
            }}
          >
            🎀
          </motion.div>
        </motion.div>

        {/* Floating hearts */}
        {['💕', '✨', '🌸', '💖'].map((em, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
            style={{
              position: 'absolute',
              fontSize: `${16 + i * 4}px`,
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`,
              pointerEvents: 'none',
            }}
          >
            {em}
          </motion.span>
        ))}
      </motion.div>

      {/* RIGHT — Keypad Panel */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        {/* Header */}
        <motion.div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff, rgba(255,255,255,0.7))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '8px',
          }}>
            {config.passcode.title}
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.08em',
          }}>
            Enter your secret code ✨
          </p>
        </motion.div>

        {/* PIN Dots */}
        <motion.div
          style={{ display: 'flex', gap: '14px', marginBottom: '40px' }}
          animate={isError ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {[...Array(PIN_LENGTH)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i < input.length ? 1.1 : 1,
                background: isError
                  ? 'rgba(255,71,87,0.4)'
                  : isSuccess
                    ? 'linear-gradient(135deg, #06d6a0, #0099ff)'
                    : i < input.length
                      ? 'linear-gradient(135deg, #ff6b9d, #c77dff)'
                      : 'rgba(255,255,255,0.08)',
              }}
              transition={{ type: 'spring', stiffness: 400 }}
              style={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                border: `1.5px solid ${isError ? 'rgba(255,71,87,0.6)' : isSuccess ? 'rgba(6,214,160,0.6)' : i < input.length ? 'rgba(255,107,157,0.6)' : 'rgba(255,255,255,0.15)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: i < input.length && !isError ? '0 0 16px rgba(255,107,157,0.4)' : 'none',
              }}
            >
              {i < input.length && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#ffffff',
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Keypad */}
        <div className="keypad-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {keys.map((key, i) => {
            if (key === null) {
              return <div key={i} />;
            }
            if (key === 'del') {
              return (
                <motion.button
                  key={i}
                  className="keypad-btn"
                  onClick={handleDelete}
                  whileHover={{ scale: 1.08, background: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'background 0.2s',
                  }}
                >
                  <Delete size={20} />
                </motion.button>
              );
            }
            return (
              <motion.button
                key={i}
                className="keypad-btn"
                onClick={() => handleKeyPress(key.toString())}
                whileHover={{ scale: 1.08, background: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {key}
              </motion.button>
            );
          })}
        </div>

        {/* Error message */}
        <AnimatePresence>
          {isError && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: '20px',
                color: '#ff4757',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>⚠️</span> {config.passcode.errorMessage}
            </motion.p>
          )}
          {isSuccess && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '20px',
                color: '#06d6a0',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>✅</span> Welcome in! 🎉
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default PasscodeScreen;
