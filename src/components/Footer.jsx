import { FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="w-screen bg-gradient-to-t from-slate-200/60 to-transparent py-10 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-slate-900">Nasir Rasulzada</p>
            <p className="text-slate-600">
              <span className="inline-block animate-pulse text-emerald-600 font-semibold">Frontend Developer</span>
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
            <a href="#about" className="relative group px-1 py-0.5 text-slate-600 transition-colors duration-300 hover:text-emerald-300">
              Projects
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>

            <a href="#skills" className="relative group px-1 py-0.5 text-slate-600 transition-colors duration-300 hover:text-emerald-300">
              Tech Stack
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>

            <a href="#contact" className="relative group px-1 py-0.5 text-slate-600 transition-colors duration-300 hover:text-emerald-300">
              Contact
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>

            <a href="#root" className="relative group px-1 py-0.5 text-slate-600 transition-colors duration-300 hover:text-emerald-300">
              Top
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          </nav>

          {/* Socials - Uiverse style */}
          <ul className="wrapper footer-wrapper mt-4 md:mt-6">
            <li className="icon github footer-icon">
              <span className="tooltip">GitHub</span>
              <a
                href="https://github.com/nesirresulzade"
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
                href="https://www.linkedin.com/in/nasir-rasulzada-28a6b7392/"
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
                href="https://www.instagram.com/resulzade_nesir?igsh=MWZvYzJrdHd3NWYyYw=="
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
            © {new Date().getFullYear()} Nasir Rasulzada. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
