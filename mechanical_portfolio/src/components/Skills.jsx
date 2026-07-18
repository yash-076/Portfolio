import './Skills.css'

const SKILLS = [
  {
    cat: 'LANGUAGES',
    icon: '{ }',
    tags: ['C++', 'Python', 'JavaScript', 'Golang', 'SQL'],
  },
  {
    cat: 'BACKEND',
    icon: '⚙',
    tags: ['FastAPI', 'Node.js', 'REST APIs', 'WebSockets', 'Apache Kafka'],
  },
  {
    cat: 'FRONTEND',
    icon: '◈',
    tags: ['React.js', 'Next.js', 'TailwindCSS', 'HTML / CSS'],
  },
  {
    cat: 'DATABASES',
    icon: '▦',
    tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    cat: 'CS CORE',
    icon: '⬡',
    tags: ['DSA', 'OOP', 'Operating Systems', 'DBMS', 'Computer Networks', 'SDLC'],
  },
  {
    cat: 'TOOLS',
    icon: '⌥',
    tags: ['Git', 'GitHub', 'Linux', 'Postman', 'Docker'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <p className="section-label">// 02 — SKILLS</p>
        <h2 className="section-title">TECH STACK</h2>

        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <div
              key={s.cat}
              className="skill-card reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="skill-card-header">
                <span className="skill-icon">{s.icon}</span>
                <span className="skill-cat">{s.cat}</span>
              </div>
              <div className="skill-tags">
                {s.tags.map((tag) => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
