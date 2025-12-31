import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import GithubButton from './GithubButton';

gsap.registerPlugin(ScrollTrigger);

const ProjectCarousel = ({ projects }) => {
  const headerRef = useRef(null);
  const techRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef([]);
  const stackRef = useRef(null);
  const intervalRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredStackIndex, setHoveredStackIndex] = useState(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    if (headerRef.current) {
      tl.fromTo(headerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0);
    }
    if (techRef.current) {
      tl.fromTo(techRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, 0.2);
    }
    if (stackRef.current) {
      tl.fromTo(stackRef.current.children, { opacity: 0, x: 200, rotateZ: -5 }, { opacity: 1, x: 0, rotateZ: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, 0.4);
    }
  }, []);

  // initial active card entrance
  useGSAP(() => {
    if (cardsRef.current[0]) {
      gsap.fromTo(cardsRef.current[0], { opacity: 0, x: 100, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power2.out', delay: 0.5 });
    }
  }, []);

  // auto rotate
  useEffect(() => {
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          setPrevIndex(prev);
          return (prev + 1) % projects.length;
        });
      }, 3000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovering]);

  useGSAP(() => {
    const tl = gsap.timeline();
    if (prevIndex !== null && cardsRef.current[prevIndex]) {
      tl.to(cardsRef.current[prevIndex], { x: 800, scale: 0.8, opacity: 0, duration: 0.6, ease: 'power2.in' });
    }
    if (cardsRef.current[activeIndex]) {
      tl.fromTo(cardsRef.current[activeIndex], { x: 800, scale: 0.8, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4');
    }
    if (titleRef.current[activeIndex]) {
      tl.fromTo(titleRef.current[activeIndex], { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.6');
    }
    if (stackRef.current) {
      gsap.to(stackRef.current.children, { x: 0, duration: 0.8, ease: 'power2.inOut', stagger: 0.1 });
    }
  }, [activeIndex, prevIndex]);

  const stackProjects = [];
  for (let i = 1; i < projects.length; i++) stackProjects.push(projects[(activeIndex + i) % projects.length]);

  return (
    <div className="mx-auto max-w-7xl px-6 h-screen flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left - header + active card */}
        <div className="space-y-8">
          <div className="relative flex flex-col items-start gap-5">
            <p ref={headerRef} className="text-xl md:text-2xl uppercase text-slate-300 font-bold tracking-wide">Projects</p>
            <p ref={techRef} className="text-lg md:text-xl text-slate-300 font-semibold">Built with: <span className="text-yellow-400">React</span> • <span className="text-cyan-400"> GSAP</span> • <span className="text-purple-400"> Tailwind</span> • <span className="text-green-400"> JavaScript</span></p>
          </div>

          <div className="relative h-[600px] w-full" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            {projects.map((project, index) => (
              <div key={project.id} ref={(el) => (cardsRef.current[index] = el)} className={`absolute inset-0 transition-opacity ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                <div className="h-full w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 shadow-2xl border border-slate-600">
                  <div className="relative h-3/4 overflow-hidden">
                    <img src={project.src} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="h-1/3 flex flex-col items-start justify-start pt-3 px-6 pb-6 gap-5">
                    <h3 ref={(el) => (titleRef.current[activeIndex] = el)} className="text-2xl font-bold text-white">{project.title}</h3>
                    <div className="flex items-center gap-3">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-12"><span>Demo</span></a>
                      <GithubButton href={project.github} label="Code" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - stack preview */}
        <div className="hidden lg:flex items-center justify-center relative h-[500px]">
          <div ref={stackRef} className="relative w-full h-full flex items-center justify-center">
            {stackProjects.map((project, idx) => {
              const index = idx;
              const originalIndex = projects.findIndex((p) => p.id === project.id);
              const baseLeft = 120;
              const baseTop = 40;
              const normalSpacingX = 32;
              const hoverSpacingX = 36; // subtle extra horizontal spacing when hovering
              const normalSpacingY = 28;
              const hoverSpacingY = 32; // subtle extra vertical spacing when hovering

              const spacingX = hoveredStackIndex !== null ? hoverSpacingX : normalSpacingX;
              const spacingY = hoveredStackIndex !== null ? hoverSpacingY : normalSpacingY;

              const left = baseLeft + index * spacingX;
              const top = baseTop + index * spacingY;

              const rotate = -8 + index * 4;
              const baseScale = 1 - index * 0.03;
              const hoverMultiplier = hoveredStackIndex === index ? 1.01 : 1; // very subtle scale on hover
              const scale = baseScale * hoverMultiplier;
              const opacity = Math.max(0.15, 1 - index * 0.06);
              const zIndex = 1000 - index; // keep original stacking order, no pop-forward

              return (
                <div
                  key={`${project.id}-${index}`}
                  onMouseEnter={() => { setIsHovering(true); setHoveredStackIndex(index); }}
                  onMouseLeave={() => { setIsHovering(false); setHoveredStackIndex(null); }}
                  onClick={() => { setPrevIndex(activeIndex); setActiveIndex(originalIndex); }}
                  className="absolute rounded-xl overflow-hidden shadow-2xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-800 transition-all duration-300 ease-out"
                  style={{ width: '300px', height: '380px', left: `${left}px`, top: `${top}px`, zIndex, transform: `rotate(${rotate}deg) scale(${scale})`, opacity, cursor: 'pointer' }}
                >
                  <img src={project.src} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4"><p className="text-sm font-semibold text-white">{project.title}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
