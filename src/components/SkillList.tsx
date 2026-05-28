import React, { useEffect, useState, useRef } from 'react';
import { SKILL_CATEGORIES } from '../data';
import GlassCard from './GlassCard';
import { Cpu, Code, Layers, Cloud, Terminal, CheckCircle } from 'lucide-react';

export default function SkillList({ onSkillHover }: { onSkillHover: (isHovered: boolean) => void }) {
  const [activeTab, setActiveTab] = useState('lang');
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Trigger loading animations when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Triggers replay on tab changes
  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const activeCategory = SKILL_CATEGORIES.find((cat) => cat.id === activeTab) || SKILL_CATEGORIES[0];

  // Helper for category icons
  const getIcon = (id: string) => {
    switch (id) {
      case 'lang':
        return <Code className="w-4 h-4 text-lemon" />;
      case 'frontend':
        return <Layers className="w-4 h-4 text-lemon" />;
      case 'backend':
        return <Terminal className="w-4 h-4 text-lemon" />;
      case 'ai':
        return <Cpu className="w-4 h-4 text-lemon" />;
      case 'tools':
        return <Cloud className="w-4 h-4 text-lemon" />;
      default:
        return <CheckCircle className="w-4 h-4 text-lemon" />;
    }
  };

  // Animated percentage hook
  const TickingCounter = ({ target }: { target: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!animate) {
        setCount(0);
        return;
      }
      let start = 0;
      const duration = 1200; // ms
      const increment = Math.ceil(target / (duration / 16));
      let timer: any;

      const run = () => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      };

      timer = setInterval(run, 16);
      return () => clearInterval(timer);
    }, [target, animate]);

    return <span className="font-mono text-lemon font-bold text-sm">{count}%</span>;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => onSkillHover(true)}
      onMouseLeave={() => onSkillHover(false)}
      className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 z-10"
    >
      {/* Category Sidebar Options */}
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none w-full md:w-60 max-w-full shrink-0">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border font-mono text-xs text-left whitespace-nowrap transition-all duration-300 pointer-events-auto ${
              activeTab === cat.id
                ? 'bg-lemon text-midnight border-lemon font-bold shadow-[0_0_15px_rgba(254,231,21,0.3)] scale-[1.03]'
                : 'bg-glass-bg text-white/70 border-glass-border hover:border-lemon/40 hover:text-white'
            }`}
          >
            {getIcon(cat.id)}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Main progress values details inside a Tilt GlassCard */}
      <GlassCard className="flex-1 p-6 md:p-8" intensity={8}>
        <div className="flex items-center justify-between border-b border-lemon/10 pb-4 mb-6">
          <h4 className="text-sm font-mono tracking-widest text-lemon uppercase font-bold flex items-center gap-2">
            <span>//</span> {activeCategory.name}
          </h4>
          <span className="text-[10px] font-mono text-white/40 uppercase">REAL-TIME INVENTORY</span>
        </div>

        <div className="space-y-6">
          {activeCategory.skills.map((skill, index) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white font-medium tracking-wide">{skill.name}</span>
                <TickingCounter target={skill.level} />
              </div>

              {/* Progress track */}
              <div className="relative w-full h-3 bg-[#17202b] rounded-full overflow-hidden border border-lemon/10">
                {/* Liquid neon yellow filler */}
                <div
                  className="absolute top-0 left-0 h-full bg-lemon rounded-full shadow-[0_0_12px_rgba(254,231,21,0.6)]"
                  style={{
                    width: animate ? `${skill.level}%` : '0%',
                    transition: `width 1.2s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.1}s`,
                  }}
                >
                  {/* Glowing bubble line indicator */}
                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white opacity-80 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic bottom visual detail */}
        <div className="mt-8 pt-4 border-t border-lemon/5 flex items-center justify-between text-[10px] font-mono text-white/30">
          <span>CORESYNC // INTEGRATED</span>
          <span>93A92A_HEX</span>
        </div>
      </GlassCard>
    </div>
  );
}
