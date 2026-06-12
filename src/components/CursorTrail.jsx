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
    const particles = [];
    let animId;
    let lastX = 0;
    let lastY = 0;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (x, y) => {
      const dark = document.body.classList.contains('dark');
      if (dark) {
        particles.push({
          mode: 'bubble',
          x, y,
          size: Math.random() * 9 + 6,
          vy: -(Math.random() * 1.2 + 0.5),
          vx: (Math.random() - 0.5) * 0.5,
          wobbleOffset: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.035 + Math.random() * 0.025,
          life: 1,
          decay: 0.011 + Math.random() * 0.009,
          hue: 188 + Math.random() * 32,
        });
      } else {
        particles.push({
          mode: 'spark',
          x, y,
          size: Math.random() * 3 + 1.5,
          vy: -(Math.random() * 1.8 + 0.4),
          vx: (Math.random() - 0.5) * 1.4,
          life: 1,
          decay: 0.022 + Math.random() * 0.018,
          hue: 238 + Math.random() * 42,
        });
      }
    };

    const onMove = (e) => {
      if (!enabledRef.current) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy < 36) return;
      lastX = e.clientX;
      lastY = e.clientY;
      spawn(e.clientX, e.clientY);
      if (Math.random() > 0.45) spawn(e.clientX, e.clientY);
    };

    const tick = () => {
      if (!enabledRef.current) {
        particles.length = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animId = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }

        if (p.mode === 'bubble') {
          p.x += p.vx + Math.sin(frame * p.wobbleSpeed + p.wobbleOffset) * 0.5;
          p.y += p.vy;

          const pop = p.life < 0.2 ? 1 + (0.2 - p.life) * 3 : 1;
          const r = p.size * pop;
          const alpha = Math.min(p.life * 2, 1) * 0.7;

          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `hsl(${p.hue}, 75%, 72%)`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.globalAlpha = alpha * 0.55;
          ctx.beginPath();
          ctx.arc(p.x - r * 0.28, p.y - r * 0.28, r * 0.22, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${p.hue}, 60%, 92%)`;
          ctx.fill();
        } else {
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
