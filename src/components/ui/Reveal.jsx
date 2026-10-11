import React from 'react';
import { motion } from 'framer-motion';
import { useMotion } from '../../context/MotionContext';

export function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  y = 28,
  threshold = 0.15,
}) {
  const { reducedMotion } = useMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
