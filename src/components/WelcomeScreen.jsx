import { motion } from 'framer-motion';
import { useConfig } from '../hooks/useConfig';
import { useSound } from './SoundContext';

const WelcomeScreen = ({ onNext, onTrap }) => {
  const { config } = useConfig();
  const { playSound } = useSound();

  const handleYes = () => { playSound('click'); onNext(); };
  const handleNo  = () => { playSound('click'); onTrap(); };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
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
      {/* Ambient orbs */}
      <div style={{
        position: 'absolute', left: '5%', top: '15%',
        width: 'clamp(300px, 50vw, 600px)', height: 'clamp(300px, 50vw, 600px)', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,157,0.10) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: '0%', bottom: '10%',
        width: 'clamp(250px, 40vw, 500px)', height: 'clamp(250px, 40vw, 500px)', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(199,125,255,0.10) 0%, transparent 70%)',
        filter: 'blur(50px)', pointerEvents: 'none',
      }} />

      {/* Glass card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '28px',
          padding: 'clamp(36px, 6vw, 60px)',
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        {/* Emoji mascot */}
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '72px', marginBottom: '24px', display: 'block', lineHeight: 1 }}
        >
          {config.welcome?.image ? (
            <img
              src={config.welcome.image}
              alt="Welcome"
              style={{ width: 120, height: 120, objectFit: 'contain', borderRadius: '50%' }}
            />
          ) : (
            <span>🎁</span>
          )}
        </motion.div>

        {/* Question */}
        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px',
            lineHeight: 1.25,
          }}
        >
          Are you ready for your surprise?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '40px',
            letterSpacing: '0.02em',
          }}
        >
          Choose wisely... 😏
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="responsive-button-group"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
        >
          <motion.button
            onClick={handleYes}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{
              padding: '14px 44px',
              borderRadius: '999px',
              border: 'none',
              background: 'linear-gradient(135deg, #ff6b9d, #c77dff)',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 8px 28px rgba(255,107,157,0.4)',
              transition: 'box-shadow 0.25s ease',
            }}
          >
            YES! 🎉
          </motion.button>

          <motion.button
            onClick={handleNo}
            whileHover={{ scale: 1.06, background: 'rgba(255,255,255,0.12)' }}
            whileTap={{ scale: 0.94 }}
            style={{
              padding: '14px 44px',
              borderRadius: '999px',
              border: '1.5px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1rem',
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 0.25s ease',
            }}
          >
            NO 😤
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating emojis */}
      {['🌸', '✨', '💖', '🎊', '⭐'].map((em, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -25, 0], opacity: [0.4, 0.9, 0.4], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
          style={{
            position: 'absolute',
            fontSize: `${18 + i * 5}px`,
            left: `${8 + i * 18}%`,
            top: `${10 + i * 15}%`,
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

export default WelcomeScreen;
