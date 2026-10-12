import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotion } from '../../context/MotionContext';
import { useTheme } from '../../context/ThemeContext';

const LETTERS = ['S', 'a', 'n', 't', 'a', 'n', 'u'];

// 6 radial ink spark particles that pop outwards on hover
const SPARKS = [
  { angle: 0, dist: 18 },
  { angle: 60, dist: 22 },
  { angle: 120, dist: 18 },
  { angle: 180, dist: 22 },
  { angle: 240, dist: 18 },
  { angle: 300, dist: 22 },
];

export function BrandLogo({ onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const { triggerBurst } = useMotion();
  const { isIndigoGreen } = useTheme();

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoverCount((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e) => {
    if (triggerBurst) {
      triggerBurst(e.clientX, e.clientY);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.a
      href="#home"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ scale: 0, opacity: 0, y: -16 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileTap={{ scale: 0.9, rotate: -3 }}
      transition={{ type: 'spring', stiffness: 420, damping: 16 }}
      className="font-serif text-lg sm:text-xl font-bold tracking-tight text-ink flex items-center gap-2 group cursor-pointer select-none relative"
      aria-label="Santanu Dubey Home - Interactive Logo"
    >
      {/* 1. Mandala Icon Container with crazy animations */}
      <div className="relative flex items-center justify-center w-7 h-7">
        {/* Soft aura halo bloom that glows on hover */}
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.45, 1.3] : 0,
            opacity: isHovered ? [0, 0.45, 0.35] : 0,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full pointer-events-none -z-10"
          style={{
            background: isIndigoGreen
              ? 'radial-gradient(circle, var(--indigo) 0%, transparent 70%)'
              : 'radial-gradient(circle, #E0A638 0%, transparent 70%)',
            filter: 'blur(4px)',
          }}
        />

        {/* Micro-spark particles popping out on hover */}
        <AnimatePresence>
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {SPARKS.map((s, idx) => {
                const rad = (s.angle * Math.PI) / 180;
                const x = Math.cos(rad) * s.dist;
                const y = Math.sin(rad) * s.dist;
                return (
                  <motion.span
                    key={`${hoverCount}-${idx}`}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x,
                      y,
                      scale: [0, 1.2, 0],
                      opacity: [1, 0.8, 0],
                    }}
                    transition={{
                      duration: 0.55,
                      ease: 'easeOut',
                      delay: idx * 0.02,
                    }}
                    className="absolute top-1/2 left-1/2 -mt-0.5 -ml-0.5 w-1 h-1 rounded-full pointer-events-none"
                    style={{
                      backgroundColor: isIndigoGreen ? 'var(--leaf)' : '#C48822',
                    }}
                  />
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* The Animated Mandala SVG Mark */}
        <motion.svg
          animate={{
            scale: isHovered ? 1.3 : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 15,
          }}
          className="w-6 h-6 stroke-pen pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          style={{ transformOrigin: 'center' }}
        >
          {/* Outer circle with elastic pulse */}
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            strokeWidth="1.5"
            animate={{
              r: isHovered ? [10, 10.8, 10] : 10,
              strokeWidth: isHovered ? 1.8 : 1.5,
            }}
            transition={{
              duration: 0.5,
              repeat: isHovered ? Infinity : 0,
              repeatType: 'reverse',
            }}
          />

          {/* Middle counter-rotating dashed sacred circle */}
          <motion.circle
            cx="12"
            cy="12"
            r="5"
            strokeWidth="1.1"
            strokeDasharray="2 2"
            stroke={isIndigoGreen ? 'var(--indigo)' : 'var(--ink)'}
            animate={{
              rotate: isHovered ? -360 : 0,
              scale: isHovered ? 1.15 : 1,
            }}
            transition={{
              duration: 2.5,
              repeat: isHovered ? Infinity : 0,
              ease: 'linear',
            }}
            style={{ transformOrigin: '12px 12px' }}
          />

          {/* Sacred geometry petals / crosshairs that bloom */}
          <motion.path
            d="M12 2 V22 M2 12 H22"
            strokeWidth="0.8"
            animate={{
              strokeWidth: isHovered ? 1.2 : 0.8,
              opacity: isHovered ? 1 : 0.8,
            }}
          />

          {/* Core center bead that pops and fills with ink/gold */}
          <motion.circle
            cx="12"
            cy="12"
            r="1.8"
            animate={{
              scale: isHovered ? [1, 1.8, 1.3] : 1,
              fill: isHovered
                ? isIndigoGreen
                  ? 'var(--indigo)'
                  : '#D49931'
                : 'transparent',
            }}
            transition={{ duration: 0.3 }}
            strokeWidth="1"
            stroke="var(--ink)"
            style={{ transformOrigin: '12px 12px' }}
          />
        </motion.svg>
      </div>

      {/* 2. Interactive Bouncy Letter Wave for "Santanu." */}
      <span className="font-serif tracking-normal inline-flex items-center">
        {LETTERS.map((char, index) => (
          <motion.span
            key={index}
            animate={{
              y: isHovered ? [0, -8, 2, 0] : 0,
              rotate: isHovered ? [0, index % 2 === 0 ? -6 : 6, 0] : 0,
              scale: isHovered ? [1, 1.18, 0.95, 1] : 1,
              color: isHovered
                ? isIndigoGreen
                  ? 'var(--indigo)'
                  : 'var(--ink)'
                : 'var(--ink)',
            }}
            transition={{
              duration: 0.48,
              delay: isHovered ? index * 0.035 : 0,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="inline-block transform-gpu"
          >
            {char}
          </motion.span>
        ))}

        {/* Hyper-bouncy period '.' that leaps and transforms */}
        <motion.span
          animate={{
            y: isHovered ? [0, -14, 3, 0] : 0,
            scale: isHovered ? [1, 2.2, 0.85, 1.2, 1] : 1,
            color: isHovered
              ? isIndigoGreen
                ? 'var(--leaf)'
                : '#D49931'
              : 'var(--ink)',
          }}
          transition={{
            duration: 0.55,
            delay: isHovered ? LETTERS.length * 0.035 : 0,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="inline-block font-bold transform-gpu text-indigo"
        >
          .
        </motion.span>
      </span>
    </motion.a>
  );
}
