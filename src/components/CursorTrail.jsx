import { useEffect, useRef } from 'react';

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

    // Light mode — spark particles
    const particles = [];
    let lastX = 0, lastY = 0;

    // Dark mode — smooth lerped trail
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

    const spawnSpark = (x, y) => {
      particles.push({
        x, y,
        size: Math.random() * 3 + 1.5,
        vy: -(Math.random() * 1.8 + 0.4),
        vx: (Math.random() - 0.5) * 1.4,
        life: 1,
        decay: 0.022 + Math.random() * 0.018,
        hue: 238 + Math.random() * 42,
      });
    };

    const onMove = (e) => {
      if (!enabledRef.current) return;
      const dark = document.body.classList.contains('dark');

      if (dark) {
        targetX = e.clientX;
        targetY = e.clientY;
      } else {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        if (dx * dx + dy * dy < 25) return;
        lastX = e.clientX;
        lastY = e.clientY;
        spawnSpark(e.clientX, e.clientY);
        if (Math.random() > 0.45) spawnSpark(e.clientX, e.clientY);
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!enabledRef.current) {
        particles.length = 0;
        trail.length = 0;
        animId = requestAnimationFrame(tick);
        return;
      }

      const dark = document.body.classList.contains('dark');

      if (dark) {
        if (particles.length) particles.length = 0;

        followerX += (targetX - followerX) * LERP;
        followerY += (targetY - followerY) * LERP;

        trail.unshift({ x: followerX, y: followerY });
        if (trail.length > TRAIL_LEN) trail.pop();

        trail.forEach((pos, i) => {
          const t = 1 - i / TRAIL_LEN;
          const r = Math.max(5 * t, 0.4);
          ctx.globalAlpha = t * t * 0.65;
          ctx.shadowBlur = r * 6;
          ctx.shadowColor = 'hsl(190, 90%, 65%)';
          ctx.fillStyle = 'hsl(190, 85%, 78%)';
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        if (trail.length) trail.length = 0;

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life -= p.decay;
          if (p.life <= 0) { particles.splice(i, 1); continue; }
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.045;

          const r = p.size * p.life;
          ctx.globalAlpha = p.life * 0.85;
          ctx.shadowBlur = r * 7;
          ctx.shadowColor = `hsl(${p.hue}, 90%, 65%)`;
          ctx.fillStyle = `hsl(${p.hue}, 85%, 75%)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

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
