import React, { useEffect, useState } from 'react';

interface AnimeCharacterProps {
  currentSection: string;
  isHeroHovered: boolean;
  isSkillsHovered: boolean;
  isCertsHovered: boolean;
}

export default function AnimeCharacter({
  currentSection,
  isHeroHovered,
  isSkillsHovered,
  isCertsHovered,
}: AnimeCharacterProps) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isFistPumping, setIsFistPumping] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll offset to drive leg walking
      const scrollPos = window.scrollY;
      setScrollOffset(scrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync inputs with state triggers
  useEffect(() => {
    setIsLookingUp(isHeroHovered || currentSection === 'hero');
    setIsTyping(isSkillsHovered || currentSection === 'skills');
    setIsFistPumping(isCertsHovered || currentSection === 'certifications');
  }, [isHeroHovered, isSkillsHovered, isCertsHovered, currentSection]);

  // Leg-swing calculation based on scroll offset
  const leftLegAngle = Math.sin(scrollOffset * 0.05) * 15;
  const rightLegAngle = -Math.sin(scrollOffset * 0.05) * 15;

  return (
    <div
      id="neon-anime-developer"
      className="fixed bottom-0 left-0 z-40 p-4 pointer-events-none md:block hidden transform translate-y-3"
      style={{ width: '220px', height: '260px' }}
    >
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_12px_rgba(254,231,21,0.25)]"
      >
        {/* Glow behind character */}
        <circle cx="100" cy="140" r="45" fill="url(#coderBgGlow)" opacity="0.3" />

        {/* Floating Code Console (Types on hover) */}
        {isTyping && (
          <g className="animate-pulse">
            {/* Holographic Keyboard Lines */}
            <path
              d="M 120 150 L 170 145 M 122 153 L 172 148 M 124 156 L 174 151"
              stroke="#FEE715"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              opacity="0.8"
            />
            {/* Rising Code Bits */}
            <text x="140" y="115" fill="#FEE715" fontSize="8" fontFamily="monospace" opacity="0.9" className="animate-bounce">
              {'<js>'}
            </text>
            <text x="160" y="130" fill="#FEE715" fontSize="8" fontFamily="monospace" opacity="0.7">
              {'{ok}'}
            </text>
          </g>
        )}

        {/* Chair Profile */}
        <path
          d="M 40 220 L 70 215 L 75 140 L 45 145 Z"
          fill="#101820"
          stroke="rgba(254, 231, 21, 0.2)"
          strokeWidth="1.5"
        />
        <path d="M 60 215 L 60 238 M 50 238 L 70 238" stroke="#101820" strokeWidth="4" />

        {/* Walking Legs (Animates with Scroll) */}
        {/* Left Leg */}
        <g style={{ transform: `rotate(${leftLegAngle}deg)`, transformOrigin: '80px 200px', transition: 'transform 0.05s linear' }}>
          <path d="M 75 200 L 70 225 L 85 228" stroke="#101820" strokeWidth="6" strokeLinecap="round" />
          <path d="M 70 225 L 85 228" stroke="#FEE715" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        {/* Right Leg */}
        <g style={{ transform: `rotate(${rightLegAngle}deg)`, transformOrigin: '90px 200px', transition: 'transform 0.05s linear' }}>
          <path d="M 88 200 L 95 223 L 110 225" stroke="#101820" strokeWidth="6" strokeLinecap="round" />
          <path d="M 95 223 L 110 225" stroke="#FEE715" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* Body / Torso (Oversized Hoodie) */}
        <path
          d="M 60 145 Q 85 135 105 145 L 115 195 A 15 15 0 0 1 100 210 L 75 210 A 15 15 0 0 1 60 195 Z"
          fill="#1c252d"
          stroke="#FEE715"
          strokeWidth="1.5"
          className="transition-all duration-300"
        />
        
        {/* Hoodie Strings / Stripes (Glowing yellow) */}
        <path
          d="M 85 145 C 80 165 92 180 82 188"
          stroke="#FEE715"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-pulse"
        />
        <path
          d="M 98 145 C 103 162 95 178 100 185"
          stroke="#FEE715"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-pulse"
        />

        {/* Head & Face Group */}
        <g
          style={{
            transform: isLookingUp ? 'translateY(-4px) rotate(-10deg)' : 'none',
            transformOrigin: '90px 130px',
            transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          }}
        >
          {/* Head skin profile */}
          <path d="M 85 100 A 15 15 0 1 1 110 115 L 105 130 Q 95 132 85 125 Z" fill="#ebc29d" />
          
          {/* Neon VR Goggles/Spectacles */}
          <path
            d="M 98 105 L 114 110 A 4 4 0 0 1 118 116 L 114 122"
            stroke="#FEE715"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="filter drop-shadow-[0_0_5px_#FEE715]"
          />
          <line x1="94" y1="106" x2="105" y2="109" stroke="#101820" strokeWidth="2" />

          {/* Coder Hair */}
          <path d="M 80 102 C 78 88 100 82 108 86 C 114 88 115 98 112 102 L 108 94 L 100 95 Z" fill="#301900" />

          {/* Hoodie Cap / Overhood (Glowing lemon lining) */}
          <path
            d="M 75 105 C 70 75 110 70 120 100 Q 124 112 118 128"
            stroke="#FEE715"
            strokeWidth="2.5"
            fill="#1c252d"
            className="transition-colors duration-300"
          />
        </g>

        {/* Left Arm / Working Hands */}
        {isTyping ? (
          /* Typing Interactive Motion */
          <g className="transition-all duration-300">
            {/* Left Arm */}
            <path
              d="M 75 152 Q 115 140 135 150 L 142 153"
              stroke="#1c252d"
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            <path
              d="M 75 152 Q 115 140 135 150"
              stroke="#FEE715"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Moving fingers */}
            <circle cx="144" cy="150" r="3" fill="#ebc29d" className="animate-bounce" style={{ animationDelay: '0.1s' }} />
            <circle cx="147" cy="154" r="3" fill="#ebc29d" className="animate-bounce" style={{ animationDelay: '0.3s' }} />
          </g>
        ) : isFistPumping ? (
          /* Success Fist Pump Action */
          <g className="transition-all duration-300">
            {/* Raised Arm */}
            <path
              d="M 75 152 Q 95 110 115 80"
              stroke="#1c252d"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d="M 75 152 Q 95 110 115 80"
              stroke="#FEE715"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Glowing Golden Fist */}
            <circle
              cx="115"
              cy="76"
              r="7"
              fill="#ebc29d"
              stroke="#FEE715"
              strokeWidth="2"
              className="filter drop-shadow-[0_0_8px_#FEE715]"
            />
            {/* Visual sparkles */}
            <line x1="115" y1="62" x2="115" y2="68" stroke="#FEE715" strokeWidth="1.5" />
            <line x1="123" y1="71" x2="129" y2="68" stroke="#FEE715" strokeWidth="1.5" />
            <line x1="105" y1="71" x2="99" y2="68" stroke="#FEE715" strokeWidth="1.5" />
          </g>
        ) : (
          /* Standard Idle Relax state */
          <g className="transition-all duration-300">
            <path
              d="M 75 152 Q 110 162 130 178"
              stroke="#1c252d"
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            <path
              d="M 75 152 Q 110 162 130 178"
              stroke="#FEE715"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle cx="132" cy="180" r="3.5" fill="#ebc29d" />
          </g>
        )}

        {/* Definitions */}
        <defs>
          <radialGradient id="coderBgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEE715" />
            <stop offset="100%" stopColor="#101820" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Mini state tooltip indicator */}
      <div className="absolute right-0 top-3 text-[10px] font-mono bg-midnight/90 border border-lemon/35 px-1.5 py-0.5 rounded text-lemon uppercase tracking-wider scale-90 select-none">
        {isTyping ? 'status.typing' : isFistPumping ? 'status.success' : 'status.idle'}
      </div>
    </div>
  );
}
