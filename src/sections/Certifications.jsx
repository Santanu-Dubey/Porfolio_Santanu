import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '../data/certifications';
import { Reveal } from '../components/ui/Reveal';
import { ExternalLink, Award } from 'lucide-react';

export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col items-center justify-center"
    >
      <div className="max-w-6xl mx-auto w-full text-center mb-16">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-leaf font-medium mb-2 inline-block">
            Verified Credentials
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-ink leading-tight">
            Certifications
          </h2>
          <p className="font-sans text-sm sm:text-base text-ink-muted max-w-[60ch] mx-auto mt-2">
            Floating mandala medallions of verified technical knowledge.
          </p>
        </Reveal>
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 select-none">
        {CERTIFICATIONS.map((cert, idx) => (
          <Reveal key={cert.id} delay={0.2 + idx * 0.15}>
            <div className="flex items-start gap-6 group">
              {/* Floating, slowly rotating mandala medallion (~72px) */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotate: [0, idx % 2 === 0 ? 360 : -360],
                }}
                transition={{
                  y: { duration: 4 + idx * 0.5, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 50 + idx * 10, repeat: Infinity, ease: 'linear' },
                }}
                className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-paper"
              >
                {/* Radial petal ring */}
                <svg
                  className="absolute inset-0 w-full h-full stroke-pen group-hover:stroke-indigo transition-colors"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <circle cx="40" cy="40" r="38" strokeWidth="1.8" />
                  <circle cx="40" cy="40" r="32" strokeWidth="0.8" strokeDasharray="2 3" />
                  <circle cx="40" cy="40" r="24" strokeWidth="1.2" stroke="var(--leaf)" />
                  {/* 8 tiny petals */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={40 + 34 * Math.cos((i * Math.PI) / 4)}
                      cy={40 + 34 * Math.sin((i * Math.PI) / 4)}
                      r="1.2"
                      fill="var(--ink)"
                    />
                  ))}
                </svg>

                <Award className="w-6 h-6 text-indigo relative z-10" />
              </motion.div>

              {/* Certificate details */}
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-indigo">
                  {cert.issuer} • {cert.date}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink leading-snug">
                  {cert.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {cert.description}
                </p>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-leaf hover:text-indigo border-b border-dashed border-leaf/50 pb-0.5 transition-colors pt-1"
                  aria-label={`View Certificate for ${cert.title}`}
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
