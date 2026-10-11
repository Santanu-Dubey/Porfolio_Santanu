export const COLORS = {
  ink: {
    paper: '#F8F4EA',
    ink: '#111111',
    muted: '#4A4A4A',
    faint: 'rgba(17, 17, 17, 0.08)',
    indigo: '#1D3C9C',
    green: '#3F8A1F',
    marigold: '#FF9F1C',
  },
  indigoGreen: {
    paper: '#F5F1E5',
    ink: '#10266B',
    muted: '#23522A',
    faint: 'rgba(29, 60, 156, 0.12)',
    indigo: '#1D3C9C',
    green: '#3F8A1F',
    marigold: '#E68A00',
  },
};

export const BOIDS_CONFIG = {
  desktopCount: 16,
  mobileCount: 8,
  maxSpeed: 2.5,
  fleeSpeed: 7.5,
  maxForce: 0.08,
  fleeRadius: 180,
  separationDist: 35,
  neighborDist: 90,
  calmTimeMs: 3000,
};

export const BALLS_CONFIG = {
  desktopCount: 36,
  mobileCount: 22,
  minRadius: 24,
  maxRadius: 46,
  gravityCenterStrength: 0.0006,
  cursorRepelRadius: 140,
  cursorRepelForce: 0.08,
  dragRestitution: 0.85,
};

export const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 300,
  damping: 24,
};
