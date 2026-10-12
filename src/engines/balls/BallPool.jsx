import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { SKILLS, SKILL_GROUPS } from '../../data/skills';
import { BallPoolPhysics } from './physics';
import { useMotion } from '../../context/MotionContext';
import { useTheme } from '../../context/ThemeContext';
import { distance } from '../../utils/math';
import {
  GROUP_PALETTES,
  SKILL_SHORT_NAMES,
  createTechIconImage,
} from './techSvgIcons';

export function BallPool() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const physicsRef = useRef(null);
  const iconImagesRef = useRef(new Map());
  const { pointerRef, registerBurstListener, reducedMotion, isTouch } = useMotion();
  const { isIndigoGreen } = useTheme();

  const [hoveredSkill, setHoveredSkill] = useState(null);
  const dragBodyRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let isIntersecting = true;

    const width = container.clientWidth || 800;
    const height = Math.min(Math.max(window.innerHeight * 0.75, 550), 750);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const skillsData = isTouch ? SKILLS.slice(0, 24) : SKILLS;

    physicsRef.current = new BallPoolPhysics({
      width,
      height,
      skills: skillsData,
      isMobile: isTouch,
      onUpdate: () => {},
    });

    // Pause physics when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Burst listener
    const unregisterBurst = registerBurstListener((clientX, clientY) => {
      if (physicsRef.current && !reducedMotion) {
        const rect = canvas.getBoundingClientRect();
        const cx = clientX - rect.left;
        const cy = clientY - rect.top;
        if (cx >= 0 && cx <= width && cy >= 0 && cy <= height) {
          physicsRef.current.scatter(cx, cy);
        }
      }
    });

    // Cache / retrieve tech icon image
    const getOrLoadIcon = (iconKey, strokeColor) => {
      const cacheKey = `${iconKey}-${strokeColor}`;
      if (!iconImagesRef.current.has(cacheKey)) {
        const img = createTechIconImage(iconKey, strokeColor);
        if (img) {
          iconImagesRef.current.set(cacheKey, img);
        }
      }
      return iconImagesRef.current.get(cacheKey);
    };

    // Draw individual ball medallion with Tech Logo and Tech Name
    const drawMedallion = (ctx, body, inkColor, accentColor) => {
      const { x, y } = body.position;
      const r = body.visualRadius;
      const angle = body.angle;
      const skill = body.skillData;
      const isHovered = hoveredSkill?.id === skill.id;
      const currentR = isHovered ? r * 1.15 : r;

      const palette = GROUP_PALETTES[skill.group] || {
        bg: '#FFFDF9',
        border: inkColor,
        accent: accentColor,
        text: '#1C1917',
      };

      ctx.save();
      ctx.translate(x, y);

      // --- SECTION 1: Outer Rotating Medallion & Rim (rotates with physics) ---
      ctx.save();
      ctx.rotate(angle);

      // Soft medallion drop shadow
      ctx.shadowColor = isHovered ? 'rgba(29, 60, 156, 0.28)' : 'rgba(27, 23, 16, 0.10)';
      ctx.shadowBlur = isHovered ? 14 : 6;
      ctx.shadowOffsetY = isHovered ? 3 : 2;

      // Base Badge Background: Warm, soft, high-contrast medallion
      ctx.beginPath();
      ctx.arc(0, 0, currentR, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? '#FFFFFF' : palette.bg;
      ctx.fill();

      // Reset shadow for internal linework
      ctx.shadowColor = 'transparent';

      // Outer Medallion Border
      ctx.beginPath();
      ctx.arc(0, 0, currentR - 0.75, 0, Math.PI * 2);
      ctx.strokeStyle = isHovered ? palette.accent : palette.border;
      ctx.lineWidth = isHovered ? 2.6 : 1.8;
      ctx.stroke();

      // Inner Delicate Concentric Dashed Ring
      ctx.beginPath();
      ctx.arc(0, 0, currentR * 0.88, 0, Math.PI * 2);
      ctx.strokeStyle = isHovered ? `${palette.accent}66` : `${palette.border}33`;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 2.5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Subtle Outer Rim Notches / Petal Motifs
      const notchCount = 12;
      const notchR = currentR * 0.94;
      ctx.fillStyle = isHovered ? palette.accent : `${palette.border}55`;
      for (let i = 0; i < notchCount; i++) {
        const na = (i * Math.PI * 2) / notchCount;
        ctx.beginPath();
        ctx.arc(notchR * Math.cos(na), notchR * Math.sin(na), 0.75, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore(); // End rotating outer rim

      // --- SECTION 2: Upright Tech Logo & Name (Always readable & upright!) ---
      const strokeColor = isHovered ? palette.accent : palette.border;
      const iconImg = getOrLoadIcon(skill.iconKey, strokeColor);
      const hasIcon = iconImg && iconImg.complete && iconImg.naturalWidth > 0;

      const displayName = SKILL_SHORT_NAMES[skill.id] || skill.name;

      if (hasIcon) {
        // Draw Tech Icon in upper-center
        const iconSize = Math.max(20, Math.min(32, Math.floor(currentR * 0.62)));
        const iconY = -currentR * 0.16;
        ctx.drawImage(iconImg, -iconSize / 2, iconY - iconSize / 2, iconSize, iconSize);

        // Draw Tech Name in lower portion
        const fontSize = Math.max(9, Math.min(12, Math.floor(currentR * 0.28)));
        ctx.fillStyle = isHovered ? palette.accent : palette.text;
        ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(displayName, 0, currentR * 0.42);
      } else {
        // Clean, prominent centered text
        const fontSize = Math.max(11, Math.min(15, Math.floor(currentR * 0.38)));
        ctx.fillStyle = isHovered ? palette.accent : palette.text;
        ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(displayName, 0, 0);
      }

      ctx.restore();
    };

    // Render loop
    const render = () => {
      if (isIntersecting && physicsRef.current) {
        ctx.clearRect(0, 0, width, height);

        const rect = canvas.getBoundingClientRect();
        const p = {
          x: pointerRef.current.x - rect.left,
          y: pointerRef.current.y - rect.top,
          speed: pointerRef.current.speed,
        };

        if (!reducedMotion) {
          physicsRef.current.update(p);
        }

        const inkColor = isIndigoGreen ? '#1D3C9C' : '#111111';
        const accentColor = isIndigoGreen ? '#3F8A1F' : '#1D3C9C';

        physicsRef.current.bodies.forEach((body) => {
          drawMedallion(ctx, body, inkColor, accentColor);
        });
      }

      if (!reducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    if (reducedMotion) {
      render();
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      unregisterBurst();
      observer.disconnect();
      if (physicsRef.current) physicsRef.current.destroy();
    };
  }, [reducedMotion, isTouch, isIndigoGreen, pointerRef, registerBurstListener, hoveredSkill]);

  // Pointer drag & hover interaction
  const handlePointerDown = (e) => {
    if (!canvasRef.current || !physicsRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (const body of physicsRef.current.bodies) {
      const d = distance(body.position.x, body.position.y, x, y);
      if (d <= body.visualRadius) {
        dragBodyRef.current = body;
        dragOffsetRef.current = { x: body.position.x - x, y: body.position.y - y };
        break;
      }
    }
  };

  const handlePointerMove = (e) => {
    if (!canvasRef.current || !physicsRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragBodyRef.current) {
      // Drag & throw physics
      const targetX = x + dragOffsetRef.current.x;
      const targetY = y + dragOffsetRef.current.y;
      Matter.Body.setPosition(dragBodyRef.current, { x: targetX, y: targetY });
      Matter.Body.setVelocity(dragBodyRef.current, {
        x: (e.movementX || 0) * 0.4,
        y: (e.movementY || 0) * 0.4,
      });
      return;
    }

    // Check hover
    let found = null;
    for (const body of physicsRef.current.bodies) {
      const d = distance(body.position.x, body.position.y, x, y);
      if (d <= body.visualRadius) {
        found = body.skillData;
        break;
      }
    }
    setHoveredSkill(found);
  };

  const handlePointerUp = () => {
    dragBodyRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center select-none"
    >
      {/* Floating active skill badge */}
      {hoveredSkill && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-paper/95 backdrop-blur-md border border-ink/20 shadow-md shadow-ink/5 flex items-center gap-2 z-20 animate-in fade-in duration-150">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: GROUP_PALETTES[hoveredSkill.group]?.border || 'var(--indigo)',
            }}
          />
          <span className="font-serif font-bold text-ink text-sm sm:text-base">
            {hoveredSkill.name}
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
            • {SKILL_GROUPS[hoveredSkill.group]?.name}
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full max-w-5xl rounded-full cursor-grab active:cursor-grabbing focus-visible:outline-none"
        aria-label="Interactive Skills Ball Pool with 36 mandala medallions"
        role="region"
      />

      {/* Screen reader accessible hidden skill descriptions */}
      <div className="sr-only" aria-live="polite">
        <h3>Comprehensive Technologies and Skills List:</h3>
        <ul>
          {SKILLS.map((skill) => (
            <li key={skill.id}>
              {skill.name} ({SKILL_GROUPS[skill.group]?.name})
            </li>
          ))}
        </ul>
        {hoveredSkill && <p>Focused technology: {hoveredSkill.name}</p>}
      </div>
    </div>
  );
}
