import React, { useState, useEffect } from 'react';
import Scene from './Scene';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectShowcase from './ProjectShowcase';
import ParticleTransition from './ParticleTransition';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InteractivePortfolio = () => {
    const [view, setView] = useState('home');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleTransition = (category) => {
        setSelectedCategory(category);
        setView('transitioning');
    };

    const handleBack = () => {
        setView('home');
        setSelectedCategory(null);
    };

    useEffect(() => {
        if (view === 'transitioning' || view === 'details') {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            ScrollTrigger.refresh();
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [view]);

    return (
        <div className="relative w-full h-screen bg-[#050505] overflow-hidden">
            {/* Main Interactive Scene */}
            <AnimatePresence mode="wait">
                {view === 'home' && (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="w-full h-full"
                    >
                        <Scene onTransition={handleTransition} />

                        {/* Overlay UI */}
                        <div className="absolute top-12 left-12 z-20">
                            <h2 className="text-white/20 text-[10px] tracking-[0.6em] uppercase font-black">
                                Archive-2026 / Interactive
                            </h2>
                        </div>

                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/20 text-[10px] tracking-[0.4em] uppercase font-medium flex items-center gap-6">
                            <span>Interact</span>
                            <div className="w-8 h-px bg-white/10" />
                            <span>Explore</span>
                            <div className="w-8 h-px bg-white/10" />
                            <span>Create</span>
                        </div>

                        <div className="absolute bottom-12 right-12 z-20 text-right">
                            <div className="text-white/20 text-[10px] tracking-widest uppercase mb-4">Depth Control</div>
                            <div className="flex flex-col gap-2 items-end">
                                <div className="w-12 h-px bg-white/40" />
                                <div className="w-8 h-px bg-white/20" />
                                <div className="w-4 h-px bg-white/10" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Particle Morphing Transition */}
            <AnimatePresence>
                {view === 'transitioning' && (
                    <motion.div
                        key="transition"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] bg-[#050505]"
                    >
                        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                            <ParticleTransition
                                isVisible={true}
                                project={{ accentColor: selectedCategory === 'MOBILE' ? '#00ffff' : '#ff00ff' }}
                                onComplete={() => setView('details')}
                            />
                        </Canvas>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Detailed Project Showcase */}
            <AnimatePresence>
                {view === 'details' && (
                    <motion.div
                        key="details"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-[10001]"
                    >
                        <ProjectShowcase
                            category={selectedCategory}
                            onBack={handleBack}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Cinematic Grain Overlay - Simplified for performance */}
            <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.02]"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        </div>
    );
};

export default InteractivePortfolio;