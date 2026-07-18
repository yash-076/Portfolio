import { useState, useEffect, useRef } from 'react'
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
    why: `I built SecuWatch because I wanted to understand how modern SIEM platforms work beyond simple log parsing. The first version was just a Python script that analyzed logs. As I learned more, I added a web dashboard with MongoDB and WebSockets to visualize alerts in real time. While building it, I started asking practical questions: What happens if thousands of logs arrive within a second? How do you prevent the backend from becoming a bottleneck? How do you ensure alerts aren't lost?

    Those questions led me to redesign the system multiple times. The latest version uses an event-driven architecture with Kafka to decouple log ingestion from alert processing, Redis for caching frequently accessed data like agent authentication and AI-generated explanations, and Redis Pub/Sub with WebSockets to deliver only relevant alerts to connected users. I also implemented alert deduplication, RBAC for organizations, filtering, AI-powered alert explanations and mitigation suggestions, and other features inspired by real-world security platforms.

    More than just a cybersecurity project, SecuWatch became my way of learning how to design scalable, low-latency distributed systems by continuously identifying bottlenecks and improving the architecture.`,
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
    why: `While searching for internships and new graduate roles, I realized how fragmented the process was. Every company had its own careers page, job openings were scattered across different platforms, and keeping track of everything meant checking dozens of websites every day. I wanted a single place where I could discover relevant opportunities without worrying about missing an important opening.

    That idea became RoleSync. My long-term vision is to automatically aggregate jobs directly from company career pages and notify users the moment a relevant position becomes available. In the current version, I use the Adzuna API, which is refreshed every couple of hours, to provide a unified job feed while I continue working toward direct career-page integration.

    Beyond solving a problem I personally faced, the project gave me the opportunity to build scalable backend services, implement personalized job alerts, and design a system that can evolve into a real-time job aggregation platform.`,
  },
  {
    num: '03',
    title: 'GoShort',
    subtitle: 'High-Performance URL Shortener',
    date: 'Jun 2026 – Ongoing',
    desc: 'URL shortening service in Go using the standard library and RESTful architecture. MD5-based short code generation with in-memory URL storage, efficient lookup, and fast redirect via Go\'s net/http package.',
    tech: ['Golang', 'REST APIs', 'net/http', 'JSON', 'MD5 Hashing'],
    github: 'https://github.com/yash-076/Url-shortner',
    live: null,
    why: `I built GoShort primarily to learn the Go programming language by implementing a project that is simple in concept but interesting from a system design perspective. A URL shortener touches several backend concepts, including routing, hashing, storage, and efficient lookups, making it a great way to become comfortable with Go while building something practical.

    For the current version, I generate short URLs by taking the first five characters of an MD5 hash of the original URL. While this works well for smaller datasets, building the project helped me realize the limitations of this approach. As the number of URLs grows, hash prefix collisions become increasingly likely, making the system unsuitable for large-scale production use.

    If I continue developing the project, I'd replace the hashing strategy with a scalable ID generation approach, such as distributed sequence generators or Base62-encoded IDs, to guarantee uniqueness and support millions of URLs. More than the implementation itself, the project helped me understand the trade-offs involved in designing scalable backend systems.`,
  },
  {
    num: '04',
    title: 'Pulse',
    subtitle: 'Real-Time Chat Application',
    date: 'Oct 2025',
    desc: 'Full-stack real-time messaging platform supporting multiple concurrent users. Event-driven WebSocket communication for low-latency messaging, REST APIs for auth and user management, and MongoDB schemas with efficient querying.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'WebSockets', 'TailwindCSS'],
    github: 'https://github.com/yash-076/ChatApp',
    live: 'https://chat-app-nine-azure-45.vercel.app/',
    why: `I built Pulse because I wanted to understand how real-time communication works beyond sending simple HTTP requests. Messaging applications feel instantaneous to users, but behind that experience are persistent connections, event-driven communication, and message synchronization between multiple clients. I wanted to explore how these systems work under the hood.

    Building Pulse gave me hands-on experience with WebSockets, real-time event handling, user presence, and reliable message delivery. Instead of treating it as just another chat application, I focused on understanding the architecture required to keep conversations synchronized across connected users while maintaining a responsive experience.

    The project helped me gain a deeper understanding of real-time system design and strengthened my backend development skills, which later proved valuable while building larger projects like SecuWatch.`,
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
    why: `I built Olive as part of a frontend assignment during a hiring process. The goal was to recreate a modern landing page and mobile application interface using React while staying faithful to the original design.

    Working on the project taught me that building great user interfaces is much more challenging than it initially appears. Achieving a polished look required careful attention to responsive layouts, component reusability, spacing, typography, animations, and visual consistency across the entire page.

    Although my primary focus is backend engineering, Olive helped me appreciate the level of detail that goes into frontend development and improved my ability to translate high-fidelity designs into responsive, pixel-accurate interfaces.`,
  },
]

