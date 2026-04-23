import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onOver = (e) => {
      const el = e.target;
      const hoverable =
        el.tagName === 'BUTTON' ||
        el.tagName === 'A' ||
        el.closest('button') ||
        el.closest('a') ||
        window.getComputedStyle(el).cursor === 'pointer';
      setIsHovering(!!hoverable);
      setIsPointer(!!hoverable);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  // Trail follows more slowly
  useEffect(() => {
    const timeout = setTimeout(() => setTrail(pos), 60);
    return () => clearTimeout(timeout);
  }, [pos]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Trail dot */}
      <motion.div
        animate={{ x: trail.x - 4, y: trail.y - 4, opacity: isHovering ? 0 : 0.4 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#c77dff',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'screen',
        }}
      />

      {/* Main cursor */}
      <motion.div
        animate={{
          x: pos.x - (isHovering ? 20 : 8),
          y: pos.y - (isHovering ? 20 : 8),
          scale: isHovering ? 1 : 1,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 550, damping: 30, mass: 0.4 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? 40 : 16,
          height: isHovering ? 40 : 16,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          background: isHovering
            ? 'transparent'
            : 'linear-gradient(135deg, #ff6b9d, #c77dff)',
          border: isHovering
            ? '2px solid rgba(255,107,157,0.8)'
            : 'none',
          boxShadow: isHovering
            ? '0 0 20px rgba(255,107,157,0.5), inset 0 0 10px rgba(255,107,157,0.1)'
            : '0 0 12px rgba(255,107,157,0.7)',
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, border 0.2s ease',
          mixBlendMode: 'normal',
        }}
      />
    </>
  );
};

export default CustomCursor;
