import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.3 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const trailConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Trail dot */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#c77dff',
          pointerEvents: 'none',
          zIndex: 9998,
          mixBlendMode: 'screen',
          opacity: isHovering ? 0 : 0.4,
          transition: 'opacity 0.2s ease'
        }}
      />

      {/* Main cursor */}
      <motion.div
        animate={{
          scale: isHovering ? 1 : 1,
        }}
        style={{
          x: smoothX,
          y: smoothY,
          position: 'fixed',
          top: isHovering ? -20 : -8,
          left: isHovering ? -20 : -8,
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
