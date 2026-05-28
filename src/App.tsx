import React, { useState, useEffect } from 'react';
import ParticleBackdrop from './components/ParticleBackdrop';
import InteractiveCursor from './components/InteractiveCursor';
import AnimeCharacter from './components/AnimeCharacter';
import Canvas3DScene from './components/Canvas3DScene';
import GlitchText from './components/GlitchText';
import AboutFlipCard from './components/AboutFlipCard';
import SkillList from './components/SkillList';
import ProjectBentoGrid from './components/ProjectBentoGrid';
import RoadTimeline from './components/RoadTimeline';
import ContactSection from './components/ContactSection';
import GlassCard from './components/GlassCard';
import { Mail, Phone, MapPin, GraduationCap, Award, MessageSquareCode, Download, FolderGit, Cpu, ArrowUp, Sparkles } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  // Character hover reaction flags
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [isSkillsHovered, setIsSkillsHovered] = useState(false);
  const [isCertsHovered, setIsCertsHovered] = useState(false);

  // Monitor active navigation sections on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'skills', 'projects', 'certifications', 'contact'];
      let current = 'hero';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Detect if section header is visible or overlapping focal frame
          if (rect.top <= window.innerHeight * 0.4) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate virtual resume file on click
  const handleDownloadCV = () => {
    const cvText = `
=========================================
SK. NOOR AZAM - COMPUTER SCIENCE & DESIGN
=========================================
Phone: 9390285197
Email: noorazam786143@gmail.com
LinkedIn: linkedin.com/in/sk-noor-azam-068576371
GitHub: github.com/azam786143
Location: Visakhapatnam, Andhra Pradesh, India

PROFESSIONAL SUMMARY
--------------------
B.Tech study student in Computer Science and Design (CSD) at NIAT in collaboration with NSRIT Autonomous. Strong foundation in full-stack web development, database management, and AI-driven applications design. Proficient in React.js, Python, SQL, and MongoDB with hands-on experience building user-centric interfaces.

TECHNICAL SKILLS
----------------
- Programming Languages: C, Python, JavaScript (ES6+)
- Frontend: HTML5, CSS3, React.js, Responsive Web Design, UI/UX (Figma)
- Backend & DB: SQL, MongoDB, REST APIs, Node.js
- AI & Emerging Tech: Generative AI Applications, AI Agents, Prompt Engineering, LLM APIs
- Developer Tools: Git, GitHub, VS Code, Figma, Postman, Firebase, Vercel

EDUCATION
---------
- B.Tech (Computer Science & Design)
  NIAT x NSRIT Autonomous (Visakhapatnam) | Expected 2029
- Intermediate Science (MPC)
  Narayana Junior College (Andhra Pradesh) | Completed 2025 (Score: 97%)

CERTIFICATIONS & WORKSHOPS
--------------------------
- Autonomous Vehicles Workshop (LIDAR, Routing)
- Base44 Hackathon (24-Hour Prototype sprint)
- Gesture Technology Workshop (NIAT System HCI)

ADDITIONAL COMPETENCIES
-----------------------
- Scrum Awareness, Strong Communication, Fast Learner
=====================================================
    `;
    const blob = new Blob([cvText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "SK_Noor_Azam_Resume.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-midnight text-white font-sans antialiased relative overflow-x-hidden selection:bg-lemon selection:text-midnight pb-12">
      {/* Background and interactive cursor overlay channels */}
      <ParticleBackdrop />
      <InteractiveCursor />

      {/* Floating Interactive Anime Character bottom left */}
      <AnimeCharacter
        currentSection={activeSection}
        isHeroHovered={isHeroHovered}
        isSkillsHovered={isSkillsHovered}
        isCertsHovered={isCertsHovered}
      />

      {/* ================= FROSTED NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-[#101820]/80 backdrop-blur-md border-b border-lemon/15'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo Name */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-1.5 cursor-pointer select-none group pointer-events-auto"
          >
            <MessageSquareCode className="w-5 h-5 text-lemon group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-display font-black text-sm tracking-wider text-white group-hover:text-lemon transition-colors duration-200">
              NOOR.
              <span className="text-lemon">AZAM</span>
            </span>
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono font-bold tracking-wider">
            {['about', 'skills', 'projects', 'certifications', 'contact'].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`relative py-1 capitalize transition-colors duration-200 hover:text-lemon cursor-pointer pointer-events-auto ${
                  activeSection === sec ? 'text-lemon' : 'text-white/70'
                }`}
              >
                <span>{sec}</span>
                {activeSection === sec && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lemon rounded-full animate-pulse shadow-[0_0_8px_#FEE715]" />
                )}
              </button>
            ))}
          </div>

          {/* Quick Link Download CV (Header filled button) */}
          <button
            onClick={handleDownloadCV}
            className="flex items-center gap-2 px-4 py-1.5 bg-lemon text-midnight font-mono text-xs font-bold rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_12px_rgba(254,231,21,0.45)] cursor-pointer pointer-events-auto"
          >
            <Download className="w-3.5 h-3.5 animate-bounce" />
            <span>DOWNLOAD CV</span>
          </button>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section
        id="hero"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        className="min-h-screen flex flex-col justify-center relative pt-20 px-4 max-w-7xl mx-auto z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
          
          {/* Hero text panel column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lemon/5 border border-lemon/25 rounded-full text-xs font-mono text-lemon uppercase tracking-widest select-none animate-pulse">
              <Sparkles className="w-3 h-3 text-lemon shrink-0" />
              <span>Available for Placements & Internships</span>
            </div>

            {/* Glitching typed heading */}
            <GlitchText />

            <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-lg">
              First-year B.Tech computer science designer crafting high-performance, responsive React systems, database profilers, and generative agent pipelines.
            </p>

            {/* Micro Location Details */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-white/60">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-lemon" /> Visakhapatnam, India
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block" />
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-lemon" /> NIAT x NSRIT Autonomous
              </span>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2.5 bg-lemon text-midnight font-mono text-[13px] font-bold rounded-lg hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(254,231,21,0.5)] cursor-pointer pointer-events-auto"
              >
                Hire SK. Noor Azam
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="px-5 py-2.5 bg-transparent border-2 border-lemon text-lemon hover:bg-lemon/10 font-mono text-[13px] font-bold rounded-lg transition-all duration-300 pointer-events-auto cursor-pointer"
              >
                Explore Bento Projects
              </button>
            </div>
          </div>

          {/* 3D Scene graphics panel column */}
          <div className="lg:col-span-5 w-full h-[360px] md:h-[450px]">
            <GlassCard className="w-full h-full p-2 flex items-center justify-center" intensity={10}>
              <Canvas3DScene />
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="py-24 px-4 max-w-7xl mx-auto relative z-10 text-center">
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-lemon uppercase">
            // IDENTITY.MATRIX
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mt-1">
            ABOUT THE DEVELOPER
          </h2>
          <div className="w-12 h-1 bg-lemon mx-auto mt-3 rounded-full animate-pulse" />
        </div>

        {/* 3D flip biography profiles */}
        <AboutFlipCard />
      </section>

      {/* ================= SKILLS SECTION ================= */}
      <section
        id="skills"
        className="py-24 px-4 bg-[#101820]/40 backdrop-blur-sm relative z-10 text-center"
      >
        <div className="mb-16 max-w-7xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest text-lemon uppercase">
            // LEVEL.DIAGRAMS
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mt-1">
            CORE SKILL CAPABILITIES
          </h2>
          <div className="w-12 h-1 bg-lemon mx-auto mt-3 rounded-full animate-pulse" />
        </div>

        {/* Liquid skills and counters list container with hover tracking hooks */}
        <SkillList onSkillHover={setIsSkillsHovered} />
      </section>

      {/* ================= PROJECTS SECTION ================= */}
      <section id="projects" className="py-24 px-4 max-w-7xl mx-auto relative z-10 text-center">
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-lemon uppercase">
            // WORKS.BENTO
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mt-1">
            FEATURED SHAPE DESIGNS
          </h2>
          <div className="w-12 h-1 bg-lemon mx-auto mt-3 rounded-full animate-pulse" />
        </div>

        {/* Bento grid showcase with simulated devices mockup */}
        <ProjectBentoGrid />
      </section>

      {/* ================= CERTIFICATIONS & WORKSHOPS ================= */}
      <section
        id="certifications"
        className="py-24 px-4 bg-[#101820]/40 backdrop-blur-sm relative z-10 text-center"
      >
        <div className="mb-16 max-w-7xl mx-auto">
          <span className="text-xs font-mono font-bold tracking-widest text-lemon uppercase">
            // ROADS.VANISHING
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mt-1">
            CERTIFICATIONS & TIMELINE
          </h2>
          <div className="w-12 h-1 bg-lemon mx-auto mt-3 rounded-full animate-pulse" />
        </div>

        {/* 3D scrolling driven perspective milestone timeline */}
        <RoadTimeline onCertsHover={setIsCertsHovered} />
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="py-24 px-4 max-w-7xl mx-auto relative z-10 text-center">
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-lemon uppercase">
            // COMMS.INPUTS
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mt-1">
            GET IN COLLABORATION
          </h2>
          <div className="w-12 h-1 bg-lemon mx-auto mt-3 rounded-full animate-pulse" />
        </div>

        {/* 3D envelope structure + glowing glass labels */}
        <ContactSection />
      </section>

      {/* Footer System labels */}
      <footer className="border-t border-lemon/10 pt-10 text-center text-xs font-mono text-white/40 tracking-wider">
        <p>© {new Date().getFullYear()} SK. NOOR AZAM. ALL CODEPRINTS REGISTERED.</p>
        <p className="text-[10px] text-lemon/40 mt-1 uppercase">
          visakhapatnam / nit autonomous collab / secure layer v3.12
        </p>
      </footer>

      {/* Float to top button tracker */}
      <button
        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-lemon border border-lemon font-bold text-midnight shadow-[0_0_15px_rgba(254,231,21,0.5)] hover:scale-110 hover:bg-white transition-all duration-300 cursor-pointer pointer-events-auto"
        title="Scroll back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
