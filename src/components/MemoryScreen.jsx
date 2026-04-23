import { motion } from 'framer-motion';
import { useConfig } from '../hooks/useConfig';
import { useSound } from './SoundContext';

const MemoryScreen = ({ onNext }) => {
  const { config } = useConfig();
  const { playSound } = useSound();

  const handleNext = () => {
    playSound('click');
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: 'spring', damping: 25, stiffness: 120, mass: 0.8 }}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        backgroundImage: `url(${config.memories.backgroundImage || 'https://www.transparenttextures.com/patterns/stardust.png'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
        padding: '20px',
        overflow: 'hidden'
      }}
    >
      {/* Title */}
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        style={{ 
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
          color: '#ffffff', 
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textShadow: '0px 4px 15px rgba(0,0,0,0.4)',
          marginBottom: '30px',
          zIndex: 2
        }}
      >
        {config.memories.title}
      </motion.h1>

      {/* 3 Polaroids */}
      <div className="polaroid-container">
        {config.memories.photos.slice(0, 3).map((photo, index) => {
          // Calculate tilt: -8 deg for first, 0 for second, 8 for third
          const rotation = index === 0 ? -8 : index === 1 ? 0 : 8;
          const yOffset = index === 1 ? -15 : 10; // Middle one slightly higher

          return (
            <motion.div
              key={index}
              className="polaroid-card"
              initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
              animate={{ opacity: 1, scale: 1, rotate: rotation, y: yOffset }}
              transition={{ delay: 0.4 + (index * 0.2), type: "spring", bounce: 0.5 }}
              whileHover={{ scale: 1.1, zIndex: 10, rotate: 0 }}
              style={{
                backgroundColor: '#ffffff',
                padding: '12px 12px 40px 12px',
                borderRadius: '4px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                flexShrink: 0
              }}
            >
              <img 
                src={photo.url} 
                alt="Memory" 
                className="polaroid-img"
                style={{ 
                  width: '100%', 
                  objectFit: 'cover', 
                  borderRadius: '2px',
                  border: '1px solid #eee'
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Subtitle */}
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        style={{ 
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
          color: '#ffffff', 
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textShadow: '0px 4px 15px rgba(0,0,0,0.4)',
          marginTop: '30px',
          zIndex: 2
        }}
      >
        {config.memories.subtitle}
      </motion.h2>

      {/* Next Button (Bottom Right) */}
      <motion.button 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        onClick={handleNext}
        whileHover={{ scale: 1.05, backgroundColor: '#333' }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          padding: '12px 35px',
          borderRadius: '50px',
          border: 'none',
          backgroundColor: '#000000',
          color: '#ffffff',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          fontFamily: "'Inter', sans-serif",
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          zIndex: 10
        }}
      >
        NEXT
      </motion.button>
    </motion.div>
  );
};

export default MemoryScreen;
