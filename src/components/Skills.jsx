import { LogoLoop } from './LogoLoop'
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiGit,
  SiRedux,
  SiTypescript,
  SiVite,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiFirebase,
  SiGithub,
  SiFigma,
} from 'react-icons/si'

const Skills = () => {
  const skills = [
    { node: <SiReact className="text-[#61DAFB]" />, title: 'React' },
    { node: <SiJavascript className="text-[#F7DF1E]" />, title: 'JavaScript' },
    { node: <SiTailwindcss className="text-[#06B6D4]" />, title: 'Tailwind CSS' },
    { node: <SiGit className="text-[#F05032]" />, title: 'Git' },
    { node: <SiRedux className="text-[#764ABC]" />, title: 'Redux' },
    { node: <SiTypescript className="text-[#3178C6]" />, title: 'TypeScript' },
    { node: <SiVite className="text-[#646CFF]" />, title: 'Vite' },

    { node: <SiHtml5 className="text-[#E34F26]" />, title: 'HTML5' },
    { node: <SiCss3 className="text-[#1572B6]" />, title: 'CSS3' },
    { node: <SiBootstrap className="text-[#7952B3]" />, title: 'Bootstrap' },
    { node: <SiFirebase className="text-[#FFCA28]" />, title: 'Firebase' },
    { node: <SiGithub className="text-slate-300" />, title: 'GitHub' },
    { node: <SiFigma className="text-[#F24E1E]" />, title: 'Figma' },
  ]

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-slate-900/50 to-transparent"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech <span className="text-yellow-400">Stack</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Technologies I work with
          </p>
        </div>

        <div className="mb-8">
          <LogoLoop
            logos={skills.slice(0, 10)}
            speed={50}
            direction="left"
            logoHeight={64}
            gap={48}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#05060a"
          />
        </div>

        <div>
          <LogoLoop
            logos={skills.slice(10)}
            speed={50}
            direction="right"
            logoHeight={64}
            gap={48}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#05060a"
          />
        </div>
      </div>
    </section>
  )
}

export default Skills
