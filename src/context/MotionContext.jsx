import React, { createContext, useContext, useRef, useEffect, useState, useCallback } from 'react';

const MotionContext = createContext(null);

export const MotionProvider = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Mutable pointer state accessed via Ref - avoids 60fps re-renders
  const pointerRef = useRef({
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
    vx: 0,
    vy: 0,
    speed: 0,
    isDown: false,
    lastActive: Date.now(),
    burstCount: 0,
    burstX: 0,
    burstY: 0,
  });

  const listenersRef = useRef(new Set());

  const registerBurstListener = useCallback((fn) => {
    listenersRef.current.add(fn);
    return () => listenersRef.current.delete(fn);
  }, []);

  const triggerBurst = useCallback((x, y) => {
    pointerRef.current.burstCount += 1;
    pointerRef.current.burstX = x;
    pointerRef.current.burstY = y;
    listenersRef.current.forEach((fn) => fn(x, y));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Detect touch
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('touchstart', checkTouch, { once: true });

    let lastTime = performance.now();

    const handlePointerMove = (e) => {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 16);
      const prevX = pointerRef.current.x;
      const prevY = pointerRef.current.y;

      const vx = (e.clientX - prevX) / dt;
      const vy = (e.clientY - prevY) / dt;
      const speed = Math.sqrt(vx * vx + vy * vy);

      pointerRef.current.prevX = prevX;
      pointerRef.current.prevY = prevY;
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      pointerRef.current.vx = vx;
      pointerRef.current.vy = vy;
      pointerRef.current.speed = speed;
      pointerRef.current.lastActive = Date.now();
      lastTime = now;
    };

    const handlePointerDown = (e) => {
      pointerRef.current.isDown = true;
      triggerBurst(e.clientX, e.clientY);
    };

    const handlePointerUp = () => {
      pointerRef.current.isDown = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [triggerBurst]);

  return (
    <MotionContext.Provider
      value={{
        reducedMotion,
        isTouch,
        pointerRef,
        triggerBurst,
        registerBurstListener,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error('useMotion must be used within MotionProvider');
  return ctx;
};
