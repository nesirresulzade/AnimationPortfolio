// About.jsx
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

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
  const cardsRef = useRef([]);
  const stackRef = useRef(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );
    }
    if (techRef.current) {
      gsap.from(techRef.current, {
        opacity: 0,
        x: -30,
        scrollTrigger: {
          trigger: techRef.current,
          start: 'top center+=100',
          end: 'center center',
          scrub: 0.5,
        },
        duration: 1,
        ease: 'power2.out',
      });
    }
  }, []);

  // Automatic card rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % projects.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
            <div className="relative h-[500px] w-full">
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
                    <div className="h-1/4 flex flex-col items-start justify-center p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <div className="flex gap-3">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1 bg-yellow-500 text-black text-sm font-semibold rounded hover:bg-yellow-400 transition"
                        >
                          Demo
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-1 bg-cyan-500 text-black text-sm font-semibold rounded hover:bg-cyan-400 transition"
                        >
                          Code
                        </a>
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
