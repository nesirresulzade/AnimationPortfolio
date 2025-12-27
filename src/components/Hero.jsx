import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import GithubButton from './GithubButton'

gsap.registerPlugin(ScrollTrigger)

const videos = ['/video/hero1.mp4', '/video/hero2.mp4']

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasClicked, setHasClicked] = useState(false)

  const previewRef = useRef(null)
  const nextRef = useRef(null)

  const handleMiniVdClick = () => {
    setHasClicked(true)
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  // Video transition animation
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set('#next-video', { visibility: 'visible' })

        gsap.to('#next-video', {
          scale: 1,
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'power1.inOut',
          onStart: () => nextRef.current?.play(),
        })

        gsap.from('#current-video', {
          scale: 0,
          duration: 1.2,
          ease: 'power1.inOut',
        })
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  )

  // Hero shape animation
  useGSAP(() => {
    gsap.set('#hero-frame', {
      clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
      borderRadius: '0% 0% 40% 10%',
    })

    gsap.from('#hero-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0% 0% 0% 0%',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#hero-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    })
  })

  const bgIndex = currentIndex === videos.length - 1 ? 0 : currentIndex

  // Intro text animation
  useGSAP(() => {
    gsap.from('#intro-text > *', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
    })
  }, [])

  return (
    <section id="hero" className="relative h-dvh w-full overflow-hidden">
      {/* HERO FRAME */}
      <div id="hero-frame" className="relative h-dvh w-full overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 z-10 bg-black/40" />

        {/* Next video */}
        <video
          ref={nextRef}
          src={videos[currentIndex]}
          id="next-video"
          className="invisible absolute inset-0 z-20 h-full w-full object-cover"
          muted
          autoPlay
          loop
          playsInline
        />

        {/* Background video */}
        <video
          src={videos[bgIndex]}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* CLICKABLE PREVIEW */}
      <div className="absolute-center z-30 pointer-events-auto h-64 w-64">
        <div
          onClick={handleMiniVdClick}
          className="h-full w-full cursor-pointer"
        >
          <video
            ref={previewRef}
            src={videos[(currentIndex + 1) % videos.length]}
            id="current-video"
            className="h-64 w-64 rounded-full object-cover ring-4 ring-white/20"
            muted
            autoPlay
            loop
            playsInline
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="pointer-events-none absolute inset-0 z-40 flex items-center">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-2">
          
          {/* LEFT TITLE */}
          <div className="pointer-events-auto">
            <h2 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-xl md:text-6xl">
              <span>Frontend</span>{' '}
              <span className="text-indigo-400">Developer</span>
            </h2>
          </div>

          {/* RIGHT INTRO */}
          <div className="pointer-events-auto text-right">
            <div
              id="intro-text"
              className="text-white drop-shadow-2xl"
            >
              <p className="text-base font-medium opacity-90">
                Hi, I'm
              </p>
              <p className="mt-1 text-4xl font-bold">
                Nasir Rasulzada
              </p>
              <p className="mt-1 text-lg font-semibold text-indigo-300">
                Frontend Developer
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <a
                href="/myCV/Nasir_Rasulzada.pdf"
                download
                className="btn-12"
              >
                <span>Download CV</span>
              </a>

              <GithubButton
                href="https://github.com/NasirRasulzada"
                label="My GitHub"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
