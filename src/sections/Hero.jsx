import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE } from '../data/profile';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Mandala } from '../components/art/Mandala';
import { PenText } from '../components/art/PenText';
import { ArrowDown, FileDown } from 'lucide-react';

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PROFILE.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8 pt-24 pb-16 overflow-hidden select-none"
    >
      {/* Decorative center mandala halo directly behind title */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 transition-opacity duration-1000"
        aria-hidden="true"
      >
        <Mandala size={640} color="var(--ink)" spin={true} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Sub-line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs sm:text-sm font-mono tracking-widest uppercase text-indigo border border-indigo/20 bg-indigo/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo animate-pulse" />
          {PROFILE.subline}
        </motion.div>

        {/* Main Heading - Guaranteed single line on sm+ screens */}
        <h1 className="font-serif text-[clamp(1.85rem,5.2vw,4.25rem)] font-bold tracking-tight text-ink mb-4 leading-[1.12] sm:whitespace-nowrap ink-text-glow">
          <PenText text="Hi, I'm Santanu Dubey 👋" delay={0.4} />
        </h1>

        {/* Typewriter Cycling Role Line */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-6 overflow-hidden">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-ink-muted mr-3">
            Focus:
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={PROFILE.roles[roleIndex]}
              initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-lg sm:text-2xl text-leaf font-semibold italic border-b border-leaf/40 pb-0.5"
            >
              {PROFILE.roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Hero Copy - Sitting directly on warm paper */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-sans text-base sm:text-lg md:text-xl text-ink-muted max-w-[68ch] leading-relaxed mb-10 text-balance"
        >
          {PROFILE.heroCopy}
        </motion.p>

        {/* Action Buttons: Magnetic with Ink Ripple */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <MagneticButton
            href="#projects"
            variant="primary"
            aria-label="View Santanu's selected projects"
          >
            <span>View My Projects</span>
            <ArrowDown className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            href={PROFILE.links.resume}
            download="Santanu_Dubey_Resume.pdf"
            variant="secondary"
            aria-label="Download Santanu Dubey Resume"
          >
            <span>Download Resume</span>
            <FileDown className="w-4 h-4 text-indigo" />
          </MagneticButton>
        </motion.div>
      </div>
    </header>
  );
}
