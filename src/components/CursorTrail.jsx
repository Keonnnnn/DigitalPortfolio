import { useEffect, useRef } from 'react';

// Dark mode  → vivid violet  hsl(255, …)  — glows on dark navy
// Light mode → deep violet   hsl(265, …)  — contrasts light-blue hero

export default function CursorTrail({ enabled }) {
  const canvasRef = useRef(null);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let targetX = -1000, targetY = -1000;
    let followerX = -1000, followerY = -1000;
    const trail = [];
    const TRAIL_LEN = 22;
    const LERP = 0.13;
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      if (!enabledRef.current) return;
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!enabledRef.current) {
        trail.length = 0;
        animId = requestAnimationFrame(tick);
        return;
      }

      const dark = document.body.classList.contains('dark');
      const hue = dark ? 255 : 262;
      const sat = dark ? 88 : 52;
      const lit = dark ? 72 : 65;

      followerX += (targetX - followerX) * LERP;
      followerY += (targetY - followerY) * LERP;

      trail.unshift({ x: followerX, y: followerY });
      if (trail.length > TRAIL_LEN) trail.pop();

      trail.forEach((pos, i) => {
        const t = 1 - i / TRAIL_LEN;
        const r = Math.max(5 * t, 0.4);
        ctx.globalAlpha = t * t * (dark ? 0.65 : 0.55);
        ctx.shadowBlur = r * (dark ? 6 : 3.5);
        ctx.shadowColor = `hsl(${hue}, ${sat}%, ${lit}%)`;
        ctx.fillStyle  = `hsl(${hue}, ${sat - 5}%, ${lit + 13}%)`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}
      aria-hidden="true"
    />
  );
}
