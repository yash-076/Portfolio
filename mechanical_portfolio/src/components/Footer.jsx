import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-text">
          © 2026&nbsp;<span className="footer-name">YASH RASTOGI</span>
          &nbsp;-&nbsp;B.TECH IT · HBTU · ALL RIGHTS RESERVED
        </p>
        <div className="footer-links">
          <a href="https://github.com/yash-076" target="_blank" rel="noreferrer">GitHub</a>
          <span className="footer-dot">·</span>
          <a href="https://www.linkedin.com/in/yashrastogi11/" target="_blank" rel="noreferrer">LinkedIn</a>
          <span className="footer-dot">·</span>
          <a href="mailto:smediayash@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  )
}
