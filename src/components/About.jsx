import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import AnimatedTitle from './AnimatedTitle'
import { useRef, useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { 
    id: 1, 
    src: '/imgs/myProject/bigFinalApp.png', 
    title: 'E-commerce Website',
    demo: 'https://example.com/demo1',
    github: 'https://github.com/yourrepo/project1'
  },
  { 
    id: 2, 
    src: '/imgs/myProject/bookShop.png', 
    title: 'Book Shop',
    demo: 'https://example.com/demo2',
    github: 'https://github.com/yourrepo/project2'
  },
  { 
    id: 3, 
    src: '/imgs/myProject/brainquizSite.png', 
    title: 'Brain Quiz',
    demo: 'https://example.com/demo3',
    github: 'https://github.com/yourrepo/project3'
  },
  { 
    id: 4, 
    src: '/imgs/myProject/currency.png', 
    title: 'Currency Converter',
    demo: 'https://example.com/demo4',
    github: 'https://github.com/yourrepo/project4'
  },
  { 
    id: 5, 
    src: '/imgs/myProject/musicMobilApp.png', 
    title: 'Music App',
    demo: 'https://example.com/demo5',
    github: 'https://github.com/yourrepo/project5'
  },
  { 
    id: 6, 
    src: '/imgs/myProject/pokemon.png', 
    title: 'Pokemon Game',
    demo: 'https://example.com/demo6',
    github: 'https://github.com/yourrepo/project6'
  },
  { 
    id: 7, 
    src: '/imgs/myProject/projects-1.png', 
    title: 'Weather App',
    demo: 'https://example.com/demo7',
    github: 'https://github.com/yourrepo/project7'
  },
  { 
    id: 8, 
    src: '/imgs/myProject/projects-2.png', 
    title: 'HangMan Game',
    demo: 'https://example.com/demo8',
    github: 'https://github.com/yourrepo/project8'
  },
  { 
    id: 9, 
    src: '/imgs/myProject/projects-3.png', 
    title: 'Bonus Card',
    demo: 'https://example.com/demo9',
    github: 'https://github.com/yourrepo/project9'
  },
  { 
    id: 10, 
    src: '/imgs/myProject/ReactWithWeather.png', 
    title: 'React Weather App',
    demo: 'https://example.com/demo10',
    github: 'https://github.com/yourrepo/project10'
  },
  { 
    id: 11, 
    src: '/imgs/myProject/usePanel.png', 
    title: 'usePanel',
    demo: 'https://example.com/demo11',
    github: 'https://github.com/yourrepo/project11'
  },
]

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null)
  const imageRef = useRef(null)

  useGSAP(() => {
    // Clip-path animation: starts small, expands on scroll
    gsap.from(imageRef.current, {
      clipPath: 'polygon(20% 0%, 80% 0%, 80% 100%, 20% 100%)',
      opacity: 0,
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top center+=100',
        end: 'center center',
        scrub: 0.5,
        markers: false,
      },
      duration: 1,
      ease: 'power2.out',
    })

    // Parallax 3D effect
    gsap.from(cardRef.current, {
      rotationY: 15,
      rotationX: -10,
      y: 50,
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top center+=100',
        end: 'center center',
        scrub: 0.5,
        markers: false,
      },
      duration: 1,
      ease: 'power2.out',
    })
  })

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg transition-all duration-300 hover:shadow-2xl"
      style={{ perspective: '1000px' }}
    >
      {/* Image Container with Clip-path */}
      <div 
        ref={imageRef}
        className="relative h-64 w-full overflow-hidden rounded-xl"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      >
        <img
          src={project.src}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-4 text-center">{project.title}</h3>
        
        {/* Buttons */}
        <div className="flex gap-2">
          {/* Live Demo Button - Yellow */}
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-demo flex-1 text-center py-2 px-3"
          >
            <span>Demo</span>
          </a>

          {/* GitHub Button - Cyan */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-github flex-1 text-center py-2 px-3"
          >
            <span>Code</span>
          </a>
        </div>
      </div>
    </div>
  )
}

const About = () => {
  const headerRef = useRef(null)
  const techRef = useRef(null)

  useGSAP(() => {
    // Header text animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
    }
  }, [])

  useGSAP(() => {
    // Technologies text animation on scroll
    gsap.from(techRef.current, {
      opacity: 0,
      x: -30,
      scrollTrigger: {
        trigger: techRef.current,
        start: 'top center+=100',
        end: 'center center',
        scrub: 0.5,
        markers: false,
      },
      duration: 1,
      ease: 'power2.out',
    })
  })

  return (
    <section id="about" className="min-h-screen w-screen bg-gradient-to-b from-transparent to-slate-200/60 py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="relative mb-16 flex flex-col items-center gap-5">
          <p ref={headerRef} className="text-xl md:text-2xl uppercase text-slate-300 font-bold tracking-wide">Projects</p>
          {/* <AnimatedTitle
            title={"My <b>l</b>atest <br /> <b>w</b>ork"}
            containerClass="mt-5 text-center"
          /> */}
          <div className="text-center">
            <p ref={techRef} className="text-lg md:text-xl text-slate-300 font-semibold mt-6">
              Built with: <span className="text-yellow-400">React</span> • <span className="text-cyan-400">GSAP</span> • <span className="text-purple-400">Tailwind</span> • <span className="text-green-400">JavaScript</span>
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
