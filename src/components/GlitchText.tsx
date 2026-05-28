import React, { useEffect, useState } from 'react';

export default function GlitchText() {
  const name = "SK. NOOR AZAM";
  const subtitles = [
    "Full-Stack Developer",
    "AI Engineer",
    "UI/UX Designer"
  ];

  const [typedName, setTypedName] = useState("");
  const [glitchActive, setGlitchActive] = useState(false);
  const [subIndex, setSubIndex] = useState(0);
  const [fadeSub, setFadeSub] = useState(true);

  // Typewriting name effect
  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      setTypedName(name.substring(0, currentIdx + 1));
      currentIdx++;
      if (currentIdx >= name.length) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Idle flickering glitch interval
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 250);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Cycling subtitles effect
  useEffect(() => {
    const timer = setInterval(() => {
      setFadeSub(false);
      setTimeout(() => {
        setSubIndex((prev) => (prev + 1) % subtitles.length);
        setFadeSub(true);
      }, 400); // Wait for fadeout
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center text-center select-none">
      {/* Glitching Chromatic Name */}
      <div className="relative inline-block mb-3">
        {/* White shadow skew layer for chromatic split */}
        {glitchActive && (
          <h1
            className="absolute inset-0 text-5xl md:text-7xl font-display font-extrabold tracking-tight text-white opacity-70 z-0 animate-pulse"
            style={{
              clipPath: 'inset(10% 0 15% 0)',
              transform: 'translate(-4px, 2px) skewX(-12deg)',
            }}
          >
            {name}
          </h1>
        )}

        {/* Yellow shadow layer */}
        {glitchActive && (
          <h1
            className="absolute inset-0 text-5xl md:text-7xl font-display font-extrabold tracking-tight text-lemon opacity-80 z-0"
            style={{
              clipPath: 'inset(25% 0 5% 0)',
              transform: 'translate(5px, -2px) skewX(8deg)',
            }}
          >
            {name}
          </h1>
        )}

        {/* Main Typed Character Head */}
        <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-lemon relative z-10 filter drop-shadow-[0_0_15px_rgba(254,231,21,0.5)]">
          {typedName}
          <span className="w-2 h-10 md:h-12 bg-lemon inline-block ml-1 animate-ping text-[0px]" style={{ verticalAlign: 'middle' }}>.</span>
        </h1>
      </div>

      {/* Cyclic Role sub-headline */}
      <div className="h-8 overflow-hidden flex items-center justify-center">
        <span
          className={`text-sm md:text-base font-mono font-bold tracking-widest text-white/90 uppercase transition-all duration-300 ${
            fadeSub ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          {subtitles[subIndex]}
        </span>
      </div>

      {/* Visakhapatnam visual metadata indicator */}
      <div className="flex items-center gap-1.5 mt-2 bg-[#172129] border border-lemon/25 px-2 bg-lemon/5 py-0.5 rounded text-[10px] font-mono text-lemon uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-lemon animate-ping" />
        <span>SYS_STATUS: ACTIVE @ VISAKHAPATNAM</span>
      </div>
    </div>
  );
}
