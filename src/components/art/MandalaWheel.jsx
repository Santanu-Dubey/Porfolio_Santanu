import React from 'react';
import { motion } from 'framer-motion';

export function MandalaWheel({
  projects = [],
  activeIndex = 0,
  onSelectProject,
  size = 520,
}) {
  const half = size / 2;
  const cx = half;
  const cy = half;
  const count = projects.length;

  return (
    <div className="relative select-none flex items-center justify-center">
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: activeIndex * -60 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="w-full max-w-[340px] sm:max-w-[460px] md:max-w-[520px] h-auto drop-shadow-none"
      >
        <defs>
          <pattern id="petal-hatch" width="4" height="4" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="4" stroke="var(--ink)" strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Outer guidelines */}
        <circle cx={cx} cy={cy} r={half * 0.94} stroke="var(--ink-subtle)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx={cx} cy={cy} r={half * 0.54} stroke="var(--ink-subtle)" strokeWidth="1" />

        {/* 6 Featured Petals */}
        {projects.map((project, idx) => {
          const angleDeg = (idx * 360) / count;
          const isActive = activeIndex === idx;

          return (
            <g
              key={project.id}
              transform={`rotate(${angleDeg} ${cx} ${cy})`}
              onClick={() => onSelectProject(idx)}
              className="cursor-pointer transition-all duration-300"
              role="button"
              tabIndex={0}
              aria-label={`Select project ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectProject(idx);
              }}
            >
              {/* Petal contour: unfolds from r=0.54 to r=0.92 */}
              <motion.path
                d={`M ${cx - half * 0.16} ${cy - half * 0.54}
                   C ${cx - half * 0.32} ${cy - half * 0.72},
                     ${cx - half * 0.18} ${cy - half * 0.88},
                     ${cx} ${cy - half * 0.93}
                   C ${cx + half * 0.18} ${cy - half * 0.88},
                     ${cx + half * 0.32} ${cy - half * 0.72},
                     ${cx + half * 0.16} ${cy - half * 0.54} Z`}
                fill={isActive ? 'url(#petal-hatch)' : 'var(--paper)'}
                stroke={isActive ? 'var(--indigo)' : 'var(--ink)'}
                strokeWidth={isActive ? 2.6 : 1.4}
                animate={{
                  opacity: isActive ? 1 : 0.4,
                  scale: isActive ? 1.04 : 1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Pointed tip embellishment */}
              <circle
                cx={cx}
                cy={cy - half * 0.91}
                r={half * 0.02}
                fill={isActive ? 'var(--indigo)' : 'var(--ink)'}
              />

              {/* Petal roman numeral or index label */}
              <text
                x={cx}
                y={cy - half * 0.72}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-serif text-xs font-semibold"
                fill={isActive ? 'var(--indigo)' : 'var(--ink)'}
                transform={`rotate(${-angleDeg} ${cx} ${cy - half * 0.72})`}
              >
                0{idx + 1}
              </text>
            </g>
          );
        })}

        {/* Center Hub: "Selected work" */}
        <circle cx={cx} cy={cy} r={half * 0.44} fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.2" />
        <circle cx={cx} cy={cy} r={half * 0.40} stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx={cx} cy={cy} r={half * 0.22} stroke="var(--indigo)" strokeWidth="1.2" />

        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-serif text-sm font-bold tracking-wider uppercase"
          fill="var(--ink)"
        >
          Selected
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-serif text-xs italic tracking-widest uppercase"
          fill="var(--indigo)"
        >
          Work
        </text>
      </motion.svg>
    </div>
  );
}
