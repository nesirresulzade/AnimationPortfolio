import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, PerspectiveCamera, Stars, Float } from '@react-three/drei';
import MagneticCard from './MagneticCard';
import { projects } from '../../data/projects';
import gsap from 'gsap';
import * as THREE from 'three';

const BackgroundParticles = () => {
    const pointsRef = useRef();
    const count = 2000;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        return pos;
    }, []);

    useFrame((state) => {
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#444" transparent opacity={0.4} sizeAttenuation={true} />
        </points>
    );
};

const SceneContent = ({ onCardClick }) => {
    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
            <color attach="background" args={['#020202']} />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <BackgroundParticles />

            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />

            <Suspense fallback={null}>
                <group position={[0, 0, 0]}>
                    <MagneticCard
                        project={{
                            title: 'MOBILE APPLICATIONS',
                            type: 'COLLECTION',
                            description: 'Explore my mobile app development journey.',
                            accentColor: '#00ffff',
                            featured: true
                        }}
                        position={[-4.5, 0, 0]}
                        onClick={() => onCardClick('MOBILE')}
                    />
                    <MagneticCard
                        project={{
                            title: 'REAL WORLD PROJECTS',
                            type: 'COLLECTION',
                            description: 'Professional web and enterprise solutions.',
                            accentColor: '#ff00ff',
                            featured: true
                        }}
                        position={[4.5, 0, 0]}
                        onClick={() => onCardClick('REAL')}
                    />
                </group>
            </Suspense>

            <ContactShadows
                position={[0, -8, 0]}
                opacity={0.4}
                scale={40}
                blur={2}
                far={10}
            />
            <Environment preset="night" />
        </group>
    );
};

const Scene = ({ onTransition }) => {
    const containerRef = useRef();

    useEffect(() => {
        if (containerRef.current) {
            gsap.set(containerRef.current, { scale: 1, opacity: 1 });
        }
    }, []);

    const handleCardClick = (category) => {
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                scale: 1.5,
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    onTransition(category);
                }
            });
        }
    };

    return (
        <div ref={containerRef} className="canvas-container w-full h-full bg-black">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 15], fov: 45 }}>
                <SceneContent onCardClick={handleCardClick} />
            </Canvas>
        </div>
    );
};

export default Scene;
