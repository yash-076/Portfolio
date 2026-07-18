import './About.css'

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <p className="section-label">// 01 — ABOUT</p>

        <div className="about-grid">
          {/* Code Block */}
          <div className="code-block reveal">
            <div className="code-header">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="file-name">developer.profile.js</span>
            </div>
            <pre className="code-body">
              <code>
                <span className="kw">const</span> <span className="fn">developer</span> <span className="op">=</span> {'{'}{'\n'}
                {'  '}<span className="prop">name</span><span className="op">:</span>       <span className="str">"Yash Rastogi"</span><span className="punc">,</span>{'\n'}
                {'  '}<span className="prop">university</span><span className="op">:</span>  <span className="str">"HBTU, Kanpur"</span><span className="punc">,</span>{'\n'}
                {'  '}<span className="prop">degree</span><span className="op">:</span>     <span className="str">"B.Tech IT"</span><span className="punc">,</span>{'\n'}
                {'  '}<span className="prop">batch</span><span className="op">:</span>      <span className="str">"2023 - 2027"</span><span className="punc">,</span>{'\n'}
                {'  '}<span className="prop">focus</span><span className="op">:</span> <span className="punc">[</span>{'\n'}
                {'    '}<span className="str">"Backend Development"</span><span className="punc">,</span>{'\n'}
                {'    '}<span className="str">"System Architecture"</span><span className="punc">,</span>{'\n'}
                {'    '}<span className="str">"Full Stack Development"</span><span className="punc">,</span>{'\n'}
                {'    '}<span className="str">"Competitive Programming"</span>{'\n'}
                {'  '}<span className="punc">],</span>{'\n'}
                {'  '}<span className="prop">status</span><span className="op">:</span>     <span className="kw">open_for_collaboration</span><span className="punc">,</span>{'\n'}
                {'  '}<span className="cmt">{'// Currently @ AltissAdvance Tech'}</span>{'\n'}
                {'}'}
                <span className="op">;</span>
              </code>
            </pre>
          </div>

          {/* Bio */}
          <div className="about-bio reveal">
            <h2 className="about-heading">BUILDING<br />SYSTEMS THAT<br />SCALE.</h2>
            <p>
              I'm an <strong>Information Technology student</strong> at Harcourt Butler Technical University, Kanpur, with a strong interest in backend engineering and building software that's reliable, scalable, and easy to maintain.
            </p>

            <p>
              I enjoy developing systems that solve real problems from real-time security monitoring platforms using <strong>Kafka</strong> and <strong>WebSockets</strong> to backend services and APIs. I'm always looking for ways to improve performance, simplify architecture, and write clean, efficient code.
            </p>

            <p>
              Beyond development, I actively practice <strong>competitive programming</strong>. I'm a LeetCode Knight with <strong>1400+</strong> problems solved and achieved a global contest rank of <strong>1,761</strong> out of more than <strong>39,000</strong> participants, which has strengthened my problem-solving skills and algorithmic thinking.
            </p>

            <div className="about-links">
              <a href="https://github.com/yash-076" target="_blank" rel="noreferrer" className="about-link">
                ↗ GitHub
              </a>
              <a href="https://www.linkedin.com/in/yashrastogi11/" target="_blank" rel="noreferrer" className="about-link">
                ↗ LinkedIn
              </a>
              <a href="https://leetcode.com/u/Yash955/" target="_blank" rel="noreferrer" className="about-link">
                ↗ LeetCode
              </a>
              <a href="mailto:smediayash@gmail.com" className="about-link">
                ↗ Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
