// About.jsx
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import GithubButton from './GithubButton';

gsap.registerPlugin(ScrollTrigger);

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
];

const About = () => {
  const headerRef = useRef(null);
  const techRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const cardsRef = useRef([]);
  const titleRef = useRef([]);
  const stackRef = useRef(null);
  const intervalRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0
      );
    }
    
    if (techRef.current) {
      tl.fromTo(
        techRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        0.2
      );
    }
    
    // Stack cards entrance animation on load
    if (stackRef.current) {
      tl.fromTo(
        stackRef.current.children,
        { opacity: 0, x: 200, rotateZ: -5 },
        { opacity: 1, x: 0, rotateZ: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
        0.4
      );
    }
  }, []);

  // Initial active card animation on load
  useGSAP(() => {
    if (cardsRef.current[0]) {
      gsap.fromTo(
        cardsRef.current[0],
        { opacity: 0, x: 100, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
      );
    }
  }, []);

  // Automatic card rotation with hover pause
  useEffect(() => {
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          setPrevIndex(prev);
          return (prev + 1) % projects.length;
        });
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering]);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Exit animation for previous active card (move to right stack)
    if (prevIndex !== null && cardsRef.current[prevIndex]) {
      tl.to(cardsRef.current[prevIndex], {
        x: 800,
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
      });
    }

    // Entrance animation for new active card (from right)
    if (cardsRef.current[activeIndex]) {
      tl.fromTo(
        cardsRef.current[activeIndex],
        { x: 800, scale: 0.8, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // Animate title with scale and opacity
    if (titleRef.current[activeIndex]) {
      tl.fromTo(
        titleRef.current[activeIndex],
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.6'
      );
    }

    // Animate right stack cards with smooth transition
    if (stackRef.current) {
      gsap.to(stackRef.current.children, {
        x: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        stagger: 0.1,
      });
    }
  }, [activeIndex, prevIndex]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20"
    >
      <div className="mx-auto max-w-7xl px-6 h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Header + Active Card */}
          <div className="space-y-8">
            {/* Header */}
            <div className="relative flex flex-col items-start gap-5">
              <p ref={headerRef} className="text-xl md:text-2xl uppercase text-slate-300 font-bold tracking-wide">
                Projects
              </p>
              <p ref={techRef} className="text-lg md:text-xl text-slate-300 font-semibold">
                Built with: <span className="text-yellow-400">React</span> •
                <span className="text-cyan-400"> GSAP</span> •
                <span className="text-purple-400"> Tailwind</span> •
                <span className="text-green-400"> JavaScript</span>
              </p>
            </div>

            {/* Active Card Display */}
            <div 
              className="relative h-[600px] w-full"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`absolute inset-0 transition-opacity ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                >
                  <div className="h-full w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 shadow-2xl border border-slate-600">
                    {/* Image */}
                    <div className="relative h-3/4 overflow-hidden">
                      <img
                        src={project.src}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="h-1/3 flex flex-col items-start justify-start pt-3 px-6 pb-6 gap-5">
                      <h3 
                        ref={(el) => (titleRef.current[activeIndex] = el)}
                        className="text-2xl font-bold text-white"
                      >
                        {project.title}
                      </h3>
                      <div className="flex">
                        <div className="scale-[0.65] origin-left">
                          <button
                            onClick={() => window.open(project.demo, '_blank', 'noopener,noreferrer')}
                            className="animated-button"
                            style={{ color: '#fbbf24', borderColor: 'rgba(251, 191, 36, 0.3)' }}
                          >
                            <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                            <span className="text">Demo</span>
                            <span className="circle"></span>
                            <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                            </svg>
                          </button>
                        </div>
                        <div className="scale-[0.65] origin-left">
                          <GithubButton
                            href={project.github}
                            label="Code"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Stack Preview */}
          <div className="hidden lg:flex items-center justify-center relative h-[500px]">
            <div ref={stackRef} className="relative w-full h-full flex items-center justify-end">
              {[1, 2, 3, 4].map((offset) => {
                const project = projects[(activeIndex + offset) % projects.length];
                const index = 3 - (offset - 1);

                const baseLeft = 150; // Soldan başlanğıc boşluq (px)
                const gap = 100; // Kartlar arası məsafə

                return (
                  <div
                    key={`${project.id}-${offset}`}
                    className="absolute rounded-xl overflow-hidden shadow-lg border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 transition-all duration-700 ease-out"
                    style={{
                      width: '280px',
                      height: '350px',
                      left: `${baseLeft + index * gap}px`, // burda soldan məsafəni tənzimlədik
                      top: `calc(50% - 175px + ${index * (-25)}px)`,
                      zIndex: 10 - index,
                      transform: `rotate(${index * 4}deg) scale(${1 - index * 0.08})`,
                      opacity: 1 - index * 0.15,
                    }}
                  >
                    <img
                      src={project.src}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-sm font-semibold text-white">{project.title}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
