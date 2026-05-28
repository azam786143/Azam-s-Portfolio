import React, { useState } from 'react';
import { User, RefreshCw, MapPin, Sparkles, BookOpen } from 'lucide-react';

export default function AboutFlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[480px] perspective-1500 group select-none">
      {/* Container holding the two sides */}
      <div
        onClick={toggleFlip}
        className="relative w-full h-full duration-1000 transform-style-3d cursor-pointer hint-trigger"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ================= FRONT SIDE ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-6 md:p-8 backface-hidden flex flex-col justify-between border-2 border-glass-border shadow-[0_4px_30px_rgba(0,0,0,0.5)] bg-midnight/90 backdrop-blur"
          style={{
            transform: 'rotateY(0deg)',
          }}
        >
          {/* Hexagonal grid absolute background */}
          <div className="absolute inset-0 rounded-2xl opacity-[0.03] bg-[radial-gradient(rgba(254,231,21,1)_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

          {/* Core Branding tag */}
          <div className="flex items-center justify-between z-10 border-b border-lemon/10 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-lemon animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-lemon uppercase">
                IDENTITY PROFILE // CSD.01
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs font-mono text-lemon/70 bg-lemon/5 border border-lemon/20 px-2 py-0.5 rounded-full">
              <RefreshCw className="w-3 h-3 text-lemon animate-spin" style={{ animationDuration: '6s' }} />
              <span>Tap to Flip</span>
            </div>
          </div>

          {/* Main Visual/Title */}
          <div className="my-auto flex flex-col items-center text-center gap-4 z-10">
            {/* Avatar container */}
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center border-2 border-lemon justify-center bg-midnight shadow-[0_0_20px_rgba(254,231,21,0.25)] group-hover:scale-105 transition-all duration-300">
              <User className="w-10 h-10 text-lemon" />
              {/* Outer rotating ring */}
              <div className="absolute -inset-1.5 rounded-full border border-dashed border-lemon/30 animate-spin" style={{ animationDuration: '15s' }}></div>
            </div>

            <div>
              <h3 className="text-3xl font-display font-bold text-lemon tracking-tight">
                SK. NOOR AZAM
              </h3>
              <p className="text-xs font-mono text-white/50 tracking-wider mt-1.5 uppercase">
                First-Year CSD Student & Full-Stack / AI Dev
              </p>
            </div>

            {/* Micro Details Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-lemon/5 border border-lemon/10 rounded-xl text-left">
                <MapPin className="w-4 h-4 text-lemon shrink-0" />
                <div>
                  <span className="block text-[9px] font-mono text-lemon/50 uppercase">Location</span>
                  <span className="text-xs text-white font-medium">Visakhapatnam, IN</span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-lemon/5 border border-lemon/10 rounded-xl text-left">
                <BookOpen className="w-4 h-4 text-lemon shrink-0" />
                <div>
                  <span className="block text-[9px] font-mono text-lemon/50 uppercase">Track</span>
                  <span className="text-xs text-white font-medium">B.Tech (CSD) @ NIAT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer visual indicators */}
          <div className="border-t border-lemon/10 pt-4 flex justify-between text-[10px] font-mono text-white/40">
            <span>STB_OFFSET_019A</span>
            <span className="text-lemon/60 font-bold uppercase hover:text-lemon">CLICK / TAP TO VIEW INTRO</span>
          </div>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl p-6 md:p-8 backface-hidden flex flex-col justify-between border-2 border-lemon shadow-[0_0_30px_rgba(254,231,21,0.2)] bg-[#101820] text-white"
          style={{
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Subtle vertical stripes */}
          <div className="absolute top-0 right-4 w-px h-full bg-lemon/10 pointer-events-none" />
          <div className="absolute top-0 right-12 w-px h-full bg-lemon/15 pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-lemon/20 pb-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-lemon uppercase flex items-center gap-1.5">
              <span>●</span> PROFESSIONAL OVERVIEW
            </h4>
            <div className="text-[10px] font-mono text-lemon bg-lemon/10 border border-lemon/30 px-2 py-0.5 rounded">
              TAP TO FLIP BACK
            </div>
          </div>

          {/* Bio text */}
          <div className="my-auto z-10 text-sm leading-relaxed text-white/90 space-y-4 pr-4">
            <p>
              Results-driven B.Tech first-year student in <strong className="text-lemon">Computer Science and Design (CSD)</strong> at <strong className="text-white">NIAT (Skill Development Institute)</strong> in collaboration with <strong className="text-white">NSRIT Autonomous</strong>.
            </p>
            <p>
              Equipped with a solid engineering foundation spanning <strong className="text-lemon">Full-Stack Web Development</strong>, modern databases, and LLM orchestration. Proficient in assembling responsive React platforms, data pipelines, and intelligent AI interaction schemes.
            </p>
            <p className="hidden md:block">
              Passionate about tackling real-world complexities through robust, structured scripts, beautiful UX paradigms, and highly performant frameworks. Actively seeking interactive internship opportunities in fast-paced teams.
            </p>
          </div>

          {/* Footer stats / attributes */}
          <div className="border-t border-lemon/15 pt-3 grid grid-cols-3 text-center">
            <div>
              <span className="block text-[10px] font-mono text-lemon/50 lowercase">gpa / intermediate</span>
              <span className="text-sm font-bold text-lemon">97% (MPC)</span>
            </div>
            <div className="border-x border-lemon/15">
              <span className="block text-[10px] font-mono text-lemon/50 lowercase">graduation</span>
              <span className="text-sm font-bold text-white">2029</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-lemon/50 lowercase">core focus</span>
              <span className="text-sm font-bold text-lemon">AI & UX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
