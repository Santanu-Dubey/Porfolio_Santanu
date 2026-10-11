import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 sm:px-8 border-t border-dashed border-ink/20 overflow-hidden select-none">
      {/* Animated pen-drawn fish swimming continuously across bottom */}
      <div className="absolute top-4 left-0 right-0 h-10 pointer-events-none overflow-hidden">
        <motion.svg
          animate={{ x: ['-10%', '110%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-8 stroke-pen text-indigo"
          viewBox="0 0 60 30"
          fill="none"
        >
          {/* Fish contour */}
          <path
            d="M 45 15 C 35 6, 20 8, 12 15 C 20 22, 35 24, 45 15 Z"
            strokeWidth="1.4"
          />
          {/* Tail */}
          <path d="M 12 15 L 4 8 L 8 15 L 4 22 Z" strokeWidth="1.2" />
          {/* Eye */}
          <circle cx="38" cy="13" r="1.2" fill="currentColor" />
        </motion.svg>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 text-center sm:text-left">
        {/* Calligraphic hand-drawn signature & attribution */}
        <div className="space-y-1">
          <div className="font-serif text-2xl font-bold tracking-tight text-ink italic">
            Santanu Dubey
          </div>
          <p className="font-mono text-xs text-ink-muted">
            B.Tech CSE Student • Web • Backend • AI/ML • Cybersecurity
          </p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full border border-ink/30 hover:border-indigo text-ink hover:text-indigo transition-colors focus-visible:outline-none"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-ink-muted/80 gap-2">
        <span>© {new Date().getFullYear()} Santanu Dubey. All rights reserved.</span>
        <span>Continuous paper world • Zero rectangular boxes • Fineliner ink</span>
      </div>
    </footer>
  );
}
