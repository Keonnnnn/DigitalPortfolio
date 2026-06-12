import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    let animId;
    let lastX = 0;
    let lastY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (x, y) => {
      const dark = document.body.classList.contains('dark');
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.4,
        vy: -(Math.random() * 1.8 + 0.4),
        size: Math.random() * 3 + 1.5,
        life: 1,
        decay: 0.022 + Math.random() * 0.018,
        hue: dark ? 185 + Math.random() * 35 : 238 + Math.random() * 42,
      });
    };

    const onMove = (e) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy < 25) return;
      lastX = e.clientX;
      lastY = e.clientY;
      spawn(e.clientX, e.clientY);
      if (Math.random() > 0.45) spawn(e.clientX, e.clientY);
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
