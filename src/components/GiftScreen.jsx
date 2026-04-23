import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Mail, Camera, Smile, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useConfig } from '../hooks/useConfig';
import { useSound } from './SoundContext';

const IconMap = { Mail, Camera, Smile, Gift, Sparkles };

const GiftScreen = ({ onNext }) => {
  const [openedGifts, setOpenedGifts] = useState(new Set());
  const [activeGift, setActiveGift] = useState(null);
  const { config } = useConfig();
  const { playSound } = useSound();

  const handleOpenGift = (gift, e) => {
    if (openedGifts.has(gift.id)) {
      setActiveGift(gift);
      playSound('click');
      return;
    }

    playSound('unwrap');
    if (navigator.vibrate) navigator.vibrate([50, 50, 50]);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { x, y },
      colors: ['#ff6b9d', '#c77dff', '#ffbe0b', '#06d6a0', '#ffffff'],
      disableForReducedMotion: true,
    });

    setOpenedGifts(new Set([...openedGifts, gift.id]));
    setActiveGift(gift);
  };

  const closeGift = () => { playSound('click'); setActiveGift(null); };
  const handleNext = () => { playSound('click'); onNext(); };

  const allOpened = openedGifts.size === config.gifts.items.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -80 }}
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
        position: 'absolute', left: '20%', top: '15%',
        width: 'clamp(250px, 45vw, 500px)', height: 'clamp(250px, 45vw, 500px)', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,190,11,0.10) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: '10%', bottom: '15%',
        width: 'clamp(200px, 35vw, 400px)', height: 'clamp(200px, 35vw, 400px)', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(199,125,255,0.10) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      {/* Header */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ textAlign: 'center', marginBottom: '44px' }}
      >
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #ffffff, rgba(255,255,255,0.7))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '8px',
        }}>
          {config.gifts.title}
        </h1>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.4)',
        }}>
          {openedGifts.size === 0
            ? 'Tap a gift to unwrap it 🎁'
            : `${openedGifts.size} of ${config.gifts.items.length} opened!`}
        </p>
      </motion.div>

      {/* Gift Cards Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', maxWidth: 600, marginBottom: '44px' }}>
        {config.gifts.items.map((gift, index) => {
          const isOpened = openedGifts.has(gift.id);
          const IconComp = IconMap[gift.icon] || Gift;

          return (
            <motion.div
              key={gift.id}
              initial={{ scale: 0, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: index * 0.15, type: 'spring', bounce: 0.5 }}
              whileHover={{ scale: 1.06, y: -6 }}
              whileTap={{ scale: 0.94 }}
              onClick={(e) => handleOpenGift(gift, e)}
              style={{
                width: 140,
                height: 160,
                borderRadius: '22px',
                background: isOpened
                  ? 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
                  : 'linear-gradient(145deg, rgba(255,107,157,0.2), rgba(199,125,255,0.15))',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${isOpened ? 'rgba(255,255,255,0.10)' : 'rgba(255,107,157,0.35)'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isOpened
                  ? '0 4px 20px rgba(0,0,0,0.3)'
                  : '0 12px 40px rgba(255,107,157,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Ribbon (only on unopened gifts) */}
              {!isOpened && (
                <>
                  <div style={{
                    position: 'absolute', top: 0, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 4, height: '100%',
                    background: 'rgba(255,255,255,0.3)',
                  }} />
                  <div style={{
                    position: 'absolute', top: '50%', left: 0,
                    transform: 'translateY(-50%)',
                    width: '100%', height: 4,
                    background: 'rgba(255,255,255,0.3)',
                  }} />
                  <div style={{
                    position: 'absolute', top: '42%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ffbe0b, #ff6b9d)',
                    boxShadow: '0 0 12px rgba(255,190,11,0.6)',
                  }} />
                </>
              )}

              {/* Shine overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
                borderRadius: 'inherit',
                pointerEvents: 'none',
              }} />

              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: '16px',
                background: isOpened
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: isOpened ? 'rgba(255,255,255,0.3)' : '#ffffff',
              }}>
                <IconComp size={26} />
              </div>

              {/* Label */}
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isOpened ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.85)',
              }}>
                {gift.title}
              </span>

              {/* Opened badge */}
              {isOpened && (
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #06d6a0, #0099ff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px',
                }}>
                  ✓
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
        {config.gifts.items.map((gift) => (
          <motion.div
            key={gift.id}
            animate={{
              background: openedGifts.has(gift.id)
                ? 'linear-gradient(135deg, #ff6b9d, #c77dff)'
                : 'rgba(255,255,255,0.12)',
              scale: openedGifts.has(gift.id) ? 1.2 : 1,
            }}
            style={{ width: 8, height: 8, borderRadius: '50%' }}
          />
        ))}
      </div>

      {/* Continue Button */}
      <AnimatePresence>
        {allOpened && (
          <motion.button
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', bounce: 0.5 }}
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
              boxShadow: '0 12px 40px rgba(255,107,157,0.45)',
            }}
          >
            {config.gifts.continueButtonText} →
          </motion.button>
        )}
      </AnimatePresence>

      {/* Gift Content Modal */}
      <AnimatePresence>
        {activeGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGift}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(10,6,30,0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              className="glass-card"
              initial={{ scale: 0.8, y: 60, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.45 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.13), rgba(255,255,255,0.05))',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '28px',
                padding: '40px 36px 36px',
                maxWidth: 400,
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
                position: 'relative',
              }}
            >
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeGift}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s ease',
                }}
              >
                <X size={16} />
              </motion.button>

              {/* Icon */}
              {activeGift.icon && IconMap[activeGift.icon] && (
                <div style={{
                  width: 64, height: 64, borderRadius: '20px',
                  background: 'linear-gradient(135deg, rgba(255,107,157,0.25), rgba(199,125,255,0.2))',
                  border: '1px solid rgba(255,107,157,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#ff6b9d',
                }}>
                  {React.createElement(IconMap[activeGift.icon], { size: 28 })}
                </div>
              )}

              {/* Title */}
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px',
              }}>
                {activeGift.title}
              </h2>

              {/* Content */}
              {activeGift.isImage ? (
                <img
                  src={activeGift.content}
                  alt={activeGift.title}
                  style={{
                    width: '100%',
                    borderRadius: '16px',
                    marginTop: '8px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                  }}
                />
              ) : (
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.75)',
                  fontWeight: 400,
                }}>
                  {activeGift.content}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GiftScreen;
