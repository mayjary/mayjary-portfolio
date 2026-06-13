"use client";

import { useEffect, useRef } from "react";
import { useScrollProgress } from "@/lib/hooks/useMousePosition";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useScrollProgress();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(120, Math.floor(window.innerWidth / 12));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const p = progress;
      const mode = p < 0.2 ? 0 : p < 0.4 ? 1 : p < 0.6 ? 2 : p < 0.8 ? 3 : 4;
      const colors = [
        "91, 156, 246",
        "52, 211, 153",
        "124, 109, 240",
        "251, 191, 36",
        "91, 156, 246",
      ];
      const color = colors[mode];

      particlesRef.current.forEach((particle, i) => {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dx = mx - particle.x;
        const dy = my - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          particle.vx -= (dx / dist) * 0.02;
          particle.vy -= (dy / dist) * 0.02;
        }

        if (mode === 1) {
          particle.vy += Math.sin(i * 0.1 + Date.now() * 0.001) * 0.01;
        } else if (mode === 2) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          particle.vx += (centerX - particle.x) * 0.00001;
          particle.vy += (centerY - particle.y) * 0.00001;
        } else if (mode === 3) {
          particle.vx += Math.sin(particle.y * 0.01) * 0.02;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${particle.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = mode === 2 ? 100 : mode === 4 ? 80 : 120;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color}, ${0.1 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    />
  );
}
