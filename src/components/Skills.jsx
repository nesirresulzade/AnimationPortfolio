import React, { useEffect, useRef, useState } from 'react'
import { SiReact, SiJavascript, SiTailwindcss, SiGit, SiRedux, SiTypescript, SiVite, SiHtml5, SiCss3, SiBootstrap, SiFirebase, SiGithub, SiFigma } from 'react-icons/si';
import RadialProgress from './RadialProgress';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin?.(ScrollTrigger)

const Skills = () => {
  const gridRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const skills = [
    { node: <SiReact className="text-[#61DAFB]" />, title: 'React', percent: 100, color: '#61DAFB', features: ['SPA & SSR ready', 'Hooks & Context', 'Component-driven'] },
    { node: <SiJavascript className="text-[#F7DF1E]" />, title: 'JavaScript', percent: 95, color: '#F7DF1E', features: ['ES6+', 'Async/Await', 'DOM & Browser APIs'] },
    { node: <SiTailwindcss className="text-[#06B6D4]" />, title: 'Tailwind CSS', percent: 100, color: '#06B6D4', features: ['Utility-first', 'Responsive', 'Design tokens'] },
    { node: <SiGit className="text-[#F05032]" />, title: 'Git', percent: 100, color: '#F05032', features: ['Branching', 'PR workflow', 'CI friendly'] },
    { node: <SiRedux className="text-[#764ABC]" />, title: 'Redux', percent: 100, color: '#764ABC', features: ['State management', 'Toolkit', 'Middleware'] },
    { node: <SiTypescript className="text-[#3178C6]" />, title: 'TypeScript', percent: 20, color: '#3178C6', features: ['Typed JS', 'Interfaces', 'Gradual adoption'] },
    { node: <SiVite className="text-[#646CFF]" />, title: 'Vite', percent: 100, color: '#646CFF', features: ['Fast dev', 'HMR', 'Optimized builds'] },
    { node: <SiHtml5 className="text-[#E34F26]" />, title: 'HTML5', percent: 100, color: '#E34F26', features: ['Semantic markup', 'Accessibility', 'SEO friendly'] },
    { node: <SiCss3 className="text-[#1572B6]" />, title: 'CSS3', percent: 100, color: '#1572B6', features: ['Flexbox & Grid', 'Animations', 'Responsive'] },
    { node: <SiBootstrap className="text-[#7952B3]" />, title: 'Bootstrap', percent: 100, color: '#7952B3', features: ['Components', 'Grid system', 'Theming'] },
    { node: <SiFirebase className="text-[#FFCA28]" />, title: 'Firebase', percent: 100, color: '#FFCA28', features: ['Auth', 'Firestore', 'Hosting'] },
    { node: <SiGithub className="text-black" />, title: 'GitHub', percent: 100, color: '#000000', features: ['Repos', 'Actions', 'Packages'] },
    { node: <SiFigma className="text-[#F24E1E]" />, title: 'Figma', percent: 90, color: '#F24E1E', features: ['Design systems', 'Prototyping', 'Handoff'] },
  ];

  const skillTitles = skills.map(skill => skill.title);

  useEffect(() => {
    if (!gridRef.current) return
    const el = gridRef.current
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter() {
        setVisible(true)
        gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
        gsap.fromTo(el.querySelectorAll('.radial-item'), { opacity: 0, y: 12, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.06, ease: 'power2.out' })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <section
      id="skills"
      className="pt-24 pb-20 bg-gradient-to-b from-slate-900/50 to-transparent"
    >
      <div className="mx-auto max-w-7xl px-6 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          <span className="water-text">Tech</span> <span className="live-green-text">Stack</span>
        </h2>

        {/* Radial progress indicators */}
        <div className="flex justify-center">
          <div ref={gridRef} className="w-full max-w-6xl opacity-0">
              <div className="pt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                {skills.map((s) => {
                  const hexToRgb = (hex) => {
                    if (!hex) return '255,255,255'
                    const clean = hex.replace('#', '')
                    const bigint = parseInt(clean, 16)
                    const r = (bigint >> 16) & 255
                    const g = (bigint >> 8) & 255
                    const b = bigint & 255
                    return `${r},${g},${b}`
                  }
                  const accent = hexToRgb(s.color)
                  return (
                      <div
                        key={s.title}
                        className="radial-item skill-card bg-slate-800/60 border border-white/6 rounded-lg p-4 flex flex-col items-start gap-2"
                        style={{ ['--accent']: accent }}
                      >
                      <div className="flex items-center gap-2 w-full">
                        <div className="skill-icon text-2xl transition-transform duration-300">{s.node}</div>
                        <div className="flex-1">
                          <div className="text-white font-semibold">{s.title}</div>
                        </div>
                      </div>
                      <ul className="mt-3 text-xs text-white/70 list-disc list-inside space-y-1">
                        {s.features.map((f, i) => (
                          <li key={i} className="text-left">{f}</li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
          </div>
        </div>
      </div>

      {/* removed LogoLoop - radial grid above used instead */}
    </section>
  );
};

export default Skills;
