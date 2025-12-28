import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true)
  const [showLoader, setShowLoader] = useState(true)
  const doneRef = useRef(false)
  const fadeTimer = useRef(null)

  useEffect(() => {
    const FADE_DURATION = 560

    const hideAfterFade = () => {
      if (doneRef.current) return
      doneRef.current = true
      setLoading(false)
      fadeTimer.current = setTimeout(() => setShowLoader(false), FADE_DURATION)
    }

    window.addEventListener('load', hideAfterFade)
    const fallback = setTimeout(hideAfterFade, 6000)

    return () => {
      window.removeEventListener('load', hideAfterFade)
      clearTimeout(fallback)
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-slate-900">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Contact />
      <Footer />
      {showLoader && <Loader fade={!loading} />}
    </div>
  )
}

export default App
