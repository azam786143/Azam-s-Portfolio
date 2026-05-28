import React, { useRef, useState } from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  isInteractive?: boolean;
  intensity?: number; // Tilt intensity index
  key?: string;
}

export default function GlassCard({
  children,
  className = '',
  isInteractive = true,
  intensity = 15,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || !cardRef.current) return;

    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    
    // Relative coordinates (0 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Turn into percentage offsets
    setGlarePos({ x: x * 100, y: y * 100 });

    // Calculate rotation (-intensity to +intensity)
    const rotX = (0.5 - y) * intensity;
    const rotY = (x - 0.5) * intensity;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    if (!isInteractive) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isInteractive) return;
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl transition-all duration-300 transform select-none ${
        isHovered
          ? 'border-lemon shadow-[0_0_25px_rgba(254,231,21,0.25)]'
          : 'border-glass-border shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
      } ${className}`}
      style={{
        background: 'rgba(254, 231, 21, 0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderWidth: '1.5px',
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glare Shine Layer */}
      {isInteractive && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 select-none z-10"
          style={{
            opacity: isHovered ? 0.85 : 0,
            background: `radial-gradient(circle 120px at ${glarePos.x}% ${glarePos.y}%, rgba(254, 231, 21, 0.12), transparent)`,
          }}
        />
      )}

      {/* Grid subtle texture overlay inside cards */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-10 bg-[radial-gradient(rgba(254,231,21,0.15)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" 
      />

      {/* Child elements rendered securely */}
      <div style={{ transform: 'translateZ(10px)' }} className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
