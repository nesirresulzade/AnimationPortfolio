import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const ParticleTransition = ({ isVisible, onComplete, project }) => {
    const pointsRef = useRef();
    const particleCount = 12000;
    const color = project?.accentColor || "#00F0FF";

    // 1. GENERATE SHAPES
    const shapes = useMemo(() => {
        const initial = new Float32Array(particleCount * 3);
        const vortex = new Float32Array(particleCount * 3);
        const blast = new Float32Array(particleCount * 3);
        const screen = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Initial: Random Cloud
            initial[i3] = (Math.random() - 0.5) * 20;
            initial[i3 + 1] = (Math.random() - 0.5) * 20;
            initial[i3 + 2] = (Math.random() - 0.5) * 20;

            // Vortex: Spiraling inwards
            const angle = i * 0.1;
            const radius = 5 * (1 - i / particleCount);
            vortex[i3] = Math.cos(angle) * radius;
            vortex[i3 + 1] = (i / particleCount - 0.5) * 10;
            vortex[i3 + 2] = Math.sin(angle) * radius;

            // Blast: Exploding outwards
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const dist = 10 + Math.random() * 20;
            blast[i3] = dist * Math.sin(phi) * Math.cos(theta);
            blast[i3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
            blast[i3 + 2] = dist * Math.cos(phi);

            // Screen: Organizing into a grid/plane
            screen[i3] = (Math.random() - 0.5) * 30;
            screen[i3 + 1] = (Math.random() - 0.5) * 20;
            screen[i3 + 2] = -10;
        }

        return { initial, vortex, blast, screen };
    }, []);

    const positions = useMemo(() => new Float32Array(shapes.initial), [shapes]);

    useEffect(() => {
        if (isVisible && pointsRef.current) {
            const tl = gsap.timeline({
                onComplete: () => {
                    setTimeout(onComplete, 300);
                }
            });

            const attr = pointsRef.current.geometry.attributes.position;

            // Stage 1: Vortex Suck-in
            tl.to(attr.array, {
                endArray: shapes.vortex,
                duration: 0.8,
                ease: "power2.in",
                onUpdate: () => attr.needsUpdate = true
            });

            // Stage 2: Supernova Blast
            tl.to(attr.array, {
                endArray: shapes.blast,
                duration: 0.5,
                ease: "expo.out",
                onUpdate: () => attr.needsUpdate = true
            });

            // Stage 3: Resolve to Screen
            tl.to(attr.array, {
                endArray: shapes.screen,
                duration: 1.2,
                ease: "power3.inOut",
                onUpdate: () => attr.needsUpdate = true
            });
        }
    }, [isVisible, shapes, onComplete]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y += 0.005;
        pointsRef.current.rotation.z += 0.002;
    });

    return (
        <group>
            <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color={color}
                    size={0.06}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            <pointLight intensity={5} color={color} />
        </group>
    );
};

export default ParticleTransition;
