import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE } from '../../data/profile';
import { GithubGlyph, LinkedinGlyph, MailGlyph, ResumeGlyph } from '../icons/socialIcons';
import { useMotion } from '../../context/MotionContext';

const SOCIALS = [
  {
    id: 'github',
    label: 'GitHub',
    href: PROFILE.links.github,
    icon: GithubGlyph,
    download: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: PROFILE.links.linkedin,
    icon: LinkedinGlyph,
    download: false,
  },
  {
    id: 'email',
    label: 'Email me',
    href: PROFILE.links.email,
    icon: MailGlyph,
    download: false,
  },
  {
    id: 'resume',
    label: 'Resume',
    href: PROFILE.links.resume,
    icon: ResumeGlyph,
    download: 'Santanu_Dubey_Resume.pdf',
  },
];

export function SocialRail() {
  const { triggerBurst } = useMotion();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <aside
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none"
      aria-label="Social and contact links rail"
    >
      {/* Hand-drawn hanging thread background */}
      <svg
        className="absolute top-0 bottom-0 w-4 h-full pointer-events-none stroke-ink/30"
        viewBox="0 0 16 320"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 8 0 Q 6 80, 8 160 T 8 320"
          strokeWidth="1.2"
          strokeDasharray="4 2"
        />
      </svg>

      <div className="flex flex-col items-center gap-7 py-2 relative z-10">
        {SOCIALS.map((social, idx) => {
          const Icon = social.icon;
          const isHovered = hoveredId === social.id;

          return (
            <div
              key={social.id}
              className="relative flex items-center justify-end"
              onMouseEnter={() => setHoveredId(social.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Sliding label from the right */}
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, x: 12, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, x: -12, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 8, filter: 'blur(3px)' }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-full mr-2 px-2.5 py-1 rounded bg-paper/95 border border-ink/20 text-xs font-mono uppercase tracking-widest text-ink shadow-sm pointer-events-none whitespace-nowrap"
                  >
                    {social.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Interactive Mandala Medallion (~48px) */}
              <motion.a
                href={social.href}
                download={social.download || undefined}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={(e) => triggerBurst(e.clientX, e.clientY)}
                aria-label={social.label}
                animate={{
                  y: [0, -3.5, 0],
                  scale: isHovered ? 1.18 : 1,
                }}
                transition={{
                  y: {
                    duration: 3 + idx * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  scale: { duration: 0.2 },
                }}
                className="interactive-medallion relative w-12 h-12 rounded-full flex items-center justify-center bg-paper text-ink hover:text-indigo transition-colors focus-visible:outline-none"
              >
                {/* Rotating Petal Ring */}
                <svg
                  className={`absolute inset-0 w-full h-full stroke-pen pointer-events-none transition-transform duration-700 ${
                    isHovered ? 'rotate-90 stroke-indigo' : ''
                  }`}
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <circle cx="24" cy="24" r="22" strokeWidth="1.5" />
                  <circle cx="24" cy="24" r="18" strokeWidth="0.8" strokeDasharray="2 2" />
                  {/* 8 tiny petals */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={24 + 20 * Math.cos((i * Math.PI) / 4)}
                      cy={24 + 20 * Math.sin((i * Math.PI) / 4)}
                      r="1.2"
                      fill="currentColor"
                    />
                  ))}
                </svg>

                {/* Centered Glyph */}
                <div className="relative z-10">
                  <Icon className="w-4 h-4" />
                </div>
              </motion.a>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
