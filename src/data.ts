export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  tech: string[];
  github: string;
  category: string;
  glowColor?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: { name: string; level: number }[];
}

export interface TimelineMilestone {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: 'certification' | 'education';
}

export const PROJECTS: Project[] = [];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "lang",
    name: "Programming Languages",
    skills: [
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "Python (Intermediate)", level: 80 },
      { name: "C Language", level: 85 },
      { name: "SQL", level: 90 }
    ]
  },
  {
    id: "frontend",
    name: "Frontend Development",
    skills: [
      { name: "React.js", level: 90 },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "Tailwind CSS", level: 98 },
      { name: "UI/UX (Figma)", level: 85 }
    ]
  },
  {
    id: "backend",
    name: "Backend & Databases",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "REST APIs", level: 85 },
      { name: "DBMS / SQL", level: 90 },
      { name: "Node.js (Express)", level: 80 }
    ]
  },
  {
    id: "ai",
    name: "AI & Emerging Tech",
    skills: [
      { name: "Generative AI Apps", level: 90 },
      { name: "AI Agents Architecture", level: 85 },
      { name: "Prompt Engineering / LLMs", level: 95 },
      { name: "Cloud APIs", level: 85 }
    ]
  },
  {
    id: "tools",
    name: "Developer Tools",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Postman", level: 85 },
      { name: "Firebase", level: 80 },
      { name: "Vercel / Netlify", level: 90 }
    ]
  }
];

export const TIMELINE: TimelineMilestone[] = [
  {
    id: "cert1",
    title: "Autonomous Vehicles Workshop",
    organization: "NIAT x NSRIT Autonomous",
    date: "A hands-on workshop focused on self-driving state modeling.",
    description: "Explored sensor fusion pipelines, LIDAR integration data feeds, and localized route real-time decision algorithms.",
    type: 'certification'
  },
  {
    id: "cert2",
    title: "Base44 Hackathon",
    organization: "Specialized 24-Hour Sprint Event",
    date: "Developed custom functioning application prototypes.",
    description: "Built a fully functioning technical solution in an intense 24-hour window, demonstrating problem-solving, rapid prototyping, and software engineering agility.",
    type: 'certification'
  },
  {
    id: "cert3",
    title: "Gesture Technology Workshop",
    organization: "NIAT (SDI)",
    date: "Human-Computer Interaction Workshop.",
    description: "Designed prototype control systems tracking visual gesture indices to control browser applications without touching keyboard or mouse accessories.",
    type: 'certification'
  },
  {
    id: "edu1",
    title: "B.Tech in Computer Science and Design (CSD)",
    organization: "NIAT x NSRIT Autonomous (Visakhapatnam)",
    date: "Expected Graduation: 2029",
    description: "Deep dive in modern Web Technologies, Database Management Systems, Data Structures & Algorithms, and User-Centric UI/UX Methodologies.",
    type: 'education'
  },
  {
    id: "edu2",
    title: "Intermediate MPC (Science - Class 12)",
    organization: "Narayana Junior College (Andhra Pradesh State Board)",
    date: "Year of Completion: 2025",
    description: "Scored a highly competitive 97% overall score. Core topics: Physics, Mathematics, and Chemistry.",
    type: 'education'
  }
];
