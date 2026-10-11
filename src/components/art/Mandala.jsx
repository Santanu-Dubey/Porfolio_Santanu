import React from 'react';

/**
 * Intricate fine-line radial mandala generator
 * Emulates black fineliner ink on warm paper:
 * - flower center, rings of teardrops & arches, hatched lotus petals,
 * - ring of dots, double circle, outer pointed petals with solid tips & spirals.
 */
export function Mandala({
  size = 400,
  className = '',
  color = 'currentColor',
  spin = false,
  reverse = false,
  opacity = 1,
  style = {},
  showOuter = true,
}) {
  const half = size / 2;
  const cx = half;
  const cy = half;

  // Generate 12 lotus petals
  const lotusPetals = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 360) / 12;
    const rad = (angle * Math.PI) / 180;
    return { angle, rad };
  });

  // Generate 24 small outer teardrops / dots
  const outerDots = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i * 360) / 24;
    const rad = (angle * Math.PI) / 180;
    const r = half * 0.72;
    return {
      cx: cx + r * Math.cos(rad),
      cy: cy + r * Math.sin(rad),
    };
  });

  // Generate 16 outer pointed petals with solid tips
  const pointedPetals = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * 360) / 16;
    return { angle };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${spin ? (reverse ? 'spin-reverse-slow' : 'spin-slow') : ''} ${className}`}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      <defs>
        {/* Hatching pattern for lotus petals */}
        <pattern
          id={`hatch-${size}`}
          width="4"
          height="4"
          patternTransform="rotate(45 0 0)"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="4" stroke={color} strokeWidth="0.75" />
        </pattern>
      </defs>

      <g stroke={color} fill="none">
        {/* 1. Core Center: Small multi-petal flower & dots */}
        <circle cx={cx} cy={cy} r={half * 0.08} fill={color} />
        <circle cx={cx} cy={cy} r={half * 0.04} fill="var(--paper)" />
        <circle cx={cx} cy={cy} r={half * 0.14} strokeWidth="1.2" strokeDasharray="3 3" />

        {/* 2. Inner Arched Teardrops */}
        {lotusPetals.map((p, idx) => (
          <g key={`inner-arch-${idx}`} transform={`rotate(${p.angle} ${cx} ${cy})`}>
            {/* Arched ring petal */}
            <path
              d={`M ${cx} ${cy - half * 0.08} 
                 C ${cx - half * 0.06} ${cy - half * 0.18}, 
                   ${cx - half * 0.05} ${cy - half * 0.26}, 
                   ${cx} ${cy - half * 0.3} 
                 C ${cx + half * 0.05} ${cy - half * 0.26}, 
                   ${cx + half * 0.06} ${cy - half * 0.18}, 
                   ${cx} ${cy - half * 0.08} Z`}
              strokeWidth="1.2"
            />
            {/* Inner midline */}
            <line
              x1={cx}
              y1={cy - half * 0.1}
              x2={cx}
              y2={cy - half * 0.28}
              strokeWidth="0.8"
            />
          </g>
        ))}

        {/* 3. Middle Double Circle Ring */}
        <circle cx={cx} cy={cy} r={half * 0.34} strokeWidth="1.8" />
        <circle cx={cx} cy={cy} r={half * 0.38} strokeWidth="1" strokeDasharray="2 3" />

        {/* 4. Hatched Lotus Petals */}
        {lotusPetals.map((p, idx) => (
          <g key={`lotus-${idx}`} transform={`rotate(${p.angle + 15} ${cx} ${cy})`}>
            {/* Lotus petal contour */}
            <path
              d={`M ${cx - half * 0.09} ${cy - half * 0.38}
                 C ${cx - half * 0.14} ${cy - half * 0.52},
                   ${cx} ${cy - half * 0.62},
                   ${cx} ${cy - half * 0.66}
                 C ${cx} ${cy - half * 0.62},
                   ${cx + half * 0.14} ${cy - half * 0.52},
                   ${cx + half * 0.09} ${cy - half * 0.38}`}
              strokeWidth="1.5"
              fill={`url(#hatch-${size})`}
            />
            <path
              d={`M ${cx} ${cy - half * 0.38} L ${cx} ${cy - half * 0.64}`}
              strokeWidth="1"
            />
          </g>
        ))}

        {/* 5. Outer Dot Band */}
        <circle cx={cx} cy={cy} r={half * 0.69} strokeWidth="1" />
        {outerDots.map((d, idx) => (
          <circle key={`dot-${idx}`} cx={d.cx} cy={d.cy} r={half * 0.012} fill={color} />
        ))}
        <circle cx={cx} cy={cy} r={half * 0.75} strokeWidth="2" />

        {/* 6. Outer Pointed Petals with Solid Ink Tips and Spirals */}
        {showOuter &&
          pointedPetals.map((p, idx) => (
            <g key={`pointed-${idx}`} transform={`rotate(${p.angle} ${cx} ${cy})`}>
              {/* Outer petal border */}
              <path
                d={`M ${cx - half * 0.07} ${cy - half * 0.75}
                   C ${cx - half * 0.09} ${cy - half * 0.86},
                     ${cx} ${cy - half * 0.94},
                     ${cx} ${cy - half * 0.98}
                   C ${cx} ${cy - half * 0.94},
                     ${cx + half * 0.09} ${cy - half * 0.86},
                     ${cx + half * 0.07} ${cy - half * 0.75}`}
                strokeWidth="1.6"
              />
              {/* Solid black pointed tip fill */}
              <path
                d={`M ${cx - half * 0.04} ${cy - half * 0.91}
                   Q ${cx} ${cy - half * 0.98} ${cx + half * 0.04} ${cy - half * 0.91}
                   L ${cx} ${cy - half * 0.98} Z`}
                fill={color}
              />
              {/* Fine internal spiral / dot */}
              <circle
                cx={cx}
                cy={cy - half * 0.84}
                r={half * 0.015}
                fill={color}
              />
            </g>
          ))}
      </g>
    </svg>
  );
}
