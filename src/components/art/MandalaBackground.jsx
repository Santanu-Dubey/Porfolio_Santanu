import React from 'react';
import { Mandala } from './Mandala';
import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * Depth Layer 2 & 3:
 * Giant faint rotating background mandala + floating ink dots & petals
 * Changes size, rotation and coordinates per scroll depth
 */
export function MandalaBackground() {
  const { progress } = useScrollProgress();

  // Rotate 360 deg across full scroll, scale subtly
  const rotation = progress * 360;
  const scale = 1 + Math.sin(progress * Math.PI) * 0.35;
  const translateY = progress * 120;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Giant Faint Rotating Mandala */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(-50%, calc(-50% + ${translateY}px)) rotate(${rotation}deg) scale(${scale})`,
          opacity: 0.08,
          filter: 'blur(0.4px)',
        }}
      >
        <Mandala size={1200} color="var(--ink)" showOuter={true} />
      </div>

      {/* Floating Ink Droplets & Petals at mixed depths */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${-progress * 80}px)`,
          opacity: 0.25,
        }}
      >
        {/* Layer 1: Near (crisp, small dots) */}
        <span className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-ink opacity-30" />
        <span className="absolute top-[35%] right-[15%] w-1.5 h-1.5 rounded-full bg-indigo opacity-40" />
        <span className="absolute top-[62%] left-[8%] w-2.5 h-2.5 rounded-full bg-ink opacity-25" />
        <span className="absolute top-[82%] right-[22%] w-1.5 h-1.5 rounded-full bg-leaf opacity-35" />

        {/* Layer 2: Floating Petals (fine lines) */}
        <svg
          className="absolute top-[28%] left-[24%] w-6 h-6 stroke-pen opacity-40"
          viewBox="0 0 24 24"
          style={{ transform: `rotate(${progress * 180}deg)` }}
        >
          <path d="M12 2 C7 8 7 16 12 22 C17 16 17 8 12 2 Z" fill="none" strokeWidth="1.2" />
        </svg>

        <svg
          className="absolute top-[70%] right-[12%] w-8 h-8 stroke-pen opacity-30"
          viewBox="0 0 24 24"
          style={{ transform: `rotate(${-progress * 240}deg)` }}
        >
          <path d="M12 2 C7 8 7 16 12 22 C17 16 17 8 12 2 Z" fill="none" strokeWidth="1.2" />
          <line x1="12" y1="4" x2="12" y2="20" strokeWidth="0.8" />
        </svg>

        {/* Layer 3: Paper Fibers (elongated hairline marks) */}
        <span className="absolute top-[48%] left-[78%] w-4 h-[1px] bg-ink opacity-20 rotate-45" />
        <span className="absolute top-[12%] right-[38%] w-5 h-[1px] bg-ink opacity-15 -rotate-12" />
        <span className="absolute top-[90%] left-[30%] w-6 h-[1px] bg-ink opacity-20 rotate-25" />
      </div>

      {/* Radial soft center fade to ensure 100% text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, var(--paper) 0%, transparent 80%)',
          opacity: 0.65,
        }}
      />
    </div>
  );
}
