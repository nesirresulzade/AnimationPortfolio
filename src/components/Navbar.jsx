const Navbar = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-6xl items-center justify-between px-6 py-4 bg-white/5 backdrop-blur">
      <a href="#" className="flex items-center gap-2 text-slate-900 font-semibold">
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">NR</span>
        <span>Nasir Rasulzada</span>
      </a>
      <div className="hidden gap-6 text-sm text-slate-700 md:flex">
        <a href="#about" className="hover:text-slate-900 transition">About</a>
        <a href="#projects" className="hover:text-slate-900 transition">Projects</a>
        <a href="#contact" className="hover:text-slate-900 transition">Contact</a>
      </div>
    </nav>
  )
}

export default Navbar
