import React from 'react';
import { EXPERIENCES } from '../data/experience';
import { Vine } from '../components/art/Vine';
import { Reveal } from '../components/ui/Reveal';
import { Briefcase, CheckCircle2 } from 'lucide-react';

export function Experience() {
  return (
    <section
      id="experience"
      className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col items-center justify-center"
    >
      <div className="max-w-5xl mx-auto w-full text-center mb-16">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-leaf font-medium mb-2 inline-block">
            Applied Learning &amp; Industry Roles
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-ink leading-tight">
            Internship &amp; Training
          </h2>
          <p className="font-sans text-sm sm:text-base text-ink-muted max-w-[60ch] mx-auto mt-2">
            Practical apprenticeships and project-based engineering development.
          </p>
        </Reveal>
      </div>

      <div className="max-w-5xl mx-auto w-full relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        {/* Experience 1: CSRBOX (Left side on desktop) */}
        <div className="flex-1 text-center md:text-right select-none order-2 md:order-1">
          <Reveal delay={0.3}>
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-indigo">
                {EXPERIENCES[0].period}
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink">
                {EXPERIENCES[0].title}
              </h3>
              <p className="font-sans text-sm font-semibold text-leaf">
                {EXPERIENCES[0].organization}
              </p>
              <p className="font-sans text-sm text-ink-muted leading-relaxed max-w-md ml-auto">
                {EXPERIENCES[0].description}
              </p>
              <ul className="mt-4 space-y-1.5 text-xs font-mono text-ink-muted inline-block text-left md:text-right">
                {EXPERIENCES[0].highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 justify-start md:justify-end">
                    <span>{h}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-leaf" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Central Hand-Drawn Vine */}
        <div className="hidden md:flex justify-center items-center order-2">
          <Vine height={460} />
        </div>

        {/* Experience 2: HEX Software (Right side on desktop) */}
        <div className="flex-1 text-center md:text-left select-none order-3">
          <Reveal delay={0.6}>
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-indigo">
                {EXPERIENCES[1].period}
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink">
                {EXPERIENCES[1].title}
              </h3>
              <p className="font-sans text-sm font-semibold text-leaf">
                {EXPERIENCES[1].organization}
              </p>
              <p className="font-sans text-sm text-ink-muted leading-relaxed max-w-md mr-auto">
                {EXPERIENCES[1].description}
              </p>
              <ul className="mt-4 space-y-1.5 text-xs font-mono text-ink-muted inline-block text-left">
                {EXPERIENCES[1].highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-leaf" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
