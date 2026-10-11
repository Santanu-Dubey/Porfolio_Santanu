import React from 'react';
import { PROFILE } from '../data/profile';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Reveal } from '../components/ui/Reveal';
import { FileDown, Sparkles } from 'lucide-react';

export function Resume() {
  return (
    <section
      id="resume"
      className="relative py-24 px-4 sm:px-8 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <div className="relative max-w-4xl mx-auto w-full flex flex-col items-center">
        {/* Decorative pen-drawn radial mandala arch */}
        <svg
          className="w-full max-w-lg h-36 stroke-pen pointer-events-none opacity-40 mb-2"
          viewBox="0 0 500 120"
          fill="none"
        >
          <path
            d="M 50 110 C 120 20, 380 20, 450 110"
            strokeWidth="1.8"
          />
          <path
            d="M 80 110 C 140 40, 360 40, 420 110"
            strokeWidth="0.8"
            strokeDasharray="4 3"
          />
          <circle cx="250" cy="30" r="12" stroke="var(--indigo)" strokeWidth="1.2" />
          <circle cx="250" cy="30" r="4" fill="var(--leaf)" />
        </svg>

        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-indigo font-medium mb-3 inline-block">
            Curriculum Vitae
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-bold text-ink leading-tight mb-4">
            Santanu Dubey's Resume
          </h2>
          <p className="font-sans text-base sm:text-lg text-ink-muted max-w-[55ch] mx-auto mb-8 leading-relaxed">
            Detailed breakdown of technical coursework, project architectures, hackathon sprints, and engineering toolsets.
          </p>
        </Reveal>

        {/* Large Magnetic Download Resume Button */}
        <Reveal delay={0.2}>
          <MagneticButton
            href={PROFILE.links.resume}
            download="Santanu_Dubey_Resume.pdf"
            variant="primary"
            className="text-base sm:text-lg px-10 py-5"
            aria-label="Download Santanu Dubey's complete resume PDF"
          >
            <FileDown className="w-5 h-5 text-marigold" />
            <span>Download Official Resume (PDF)</span>
          </MagneticButton>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-4 text-xs font-mono text-ink-muted/70 tracking-widest uppercase">
            Updated for 2026 Opportunities • 1-Page Engineering Format
          </p>
        </Reveal>
      </div>
    </section>
  );
}
