import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ photo, index, rotation, yOffset }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="polaroid-card"
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation, y: yOffset }}
      transition={{ delay: 0.4 + (index * 0.2), type: "spring", bounce: 0.5 }}
      whileHover={{ scale: 1.15, zIndex: 10 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        backgroundColor: '#ffffff',
        padding: '12px 12px 40px 12px',
        borderRadius: '4px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        flexShrink: 0,
        cursor: 'pointer'
      }}
    >
      <div style={{ transform: "translateZ(30px)" }}>
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
        {photo.caption && (
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            textAlign: 'center',
            marginTop: '16px',
            fontSize: '1.4rem',
            color: '#333'
          }}>
            {photo.caption}
          </p>
        )}
      </div>
    </motion.div>
  );
};
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
      <div className="polaroid-container" style={{ perspective: 1200 }}>
        {config.memories.photos.slice(0, 3).map((photo, index) => {
          const rotation = index === 0 ? -8 : index === 1 ? 0 : 8;
          const yOffset = index === 1 ? -15 : 10;
          return <TiltCard key={index} photo={photo} index={index} rotation={rotation} yOffset={yOffset} />;
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
        {config.memories.buttonText || 'NEXT'}
      </motion.button>
    </motion.div>
  );
};

export default MemoryScreen;
