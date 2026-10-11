import { useState, useEffect, useRef } from 'react';
import { useMotion } from '../context/MotionContext';

export function useCursor() {
  const { pointerRef, reducedMotion, isTouch } = useMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState('default'); // 'button' | 'link' | 'medallion'
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    const handlePointerOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], .interactive-medallion, input, textarea');
      if (target) {
        setIsHovered(true);
        if (target.tagName.toLowerCase() === 'button') setHoverType('button');
        else if (target.classList.contains('interactive-medallion')) setHoverType('medallion');
        else setHoverType('link');
      } else {
        setIsHovered(false);
        setHoverType('default');
      }
    };

    const handlePointerEnter = () => setIsVisible(true);
    const handlePointerLeave = () => setIsVisible(false);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mouseover', handlePointerOver, { passive: true });
    document.addEventListener('mouseenter', handlePointerEnter);
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseenter', handlePointerEnter);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [reducedMotion, isTouch]);

  return {
    pointerRef,
    isHovered,
    hoverType,
    isVisible,
    isClicking,
    enabled: !reducedMotion && !isTouch,
  };
}
