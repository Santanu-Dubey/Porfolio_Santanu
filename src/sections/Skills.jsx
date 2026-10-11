import React from 'react';
import { BallPool } from '../engines/balls/BallPool';
import { SKILL_GROUPS } from '../data/skills';
import { Reveal } from '../components/ui/Reveal';

export function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center mb-10">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-widest text-indigo font-medium mb-3 inline-block">
            Fluid Living Cluster
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-bold text-ink mb-4 leading-tight">
            The Skills Ball Pool
          </h2>
          <p className="font-sans text-base sm:text-lg text-ink-muted max-w-[65ch] mx-auto leading-relaxed">
            A 2D physics ecosystem of 36 pen-drawn mandala medallions. Distinguish domains through petal geometry:
          </p>
        </Reveal>

        {/* Petal geometry guide: clean, box-free inline markers */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2.5 mt-6 text-xs font-mono text-ink-muted select-none">
            {Object.entries(SKILL_GROUPS).map(([key, group]) => (
              <span key={key} className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full border border-ink/60" />
                <span className="text-ink font-semibold">{group.name}:</span>
                <span className="italic text-ink-muted/80">{group.pattern}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Living Physics Canvas */}
      <BallPool />

      {/* Physics interaction hint */}
      <Reveal delay={0.3}>
        <p className="mt-6 text-xs font-mono text-ink-muted/60 text-center tracking-widest uppercase">
          ✦ Hover to push &amp; spin • Drag to throw • Click to scatter cluster ✦
        </p>
      </Reveal>
    </section>
  );
}
