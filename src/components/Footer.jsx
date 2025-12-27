import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="w-screen bg-gradient-to-t from-slate-200/60 to-transparent py-10 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-slate-900">NR Portfolio</p>
            <p className="text-slate-600">Frontend Developer • React • GSAP • Tailwind</p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
            <a href="#about" className="hover:text-yellow-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-yellow-500 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-yellow-500 transition-colors">Contact</a>
            <a href="#root" className="hover:text-yellow-500 transition-colors">Top</a>
          </nav>

          {/* Socials - Uiverse style */}
          <ul className="wrapper footer-wrapper mt-4 md:mt-6">
            <li className="icon github footer-icon">
              <span className="tooltip">GitHub</span>
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-black"
              >
                <FiGithub style={{ fontSize: '1.4em' }} />
              </a>
            </li>
            <li className="icon linkedin footer-icon">
              <span className="tooltip">LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/your-username"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#0A66C2]"
              >
                <FiLinkedin style={{ fontSize: '1.4em' }} />
              </a>
            </li>
            <li className="icon instagram footer-icon">
              <span className="tooltip">Instagram</span>
              <a
                href="https://instagram.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#e4405f]"
              >
                <FiInstagram style={{ fontSize: '1.4em' }} />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <p className="text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} NR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
