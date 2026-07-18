import './Projects.css'

const PROJECTS = [
  {
    num: '01',
    title: 'SecuWatch 2.0',
    subtitle: 'Real-Time SOC Dashboard',
    date: 'Apr 2026 – Jul 2026',
    desc: 'Multi-tenant Security Operations Center dashboard for real-time log ingestion, threat detection, and incident monitoring. Event-driven pipeline with Kafka, Redis Pub/Sub, and WebSockets for low-latency security alert streaming.',
    tech: ['FastAPI', 'React.js', 'PostgreSQL', 'Apache Kafka', 'Redis', 'WebSockets', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/yash-076/SecuWatch2.0',
    live: 'https://secuwatch-dashboard.vercel.app/',
  },
  {
    num: '02',
    title: 'RoleSync',
    subtitle: 'Job Aggregation & Resume Matching',
    date: 'Jan 2026 – Feb 2026',
    desc: 'Scalable job aggregation platform with a hybrid semantic matching engine combining vector embeddings, cosine similarity, and keyword matching for personalized resume-job recommendations. Redis caching for low-latency search.',
    tech: ['FastAPI', 'React.js', 'PostgreSQL', 'Redis', 'APScheduler', 'SHA-256'],
    github: 'https://github.com/yash-076/job-aggregator',
    live: 'https://job-aggregator-roan.vercel.app/',
  },
  {
    num: '03',
    title: 'Pulse',
    subtitle: 'Real-Time Chat Application',
    date: 'Oct 2025',
    desc: 'Full-stack real-time messaging platform supporting multiple concurrent users. Event-driven WebSocket communication for low-latency messaging, REST APIs for auth and user management, and MongoDB schemas with efficient querying.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'WebSockets', 'TailwindCSS'],
    github: 'https://github.com/yash-076/ChatApp',
    live: 'https://chat-app-nine-azure-45.vercel.app/',
  },
  {
    num: '04',
    title: 'GoShort',
    subtitle: 'High-Performance URL Shortener',
    date: 'Jun 2026 – Ongoing',
    desc: 'URL shortening service in Go using the standard library and RESTful architecture. MD5-based short code generation with in-memory URL storage, efficient lookup, and fast redirect via Go\'s net/http package.',
    tech: ['Golang', 'REST APIs', 'net/http', 'JSON', 'MD5 Hashing'],
    github: 'https://github.com/yash-076/Url-shortner',
    live: null,
  },
  {
    num: '05',
    title: 'Olive',
    subtitle: 'Product / Showcase Landing UI',
    date: '2025',
    desc: 'React + Vite starter focused on a polished product showcase landing UI. Features a responsive hero and phone product showcase component. Clean component structure with fast dev feedback via Vite and Tailwind-driven styling.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/yash-076/Olive',
    live: 'https://olive-frontend-rho.vercel.app/',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <p className="section-label">// 05 — PROJECTS</p>
        <h2 className="section-title">FEATURED BUILDS</h2>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              key={p.num}
              className="project-card reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="project-number">{p.num}</span>
              <div className="project-top-line" />

              <p className="project-subtitle">{p.subtitle}</p>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-date">{p.date}</p>

              <p className="project-desc">{p.desc}</p>

              <div className="project-tech">
                {p.tech.map((t) => (
                  <span key={t} className="project-tech-tag">{t}</span>
                ))}
              </div>

              <div className="project-links">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="project-link">
                    ↗ GitHub
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="project-link">
                    ↗ Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
