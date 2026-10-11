import React from 'react';
import { motion } from 'framer-motion';

/**
 * Hand-drawn SVG vine with 2 leaves that unfold when scrolled into view
 */
export function Vine({ className = '', height = 480 }) {
  return (
    <svg
      className={`w-28 ${className} pointer-events-none stroke-pen`}
      viewBox={`0 0 100 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central wobbly vine stem */}
      <motion.path
        d={`M 50 0 Q 35 ${height * 0.25}, 50 ${height * 0.5} T 50 ${height}`}
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Leaf 1: Stem to left at 30% height */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        transform={`translate(50, ${height * 0.3})`}
      >
        <path
          d="M 0 0 C -25 -10, -40 -5, -45 -20 C -35 -35, -15 -25, 0 0 Z"
          strokeWidth="1.6"
          stroke="var(--green)"
          fill="none"
        />
        {/* Leaf vein */}
        <line x1="0" y1="0" x2="-35" y2="-18" strokeWidth="1" stroke="var(--green)" />
        {/* Tiny ink curl */}
        <path d="M 0 0 C 15 5, 20 15, 24 10" strokeWidth="1" stroke="var(--ink)" strokeDasharray="2 2" />
      </motion.g>

      {/* Leaf 2: Stem to right at 70% height */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
        transform={`translate(50, ${height * 0.7})`}
      >
        <path
          d="M 0 0 C 25 -10, 40 -5, 45 -20 C 35 -35, 15 -25, 0 0 Z"
          strokeWidth="1.6"
          stroke="var(--green)"
          fill="none"
        />
        {/* Leaf vein */}
        <line x1="0" y1="0" x2="35" y2="-18" strokeWidth="1" stroke="var(--green)" />
        {/* Tiny ink curl */}
        <path d="M 0 0 C -15 5, -20 15, -24 10" strokeWidth="1" stroke="var(--ink)" strokeDasharray="2 2" />
      </motion.g>
    </svg>
  );
}
