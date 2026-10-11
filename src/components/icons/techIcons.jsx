import React from 'react';

/**
 * 36 simplified pen-drawn technology glyphs for the Skills Ball Pool
 */
export const TECH_ICONS = {
  cpp: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M10 9a4 4 0 1 0 0 6" strokeLinecap="round" />
      <path d="M14 12h3 M15.5 10.5v3" strokeLinecap="round" />
      <path d="M19 12h3 M20.5 10.5v3" strokeLinecap="round" />
    </svg>
  ),
  java: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M6 19c3 1 9 1 12 0 M5 16c4 1 10 1 14 0" strokeLinecap="round" />
      <path d="M12 4c-2 2-2 4 0 6s2 4 0 6" strokeLinecap="round" />
      <path d="M15 6c-1.5 1.5-1.5 3 0 4.5" strokeLinecap="round" />
    </svg>
  ),
  python: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 3c-4 0-4 2-4 3v3h4v1H6c-2 0-3 1-3 4s1 4 3 4h2v-2c0-2 1-3 3-3h4v-1h-4V7c0-2 2-4 4-4z" />
      <circle cx="9" cy="6" r="0.8" fill="currentColor" />
      <circle cx="15" cy="18" r="0.8" fill="currentColor" />
    </svg>
  ),
  javascript: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.2" />
      <path d="M9 13v3c0 1-1 1-1.5 0.5 M13 16c1 1 3 0.5 3-1s-3-1-3-2 1.5-1.5 3-1" strokeLinecap="round" />
    </svg>
  ),
  dsa: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M10.5 7L7.5 16 M13.5 7L16.5 16" />
    </svg>
  ),
  react: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <ellipse cx="12" cy="12" rx="9" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  reactNative: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="6" y="2" width="12" height="20" rx="2" strokeWidth="1.2" />
      <ellipse cx="12" cy="11" rx="4" ry="1.8" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  tailwind: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M6 12c1.5-3 3.5-3.5 6-1.5 1.5 1.2 2.5 1.5 4 0.5-1.5 3-3.5 3.5-6 1.5-1.5-1.2-2.5-1.5-4-0.5z" />
      <path d="M3 17c1-2 2.5-2.5 4-1 1 0.8 1.8 1 3 0.3-1 2-2.5 2.5-4 1-1-0.8-1.8-1-3-0.3z" />
    </svg>
  ),
  html5: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 3l1.8 16L12 21l6.2-2L20 3H4z" />
      <path d="M16 7H8l.5 4.5h7L15 16l-3 .8-3-.8-.2-2" strokeLinecap="round" />
    </svg>
  ),
  css3: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M4 3l1.8 16L12 21l6.2-2L20 3H4z" />
      <path d="M16 7H8.5l.3 3.5h6.7l-.5 4.5-3 .8-3-.8v-1.5" strokeLinecap="round" />
    </svg>
  ),
  node: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
      <path d="M12 2v20 M3 7l9 5 9-5" strokeWidth="1.2" />
    </svg>
  ),
  express: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M5 8h6M5 12h4M5 16h6" strokeLinecap="round" />
      <path d="M15 8l4 8M19 8l-4 8" strokeLinecap="round" />
    </svg>
  ),
  fastapi: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M13 6l-4 7h5l-2 5 6-8h-5z" fill="currentColor" stroke="none" />
    </svg>
  ),
  restApi: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="5" width="18" height="5" rx="1.5" />
      <rect x="3" y="14" width="18" height="5" rx="1.5" />
      <path d="M7 10v4 M17 10v4" strokeLinecap="round" />
    </svg>
  ),
  systemDesign: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="7" height="6" rx="1" />
      <rect x="14" y="3" width="7" height="6" rx="1" />
      <rect x="8.5" y="15" width="7" height="6" rx="1" />
      <path d="M6.5 9v3h11V9 M12 12v3" strokeLinecap="round" />
    </svg>
  ),
  mongodb: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 2C8 7 7 13 12 21c5-8 4-14 0-19z" />
      <path d="M12 4v16" strokeWidth="1" />
    </svg>
  ),
  mysql: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <ellipse cx="12" cy="7" rx="8" ry="3" />
      <path d="M4 7v10c0 1.6 3.6 3 8 3s8-1.4 8-3V7" />
      <path d="M4 12c0 1.6 3.6 3 8 3s8-1.4 8-3" />
    </svg>
  ),
  postgresql: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 4a7 7 0 0 0-7 7c0 5 4 8 7 9 3-1 7-4 7-9a7 7 0 0 0-7-7z" />
      <path d="M10 10c0-1.5 1-2 2-2s2 .5 2 2v5" strokeLinecap="round" />
    </svg>
  ),
  atlas: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18 M12 3a14 14 0 0 1 0 18 M12 3a14 14 0 0 0 0 18" strokeWidth="1" />
    </svg>
  ),
  sql: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
      <path d="M9 13l6-2 M9 15l6-2" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  yolo: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" strokeDasharray="3 2" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  pandas: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="13" r="7" />
      <circle cx="7" cy="8" r="2.5" fill="currentColor" />
      <circle cx="17" cy="8" r="2.5" fill="currentColor" />
      <ellipse cx="9" cy="13" rx="1.5" ry="2" fill="currentColor" />
      <ellipse cx="15" cy="13" rx="1.5" ry="2" fill="currentColor" />
    </svg>
  ),
  scikit: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="7" r="3" />
      <circle cx="17" cy="17" r="3" />
      <line x1="9" y1="12" x2="15" y2="8" strokeDasharray="2 2" />
      <line x1="9" y1="12" x2="14" y2="16" strokeDasharray="2 2" />
    </svg>
  ),
  genai: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z" />
      <circle cx="19" cy="4" r="1.5" fill="currentColor" />
    </svg>
  ),
  streamlit: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <polygon points="12 4 4 19 20 19" />
      <polygon points="12 9 7 19 17 19" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  ),
  emailSec: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 3L4 7v6c0 5 4 8 8 9 4-1 8-4 8-9V7l-8-4z" />
      <path d="M8 10h8v5H8z" strokeWidth="1.2" />
    </svg>
  ),
  phishing: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 3v10 M12 17a5 5 0 0 1-5-5v-1" strokeLinecap="round" />
      <path d="M7 11l-3 3" strokeLinecap="round" />
      <circle cx="12" cy="20" r="1.5" fill="currentColor" />
    </svg>
  ),
  spfDkim: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  urlAnalysis: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" />
    </svg>
  ),
  forensics: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35 M11 8v6 M8 11h6" strokeLinecap="round" />
    </svg>
  ),
  git: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="9" r="2.5" />
      <circle cx="6" cy="6" r="2.5" />
      <path d="M6 8.5v7 M8 17l8-6" />
    </svg>
  ),
  github: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  vscode: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M18 3l-8 7.5L5 6 3 7.5l4 4.5-4 4.5L5 18l5-4.5 8 7.5z" />
    </svg>
  ),
  postman: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8 M13 8l3 4-3 4" strokeLinecap="round" />
    </svg>
  ),
  vercel: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <polygon points="12 4 21 20 3 20" />
    </svg>
  ),
  gcp: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M18 10a5 5 0 0 0-9-2.5A5.5 5.5 0 0 0 4 13a4.5 4.5 0 0 0 4.5 4.5H18a4 4 0 0 0 0-8z" />
      <path d="M12 9v5 M9.5 11.5l5 0" strokeWidth="1" />
    </svg>
  ),
};
