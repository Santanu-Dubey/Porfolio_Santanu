import React from 'react';
import { motion } from 'framer-motion';
import { CURRENTLY_LEARNING } from '../data/learning';
import { Reveal } from '../components/ui/Reveal';

export function Learning() {
  return (
    <section
      id="learning"
      className="relative min-h-[80vh] py-24 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center mb-16">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-leaf font-medium mb-2 inline-block">
            Continuous Evolution
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-ink leading-tight">
            Currently Learning
          </h2>
          <p className="font-sans text-sm sm:text-base text-ink-muted max-w-[60ch] mx-auto mt-2">
            Drifting topics suspended inside rotating rings of curiosity and active research.
          </p>
        </Reveal>
      </div>

      {/* Living field of drifting words inside rotating rings */}
      <div className="max-w-6xl mx-auto w-full flex flex-wrap items-center justify-center gap-8 sm:gap-12 select-none">
        {CURRENTLY_LEARNING.map((item, idx) => (
          <Reveal key={item.id} delay={0.15 * idx}>
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4 + (idx % 3),
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative flex items-center justify-center p-6 group cursor-default"
            >
              {/* Rotating pen ring */}
              <motion.svg
                animate={{ rotate: idx % 2 === 0 ? 360 : -360 }}
                transition={{ duration: item.speed, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 w-full h-full stroke-pen pointer-events-none group-hover:stroke-indigo transition-colors"
                viewBox="0 0 160 160"
                fill="none"
              >
                <circle cx="80" cy="80" r="72" strokeWidth="1.2" strokeDasharray="3 4" />
                <circle cx="80" cy="80" r="64" strokeWidth="0.8" />
                {/* 4 cardinal dots */}
                <circle cx="80" cy="8" r="1.5" fill="var(--ink)" />
                <circle cx="80" cy="152" r="1.5" fill="var(--ink)" />
                <circle cx="8" cy="80" r="1.5" fill="var(--ink)" />
                <circle cx="152" cy="80" r="1.5" fill="var(--ink)" />
              </motion.svg>

              {/* Suspended word in center */}
              <span className="relative z-10 font-serif text-sm sm:text-base font-semibold text-ink group-hover:text-indigo transition-colors max-w-[130px] text-center leading-snug">
                {item.topic}
              </span>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
