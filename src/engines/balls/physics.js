import Matter from 'matter-js';
import { BALLS_CONFIG } from '../../utils/constants';
import { distance, angle, randomRange } from '../../utils/math';

export class BallPoolPhysics {
  constructor({ width, height, skills, onUpdate, isMobile = false }) {
    this.width = width;
    this.height = height;
    this.skills = skills;
    this.onUpdate = onUpdate;
    this.isMobile = isMobile;

    this.engine = null;
    this.bodies = [];
    this.active = true;
    this.init();
  }

  init() {
    // 1. Create engine
    this.engine = Matter.Engine.create({
      gravity: { x: 0, y: 0, scale: 0 },
    });

    const cx = this.width / 2;
    const cy = this.height / 2;

    // 2. Create circular skill ball bodies
    this.bodies = this.skills.map((skill, index) => {
      // Spawn radially
      const spawnRadius = randomRange(60, Math.min(this.width, this.height) * 0.38);
      const spawnAngle = (index * (Math.PI * 2)) / this.skills.length + Math.random() * 0.4;
      const x = cx + spawnRadius * Math.cos(spawnAngle);
      const y = cy + spawnRadius * Math.sin(spawnAngle);

      const r = this.isMobile ? skill.radius * 0.75 : skill.radius;

      const body = Matter.Bodies.circle(x, y, r, {
        restitution: 0.85,
        frictionAir: 0.035,
        friction: 0.05,
        density: 0.001,
        render: { visible: false },
      });

      body.skillData = skill;
      body.visualRadius = r;
      body.spinRate = randomRange(-0.02, 0.02);
      return body;
    });

    // 3. Add soft containment boundary walls (large circular ring of invisible static bodies)
    const wallCount = 18;
    const boundaryRadius = Math.min(this.width, this.height) * 0.48;
    const boundaryBodies = Array.from({ length: wallCount }).map((_, i) => {
      const a = (i * Math.PI * 2) / wallCount;
      const wx = cx + (boundaryRadius + 50) * Math.cos(a);
      const wy = cy + (boundaryRadius + 50) * Math.sin(a);
      return Matter.Bodies.circle(wx, wy, 60, {
        isStatic: true,
        render: { visible: false },
      });
    });

    Matter.Composite.add(this.engine.world, [...this.bodies, ...boundaryBodies]);
  }

  update(pointer) {
    if (!this.engine || !this.active) return;

    const cx = this.width / 2;
    const cy = this.height / 2;
    const px = pointer.x;
    const py = pointer.y;
    const pSpeed = pointer.speed || 0;

    // Apply forces to each ball
    this.bodies.forEach((body) => {
      // 1. Weak attraction toward center blob
      const dCenter = distance(body.position.x, body.position.y, cx, cy);
      const centerAngle = angle(body.position.x, body.position.y, cx, cy);
      const attractionForce = dCenter * BALLS_CONFIG.gravityCenterStrength * 0.01;

      Matter.Body.applyForce(body, body.position, {
        x: Math.cos(centerAngle) * attractionForce,
        y: Math.sin(centerAngle) * attractionForce,
      });

      // 2. Cursor Repulsion (when cursor enters nearby area)
      if (px > 0 && py > 0) {
        const dCursor = distance(body.position.x, body.position.y, px, py);
        if (dCursor < BALLS_CONFIG.cursorRepelRadius) {
          const repelFactor = (BALLS_CONFIG.cursorRepelRadius - dCursor) / BALLS_CONFIG.cursorRepelRadius;
          const repelAngle = angle(px, py, body.position.x, body.position.y);
          const forceMagnitude = repelFactor * (0.015 + pSpeed * 0.01);

          Matter.Body.applyForce(body, body.position, {
            x: Math.cos(repelAngle) * forceMagnitude,
            y: Math.sin(repelAngle) * forceMagnitude,
          });

          // Accelerate spin on collision
          body.torque = (Math.random() - 0.5) * 0.08 * repelFactor;
        }
      }

      // Gentle damping of angular velocity
      body.angularVelocity *= 0.98;
    });

    Matter.Engine.update(this.engine, 1000 / 60);

    if (this.onUpdate) {
      this.onUpdate(this.bodies);
    }
  }

  scatter(clickX, clickY) {
    if (!this.bodies) return;
    this.bodies.forEach((body) => {
      const ang = angle(clickX, clickY, body.position.x, body.position.y);
      const burstForce = randomRange(0.04, 0.09);
      Matter.Body.applyForce(body, body.position, {
        x: Math.cos(ang) * burstForce,
        y: Math.sin(ang) * burstForce,
      });
      body.torque = (Math.random() - 0.5) * 0.15;
    });
  }

  destroy() {
    this.active = false;
    if (this.engine) {
      Matter.Composite.clear(this.engine.world, false);
      Matter.Engine.clear(this.engine);
      this.engine = null;
    }
  }
}
