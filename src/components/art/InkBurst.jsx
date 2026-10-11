import React, { useEffect, useState } from 'react';
import { useMotion } from '../../context/MotionContext';
import { useTheme } from '../../context/ThemeContext';

export function InkBurst() {
  const { registerBurstListener, reducedMotion } = useMotion();
  const { isIndigoGreen } = useTheme();
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    if (reducedMotion) return;

    const unregister = registerBurstListener((x, y) => {
      const id = Date.now() + Math.random();
      const particles = Array.from({ length: 8 }).map((_, i) => {
        const ang = (i * Math.PI * 2) / 8 + Math.random() * 0.4;
        const dist = 18 + Math.random() * 24;
        return {
          dx: Math.cos(ang) * dist,
          dy: Math.sin(ang) * dist,
          size: 1.5 + Math.random() * 2,
        };
      });

      setBursts((prev) => [...prev.slice(-4), { id, x, y, particles }]);

      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 700);
    });

    return unregister;
  }, [registerBurstListener, reducedMotion]);

  if (bursts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute"
          style={{ left: `${burst.x}px`, top: `${burst.y}px` }}
        >
          {burst.particles.map((p, idx) => (
            <span
              key={idx}
              className="absolute rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${p.size * 2}px`,
                height: `${p.size * 2}px`,
                backgroundColor: isIndigoGreen ? 'var(--indigo)' : 'var(--ink)',
                transform: `translate(${p.dx}px, ${p.dy}px) scale(0)`,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
