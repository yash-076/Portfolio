import './Achievements.css'

const ACHIEVEMENTS = [
  {
    icon: '★',
    title: 'LeetCode Knight — 1880+ Rating',
    desc: 'Solved 1400+ problems across LeetCode, Codeforces, CodeChef, and GeeksforGeeks. Consistently maintaining Knight-tier standing.',
    badge: 'COMPETITIVE',
  },

  {
    icon: '▲',
    title: 'IICPC 2026 Prelims — Rank 2375',
    desc: 'Secured Rank 2375 among 13,000+ participants nationwide in IICPC 2026 Prelims, placing in the top tier.',
    badge: 'ICPC',
  },
  {
    icon: '⬡',
    title: 'Flipkart GridLock 2.0 — Round 2 Qualifier',
    desc: 'Qualified for Round 2 out of 109K+ submissions and 10K+ teams in the Machine Learning challenge.',
    badge: 'HACKATHON',
  },
  {
    icon: '◈',
    title: 'Reliance Foundation Scholar',
    desc: 'Selected among the top 5,000 students nationwide from a highly competitive all-India applicant pool.',
    badge: 'SCHOLARSHIP',
  },
  {
    icon: '⬢',
    title: 'JEE Advanced 2023 — AIR 17,423',
    desc: 'Qualified one of the toughest engineering entrances globally, placing in the top tier of candidates.',
    badge: 'ACADEMICS',
  },
  {
    icon: '◇',
    title: 'JEE Main 2023 — AIR 27,318',
    desc: 'Secured an All India Rank of 27,318 out of 1.1+ million candidates.',
    badge: 'ACADEMICS',
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="section ach-section">
      <div className="container">
        <p className="section-label">// 06 — ACHIEVEMENTS</p>
        <h2 className="section-title">MILESTONES</h2>

        <div className="ach-list">
          {ACHIEVEMENTS.map((a, i) => (
            <div
              key={i}
              className="ach-item reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="ach-icon">{a.icon}</span>
              <div className="ach-content">
                <p className="ach-title">{a.title}</p>
                <p className="ach-desc">{a.desc}</p>
              </div>
              <span className="ach-badge">{a.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
