import './Experience.css'

const EXPERIENCE = [
  {
    role: 'Software Engineering Intern',
    company: 'AltissAdvance Tech Pvt. Ltd.',
    subtitle: 'Axentra OS',
    date: 'May 2026 – Present',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'MySQL', 'REST APIs', 'Postman'],
    bullets: [
      'Developed RESTful APIs using Python and FastAPI for tracking-related backend functionality.',
      'Implemented and tested API endpoints locally using Postman, ensuring correctness before deployment.',
      'Worked with PostgreSQL and MySQL for backend data storage, querying, and retrieval.',
      'Debugged and validated API functionality, resolving edge-case failures and submission issues.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section exp-section">
      <div className="container">
        <p className="section-label">// 04 — EXPERIENCE</p>
        <h2 className="section-title">WORK HISTORY</h2>

        <div className="exp-list">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="exp-card reveal">
              <div className="exp-card-accent" />

              <div className="exp-header">
                <div>
                  <p className="exp-company">
                    {e.company}
                    {e.subtitle && <span className="exp-subtitle"> · {e.subtitle}</span>}
                  </p>
                  <h3 className="exp-role">{e.role}</h3>
                </div>
                <span className="exp-date">{e.date}</span>
              </div>

              <div className="exp-tech">
                <span className="tech-prefix">TECH:</span>
                {e.tech.map((t) => (
                  <span key={t} className="exp-tech-tag">{t}</span>
                ))}
              </div>

              <ul className="exp-bullets">
                {e.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
