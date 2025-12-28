import { useState, useEffect } from 'react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = ['contact', 'skills', 'about', 'hero']
      const scrollY = window.scrollY + 120

      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && scrollY >= el.offsetTop) {
          setActiveSection(id)
          return
        }
      }
      setActiveSection('hero')
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const sectionId = href.replace('#', '')
    const element = document.getElementById(sectionId)

    if (element) {
      setActiveSection(sectionId)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'Projects' },
    { href: '#skills', label: 'Tech Stack' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[rgba(0,0,0,0.65)] backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 text-white group">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm font-bold text-black shadow-lg transition-all duration-300 group-hover:shadow-emerald-400/50">
            NR
          </span>
          <span className="hidden sm:inline-block font-bold tracking-wide">
            Nasir Rasulzada
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map(link => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300
                  ${isActive ? 'text-emerald-400' : 'text-white/80 hover:text-emerald-300'}
                `}
              >
                {link.label}

                {/* Underline */}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] w-full origin-left rounded-full
                    bg-gradient-to-r from-emerald-400 to-cyan-400
                    transition-transform duration-300 ease-out
                    ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `}
                />
              </a>
            )
          })}
        </div>

        {/* Mobile Button */}
        <button className="lg:hidden p-2 text-white">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      </div>
    </nav>
  )
}

export default Navbar
