import React from 'react';

/**
 * GoldenHaloMandala
 * Replicates the golden lotus halo mandala from Santanu's reference artwork.
 * Renders an authentic 16-petal lotus mandala with fine ink hatching,
 * warm amber-gold sun disk, and smooth continuous rotation animation.
 */
export function GoldenHaloMandala({
  className = '',
  speedClass = 'spin-slow', // custom slow rotation from art.css
}) {
  const cx = 200;
  const cy = 200;

  // 16 primary pointed lotus petals with hatched veins and solid tips
  const outerPetals = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * 360) / 16;
    return { angle, i };
  });

  // 16 secondary rounded petals interleaved at 11.25 degrees
  const innerPetals = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * 360) / 16 + 11.25;
    return { angle, i };
  });

  return (
    <svg
      viewBox="0 0 400 400"
      className={`${speedClass} ${className}`}
      style={{ transformOrigin: 'center' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Warm Golden Sun Gradient */}
        <radialGradient id="goldenHaloDisc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F7C962" stopOpacity="0.95" />
          <stop offset="65%" stopColor="#E5AE44" stopOpacity="0.92" />
          <stop offset="92%" stopColor="#D49931" stopOpacity="0.90" />
          <stop offset="100%" stopColor="#C48822" stopOpacity="0.85" />
        </radialGradient>

        {/* Fine crosshatch pattern for lotus petals */}
        <pattern
          id="mandalaHatch"
          width="4"
          height="4"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="4" stroke="#2B261D" strokeWidth="0.6" strokeOpacity="0.45" />
        </pattern>
      </defs>

      {/* 1. Base Amber/Golden Sun Disc */}
      <circle cx={cx} cy={cy} r="126" fill="url(#goldenHaloDisc)" />

      {/* 2. Secondary Interleaved Petals (Between primary petals) */}
      {innerPetals.map((p) => (
        <g key={`inner-petal-${p.i}`} transform={`rotate(${p.angle} ${cx} ${cy})`}>
          <path
            d={`M ${cx - 20} ${cy - 85}
               C ${cx - 28} ${cy - 120},
                 ${cx - 16} ${cy - 146},
                 ${cx} ${cy - 152}
               C ${cx + 16} ${cy - 146},
                 ${cx + 28} ${cy - 120},
                 ${cx + 20} ${cy - 85} Z`}
            fill="#E0A638"
            fillOpacity="0.5"
            stroke="#1D1912"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
        </g>
      ))}

      {/* 3. Primary 16 Pointed Lotus Petals */}
      {outerPetals.map((p) => (
        <g key={`outer-petal-${p.i}`} transform={`rotate(${p.angle} ${cx} ${cy})`}>
          {/* Hatched Petal Body */}
          <path
            d={`M ${cx - 24} ${cy - 110}
               C ${cx - 36} ${cy - 142},
                 ${cx - 18} ${cy - 176},
                 ${cx} ${cy - 188}
               C ${cx + 18} ${cy - 176},
                 ${cx + 36} ${cy - 142},
                 ${cx + 24} ${cy - 110} Z`}
            fill="url(#mandalaHatch)"
            stroke="#1B1710"
            strokeWidth="1.1"
            strokeOpacity="0.75"
          />

          {/* Solid Golden/Dark Tip */}
          <path
            d={`M ${cx - 7} ${cy - 172}
               Q ${cx} ${cy - 188} ${cx + 7} ${cy - 172}
               L ${cx} ${cy - 188} Z`}
            fill="#B87B15"
          />

          {/* Center Midline of Petal */}
          <line
            x1={cx}
            y1={cy - 110}
            x2={cx}
            y2={cy - 182}
            stroke="#1B1710"
            strokeWidth="0.75"
            strokeOpacity="0.5"
          />

          {/* Accent Petal Dot */}
          <circle cx={cx} cy={cy - 148} r="2.8" fill="#5A3A0B" />
          <circle cx={cx} cy={cy - 194} r="1.5" fill="#1B1710" strokeOpacity="0.7" />
        </g>
      ))}

      {/* 4. Sacred Geometry Rings & Radiating Concentric Arcs */}
      <circle cx={cx} cy={cy} r="126" stroke="#1D1912" strokeWidth="1.2" strokeOpacity="0.6" />
      <circle cx={cx} cy={cy} r="118" stroke="#1D1912" strokeWidth="0.8" strokeDasharray="3 3" strokeOpacity="0.4" />
      <circle cx={cx} cy={cy} r="88" stroke="#1D1912" strokeWidth="0.8" strokeOpacity="0.5" />
      <circle cx={cx} cy={cy} r="54" stroke="#1D1912" strokeWidth="0.8" strokeDasharray="2 3" strokeOpacity="0.4" />
      <circle cx={cx} cy={cy} r="28" stroke="#1D1912" strokeWidth="1" strokeOpacity="0.5" />

      {/* 5. Center Flower Core */}
      <circle cx={cx} cy={cy} r="12" fill="#E8B54D" stroke="#1D1912" strokeWidth="0.9" />
      <circle cx={cx} cy={cy} r="4" fill="#1D1912" />
    </svg>
  );
}
