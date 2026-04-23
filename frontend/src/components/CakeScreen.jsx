import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfig } from '../hooks/useConfig';
import { useSound } from './SoundContext';

const CANDLE_COUNT = 6;

const CakeScreen = ({ onNext }) => {
  const [blownCandles, setBlownCandles] = useState(new Set());
  const [allBlown, setAllBlown] = useState(false);
  const { config } = useConfig();
  const { playSound } = useSound();

  const blowCandle = (index) => {
    if (blownCandles.has(index) || allBlown) return;
    playSound('blow');
    if (navigator.vibrate) navigator.vibrate(80);

    const next = new Set([...blownCandles, index]);
    setBlownCandles(next);
    if (next.size === CANDLE_COUNT) {
      setTimeout(() => setAllBlown(true), 400);
    }
  };

  const handleBlowAll = () => {
    if (allBlown) return;
    playSound('blow');
    if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
    const all = new Set([...Array(CANDLE_COUNT).keys()]);
    setBlownCandles(all);
    setTimeout(() => setAllBlown(true), 500);
  };

  const handleNext = () => { playSound('click'); onNext(); };

  const CandleFlame = ({ blown, index }) => (
    <motion.div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Flame */}
      <AnimatePresence>
        {!blown && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0, y: -10 }}
            style={{
              width: 10,
              height: 18,
              borderRadius: '50% 50% 40% 40%',
              background: 'linear-gradient(to top, #ffbe0b, #ff6b00)',
              boxShadow: '0 0 10px rgba(255,190,11,0.9), 0 0 20px rgba(255,107,0,0.5)',
              marginBottom: -2,
              cursor: 'pointer',
            }}
            onClick={() => blowCandle(index)}
          />
        )}
      </AnimatePresence>
      {/* Candle body */}
      <motion.div
        onClick={() => blowCandle(index)}
        style={{
          width: 14,
          height: 52,
          borderRadius: '4px',
          background: blown
            ? 'linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.05))'
            : 'linear-gradient(to bottom, #ffe4f0, #c77dff)',
          border: '1px solid rgba(255,255,255,0.2)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {!blown && (
          <motion.div
            animate={{ y: [-60, 60] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              left: 0, right: 0,
              height: 20,
              background: 'linear-gradient(transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
      {/* Ambient glow that brightens when candles are lit */}
      <motion.div
        animate={{
          opacity: allBlown ? 0 : 0.5,
          scale: allBlown ? 0.5 : 1,
        }}
        transition={{ duration: 1.5 }}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
          width: 'clamp(300px, 50vw, 600px)', height: 'clamp(300px, 50vw, 600px)', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,190,11,0.18) 0%, rgba(255,107,0,0.08) 50%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ opacity: allBlown ? 0.6 : 0 }}
        transition={{ duration: 1.5 }}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%,-50%)',
          width: 'clamp(350px, 60vw, 700px)', height: 'clamp(350px, 60vw, 700px)', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,157,0.15) 0%, rgba(199,125,255,0.10) 50%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />

      {/* Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          background: allBlown
            ? 'linear-gradient(135deg, #ff6b9d, #c77dff, #ffbe0b)'
            : 'linear-gradient(135deg, #ffffff, rgba(255,255,255,0.7))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '8px',
          textAlign: 'center',
          transition: 'all 0.8s ease',
        }}
      >
        {allBlown ? '✨ Wish Granted! ✨' : config.cake.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.45)',
          marginBottom: '40px',
          textAlign: 'center',
        }}
      >
        {allBlown ? 'Your wish is on its way to the stars 🌟' : config.cake.instruction}
      </motion.p>

      {/* Cake */}
      <motion.div
        onClick={!allBlown ? handleBlowAll : undefined}
        whileHover={!allBlown ? { scale: 1.03 } : {}}
        style={{
          position: 'relative',
          cursor: allBlown ? 'default' : 'pointer',
          marginBottom: '40px',
          userSelect: 'none',
        }}
      >
        {/* Glow ring around cake */}
        <motion.div
          animate={{ opacity: allBlown ? 0 : [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: -16,
            borderRadius: '24px',
            background: 'radial-gradient(circle, rgba(255,190,11,0.2) 0%, transparent 70%)',
            filter: 'blur(12px)',
            pointerEvents: 'none',
          }}
        />

        {/* Glass cake container */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '24px',
          padding: '30px 40px 24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          minWidth: 280,
        }}>
          {/* Candles row */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
            {[...Array(CANDLE_COUNT)].map((_, i) => (
              <CandleFlame key={i} blown={blownCandles.has(i)} index={i} />
            ))}
          </div>

          {/* Cake layers */}
          {config.cake?.image ? (
            <img
              src={config.cake.image}
              alt="Birthday Cake"
              style={{ width: 200, height: 200, objectFit: 'contain' }}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center' }}>
              {/* Top tier */}
              <div style={{
                width: 140,
                height: 50,
                borderRadius: '12px 12px 0 0',
                background: 'linear-gradient(135deg, #ff6b9d, #ff9dbf)',
                boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 10,
                  left: 0, right: 0, height: 8,
                  background: 'rgba(255,255,255,0.4)',
                  borderRadius: '0 0 50% 50%',
                }} />
                {['💫','⭐','✨'].map((s, i) => (
                  <span key={i} style={{ fontSize: '14px', margin: '0 2px' }}>{s}</span>
                ))}
              </div>
              {/* Bottom tier */}
              <div style={{
                width: 200,
                height: 64,
                borderRadius: '0 0 12px 12px',
                background: 'linear-gradient(135deg, #c77dff, #9b4dca)',
                boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 8,
                  left: 0, right: 0, height: 10,
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '0 0 50% 50%',
                }} />
                <span style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.9)',
                  letterSpacing: '0.05em',
                }}>Happy Birthday!</span>
              </div>
              {/* Plate */}
              <div style={{
                width: 220,
                height: 12,
                borderRadius: '0 0 50% 50%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                border: '1px solid rgba(255,255,255,0.15)',
              }} />
            </div>
          )}

          {/* Hint text */}
          {!allBlown && (
            <motion.p
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.05em',
              }}
            >
              Tap candles or the cake to blow!
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* CTA Button */}
      <AnimatePresence>
        {allBlown && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', bounce: 0.5 }}
            onClick={handleNext}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{
              padding: '15px 50px',
              borderRadius: '999px',
              border: 'none',
              background: 'linear-gradient(135deg, #ff6b9d, #c77dff)',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 10px 36px rgba(255,107,157,0.5)',
            }}
          >
            {config.cake.buttonText} 🎁
          </motion.button>
        )}
      </AnimatePresence>

      {/* Confetti stars when blown */}
      <AnimatePresence>
        {allBlown && [...Array(20)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: -200 - Math.random() * 200,
              x: (Math.random() - 0.5) * 400,
              scale: [0, 1.5, 0],
              rotate: Math.random() * 360,
            }}
            transition={{ duration: 1.5, delay: i * 0.06, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              fontSize: `${10 + Math.random() * 16}px`,
              pointerEvents: 'none',
            }}
          >
            {['⭐','✨','💫','🌟','💖','🎊'][Math.floor(Math.random() * 6)]}
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CakeScreen;
