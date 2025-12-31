import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import GithubButton from './GithubButton'
import TrueFocus from './TrueFocus'
import RotatingText from './RotatingText'
import HexagonGrid from './Hexagon-grid'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
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

  return (
    <section id="hero" className="relative h-dvh w-full overflow-hidden">
      {/* HERO FRAME */}
      <div id="hero-frame" className="relative h-dvh w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HexagonGrid />
        </div>
      </div>

      {/* CONTENT */}
      <div className="pointer-events-none absolute inset-0 z-40 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">

          {/* MAIN CONTENT */}
          <div className="pointer-events-auto mt-8 flex flex-col items-center">

            {/* ✅ Frontend Developer — Hi, I'm üstündə */}
            <div className="mb-2">
                <TrueFocus
                  direction="row"
                  sentence="Frontend Developer"
                  separator=" "
                  manualMode={false}
                  blurAmount={6}
                  borderColor="#00d4ff"
                  glowColor="rgba(0, 212, 255, 0.8)"
                  animationDuration={0.6}
                  pauseBetweenAnimations={1.5}
                  wordStyles={[
                    { className: 'water-text text-4xl md:text-7xl drop-shadow-2xl' },
                    { className: 'live-green-text text-4xl md:text-7xl drop-shadow-2xl' }
                  ]}
                />
                <div className="h-10" />
            </div>

            {/* Hi I'm */}
            <p className="text-lg md:text-xl font-semibold opacity-95 text-black tracking-tight">
              Hi, I'm
            </p>

            {/* Name */}
            <p className="mt-1 text-4xl md:text-5xl font-bold">
              <span className="water-text">Nasir&nbsp;</span>
              <span className="live-green-text">Rasulzada</span>
            </p>

            {/* Rotating text */}
            <div className="mt-4">
              <RotatingText
                texts={[
                  'React Developer',
                  'UI Animation Lover',
                  'Creative Coder'
                ]}
                rotationInterval={2500}
                stagger={0.05}
                className="text-black text-lg md:text-xl font-semibold drop-shadow-[0_2px_8px_rgba(99,102,241,0.08)]"
              />
            </div>

            {/* Buttons */}
            <div className="mt-8 flex items-center justify-between max-w-sm w-full">
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
