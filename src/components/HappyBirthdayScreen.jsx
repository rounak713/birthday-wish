import { motion } from 'framer-motion';
import { useConfig } from '../hooks/useConfig';
import { useSound } from './SoundContext';
import { PartyPopper } from 'lucide-react';

const HappyBirthdayScreen = ({ onNext }) => {
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
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ type: 'spring', damping: 25, stiffness: 120, mass: 0.8 }}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#e0e5ec', // Light grayish blue paper color
        backgroundImage: config.happyBirthday?.backgroundImage ? `url(${config.happyBirthday.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Blue Ripped Edges Simulation if no bg image provided */}
      {!config.happyBirthday?.backgroundImage && (
        <>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '10%', backgroundColor: '#6b8cae', clipPath: 'polygon(0% 0%, 100% 0%, 100% 80%, 95% 100%, 90% 70%, 85% 100%, 80% 80%, 75% 100%, 70% 75%, 65% 100%, 60% 80%, 55% 100%, 50% 70%, 45% 100%, 40% 80%, 35% 100%, 30% 75%, 25% 100%, 20% 80%, 15% 100%, 10% 70%, 5% 100%, 0% 80%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '10%', backgroundColor: '#6b8cae', clipPath: 'polygon(0% 100%, 100% 100%, 100% 20%, 95% 0%, 90% 30%, 85% 0%, 80% 20%, 75% 0%, 70% 25%, 65% 0%, 60% 20%, 55% 0%, 50% 30%, 45% 0%, 40% 20%, 35% 0%, 30% 25%, 25% 0%, 20% 20%, 15% 0%, 10% 30%, 5% 0%, 0% 20%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '5%', backgroundColor: '#6b8cae' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '5%', backgroundColor: '#6b8cae' }} />
          {/* Subtle paper texture overlay */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")', opacity: 0.5, pointerEvents: 'none' }} />
        </>
      )}

      {/* Foil Balloon "HAPPY BIRTHDAY" */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
        style={{
          position: 'absolute',
          top: '12%',
          textAlign: 'center',
          width: '100%',
          zIndex: 5
        }}
      >
        <h1 style={{
          fontFamily: "'Arial Rounded MT Bold', 'Inter', sans-serif",
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 900,
          margin: 0,
          background: 'linear-gradient(to bottom, #f0f0f0, #a0a0a0, #e0e0e0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0px 8px 4px rgba(0,0,0,0.3)) drop-shadow(0px -2px 2px rgba(255,255,255,0.8))',
          letterSpacing: '4px',
          lineHeight: '1.2'
        }}>
          HAPPY<br/>BIRTHDAY
        </h1>
      </motion.div>

      {/* Center Polaroids */}
      <div style={{ position: 'relative', width: '300px', height: '400px', marginTop: '10%' }}>
        {/* Top Left Polaroid */}
        <motion.div
          initial={{ x: -100, y: -50, rotate: -20, opacity: 0 }}
          animate={{ x: -40, y: -20, rotate: -8, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            backgroundColor: '#fff',
            padding: '12px 12px 40px 12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 3
          }}
        >
          <img 
            src={config.happyBirthday?.photo1 || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&q=80'} 
            alt="Memory 1" 
            style={{ width: '160px', height: '160px', objectFit: 'cover', backgroundColor: '#000' }} 
          />
        </motion.div>

        {/* Bottom Right Polaroid */}
        <motion.div
          initial={{ x: 100, y: 50, rotate: 20, opacity: 0 }}
          animate={{ x: 40, y: 60, rotate: 5, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            backgroundColor: '#fff',
            padding: '12px 12px 40px 12px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
            zIndex: 4
          }}
        >
          <img 
            src={config.happyBirthday?.photo2 || 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&q=80'} 
            alt="Memory 2" 
            style={{ width: '180px', height: '180px', objectFit: 'cover', backgroundColor: '#000' }} 
          />
        </motion.div>
      </div>

      {/* Snoopy/Character Bottom Left */}
      <motion.div
        initial={{ x: -100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          zIndex: 6
        }}
      >
        {config.happyBirthday?.snoopyImage ? (
          <img src={config.happyBirthday.snoopyImage} alt="Birthday Character" style={{ width: '150px' }} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PartyPopper size={80} color="#ff6b9d" strokeWidth={1.5} style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))' }} />
            <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.5rem', color: '#ff6b9d', fontWeight: 'bold', marginTop: '10px', transform: 'rotate(-10deg)' }}>Yay!</span>
          </div>
        )}
      </motion.div>

      {/* Next Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        onClick={handleNext}
        whileHover={{ scale: 1.05, backgroundColor: '#333' }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          padding: '12px 30px',
          borderRadius: '30px',
          border: 'none',
          backgroundColor: '#000',
          color: '#fff',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          zIndex: 10
        }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
};

export default HappyBirthdayScreen;