// Typewriter hook for the "why" popup (types 3 chars per tick for speed)
function useTypewriter(text, active) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) {
      setDisplayed('')
      setDone(false)
      return
    }
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        const next = Math.min(i + 3, text.length)
        setDisplayed(text.slice(0, next))
        i = next
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, 10)
    return () => clearInterval(interval)
  }, [text, active])

  return { displayed, done }
}

// Highlights core engineering keywords in golden color
const highlightKeywords = (text) => {
  const keywords = [
    'SecuWatch', 'RoleSync', 'GoShort', 'Pulse', 'Olive',
    'Kafka', 'Redis', 'WebSockets', 'MongoDB', 'PostgreSQL', 'APIs', 'Adzuna API',
    'distributed systems', 'SIEM platforms', 'system design', 'event-driven architecture',
    'caching', 'low-latency', 'Go', 'React', 'Python', 'Framer Motion', 'hashing'
  ]

  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length)
  const pattern = sortedKeywords.map(k => k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')
  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi')

  const parts = text.split(regex)
  return parts.map((part, index) => {
    if (keywords.some(kw => kw.toLowerCase() === part.toLowerCase())) {
      return <strong key={index} style={{ color: 'var(--gold)', fontWeight: '600' }}>{part}</strong>
    }
    return part
  })
}

function WhyPopup({ text, onClose }) {
  const { displayed } = useTypewriter(text, true)
  const popupRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        // Also don't close if we clicked a "Why Built" button
        if (e.target.closest('.why-btn')) return
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div ref={popupRef} className="why-popup">
      <div className="why-popup-header">
        <span className="why-popup-title">// WHY I BUILT THIS</span>
        <button className="why-popup-close" onClick={onClose}>✕</button>
      </div>
      <div className="why-popup-body">
        {/* Invisible sizer to lock box dimensions instantly when mounting */}
        <div className="why-text-sizer" style={{ opacity: 0, pointerEvents: 'none', userSelect: 'none' }}>
          {text.split('\n\n').map((para, i) => (
            <p key={i}>{highlightKeywords(para)}</p>
          ))}
        </div>
        {/* Absolute-overlay typing text content */}
        <div className="why-text-scroll-container">
          {displayed.split('\n\n').map((para, i) => (
            <p key={i}>{highlightKeywords(para)}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [openWhy, setOpenWhy] = useState(null) // project num of open popup
  const [revealed, setRevealed] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const num = entry.target.getAttribute('data-num')
            setRevealed((prev) => ({ ...prev, [num]: true }))
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = document.querySelectorAll('.project-card[data-num]')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <p className="section-label">// 05 — PROJECTS</p>
        <h2 className="section-title">FEATURED BUILDS</h2>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              key={p.num}
              data-num={p.num}
              className={`project-card reveal ${revealed[p.num] ? 'visible' : ''} ${openWhy === p.num ? 'active-card' : ''}`}
              style={{
                transitionDelay: `${i * 80}ms`,
                zIndex: openWhy === p.num ? 10 : 1
              }}
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
                <div className="why-trigger-wrapper">
                  <button
                    className={`project-link why-btn ${openWhy === p.num ? 'active' : ''}`}
                    onClick={() => setOpenWhy(openWhy === p.num ? null : p.num)}
                  >
                    <span className="why-btn-icon">▸</span> Why Built
                  </button>
                </div>
              </div>

              {openWhy === p.num && (
                <WhyPopup
                  text={p.why}
                  onClose={() => setOpenWhy(null)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
