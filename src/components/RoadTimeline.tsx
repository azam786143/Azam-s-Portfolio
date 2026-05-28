import React, { useEffect, useRef, useState } from 'react';
import { TIMELINE } from '../data';
import GlassCard from './GlassCard';
import { Calendar, Briefcase, Award, GraduationCap } from 'lucide-react';

export default function RoadTimeline({ onCertsHover }: { onCertsHover: (isHovered: boolean) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far into the timeline section we have scrolled
      const totalDist = rect.height - viewportHeight;
      if (totalDist <= 0) return;

      const passed = -rect.top;
      const progress = Math.max(0, Math.min(1, passed / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Draw 3D road lines on background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    window.addEventListener('resize', handleResize);

    let animationId: number;
    let localOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const horizonY = height * 0.15; // Horizon vanishing point
      const horizonX = width / 2;

      // Draw glowing central orb at horizon
      ctx.save();
      const orbGrad = ctx.createRadialGradient(horizonX, horizonY, 2, horizonX, horizonY, 40);
      orbGrad.addColorStop(0, '#FEE715');
      orbGrad.addColorStop(0.3, 'rgba(254, 231, 21, 0.45)');
      orbGrad.addColorStop(1, 'rgba(254, 231, 21, 0)');
      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(horizonX, horizonY, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Dynamic forward lines movement driven by scroll plus a small idle flow
      localOffset += 1.5;
      const scrollOffsetFactor = scrollProgress * 1500;
      const currentOffset = (localOffset + scrollOffsetFactor) % 80;

      // 3D perspective grids (road side borders)
      const roadWidthStart = 20;
      const roadWidthEnd = width * 0.75;

      ctx.save();
      ctx.strokeStyle = 'rgba(254, 231, 21, 0.15)';
      ctx.lineWidth = 1.0;

      // Perspective horizon lines
      const perspectiveLinesCount = 14;
      for (let i = 0; i <= perspectiveLinesCount; i++) {
        const ratio = i / perspectiveLinesCount;
        const bottomX = (1 - ratio) * (width / 2 - roadWidthEnd / 2) + ratio * (width / 2 + roadWidthEnd / 2);
        
        ctx.beginPath();
        ctx.moveTo(horizonX, horizonY);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      // Draw horizontal horizontal stripes fading into distance
      for (let yOffset = currentOffset; yOffset < height - horizonY; yOffset += 38) {
        // Perspective curve progression
        const scale = yOffset / (height - horizonY);
        const y = horizonY + scale * (height - horizonY);
        const halfW = (roadWidthStart + scale * (roadWidthEnd - roadWidthStart)) / 2;

        ctx.strokeStyle = `rgba(254, 231, 21, ${0.05 + scale * 0.25})`;
        ctx.lineWidth = 1 + scale * 1.5;
        ctx.beginPath();
        ctx.moveTo(horizonX - halfW, y);
        ctx.lineTo(horizonX + halfW, y);
        ctx.stroke();
      }

      // Draw Center Road Divider hashes (neon yellow)
      ctx.strokeStyle = '#FEE715';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#FEE715';

      for (let hashOffset = currentOffset; hashOffset < height - horizonY; hashOffset += 60) {
        const scale1 = hashOffset / (height - horizonY);
        const scale2 = (hashOffset + 25) / (height - horizonY);

        const y1 = horizonY + scale1 * (height - horizonY);
        const y2 = horizonY + scale2 * (height - horizonY);

        ctx.lineWidth = 1 + scale1 * 2.5;
        ctx.strokeStyle = `rgba(254, 231, 21, ${0.15 + scale1 * 0.75})`;

        ctx.beginPath();
        ctx.moveTo(horizonX, y1);
        ctx.lineTo(horizonX, y2);
        ctx.stroke();
      }
      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollProgress]);

  // Check milestone icons
  const getMilestoneIcon = (type: 'certification' | 'education') => {
    if (type === 'certification') return <Award className="w-5 h-5 text-lemon animate-pulse" />;
    return <GraduationCap className="w-5 h-5 text-lemon" />;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => onCertsHover(true)}
      onMouseLeave={() => onCertsHover(false)}
      className="relative w-full z-10 py-16 md:py-24"
    >
      {/* Absolute Perspective Road canvas behind */}
      <div className="absolute inset-x-0 top-10 bottom-10 opacity-75 pointer-events-none select-none z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6">
        {/* Milestone floating nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-20 relative">
          {/* Vertical central lane line representation for small viewports */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-dashed border-l border-lemon/25 -translate-x-1/2 z-0 md:block hidden" />

          {TIMELINE.map((stone, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={stone.id}
                className={`flex flex-col relative z-10 ${
                  isLeft ? 'md:col-start-1 md:text-right md:items-end' : 'md:col-start-2 text-left items-start md:mt-16'
                }`}
              >
                {/* Node connector orb */}
                <div className="absolute md:block hidden left-1/2 top-10 w-4 h-4 bg-midnight border-2 border-lemon rounded-full -translate-x-1/2 shadow-[0_0_10px_rgba(254,231,21,0.6)]"
                     style={{ left: isLeft ? 'calc(100% + 24px)' : '-24px' }} />

                {/* Glass Milestone Card */}
                <GlassCard
                  className="w-full max-w-md p-6 border-l-4 group"
                  intensity={10}
                >
                  <div className={`flex flex-col gap-3 ${isLeft ? 'md:items-end' : 'items-start'}`}>
                    {/* Icon and Tag */}
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-lemon/10 rounded-lg border border-lemon/30 group-hover:scale-110 transition-transform duration-300">
                        {getMilestoneIcon(stone.type)}
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-lemon/80 font-bold uppercase">
                        {stone.type === 'certification' ? 'Workshop // Sprint' : 'Academic Milestone'}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-display font-bold text-white group-hover:text-lemon transition-colors duration-200">
                      {stone.title}
                    </h4>

                    {/* Org & Date */}
                    <div className="flex flex-col gap-1 text-xs font-mono text-lemon/90">
                      <span className="font-bold">{stone.organization}</span>
                      <span className="text-white/60 text-[11px] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-lemon" /> {stone.date}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`text-xs text-white/70 leading-relaxed pt-2 border-t border-lemon/5 w-full ${isLeft ? 'md:text-right' : 'text-left'}`}>
                      {stone.description}
                    </p>
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
