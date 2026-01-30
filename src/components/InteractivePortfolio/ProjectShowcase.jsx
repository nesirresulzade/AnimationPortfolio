import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = ({ category, onBack }) => {
    const containerRef = useRef();

    const filteredProjects = projects.filter(p => {
        if (category === 'MOBILE') return p.type.includes('MOBILE') || p.type.includes('GAME');
        if (category === 'REAL') return !p.type.includes('MOBILE') && !p.type.includes('GAME');
        return true;
    });

    useEffect(() => {
        let ctx = gsap.context(() => {
            if (!containerRef.current) return;

            containerRef.current.scrollTop = 0;

            const isMobileCategory = category === 'MOBILE';
            const entries = gsap.utils.toArray('.project-entry');

            ScrollTrigger.getAll().forEach(t => t.kill());

            entries.forEach((entry) => {
                gsap.fromTo(entry,
                    { opacity: 0, y: isMobileCategory ? 10 : 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: isMobileCategory ? 0.4 : 0.6,
                        ease: "power1.out",
                        force3D: true,
                        scrollTrigger: {
                            trigger: entry,
                            start: "top 98%",
                            scroller: containerRef.current,
                            toggleActions: "play none none reverse",
                        }
                    }
                );

                if (!isMobileCategory) {
                    const type = entry.getAttribute('data-type') || '';
                    if (!type.includes('MOBILE')) {
                        const images = entry.querySelectorAll('.parallax-img');
                        images.forEach(img => {
                            gsap.to(img, {
                                y: -30,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: img,
                                    scroller: containerRef.current,
                                    scrub: 1,
                                    start: "top bottom",
                                    end: "bottom top"
                                }
                            });
                        });
                    }
                }
            });

            gsap.fromTo(".category-header-content",
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", force3D: true }
            );
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, [category]);

    const descriptions = [
        "Core Interface Structure",
        "Deep Dive Features",
        "Motion & Interaction",
        "System Architecture",
        "Visual Language",
        "User Experience Highlights",
        "Final Design Perspectives"
    ];

    return (
        <div
            ref={containerRef}
            className="w-full h-full bg-[#050505] text-white overflow-y-auto overflow-x-hidden relative flex flex-col items-center selection:bg-white/10 no-scrollbar touch-pan-y"
            style={{
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'auto',
                overscrollBehaviorY: 'none'
            }}
        >
            {/* Category Header */}
            <header className="category-header min-h-[70vh] w-full flex flex-col items-center justify-center relative p-8 md:p-12 mb-20 bg-gradient-to-b from-[#0a0a0a] to-transparent">
                <div className="category-header-content z-10 flex flex-col items-center max-w-4xl will-change-transform">
                    <div className="flex items-center gap-4 mb-8 opacity-40">
                        <div className="w-12 h-px bg-white" />
                        <span className="text-[10px] tracking-[0.5em] uppercase font-black">Archive / Digital Works</span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic text-center leading-[0.8] mb-12">
                        {category === 'MOBILE' ? 'Mobile' : 'Professional'}<br />
                        <span className="text-white/10">Applications</span>
                    </h1>

                    <p className="text-white/40 text-lg md:text-xl max-w-2xl text-center font-light tracking-wide leading-relaxed px-6">
                        {category === 'MOBILE'
                            ? 'Exploring the boundaries of mobile interaction and immersive handheld experiences.'
                            : 'Architecting complex digital solutions and professional enterprise platforms.'}
                    </p>
                </div>

                <button
                    onClick={onBack}
                    className="fixed top-8 right-8 text-white/60 hover:text-white transition-all uppercase font-bold tracking-[0.2em] text-[11px] z-[9999] bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10"
                >
                    CLOSE
                </button>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-20">
                    <span className="text-[8px] tracking-[0.5em] uppercase font-bold">Scroll Down</span>
                    <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
                </div>
            </header>

            {/* Projects List */}
            <main className="w-full max-w-7xl px-6 pb-60 space-y-60">
                {filteredProjects.map((project, pIdx) => (
                    <div key={project.id} className="project-entry w-full flex flex-col items-center will-change-transform" data-type={project.type}>
                        {/* Project Info */}
                        <div className="w-full flex flex-col md:flex-row items-start justify-between mb-24 gap-12 border-b border-white/5 pb-16">
                            <div className="max-w-2xl">
                                <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-bold mb-6 block">
                                    P-0{pIdx + 1} // {project.type}
                                </span>
                                <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8" style={{ color: project.accentColor }}>
                                    {project.title}
                                </h2>
                                <p className="text-white/40 text-xl leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-3 text-[10px] tracking-widest text-white/20 uppercase font-black pt-4">
                                <span>Status / Live</span>
                                <span>Year / 2026</span>
                            </div>
                        </div>

                        {/* Image Grid - 2 Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 w-full px-4">
                            {project.images.map((img, iIdx) => {
                                const isMobile = project.type.includes('MOBILE');
                                return (
                                    <div key={iIdx} className="flex flex-col gap-8 group">
                                        <div
                                            className={`relative rounded-[2.5rem] bg-[#030303] border border-white/10 shadow-lg flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-${project.accentColor}/20 transform-gpu`}
                                            style={{
                                                contentVisibility: 'auto',
                                                contain: 'paint'
                                            }}
                                        >
                                            {/* Dynamic Accent Glow */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none z-0"
                                                style={{
                                                    background: `radial-gradient(circle at center, ${project.accentColor}, transparent 85%)`
                                                }}
                                            />

                                            <img
                                                src={img}
                                                alt={`${project.title} - ${iIdx + 1}`}
                                                loading="lazy"
                                                decoding="async"
                                                className={`parallax-img block object-contain z-10 group-hover:scale-[1.01] transform-gpu ${isMobile
                                                    ? 'h-auto max-h-[65vh] w-auto py-8 px-4 mt-2'
                                                    : 'w-full h-full p-4'
                                                    }`}
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop';
                                                }}
                                            />

                                            {/* Device Shine Effect */}
                                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
                                        </div>

                                        <div className="flex flex-col gap-2 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-[1px] bg-white/10 group-hover:w-12 group-hover:bg-white/40 transition-all duration-500" />
                                                <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold group-hover:text-white/60 transition-colors">
                                                    {descriptions[iIdx] || "Architecture"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </main>

            {/* Footer */}
            <footer className="w-full py-60 flex flex-col items-center bg-gradient-to-t from-black to-transparent border-t border-white/5">
                <button
                    onClick={onBack}
                    className="group flex flex-col items-center gap-12"
                >
                    <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/20 to-transparent group-hover:h-48 transition-all duration-1000" />
                    <span className="text-[10px] tracking-[1.5em] text-white/20 uppercase font-black group-hover:text-white group-hover:tracking-[2em] transition-all duration-700">
                        BACK TO GRID
                    </span>
                </button>
            </footer>
        </div>
    );
};

export default ProjectShowcase;
