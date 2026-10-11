import React from 'react';
import { motion } from 'framer-motion';
import { HACKATHONS } from '../data/hackathons';
import { Reveal } from '../components/ui/Reveal';
import { Award, Terminal } from 'lucide-react';

export function Hackathons() {
  return (
    <section
      id="hackathons"
      className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full text-center mb-16">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-indigo font-medium mb-2 inline-block">
            Competitive Sprints
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-ink leading-tight">
            Hackathons: Stepping Stones
          </h2>
          <p className="font-sans text-sm sm:text-base text-ink-muted max-w-[60ch] mx-auto mt-2">
            Three stones across the water where ideas turned into rapid engineering reality.
          </p>
        </Reveal>
      </div>

      {/* Pond with 3 Stepping Stones and connecting water ripples */}
      <div className="relative max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 select-none">
        {/* Animated pond fish path across the stones */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none stroke-ink/20 hidden lg:block"
          viewBox="0 0 1000 400"
          fill="none"
        >
          {/* S-curve swimming trail connecting stones 1, 2, 3 */}
          <path
            d="M 120 220 Q 350 80, 500 210 T 880 180"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          {/* Small swimming fish glyph along curve */}
          <motion.path
            d="M 500 210 Q 515 200, 525 210 Q 515 220, 500 210 Z M 495 205 L 488 200 L 492 210 L 488 220 Z"
            fill="var(--indigo)"
            animate={{
              x: [-120, 120, -120],
              y: [-15, 15, -15],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </svg>

        {HACKATHONS.map((hackathon, idx) => (
          <Reveal key={hackathon.id} delay={0.2 + idx * 0.2} className="w-full lg:w-1/3 flex justify-center">
            <div className="relative w-full max-w-sm flex flex-col items-center text-center p-6 group">
              {/* Radial concentric stone ripple rings */}
              <svg
                className="absolute inset-0 w-full h-full stroke-pen pointer-events-none transition-transform duration-700 group-hover:scale-105"
                viewBox="0 0 320 360"
                fill="none"
              >
                {/* Organic pebble contour */}
                <path
                  d="M 160 20 C 260 18, 305 70, 300 180 C 295 290, 240 340, 160 345 C 70 340, 15 290, 20 180 C 25 70, 60 22, 160 20 Z"
                  strokeWidth="1.8"
                  stroke="var(--ink)"
                />
                {/* Ripple ring 2 */}
                <path
                  d="M 160 35 C 245 33, 285 80, 280 180 C 275 270, 230 325, 160 330 C 85 325, 35 270, 40 180 C 45 80, 75 37, 160 35 Z"
                  strokeWidth="0.8"
                  stroke="var(--indigo)"
                  strokeDasharray="3 3"
                />
                {/* Tiny stone dots */}
                <circle cx="160" cy="48" r="1.5" fill="var(--ink)" />
                <circle cx="160" cy="318" r="1.5" fill="var(--ink)" />
              </svg>

              {/* Stone Content */}
              <div className="relative z-10 py-6 px-4 space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-indigo">
                  {hackathon.edition}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                  {hackathon.title}
                </h3>

                <p className="font-sans text-sm font-semibold text-leaf">
                  {hackathon.project}
                </p>

                {hackathon.role && (
                  <span className="inline-block text-xs font-mono text-ink-muted/80">
                    Role: {hackathon.role}
                  </span>
                )}

                <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {hackathon.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                  {hackathon.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-full text-[11px] font-mono border border-ink/20 text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
