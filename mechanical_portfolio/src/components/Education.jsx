import './Education.css'

const EDU = [
  {
    degree: 'B.Tech — Information Technology',
    institution: 'Harcourt Butler Technical University, Kanpur',
    score: '8.65 CGPA',
    year: '2023 – 2027',
    current: true,
  },
  {
    degree: 'Senior Secondary (Class XII)',
    institution: 'CBSE Board',
    score: '94.6%',
    year: '2021 – 2022',
    current: false,
  },
  {
    degree: 'Secondary (Class X)',
    institution: 'CBSE Board',
    score: '90.6%',
    year: '2019 – 2020',
    current: false,
  },
]

export default function Education() {
  return (
    <section id="education" className="section edu-section">
      <div className="container">
        <p className="section-label">// 03 — EDUCATION</p>
        <h2 className="section-title">ACADEMIC RECORD</h2>

        <div className="edu-list">
          {EDU.map((e, i) => (
            <div key={i} className="edu-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              {e.current && <span className="edu-current-badge">CURRENT</span>}
              <div className="edu-card-inner">
                <div className="edu-left">
                  <h3 className="edu-degree">{e.degree}</h3>
                  <p className="edu-institution">{e.institution}</p>
                </div>
                <div className="edu-right">
                  <span className="edu-score">{e.score}</span>
                  <span className="edu-year">{e.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
