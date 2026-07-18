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
    why: `I built SecuWatch 2.0 because I wanted to understand what it actually takes to build a real-time monitoring system at scale — not just the frontend, but the full pipeline from raw log ingestion to alert delivery. Most tutorial projects stop at CRUD; I wanted to go deeper into event-driven architecture, so I designed the entire stack myself using Kafka for message queuing, Redis Pub/Sub for broadcast, and WebSockets to push alerts live to the dashboard.\n\nThe security domain made it interesting because the requirements are non-negotiable — missed alerts, duplicates, or latency can mean real consequences. That constraint pushed me to think carefully about deduplication, ordering guarantees, and fault tolerance. It became less about "building a project" and more about reasoning through tradeoffs that senior engineers face every day.`,
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
    why: `I built RoleSync out of personal frustration — job hunting is noisy, repetitive, and full of irrelevant listings. I wanted a system that could intelligently match a resume to the right roles, not just keyword-match, but semantically understand what a candidate is actually about.\n\nThe interesting engineering challenge was building a hybrid ranking system that combines vector embeddings with keyword scoring without making it feel like a black box. I also added Redis caching to keep search fast under concurrent load, and an APScheduler-based scraper to keep listings fresh. It was the first project where I had to think seriously about data freshness, cache invalidation, and search relevance as first-class problems.`,
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
    why: `Pulse was my first serious attempt at building something that had to work in real time for multiple users simultaneously. I wanted to understand how WebSocket connections behave under concurrent load, how to manage rooms, handle disconnects gracefully, and ensure message ordering doesn't break.\n\nBeyond the technical side, I built it because real-time systems are everywhere — in chat, in collaborative tools, in dashboards — and I felt like I couldn't claim to understand distributed systems without having shipped something that required genuine event-driven thinking. Pulse gave me that foundation.`,
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
    why: `I built GoShort specifically to learn Go from the ground up — not through tutorials, but by solving a real problem with it. URL shorteners are deceptively simple on the surface but introduce interesting questions: how do you guarantee uniqueness at scale? What's the right tradeoff between hashing speed and collision risk? How does Go's concurrency model compare to Python's async?\n\nUsing only the standard library was a deliberate constraint. I didn't want abstractions hiding how Go actually handles HTTP routing, JSON serialization, or concurrent request handling. The project is still evolving — I'm planning to add persistence and a proper analytics layer next.`,
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
    why: `Olive started as an exercise in front-end craft — I wanted to push myself on animations, layout polish, and visual storytelling without the complexity of a full backend. Product landing pages look simple but are actually difficult to get right: the spacing, the motion timing, the way content reveals on scroll.\n\nI used Framer Motion for the first time here and learned how much the right animation curve changes the feel of a page. It's a smaller project by scope, but it sharpened my eye for design-engineering intersection — which I think is underrated in backend-focused developers.`,
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

function WhyPopup({ text, onClose, triggerRef }) {
  const { displayed } = useTypewriter(text, true)
  const popupRef = useRef(null)

  // Position popup above or below trigger based on screen space
  useEffect(() => {
    if (!popupRef.current || !triggerRef.current) return
    const triggerRect = triggerRef.current.getBoundingClientRect()
    const popup = popupRef.current
    const spaceBelow = window.innerHeight - triggerRect.bottom
    const spaceAbove = triggerRect.top

    if (spaceBelow < 260 && spaceAbove > spaceBelow) {
      popup.style.bottom = '100%'
      popup.style.top = 'auto'
      popup.style.marginBottom = '0.5rem'
      popup.style.marginTop = '0'
    } else {
      popup.style.top = '100%'
      popup.style.bottom = 'auto'
      popup.style.marginTop = '0.5rem'
      popup.style.marginBottom = '0'
    }
  }, [triggerRef])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose, triggerRef])

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
            <p key={i}>{para}</p>
          ))}
        </div>
        {/* Absolute-overlay typing text content */}
        <div className="why-text-scroll-container">
          {displayed.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [openWhy, setOpenWhy] = useState(null) // project num of open popup
  const [revealed, setRevealed] = useState({})
  const triggerRefs = useRef({})

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
                    ref={(el) => { triggerRefs.current[p.num] = el }}
                    className={`project-link why-btn ${openWhy === p.num ? 'active' : ''}`}
                    onClick={() => setOpenWhy(openWhy === p.num ? null : p.num)}
                  >
                    ▸ Why Built
                  </button>
                  {openWhy === p.num && (
                    <WhyPopup
                      text={p.why}
                      onClose={() => setOpenWhy(null)}
                      triggerRef={{ current: triggerRefs.current[p.num] }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
