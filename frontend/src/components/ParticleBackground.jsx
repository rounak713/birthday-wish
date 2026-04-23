import { motion } from 'framer-motion';

const PARTICLES = Array.from({ length: 30 }).map((_, i) => {
  const emojis = ['💖', '✨', '⭐', '🌸', '💫', '🎀', '💕', '🌟'];
  return {
    id: i,
    emoji: emojis[i % emojis.length],
    size: Math.random() * 14 + 10,
    startX: Math.random() * 100,
    duration: Math.random() * 18 + 14,
    delay: Math.random() * 12,
    drift: (Math.random() - 0.5) * 15,
  };
});

const ParticleBackground = () => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
    }}
  >
    {PARTICLES.map((p) => (
      <motion.div
        key={p.id}
        initial={{
          y: '105vh',
          x: `${p.startX}vw`,
          opacity: 0,
          scale: 0.5,
          rotate: 0,
        }}
        animate={{
          y: '-10vh',
          x: `${p.startX + p.drift}vw`,
          opacity: [0, 0.55, 0.55, 0],
          scale: [0.5, 1, 1, 0.5],
          rotate: 360,
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          delay: p.delay,
          ease: 'linear',
          times: [0, 0.1, 0.9, 1],
        }}
        style={{ position: 'absolute', fontSize: p.size }}
      >
        {p.emoji}
      </motion.div>
    ))}
  </div>
);

export default ParticleBackground;
