import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from '../../hooks/useCursor';
import { useTheme } from '../../context/ThemeContext';

export function Cursor() {
  const { pointerRef, isHovered, hoverType, isVisible, isClicking, enabled } = useCursor();
  const { isIndigoGreen } = useTheme();

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);

  // Smooth lagging position for the ring
  const lagPos = useRef({ x: -1000, y: -1000 });
  const trailRef = useRef([]);

  useEffect(() => {
    if (!enabled) return;

    let animId;
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;

    const render = () => {
      const p = pointerRef.current;

      // Update dot position directly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${p.x - 4}px, ${p.y - 4}px, 0)`;
      }

      // Lerp ring position with lag
      lagPos.current.x += (p.x - lagPos.current.x) * 0.18;
      lagPos.current.y += (p.y - lagPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${lagPos.current.x - 14}px, ${lagPos.current.y - 14}px, 0)`;
      }

      // Ink trail on fast cursor motion
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (p.speed > 0.4 && p.x > 0 && p.y > 0) {
          trailRef.current.push({
            x: p.x,
            y: p.y,
            alpha: 0.35,
            radius: Math.min(3.5, p.speed * 1.2),
          });
        }

        // Draw and fade trail
        for (let i = trailRef.current.length - 1; i >= 0; i--) {
          const pt = trailRef.current[i];
          pt.alpha *= 0.9;
          if (pt.alpha < 0.02) {
            trailRef.current.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
          ctx.fillStyle = isIndigoGreen
            ? `rgba(29, 60, 156, ${pt.alpha})`
            : `rgba(17, 17, 17, ${pt.alpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled, isIndigoGreen, pointerRef]);

  if (!enabled) return null;

  const ringScale = isHovered ? 1.5 : isClicking ? 0.8 : 1;
  const ringColor = isHovered
    ? hoverType === 'button'
      ? 'var(--green)'
      : 'var(--indigo)'
    : 'var(--ink)';

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Ink trail canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 8px Solid Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-ink transition-transform duration-75 pointer-events-none"
        style={{
          boxShadow: '0 0 4px var(--ink-faint)',
        }}
      />

      {/* 28px Lagging Ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 w-7 h-7 rounded-full border border-current pointer-events-none transition-all duration-200"
        style={{
          color: ringColor,
          transform: `scale(${ringScale})`,
          borderWidth: isHovered ? '1.5px' : '1px',
          backgroundColor: isClicking ? 'var(--ink-faint)' : 'transparent',
        }}
      />
    </div>
  );
}
