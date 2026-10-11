import React from 'react';

/**
 * Generic Mandala Medallion Frame
 */
export function MandalaIcon({
  children,
  size = 48,
  pattern = 'pointed',
  className = '',
  color = 'currentColor',
}) {
  const half = size / 2;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg
        className="absolute inset-0 w-full h-full stroke-current pointer-events-none"
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
      >
        <circle cx={half} cy={half} r={half - 2} strokeWidth="1.6" />
        <circle cx={half} cy={half} r={half - 6} strokeWidth="0.8" strokeDasharray="2 2" />
        <circle cx={half} cy={half} r={half * 0.45} strokeWidth="1" />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
