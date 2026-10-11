import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MORE_PROJECTS } from '../../data/projects';

export function MoreProjectsTrail() {
  const [selectedId, setSelectedId] = useState(MORE_PROJECTS[0].id);
  const activeProj = MORE_PROJECTS.find((p) => p.id === selectedId) || MORE_PROJECTS[0];

  return (
    <div className="w-full max-w-3xl mx-auto mt-20 pt-10 flex flex-col items-center text-center select-none">
      <span className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-4">
        ✦ Additional Explorations &amp; Utilities ✦
      </span>

      {/* Hand-drawn dot path */}
      <div className="relative flex items-center justify-center gap-6 sm:gap-10 py-4 my-2">
        {/* Connecting pen thread */}
        <svg
          className="absolute left-4 right-4 h-2 pointer-events-none stroke-ink/30"
          viewBox="0 0 400 8"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M 0 4 Q 100 1, 200 4 T 400 4" strokeWidth="1" strokeDasharray="3 3" />
        </svg>

        {MORE_PROJECTS.map((proj) => {
          const isSelected = selectedId === proj.id;

          return (
            <button
              key={proj.id}
              onClick={() => setSelectedId(proj.id)}
              className="relative group p-2 focus-visible:outline-none"
              aria-label={`View details for ${proj.title}`}
            >
              <div
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-ink text-paper scale-110'
                    : 'bg-paper text-ink border border-ink/40 hover:border-indigo hover:text-indigo'
                }`}
              >
                {/* Mandala dot ring */}
                <svg
                  className={`w-full h-full p-1 stroke-current ${
                    isSelected ? 'rotate-45' : 'group-hover:rotate-45'
                  } transition-transform duration-500`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="1.2" />
                  <circle cx="12" cy="12" r="4" strokeWidth="1" strokeDasharray="1 1" />
                </svg>
              </div>

              {/* Title label underneath dot */}
              <span
                className={`block mt-2 text-xs font-serif transition-colors whitespace-nowrap ${
                  isSelected ? 'text-indigo font-bold' : 'text-ink-muted group-hover:text-ink'
                }`}
              >
                {proj.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Expanded project description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProj.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-4 max-w-xl text-center px-4"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-leaf font-semibold">
            {activeProj.category}
          </span>
          <p className="font-sans text-sm sm:text-base text-ink-muted mt-2 leading-relaxed">
            {activeProj.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
