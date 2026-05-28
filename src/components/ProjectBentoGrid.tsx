import React, { useState } from 'react';
import { PROJECTS, Project } from '../data';
import GlassCard from './GlassCard';
import { Github, ExternalLink, Terminal, Shield, AppWindow, Cpu, Code, FolderGit } from 'lucide-react';

export default function ProjectBentoGrid() {
  // Magnet Badge Component
  const TechBadge = ({ label }: { label: string; key?: string }) => {
    const [rotY, setRotY] = useState(0);

    const handleHover = () => {
      // Spinning dynamic Y angle transformation
      setRotY((prev) => prev + 360);
    };

    const handleLeave = () => {
      // Snap back behavior using multiple modulo
      setRotY(0);
    };

    return (
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-midnight/80 border border-lemon/20 hover:border-lemon text-[10px] font-mono text-lemon cursor-pointer transition-all duration-500 ease-out select-none active:scale-95"
        style={{
          transform: `perspective(400px) rotateY(${rotY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-lemon animate-pulse" />
        <span className="font-bold">{label}</span>
      </div>
    );
  };

  // Helper mock device display based on identifier
  const renderDeviceMockup = (projId: string) => {
    const isAi = projId === 'aether-ai';
    const isVibe = projId === 'vibeglow-hub';
    const isDb = projId === 'zenith-db';

    return (
      <div className="relative w-full h-[140px] bg-[#0c131a] rounded-lg border border-lemon/15 overflow-hidden font-mono text-[9px] text-white/55 p-3 select-none">
        {/* Device Mac/Terminal Window controls */}
        <div className="flex items-center justify-between border-b border-lemon/20 pb-1.5 mb-2">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
          </div>
          <span className="text-[8px] text-lemon/40 font-mono tracking-widest lowercase">CONSOLE://{projId}</span>
        </div>

        {isAi && (
          <div className="space-y-1 text-lemon/70">
            <p className="text-white font-bold">&gt; Initializing agent grid...</p>
            <p className="text-[8px] text-green-400">&gt; Prompt orchestration configured.</p>
            <p>&gt; sys.agents: loaded (4/4)</p>
            <div className="flex items-center gap-3 bg-lemon/5 border border-lemon/10 p-1.5 rounded mt-2">
              <Cpu className="w-4 h-4 text-lemon animate-spin" style={{ animationDuration: '4s' }} />
              <div>
                <p className="text-[7px] text-white font-bold font-mono">LLM Streaming Token IO</p>
                <p className="text-[6px] text-lemon">96.8 ms avg latency</p>
              </div>
            </div>
          </div>
        )}

        {isVibe && (
          <div className="space-y-1">
            <p className="text-green-400 font-bold">&gt; websocket.connection: established_ok</p>
            <p className="text-white/40">&gt; syncing collaborative state variables...</p>
            <div className="mt-2 text-[8px] bg-lemon/10 border border-lemon/25 p-1 rounded font-bold text-lemon flex items-center gap-1.5">
              <AppWindow className="w-3.5 h-3.5 shrink-0" />
              <span>UI/UX Interactive canvas layers ready.</span>
            </div>
          </div>
        )}

        {isDb && (
          <div className="space-y-1 text-white/60">
            <p className="text-lemon font-bold">&gt; db.pool_inspection: active</p>
            <p>&gt; Query latency mapping: 8.5ms</p>
            <div className="flex items-end gap-1.5 h-10 pt-2">
              <div className="w-2 h-4 bg-lemon opacity-20" />
              <div className="w-2 h-7 bg-lemon opacity-40 animate-pulse" />
              <div className="w-2 h-5 bg-lemon opacity-60" />
              <div className="w-2 h-8 bg-lemon shadow-[0_0_8px_#FEE715]" />
              <span className="text-[6px] text-lemon ml-1">Live IOPS</span>
            </div>
          </div>
        )}

        {!isAi && !isVibe && !isDb && (
          <div className="space-y-1 text-white/50">
            <p className="text-white font-bold">&gt; project.plan: loading_success</p>
            <p>&gt; git.origin: main synched</p>
            <p className="text-lemon font-bold">&gt; Sprint metrics: 100% offline integrity</p>
          </div>
        )}
      </div>
    );
  };

  if (PROJECTS.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 z-10 flex flex-col items-center gap-6">
        <GlassCard className="w-full p-6 md:p-10 text-center flex flex-col items-center gap-4 hover:border-lemon" intensity={5}>
          <div className="p-3.5 bg-lemon/10 rounded-full border border-lemon/30 animate-pulse">
            <FolderGit className="w-7 h-7 text-lemon" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-lemon/80 font-bold uppercase block mb-1">
              SYS::PROJECTS_CONTAINER_INITIALIZED
            </span>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Ready for Your Core Portfolio Projects
            </h3>
            <p className="text-xs text-white/70 max-w-lg mx-auto leading-relaxed">
              Your cinematic glassmorphism portfolio frame is configured! You can insert your original projects inside the <code className="text-lemon font-mono bg-[#172129] px-1.5 py-0.5 rounded text-[11px]">src/data.ts</code> file in the <code className="text-lemon font-mono bg-[#172129] px-1.5 py-0.5 rounded text-[11px]">PROJECTS</code> array.
            </p>
          </div>
          
          <div className="mt-4 border-t border-lemon/10 pt-6 w-full max-w-md text-left text-xs font-mono text-white/50 space-y-2">
            <p className="text-lemon/70 font-semibold uppercase tracking-wider text-[9px] mb-1">// DATA STRUCTURE TEMPLATE:</p>
            <pre className="p-3 bg-midnight/90 border border-lemon/10 rounded-lg overflow-x-auto text-[9px] text-white/70 leading-normal scrollbar-none select-all">
{`{
  id: "your-project-id",
  title: "Project Name",
  subtitle: "Category Title",
  description: [
    "First impact bullet point description.",
    "Second impact bullet point description."
  ],
  tech: ["React", "JavaScript", "Tailwind CSS"],
  github: "https://github.com/yourusername",
  category: "Frontend"
}`}
            </pre>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 z-10">
      {PROJECTS.map((proj, idx) => {
        // Asymmetric col spacing for Bento effect
        const isSpanned = idx === 0 || idx === 2;

        return (
          <GlassCard
            key={proj.id}
            className={`flex flex-col justify-between p-5 md:p-6 text-left group gap-4 h-full ${
              isSpanned ? 'md:col-span-2' : 'md:col-span-1'
            }`}
            intensity={12}
          >
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-mono font-bold text-lemon tracking-widest uppercase bg-lemon/5 border border-lemon/25 px-2 py-0.5 rounded">
                  {proj.subtitle}
                </span>
                
                {/* Project Links */}
                <div className="flex items-center gap-2">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-midnight rounded border border-lemon/20 hover:border-lemon text-lemon hover:text-white transition-all duration-300 pointer-events-auto"
                    title="View GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 bg-midnight rounded border border-lemon/20 hover:border-lemon text-lemon hover:text-white transition-all duration-300 pointer-events-auto"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-display font-bold text-white group-hover:text-lemon transition-colors duration-300 mb-3">
                {proj.title}
              </h3>

              <div className="space-y-1.5 text-xs text-white/70 leading-relaxed pr-2">
                {proj.description.slice(0, 2).map((item, dIdx) => (
                  <p key={dIdx} className="flex gap-1.5">
                    <span className="text-lemon font-bold font-mono">▸</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Device Frame visual mockup integration */}
            <div className="my-2 z-10">
              {renderDeviceMockup(proj.id)}
            </div>

            {/* Tech tag list */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-lemon/5 mt-auto">
              {proj.tech.map((technology) => (
                <TechBadge key={technology} label={technology} />
              ))}
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
