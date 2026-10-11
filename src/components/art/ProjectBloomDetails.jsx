import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { TECH_ICONS } from '../icons/techIcons';
import { ExternalLink } from 'lucide-react';
import { GithubGlyph } from '../icons/socialIcons';

export function ProjectBloomDetails({ project }) {
  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 max-w-xl text-left select-none"
      >
        {/* Category & Counter */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-indigo font-medium px-2.5 py-0.5 rounded-full border border-indigo/20">
            {project.category}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-bold text-ink leading-tight">
          {project.title}
        </h3>

        {/* Round Mandala Frame Screenshot Slot */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 self-start my-2">
          {/* Radial decorative mandala frame */}
          <svg
            className="absolute inset-0 w-full h-full stroke-pen pointer-events-none z-10"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="48" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="44" strokeWidth="1" />
            <circle cx="50" cy="50" r="40" stroke="var(--indigo)" strokeWidth="1.2" />
            {Array.from({ length: 12 }).map((_, i) => (
              <circle
                key={i}
                cx={50 + 44 * Math.cos((i * Math.PI) / 6)}
                cy={50 + 44 * Math.sin((i * Math.PI) / 6)}
                r="1.2"
                fill="var(--ink)"
              />
            ))}
          </svg>

          {/* Masked Screenshot within round aperture */}
          <div className="w-full h-full rounded-full overflow-hidden p-2.5">
            <img
              src={project.image}
              alt={`${project.title} screenshot preview`}
              className="w-full h-full object-cover rounded-full filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Problem → Solution Statement (sitting directly on warm paper) */}
        <div className="space-y-4 font-sans text-sm sm:text-base text-ink-muted leading-relaxed">
          <div>
            <span className="font-serif font-bold text-ink mr-2 text-base">Problem:</span>
            <span>{project.problem}</span>
          </div>
          <div>
            <span className="font-serif font-bold text-indigo mr-2 text-base">Solution:</span>
            <span>{project.solution}</span>
          </div>
        </div>

        {/* Small Mandala Tech Icons (Icons only, no visible text labels) */}
        <div className="flex flex-wrap items-center gap-3 pt-2" aria-label="Technologies used">
          {project.techKeys?.map((key, i) => {
            const Icon = TECH_ICONS[key];
            if (!Icon) return null;
            const techName = project.tech[i] || key;

            return (
              <div
                key={key}
                className="group relative w-10 h-10 rounded-full flex items-center justify-center bg-paper text-ink border border-ink/30 hover:border-indigo hover:text-indigo transition-all"
                aria-label={techName}
                title={techName}
              >
                {/* Mini petal ring */}
                <svg
                  className="absolute inset-0 w-full h-full stroke-current opacity-40 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <circle cx="20" cy="20" r="18" strokeWidth="1" strokeDasharray="2 2" />
                </svg>
                <div className="w-4 h-4">
                  <Icon className="w-full h-full" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons: GitHub & Live */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.links.github && (
            <MagneticButton
              href={project.links.github}
              variant="primary"
              aria-label={`View ${project.title} on GitHub`}
            >
              <GithubGlyph className="w-4 h-4" />
              <span>GitHub</span>
            </MagneticButton>
          )}

          {project.links.live && (
            <MagneticButton
              href={project.links.live}
              variant="secondary"
              aria-label={`View ${project.title} live deployment`}
            >
              <span>Live Deployment</span>
              <ExternalLink className="w-4 h-4 text-leaf" />
            </MagneticButton>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
