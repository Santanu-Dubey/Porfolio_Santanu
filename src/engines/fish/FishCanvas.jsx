import React, { useEffect, useRef } from 'react';
import { useMotion } from '../../context/MotionContext';
import { useTheme } from '../../context/ThemeContext';
import { BoidsFlock } from './boids';
import { drawPenFish } from './drawFish';
import { BOIDS_CONFIG } from '../../utils/constants';

export function FishCanvas() {
  const canvasRef = useRef(null);
  const flockRef = useRef(null);
  const { pointerRef, registerBurstListener, reducedMotion, isTouch } = useMotion();
  const { isIndigoGreen } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let isVisible = true;

    const count = isTouch ? BOIDS_CONFIG.mobileCount : BOIDS_CONFIG.desktopCount;
    flockRef.current = new BoidsFlock(count, window.innerWidth, window.innerHeight, isTouch);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Register click scatter listener
    const unregisterBurst = registerBurstListener((x, y) => {
      if (flockRef.current && !reducedMotion) {
        flockRef.current.scatter(x, y);
      }
    });

    // Handle tab visibility
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Main render loop
    const render = () => {
      if (isVisible && flockRef.current) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        const inkColor = isIndigoGreen ? '#1D3C9C' : '#111111';

        if (!reducedMotion) {
          flockRef.current.update(pointerRef.current, window.innerWidth, window.innerHeight);
        }

        flockRef.current.fishList.forEach((fish) => {
          drawPenFish(ctx, fish, inkColor);
        });
      }

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    if (reducedMotion) {
      // Draw static positions once
      render();
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      unregisterBurst();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [reducedMotion, isTouch, isIndigoGreen, pointerRef, registerBurstListener]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
}
