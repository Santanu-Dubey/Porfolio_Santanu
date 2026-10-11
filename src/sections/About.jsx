import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../data/profile';
import { Reveal } from '../components/ui/Reveal';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

export function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen py-24 px-4 sm:px-8 flex flex-col justify-center items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Title */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-widest text-indigo font-medium mb-2 inline-block">
              Background &amp; Philosophy
            </span>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-ink leading-tight">
              About Santanu
            </h2>
          </Reveal>
        </div>

        {/* Content Flow (No cards, no boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Round Mandala Photo Slot */}
          <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-24">
            <Reveal delay={0.2} className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[390px] lg:h-[390px] xl:w-[420px] xl:h-[420px]">
              {/* Radial mandala border rings */}
              <svg
                className="absolute inset-0 w-full h-full stroke-pen pointer-events-none z-10 spin-slow"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle cx="50" cy="50" r="48" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="44" strokeWidth="0.8" strokeDasharray="2 3" />
                <circle cx="50" cy="50" r="40" stroke="var(--indigo)" strokeWidth="1.4" />
                {Array.from({ length: 16 }).map((_, i) => (
                  <circle
                    key={i}
                    cx={50 + 44 * Math.cos((i * Math.PI) / 8)}
                    cy={50 + 44 * Math.sin((i * Math.PI) / 8)}
                    r="1"
                    fill="var(--ink)"
                  />
                ))}
              </svg>

              {/* Photo image */}
              <div className="w-full h-full rounded-full overflow-hidden p-3.5 sm:p-4 select-none shadow-lg shadow-ink/5">
                <img
                  src={PROFILE.about.photo}
                  alt="Santanu Dubey"
                  className="w-full h-full object-cover rounded-full object-[center_26%] transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="text-center mt-5">
                <span className="font-mono text-xs sm:text-sm text-ink-muted/80 uppercase tracking-widest font-medium">
                  Jaipur / Kolkata • India
                </span>
              </div>
            </Reveal>
          </div>

          {/* Narrative & Education Flow */}
          <div className="lg:col-span-7 space-y-8 select-none">
            {/* Bio line by line text */}
            <Reveal delay={0.3}>
              <div className="font-serif text-lg sm:text-xl text-ink leading-relaxed space-y-4">
                <p>{PROFILE.about.bio}</p>
              </div>
            </Reveal>

            {/* Hand-drawn vine divider */}
            <div className="py-2">
              <svg className="w-full h-4 stroke-ink/30" viewBox="0 0 400 16" fill="none">
                <path d="M 0 8 Q 100 0, 200 8 T 400 8" strokeWidth="1" strokeDasharray="4 2" />
              </svg>
            </div>

            {/* Education Timeline */}
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-ink flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-indigo" />
                <span>Education Journey</span>
              </h3>

              <div className="space-y-6 pl-4 border-l-2 border-dashed border-ink/20">
                {PROFILE.about.education.map((edu, idx) => (
                  <Reveal key={idx} delay={0.4 + idx * 0.15}>
                    <div className="relative pl-4">
                      {/* Pen dot bullet on line */}
                      <span className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-paper border-2 border-indigo" />

                      <h4 className="font-serif text-lg font-bold text-ink">
                        {edu.institution}
                      </h4>
                      <p className="font-sans text-sm text-indigo font-medium">
                        {edu.degree}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mt-1 text-xs font-mono text-ink-muted">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {edu.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {edu.duration}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-leaf/10 text-leaf font-medium">
                          {edu.status}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
