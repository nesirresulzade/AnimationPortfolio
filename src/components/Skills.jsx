import { SiReact, SiJavascript, SiTailwindcss, SiGit, SiRedux, SiTypescript, SiVite, SiHtml5, SiCss3, SiBootstrap, SiFirebase, SiGithub, SiFigma } from 'react-icons/si';
import InfiniteCurvedLoop from './SkillsCurvedText';
import LogoLoop from './LogoLoop';

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
    { node: <SiGithub className="text-black" />, title: 'GitHub' },
    { node: <SiFigma className="text-[#F24E1E]" />, title: 'Figma' },
  ];

  const skillTitles = skills.map(skill => skill.title);

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-slate-900/50 to-transparent"
    >
      <div className="mx-auto max-w-7xl px-6 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          <span className="water-text">Tech</span> <span className="live-green-text">Stack</span>
        </h2>

        {/* CurvedLoop ilə dönen text */}
        <div className="flex justify-center">
          <InfiniteCurvedLoop
            marqueeText={skillTitles.join(' • ')}
            speed={1}
            curveAmount={40}
            direction="left"
            interactive={true}
            className="fill-white text-2xl md:text-3xl font-bold"
          />
        </div>
      </div>

      {/* Combined single-line Logo Loop */}
      <div className="w-full">
        <div className="mb-6">
          <LogoLoop
            logos={skills}
            speed={48}
            direction="left"
            logoHeight={72}
            gap={56}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="rgba(15, 23, 42, 0.3)"
            className="max-w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Skills;
