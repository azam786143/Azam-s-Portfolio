import React, { useEffect, useRef, useState } from 'react';

export default function InteractiveCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isMobile, setIsMobile] = useState(true);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    // Detect mobile touch
    const checkTouch = () => {
      const touchCapable =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(touchCapable);
    };
    
    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse positions
    const mouse = mouseRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Track clickables for hover scaling
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive-trigger') ||
        target.closest('.interactive-trigger')
      ) {
        isHoveredRef.current = true;
      } else {
        isHoveredRef.current = false;
      }
    };
    window.addEventListener('mouseover', handleMouseOver);

    // Trail particles
    interface TrailPoint {
      x: number;
      y: number;
      age: number;
      maxAge: number;
      size: number;
    }
    const trail: TrailPoint[] = [];

    let animationId: number;
    let scaleFactor = 1;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate main pointer
      const ease = 0.15;
      mouse.x += (mouse.targetX - mouse.x) * ease;
      mouse.y += (mouse.targetY - mouse.y) * ease;

      // Update hover state animation
      const targetScale = isHoveredRef.current ? 2.4 : 1.0;
      scaleFactor += (targetScale - scaleFactor) * 0.12;

      // Only draw if within bounds
      if (mouse.x > 0 && mouse.y > 0 && mouse.x < width && mouse.y < height) {
        // Feed trail points close to mouse
        if (Math.abs(mouse.targetX - mouse.x) > 1 || Math.abs(mouse.targetY - mouse.y) > 1) {
          trail.push({
            x: mouse.x,
            y: mouse.y,
            age: 0,
            maxAge: 18,
            size: Math.random() * 3.5 + 1.5,
          });
        }

        // Draw trail points
        for (let i = trail.length - 1; i >= 0; i--) {
          const pt = trail[i];
          pt.age++;
          
          if (pt.age >= pt.maxAge) {
            trail.splice(i, 1);
            continue;
          }

          const ratio = 1 - pt.age / pt.maxAge;
          ctx.save();
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * ratio, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(254, 231, 21, ${0.45 * ratio})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#FEE715';
          ctx.fill();
          ctx.restore();
        }

        // Draw main orb outer aura
        ctx.save();
        ctx.beginPath();
        const baseRadius = 8;
        const radius = baseRadius * scaleFactor;
        ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
        
        if (isHoveredRef.current) {
          // Hover overlay: invert state ring
          ctx.strokeStyle = '#FEE715';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          
          ctx.fillStyle = 'rgba(254, 231, 21, 0.15)';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#FEE715';
          ctx.fill();
        } else {
          // Normal state particle orb
          ctx.fillStyle = '#FEE715';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#FEE715';
          ctx.fill();
        }
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      id="custom-glowing-cursor"
      className="fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-screen"
    />
  );
}
