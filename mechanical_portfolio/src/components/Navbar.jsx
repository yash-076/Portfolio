import { useState, useEffect } from 'react'
import './Navbar.css'

const links = ['About', 'Skills', 'Education', 'Experience', 'Projects', 'Achievements', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#hero" className="nav-logo">
          <span className="logo-bracket">[</span>
          <span className="logo-mono">YR</span>
          <span className="logo-bracket">]</span>
          &nbsp;YASH RASTOGI
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} onClick={handleLink}>
                {link.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`nav-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
