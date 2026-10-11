import { distance, angle, randomRange, clamp } from '../../utils/math';
import { BOIDS_CONFIG } from '../../utils/constants';

export class Fish {
  constructor(x, y, id, isMobile = false) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.vx = randomRange(-1.5, 1.5);
    this.vy = randomRange(-1.5, 1.5);
    this.ax = 0;
    this.ay = 0;

    // Depth layer (0: deep/small, 1: mid, 2: near/sharp)
    this.depth = Math.random() < 0.3 ? 0 : Math.random() < 0.7 ? 1 : 2;
    this.scale = this.depth === 0 ? 0.75 : this.depth === 1 ? 0.95 : 1.15;
    this.baseSpeed = (this.depth === 0 ? 1.6 : this.depth === 1 ? 2.2 : 2.7) * (isMobile ? 0.85 : 1);
    this.maxSpeed = this.baseSpeed;
    this.currentSpeed = this.baseSpeed;

    // Sine-wave swimming wave phase
    this.phase = Math.random() * Math.PI * 2;
    this.swimFrequency = 0.12 + Math.random() * 0.04;
    this.panic = 0; // 0 (calm) to 1 (full panic)

    // Peeled away from initial mandala
    this.active = false;
    this.releaseDelay = id * 180; // peel away staggered
  }

  update(width, height, delta = 1) {
    // Wave oscillation for spine
    this.phase += this.swimFrequency * (1 + this.panic * 1.5);

    // Apply acceleration
    this.vx += this.ax;
    this.vy += this.ay;

    // Limit speed according to panic
    const targetMaxSpeed = this.baseSpeed * (1 + this.panic * 2.2);
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > targetMaxSpeed) {
      this.vx = (this.vx / speed) * targetMaxSpeed;
      this.vy = (this.vy / speed) * targetMaxSpeed;
    } else if (speed < 0.8) {
      this.vx *= 1.1;
      this.vy *= 1.1;
    }

    this.currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

    this.x += this.vx * delta;
    this.y += this.vy * delta;

    // Reset acceleration
    this.ax = 0;
    this.ay = 0;

    // Screen boundary wrap / soft bounce
    const pad = 60;
    if (this.x < -pad) this.x = width + pad;
    else if (this.x > width + pad) this.x = -pad;
    if (this.y < -pad) this.y = height + pad;
    else if (this.y > height + pad) this.y = -pad;

    // Decay panic
    this.panic *= 0.96;
  }

  applyForce(fx, fy) {
    this.ax += fx;
    this.ay += fy;
  }
}

export class BoidsFlock {
  constructor(count, width, height, isMobile = false) {
    this.width = width;
    this.height = height;
    this.isMobile = isMobile;
    this.fishList = [];
    this.init(count);
  }

  init(count) {
    const cx = this.width / 2;
    const cy = Math.min(this.height * 0.45, 400);

    this.fishList = Array.from({ length: count }).map((_, i) => {
      // Start in a ring around hero
      const a = (i * Math.PI * 2) / count;
      const r = 140 + Math.random() * 40;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      const fish = new Fish(x, y, i, this.isMobile);
      fish.vx = -Math.sin(a) * 1.5;
      fish.vy = Math.cos(a) * 1.5;
      return fish;
    });

    // Stagger peel-away
    this.fishList.forEach((f) => {
      setTimeout(() => {
        f.active = true;
      }, f.releaseDelay);
    });
  }

  update(pointer, width, height) {
    this.width = width;
    this.height = height;

    const cursorActive = Date.now() - pointer.lastActive < BOIDS_CONFIG.calmTimeMs;
    const cx = pointer.x;
    const cy = pointer.y;

    for (let i = 0; i < this.fishList.length; i++) {
      const f1 = this.fishList[i];
      if (!f1.active) continue;

      let sepX = 0, sepY = 0, sepCount = 0;
      let aliX = 0, aliY = 0, aliCount = 0;
      let cohX = 0, cohY = 0, cohCount = 0;

      for (let j = 0; j < this.fishList.length; j++) {
        if (i === j) continue;
        const f2 = this.fishList[j];
        if (!f2.active) continue;

        const d = distance(f1.x, f1.y, f2.x, f2.y);

        // Separation
        if (d > 0 && d < BOIDS_CONFIG.separationDist) {
          sepX += (f1.x - f2.x) / d;
          sepY += (f1.y - f2.y) / d;
          sepCount++;
        }

        // Alignment & Cohesion
        if (d > 0 && d < BOIDS_CONFIG.neighborDist) {
          aliX += f2.vx;
          aliY += f2.vy;
          aliCount++;

          cohX += f2.x;
          cohY += f2.y;
          cohCount++;

          // Panic transmission between neighbours
          if (f2.panic > 0.4 && f1.panic < f2.panic) {
            f1.panic = Math.max(f1.panic, f2.panic * 0.85);
          }
        }
      }

      // Apply Separation
      if (sepCount > 0) {
        f1.applyForce(sepX * 0.12, sepY * 0.12);
      }

      // Apply Alignment
      if (aliCount > 0) {
        aliX /= aliCount;
        aliY /= aliCount;
        f1.applyForce((aliX - f1.vx) * 0.04, (aliY - f1.vy) * 0.04);
      }

      // Apply Cohesion
      if (cohCount > 0) {
        cohX /= cohCount;
        cohY /= cohCount;
        f1.applyForce((cohX - f1.x) * 0.003, (cohY - f1.y) * 0.003);
      }

      // Cursor Fleeing (within 180px radius)
      if (cursorActive && cx > 0 && cy > 0) {
        const dCursor = distance(f1.x, f1.y, cx, cy);
        if (dCursor < BOIDS_CONFIG.fleeRadius) {
          const fleeFactor = (BOIDS_CONFIG.fleeRadius - dCursor) / BOIDS_CONFIG.fleeRadius;
          const fleeAng = angle(cx, cy, f1.x, f1.y);
          const fX = Math.cos(fleeAng) * fleeFactor * 1.8;
          const fY = Math.sin(fleeAng) * fleeFactor * 1.8;
          f1.applyForce(fX, fY);
          f1.panic = Math.max(f1.panic, fleeFactor);
        }
      }

      // Gentle organic wander
      const wanderAng = Math.random() * Math.PI * 2;
      f1.applyForce(Math.cos(wanderAng) * 0.03, Math.sin(wanderAng) * 0.03);

      // Boundary soft steering
      const margin = 80;
      if (f1.x < margin) f1.applyForce(0.15, 0);
      else if (f1.x > width - margin) f1.applyForce(-0.15, 0);
      if (f1.y < margin) f1.applyForce(0, 0.15);
      else if (f1.y > height - margin) f1.applyForce(0, -0.15);

      f1.update(width, height);
    }
  }

  scatter(clickX, clickY) {
    this.fishList.forEach((fish) => {
      const ang = angle(clickX, clickY, fish.x, fish.y);
      const scatterForce = randomRange(4.5, 9.0);
      fish.vx = Math.cos(ang) * scatterForce;
      fish.vy = Math.sin(ang) * scatterForce;
      fish.panic = 1.0;
    });
  }
}
