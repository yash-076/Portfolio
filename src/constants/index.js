import {
  cybersecurity,
  fullstack,
  Soc,
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

  soc,
  threatsage,
  
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
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Full-Stack Developer",
    icon: fullstack,
  },
  {
    title: "Cybersecurity Learner",
    icon: cybersecurity,
  },
  {
    title: "SOC & Threat Detection Enthusiast",
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
    title: "Founder / Developer",
    company_name: "ThreatSage (Personal Project)",
    icon: threatsage,
    iconBg: "#383E56",
    date: "Jun 2025 - Present",
    points: [
      "Created SecuWatch — a real-time cybersecurity dashboard that ingests alerts, streams them over WebSockets, and visualizes threat analytics.",
      "Built backend alert ingestion and broadcasting components (Python + FastAPI) and the React + Tailwind frontend for alert triage and filtering.",
      "Designed analytics pages (timeline, severity breakdown, top IPs/URLs/hashes) and implemented alert status flows (New → In Progress → Resolved).",
      "Worked on integrating file-based alert producers with the dashboard and planned migration to MongoDB for persistent storage.",
    ],
  },

  {
    title: "SOC Learner",
    company_name: "Self-driven Labs & Courses",
    icon: soc, 
    iconBg: "#383E56",
    date: "2024 - Present",
    points: [
      "Completed Practical Ethical Hacking (TCM), Linux Fundamentals (TCM), Ethical Hacking (Cisco), and Introduction to Cybersecurity (Cisco).",
      "Built hands-on tools: Real-Time Log Analyzer, Domain Recon Automation, Port Scanner, and Network Sniffer for learning and SOC practice.",
      "Performed log analysis with Splunk, developed detection rules, and practiced blue-team workflows and incident triage.",
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
    name: "SecuWatch v1.1",
    description:
      "A real-time cybersecurity monitoring dashboard that visualizes alerts, supports WebSocket live updates, alert acknowledgment, export features, and threat analytics. Built under the ThreatSage ecosystem.",
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
      "A personal portfolio showcasing software engineering and cybersecurity work. Includes project sections, animations, and a clean UI built using React and Tailwind CSS.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "tailwind", color: "green-text-gradient" },
      { name: "framer-motion", color: "pink-text-gradient" },
    ],
    image: portfolio,
    source_code_link: "https://github.com/yash-076/portfolio",
    live_link: "https://portfolio-website-seven-plum-26.vercel.app/",
  },
];


export { services, technologies, experiences, testimonials, projects };