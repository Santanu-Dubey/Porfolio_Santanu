import React, { useEffect, useRef, useState } from 'react';
import { SKILLS, SKILL_GROUPS } from '../../data/skills';
import { BallPoolPhysics } from './physics';
import { useMotion } from '../../context/MotionContext';
import { useTheme } from '../../context/ThemeContext';
import { distance } from '../../utils/math';

export function BallPool() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const physicsRef = useRef(null);
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

    // Draw individual ball medallion
    const drawMedallion = (ctx, body, inkColor, accentColor) => {
      const { x, y } = body.position;
      const r = body.visualRadius;
      const angle = body.angle;
      const skill = body.skillData;
      const isHovered = hoveredSkill?.id === skill.id;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      const currentR = isHovered ? r * 1.08 : r;

      // 1. Warm paper disk background (stops background lines from crossing glyph)
      ctx.beginPath();
      ctx.arc(0, 0, currentR, 0, Math.PI * 2);
      ctx.fillStyle = 'var(--paper)';
      ctx.fill();

      // 2. Thick Outer Border
      ctx.beginPath();
      ctx.arc(0, 0, currentR, 0, Math.PI * 2);
      ctx.strokeStyle = isHovered ? accentColor : inkColor;
      ctx.lineWidth = isHovered ? 2.5 : 2.0;
      ctx.stroke();

      // 3. Dot Ring
      const dotCount = Math.floor(currentR * 0.4);
      const dotRadius = currentR * 0.85;
      ctx.fillStyle = inkColor;
      for (let i = 0; i < dotCount; i++) {
        const da = (i * Math.PI * 2) / dotCount;
        ctx.beginPath();
        ctx.arc(dotRadius * Math.cos(da), dotRadius * Math.sin(da), 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Petal Pattern Group Ring
      ctx.strokeStyle = isHovered ? accentColor : inkColor;
      ctx.lineWidth = 1.0;
      const petalCount = 8;
      const petalR = currentR * 0.68;

      for (let i = 0; i < petalCount; i++) {
        const pa = (i * Math.PI * 2) / petalCount;
        ctx.save();
        ctx.rotate(pa);

        ctx.beginPath();
        if (skill.pattern === 'pointed') {
          // Pointed petals (Languages)
          ctx.moveTo(0, -petalR);
          ctx.lineTo(currentR * 0.15, -petalR * 0.7);
          ctx.lineTo(-currentR * 0.15, -petalR * 0.7);
          ctx.closePath();
          ctx.stroke();
        } else if (skill.pattern === 'lotus') {
          // Lotus petals (Frontend)
          ctx.arc(0, -petalR * 0.75, currentR * 0.15, 0, Math.PI, true);
          ctx.stroke();
        } else if (skill.pattern === 'arches') {
          // Arches (Backend)
          ctx.arc(0, -petalR * 0.8, currentR * 0.12, 0, Math.PI, true);
          ctx.stroke();
        } else if (skill.pattern === 'teardrops') {
          // Teardrops (Databases)
          ctx.moveTo(0, -petalR);
          ctx.bezierCurveTo(3, -petalR * 0.85, 3, -petalR * 0.7, 0, -petalR * 0.65);
          ctx.bezierCurveTo(-3, -petalR * 0.7, -3, -petalR * 0.85, 0, -petalR);
          ctx.stroke();
        } else if (skill.pattern === 'spirals') {
          // Spirals (AI/ML)
          ctx.arc(0, -petalR * 0.75, currentR * 0.12, 0, Math.PI * 1.5);
          ctx.stroke();
        } else if (skill.pattern === 'shield') {
          // Shield petals (Cybersecurity)
          ctx.moveTo(0, -petalR);
          ctx.lineTo(currentR * 0.12, -petalR * 0.8);
          ctx.lineTo(0, -petalR * 0.65);
          ctx.lineTo(-currentR * 0.12, -petalR * 0.8);
          ctx.closePath();
          ctx.stroke();
        } else {
          // Diamonds & dots (Tools)
          ctx.moveTo(0, -petalR);
          ctx.lineTo(3, -petalR * 0.82);
          ctx.lineTo(0, -petalR * 0.65);
          ctx.lineTo(-3, -petalR * 0.82);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.restore();
      }

      // 5. Center Core Circle
      ctx.beginPath();
      ctx.arc(0, 0, currentR * 0.44, 0, Math.PI * 2);
      ctx.strokeStyle = inkColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 6. Glyph Abbreviation / Mark
      ctx.fillStyle = isHovered ? accentColor : inkColor;
      ctx.font = `600 ${Math.max(10, Math.floor(currentR * 0.3))}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const labelShort = skill.name.slice(0, 3).toUpperCase();
      ctx.fillText(labelShort, 0, 1);

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
