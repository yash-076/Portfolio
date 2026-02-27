import {
  fullstack,
  Soc,
  backend,
  web,

  html,
  javascript,
  css,
  reactjs,
  tailwind,
  threejs,
  nodejs,
  python,
  mongodb,
  git,

  problemSolving,
  threatsage,
  rolesync,
  secuwatch,
  pulse,
  portfolio,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Software Development Engineer",
    icon: web,
  },
  {
    title: "Full-Stack Developer",
    icon: fullstack,
  },
  {
    title: "Backend & API Developer",
    icon: backend,
  },
  {
    title: "Data Structures & Algorithms",
    icon: Soc,
  },
];

const technologies = [
  // Frontend
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  { 
    name: "Three JS", 
    icon: threejs, 
  },
  // Backend
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Python",
    icon: python,
  },

  // Database
  {
    name: "MongoDB",
    icon: mongodb,
  },

  // Version Control
  {
    name: "Git",
    icon: git,
  },
];


const experiences = [
  {
    title: "Software Development Engineer (Projects)",
    company_name: "Personal Engineering Work",
    icon: threatsage,
    iconBg: "#383E56",
    date: "Jun 2025 - Present",
    points: [
      "Built and shipped end-to-end full-stack applications with modular architecture, clean component design, and production-focused code quality.",
      "Developed backend services (Python + FastAPI / Node.js) and responsive React + Tailwind frontends with reusable UI patterns.",
      "Implemented real-time communication features using WebSockets/Socket.IO and optimized state handling for smooth user experience.",
      "Designed scalable data flows and integrated MongoDB-based persistence for reliable data storage and retrieval.",
    ],
  },

  {
    title: "Problem Solving & Core CS",
    company_name: "Self-driven Practice",
    icon: problemSolving, 
    iconBg: "#383E56",
    date: "2024 - Present",
    points: [
      "Practiced data structures and algorithms regularly with focus on arrays, strings, trees, graphs, dynamic programming, and greedy techniques.",
      "Strengthened core CS fundamentals including OOP, DBMS, operating systems, and computer networks through project-driven learning.",
      "Improved debugging and code-review workflow by writing clean, testable modules and following consistent engineering standards.",
    ],
  },
];


const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Realtime Event Monitoring Platform",
    description:
      "A real-time monitoring dashboard that supports live event updates, status transitions, exports, and analytics visualizations with a scalable full-stack architecture.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "fastapi", color: "green-text-gradient" },
      { name: "websockets", color: "pink-text-gradient" },
    ],
    image: secuwatch,
    source_code_link: "https://github.com/rastogi016/SecuWatch",
    live_link: "",
  },

  {
    name: "Pulse Chat App",
    description:
      "A modern real-time chat application featuring instant messaging, online status, typing indicators, and a clean responsive UI. Built using Socket.IO and MongoDB for persistent conversations.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "nodejs", color: "green-text-gradient" },
      { name: "mongodb", color: "pink-text-gradient" },
    ],
    image: pulse,
    source_code_link: "https://github.com/yash-076/chatapp",
    live_link: "https://chat-app-nine-azure-45.vercel.app/",
  },

  {
    name: "Portfolio Website ( This Site )",
    description:
      "A personal portfolio showcasing software engineering projects, skills, and experience with smooth animations and a clean React + Tailwind interface.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "tailwind", color: "green-text-gradient" },
      { name: "framer-motion", color: "pink-text-gradient" },
    ],
    image: portfolio,
    source_code_link: "https://github.com/yash-076/portfolio",
    live_link: "https://portfolio-website-seven-plum-26.vercel.app/",
  },
  {
    name: "RoleSync - AI Job Aggregator",
    description:
      "A full-stack AI-powered job aggregation platform that fetches jobs from APIs and company career pages, normalizes and deduplicates listings, and performs resume–JD matching using embeddings and similarity scoring. Features real-time updates, Redis caching, PostgreSQL storage, and a modern React + Tailwind interface.",
    tags: [
      { name: "fastapi", color: "green-text-gradient" },
      { name: "react", color: "blue-text-gradient" },
      { name: "postgresql", color: "pink-text-gradient" },
      { name: "redis", color: "orange-text-gradient" },
    ],
    image: rolesync,
    source_code_link: "https://github.com/yash-076/job-aggregator",
    live_link: "https://job-aggregator-roan.vercel.app/",
  },
];


export { services, technologies, experiences, testimonials, projects };