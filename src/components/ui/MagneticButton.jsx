import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMotion } from '../../context/MotionContext';

export function MagneticButton({
  children,
  onClick,
  href,
  download,
  className = '',
  variant = 'primary', // 'primary' | 'secondary'
  ...props
}) {
  const { reducedMotion, triggerBurst } = useMotion();
  const btnRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (reducedMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    setOffset({ x: dx * 0.28, y: dy * 0.28 });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleClick = (e) => {
    triggerBurst(e.clientX, e.clientY);
    onClick?.(e);
  };

  const isPrimary = variant === 'primary';

  const content = (
    <motion.span
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      className={`relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full overflow-hidden transition-all duration-300 select-none group focus-visible:outline-none ${
        isPrimary
          ? 'bg-ink text-paper hover:text-white'
          : 'bg-transparent text-ink border border-ink/80 hover:border-indigo'
      } ${className}`}
      {...props}
    >
      {/* Ink wash background ripple */}
      <span
        className={`absolute inset-0 transition-transform duration-500 rounded-full ${
          isPrimary ? 'bg-indigo' : 'bg-ink-faint'
        } ${isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        style={{ transformOrigin: 'center' }}
      />

      {/* Decorative fine-line pen ring on hover */}
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-80' : 'opacity-0'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          rx="999"
          stroke={isPrimary ? 'var(--marigold)' : 'var(--indigo)'}
          strokeWidth="1"
          strokeDasharray="4 3"
        />
      </svg>

      {/* Text label */}
      <span className="relative z-10 font-sans font-medium text-sm sm:text-base tracking-wide flex items-center gap-2">
        {children}
      </span>
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return <button type="button">{content}</button>;
}
