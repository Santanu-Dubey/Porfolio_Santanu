import React from 'react';
import { ACHIEVEMENTS } from '../data/learning';
import { Reveal } from '../components/ui/Reveal';
import { CheckCircle2, Sparkles } from 'lucide-react';

export function Achievements() {
  return (
    <section
      id="achievements"
      className="relative min-h-[85vh] py-24 px-4 sm:px-8 flex flex-col items-center justify-center"
    >
      <div className="max-w-5xl mx-auto w-full text-center mb-16">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-indigo font-medium mb-2 inline-block">
            Milestones &amp; Track Record
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-ink leading-tight">
            Key Achievements
          </h2>
          <p className="font-sans text-sm sm:text-base text-ink-muted max-w-[60ch] mx-auto mt-2">
            Verified milestones across hackathons, cloud labs, and production deployments.
          </p>
        </Reveal>
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 select-none">
        {ACHIEVEMENTS.map((item, idx) => (
          <Reveal key={item.id} delay={0.15 * idx}>
            <div className="flex items-start gap-4 p-4 border-b border-dashed border-ink/20 group">
              {/* Pen-drawn check medallion */}
              <div className="w-8 h-8 rounded-full border border-ink/40 group-hover:border-indigo group-hover:bg-indigo/5 flex items-center justify-center flex-shrink-0 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-indigo" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-leaf font-semibold">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-ink group-hover:text-indigo transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-muted">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
