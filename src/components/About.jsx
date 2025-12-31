import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import ProjectCarousel from './ProjectCarousel';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    src: '/imgs/myProject/bigFinalApp.png',
    title: 'E-commerce Website',
    demo: 'https://big-app-final.vercel.app/',
    github: 'https://github.com/nesirresulzade/BigAPP-Final'
  },
  {
    id: 2,
    src: '/imgs/myProject/bookShop.png',
    title: 'Book Shop',
    demo: 'https://library-app-swart-eight.vercel.app/',
    github: 'https://github.com/nesirresulzade/LibraryApp'
  },
  {
    id: 3,
    src: '/imgs/myProject/brainquizSite.png',
    title: 'Brain Quiz',
    demo: 'https://brain-quiz-two.vercel.app/',
    github: 'https://github.com/nesirresulzade/BrainQuiz'
  },
  {
    id: 4,
    src: '/imgs/myProject/currency.png',
    title: 'Currency Converter',
    demo: 'https://currency-app-with-react.vercel.app/',
    github: 'https://github.com/nesirresulzade/CurrencyAppWithReact'
  },
  {
    id: 5,
    src: '/imgs/myProject/musicMobilApp.png',
    title: 'Music App',
    demo: 'https://music-player-with-react-app.vercel.app/',
    github: 'https://github.com/nesirresulzade/MusicPlayerWithReactApp'
  },
  {
    id: 6,
    src: '/imgs/myProject/pokemon.png',
    title: 'Pokemon Game',
    demo: 'https://pokemon-game-with-react.vercel.app/',
    github: 'https://github.com/nesirresulzade/PokemonGameWithReact'
  },
  {
    id: 7,
    src: '/imgs/myProject/projects-1.png',
    title: 'Weather App (HTML, CSS, JS)',
    demo: 'https://nesirresulzade.github.io/WeatherApp/',
    github: 'https://github.com/nesirresulzade/WeatherApp'
  },
  {
    id: 8,
    src: '/imgs/myProject/projects-2.png',
    title: 'Hangman Game',
    demo: 'https://nesirresulzade.github.io/HangMan/',
    github: 'https://github.com/nesirresulzade/HangMan'
  },
  {
    id: 9,
    src: '/imgs/myProject/projects-3.png',
    title: 'Bonus Card',
    demo: 'https://nesirresulzade.github.io/BonusCard/',
    github: 'https://github.com/nesirresulzade/BonusCard'
  },
  {
    id: 10,
    src: '/imgs/myProject/ReactWithWeather.png',
    title: 'React Weather',
    demo: 'https://reactwith-weather-app.vercel.app/',
    github: 'https://github.com/nesirresulzade/ReactwithWeatherApp'
  },
  {
    id: 11,
    src: '/imgs/myProject/usePanel.png',
    title: 'Control Panel UI',
    demo: 'https://user-register-one.vercel.app/',
    github: 'https://github.com/nesirresulzade/UserRegister'
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
  const [hoveredStackIndex, setHoveredStackIndex] = useState(null);

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

  // Compute stack of upcoming projects (all except active), starting from the next one on top
  const stackProjects = [];
  for (let i = 1; i < projects.length; i++) {
    stackProjects.push(projects[(activeIndex + i) % projects.length]);
  }

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen w-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20">
      <ProjectCarousel projects={projects} />
    </section>
  );
};

export default About;
