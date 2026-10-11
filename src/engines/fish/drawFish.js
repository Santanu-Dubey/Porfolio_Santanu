/**
 * Render an authentic pen-drawn mandala fish on Canvas 2D:
 * - bold outline, scale arcs, hatched dorsal fin, lotus-petal tail, dot eye
 * - undulating spine (sine-wave bending)
 */
export function drawPenFish(ctx, fish, inkColor = '#111111') {
  ctx.save();
  ctx.translate(fish.x, fish.y);

  // Rotation matching velocity
  const heading = Math.atan2(fish.vy, fish.vx);
  ctx.rotate(heading);
  ctx.scale(fish.scale, fish.scale);

  // Set depth styling
  if (fish.depth === 2) {
    // Near: crisp, subtle shadow
    ctx.shadowColor = 'rgba(17, 17, 17, 0.18)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;
    ctx.globalAlpha = 0.95;
  } else if (fish.depth === 1) {
    // Mid: standard ink
    ctx.shadowColor = 'transparent';
    ctx.globalAlpha = 0.75;
  } else {
    // Far: faded wash
    ctx.shadowColor = 'transparent';
    ctx.globalAlpha = 0.45;
  }

  ctx.strokeStyle = inkColor;
  ctx.fillStyle = inkColor;
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Spine wave offsets
  const w1 = Math.sin(fish.phase) * 3;
  const w2 = Math.sin(fish.phase - 0.8) * 5;
  const w3 = Math.sin(fish.phase - 1.6) * 7.5;
  const wTail = Math.sin(fish.phase - 2.4) * 11;

  // 1. Body Outline (Head at (18, 0), Tail base at (-16, w3))
  ctx.beginPath();
  // Upper contour
  ctx.moveTo(18, 0);
  ctx.quadraticCurveTo(8, -8 + w1, -4, -6 + w2);
  ctx.quadraticCurveTo(-12, -4 + w3, -18, w3);
  // Lower contour
  ctx.quadraticCurveTo(-12, 4 + w3, -4, 6 + w2);
  ctx.quadraticCurveTo(8, 8 + w1, 18, 0);
  ctx.stroke();

  // 2. Hatched Dorsal Fin
  ctx.beginPath();
  ctx.moveTo(0, -7 + w2);
  ctx.quadraticCurveTo(-6, -16 + w2, -14, -6 + w3);
  ctx.stroke();
  // Hatch lines on fin
  ctx.lineWidth = 0.75;
  for (let i = 0; i < 4; i++) {
    const fx = -2 - i * 2.8;
    ctx.beginPath();
    ctx.moveTo(fx, -7 + w2);
    ctx.lineTo(fx - 2, -12 + w2 + i);
    ctx.stroke();
  }

  // 3. Lotus-Petal Tail
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-18, w3);
  // Upper petal
  ctx.bezierCurveTo(-26, -10 + wTail, -34, -4 + wTail, -30, wTail);
  // Lower petal
  ctx.bezierCurveTo(-34, 4 + wTail, -26, 10 + wTail, -18, w3);
  ctx.stroke();
  // Central tail fin line
  ctx.beginPath();
  ctx.moveTo(-18, w3);
  ctx.lineTo(-29, wTail);
  ctx.stroke();

  // 4. Scale Arcs along flank
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.arc(4, w1 - 1, 3, 0, Math.PI, false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, w2 + 1, 3, 0, Math.PI, false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-6, w2 - 1, 3, 0, Math.PI, false);
  ctx.stroke();

  // 5. Pectoral Fin
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(6, 4 + w1);
  ctx.quadraticCurveTo(2, 11 + w1, -2, 6 + w2);
  ctx.stroke();

  // 6. Dot Eye & Gills
  ctx.beginPath();
  ctx.arc(12, -2 + w1 * 0.4, 1.4, 0, Math.PI * 2);
  ctx.fill();

  // Gill arc
  ctx.beginPath();
  ctx.arc(10, 0 + w1 * 0.5, 4, -Math.PI * 0.4, Math.PI * 0.4);
  ctx.stroke();

  ctx.restore();
}
