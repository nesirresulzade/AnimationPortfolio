import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import GithubButton from './GithubButton'
import TrueFocus from './TrueFocus'
import RotatingText from './RotatingText'

gsap.registerPlugin(ScrollTrigger)

const videos = ['/video/hero1.mp4', '/video/hero2.mp4']

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasClicked, setHasClicked] = useState(false)
  const [bgIndex, setBgIndex] = useState(0)

  const previewRef = useRef(null)
  const nextRef = useRef(null)

  const handleMiniVdClick = () => {
    setHasClicked(true)
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  // Switch video when user scrolls out of the hero section
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      onLeave: () => {
        setHasClicked(true)
        setCurrentIndex((prev) => (prev + 1) % videos.length)
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  // Video transition animation
  useGSAP(
    () => {
      if (!hasClicked) return

      gsap.set('#next-video', { visibility: 'visible', opacity: 0, scale: 0.98 })

      const tl = gsap.timeline({
        onStart: () => nextRef.current?.play(),
        onComplete: () => {
          // After the transition, make the background the new current video
          setBgIndex(currentIndex)
          // Hide overlay until the next switch
          gsap.set('#next-video', { visibility: 'hidden', opacity: 0 })
        },
      })

      tl.to('#next-video', {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power1.inOut',
      })
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

  // Title animation - on load and scroll
  useGSAP(() => {
    gsap.from('.hero-title-word', {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration: 1,
      ease: 'back.out(1.7)',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top center',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    })
  }, [])

  return (
    <section id="hero" className="relative h-dvh w-full overflow-hidden">
      {/* HERO FRAME */}
      <div id="hero-frame" className="relative h-dvh w-full overflow-hidden">
        {/* Background overlay removed to avoid dark screen on load */}

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
          className="relative h-full w-full cursor-pointer"
        >
          {/* Colored glow behind the circle */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(173,255,47,0.60),rgba(173,255,47,0.35),transparent_70%)] blur-2xl opacity-80"
          />

          <video
            ref={previewRef}
            src={videos[(currentIndex + 1) % videos.length]}
            id="current-video"
            className="h-64 w-64 rounded-full object-cover ring-4 ring-[rgba(173,255,47,0.65)] shadow-[0_0_36px_rgba(173,255,47,0.45)]"
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
            <TrueFocus
              sentence="Frontend Developer"
              separator=" "
              manualMode={false}
              blurAmount={6}
              borderColor="#00d4ff"
              glowColor="rgba(0, 212, 255, 0.8)"
              animationDuration={0.6}
              pauseBetweenAnimations={1.5}
              wordStyles={[
                { className: 'water-text text-4xl md:text-6xl drop-shadow-xl' },
                { className: 'gradient-text text-4xl md:text-6xl drop-shadow-xl' }
              ]}
            />
          </div>

          {/* RIGHT INTRO */}
          <div className="pointer-events-auto text-right">
            <div
              id="intro-text"
              className="text-white drop-shadow-2xl"
            >
              <p className="text-base font-medium opacity-90 text-black">
                Hi, I'm
              </p>
              <p className="mt-1 text-4xl font-bold name-gradient">
                Nasir Rasulzada
              </p>
              <p className="mt-1 text-lg font-semibold">
                <RotatingText
                  texts={[
                    'Frontend Developer',
                    'React Engineer',
                    'UI Animation Lover',
                    'Creative Coder'
                  ]}
                  rotationInterval={2500}
                  stagger={0.05}
                  className="text-indigo-400 drop-shadow-[0_2px_8px_rgba(99,102,241,0.8)]"
                />
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
