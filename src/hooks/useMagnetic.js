import { useState, useRef, useCallback } from 'react';

export function useMagnetic({ strength = 0.35, maxDistance = 60 } = {}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < maxDistance) {
      setPosition({ x: dx * strength, y: dy * strength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [strength, maxDistance]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return { ref, position, handleMouseMove, handleMouseLeave };
}
