import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotion } from '../../context/MotionContext';

export function Intro({ onComplete }) {
  const { reducedMotion } = useMotion();
  const [stage, setStage] = useState(0); // 0: inner rings, 1: lotus, 2: fills & outer, 3: exit
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      onComplete?.();
      return;
    }

    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 1900);
    const t3 = setTimeout(() => setStage(3), 3200);
    const t4 = setTimeout(() => {
      onComplete?.();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [reducedMotion, onComplete]);

  const handleSkip = () => {
    setSkipped(true);
    onComplete?.();
  };

  if (skipped) return null;

  return (
    <AnimatePresence>
      {stage < 4 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-paper pointer-events-auto"
        >
          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-8 right-8 z-50 text-xs font-mono uppercase tracking-widest text-ink hover:text-indigo border-b border-dashed border-ink/40 pb-0.5 transition-colors focus-visible:outline-none"
            aria-label="Skip introduction animation"
          >
            Skip Intro →
          </button>

          {/* Drawing Mandala in Center */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            <svg
              className="w-full h-full"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ring 1: Center seed */}
              <motion.circle
                cx="100"
                cy="100"
                r="8"
                stroke="var(--ink)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />

              {/* Ring 2: First Petals */}
              <motion.circle
                cx="100"
                cy="100"
                r="22"
                stroke="var(--ink)"
                strokeWidth="1.2"
                strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.4 }}
              />

              {/* Ring 3: Arched teardrops */}
              {stage >= 1 && (
                <>
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="45"
                    stroke="var(--ink)"
                    strokeWidth="1.8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2 }}
                  />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.path
                      key={i}
                      d="M 100 78 C 92 65, 92 55, 100 48 C 108 55, 108 65, 100 78 Z"
                      transform={`rotate(${i * 45} 100 100)`}
                      stroke="var(--ink)"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.0, delay: 0.2 + i * 0.05 }}
                    />
                  ))}
                </>
              )}

              {/* Ring 4: Outer Pointed Petals & Solid Black Fills */}
              {stage >= 2 && (
                <>
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="72"
                    stroke="var(--ink)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9 }}
                  />
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.path
                      key={`outer-${i}`}
                      d="M 100 28 L 96 38 L 104 38 Z"
                      transform={`rotate(${i * 30} 100 100)`}
                      fill="var(--ink)"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6, delay: i * 0.04 }}
                    />
                  ))}
                  {/* Central Ink Fill */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="5"
                    fill="var(--ink)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </>
              )}
            </svg>
          </div>

          {/* Subtitle bleeding into paper */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 10 }}
            transition={{ duration: 0.7 }}
            className="mt-6 font-serif text-lg tracking-wide text-ink text-center"
          >
            Santanu Dubey
            <span className="block font-mono text-xs text-ink-muted mt-1 uppercase tracking-widest">
              Drawing Portfolio Canvas
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
