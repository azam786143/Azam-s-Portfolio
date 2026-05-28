import React, { useEffect, useRef } from 'react';

export default function ParticleBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Floating particles
    const symbols = ['< />', '{ }', '=>', '[]', '&&', '++', '(*)', '::', 'const'];
    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      character: string;
      isSymbol: boolean;
      rotSpeed: number;
      angle: number;
    }[] = [];

    // Create particles
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      const isSymbol = Math.random() > 0.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height + height, // Start below or spread out
        size: isSymbol ? Math.random() * 12 + 10 : Math.random() * 2 + 1.5,
        speed: Math.random() * 0.4 + 0.2,
        opacity: Math.random() * 0.15 + 0.05,
        character: symbols[Math.floor(Math.random() * symbols.length)],
        isSymbol,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // Spread them initially across the layout
    particles.forEach(p => {
      p.y = Math.random() * height;
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const render = () => {
      ctx.fillStyle = '#101820';
      ctx.fillRect(0, 0, width, height);

      // Draw background ambient light blooms (fixed radial glows behind content centers)
      // High responsiveness, simple 3% opacity leaks
      ctx.save();
      const drawGlow = (cx: number, cy: number, r: number) => {
        const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
        gradient.addColorStop(0, 'rgba(254, 231, 21, 0.045)');
        gradient.addColorStop(0.5, 'rgba(254, 231, 21, 0.02)');
        gradient.addColorStop(1, 'rgba(254, 231, 21, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      };

      // Top right bloom, middle, and bottom blooms
      drawGlow(width * 0.8, height * 0.2, Math.min(width * 0.4, 600));
      drawGlow(width * 0.15, height * 0.55, Math.min(width * 0.35, 500));
      drawGlow(width * 0.75, height * 0.85, Math.min(width * 0.4, 600));
      ctx.restore();

      // Render drifting particles
      particles.forEach((p) => {
        p.y -= p.speed;
        p.angle += p.rotSpeed;

        // Reset particle on top exit
        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.fillStyle = `rgba(254, 231, 21, ${p.opacity})`;
        
        if (p.isSymbol) {
          // Draw rotated textured code symbol
          ctx.font = `600 ${p.size}px "JetBrains Mono", monospace`;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillText(p.character, -ctx.measureText(p.character).width / 2, 0);
        } else {
          // Draw standard glowing float dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#FEE715';
          ctx.fill();
        }
        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-particle-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
