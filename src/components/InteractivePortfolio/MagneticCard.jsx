import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const MagneticCard = ({ project, position, onClick }) => {
    const meshRef = useRef();
    const groupRef = useRef();
    const contentRef = useRef();
    const glowRef = useRef();
    const [hovered, setHovered] = useState(false);

    const { title, type, description, accentColor, featured } = project;

    useFrame((state) => {
        if (!meshRef.current) return;

        // Magnetic / Hover Tilt effect
        const { x, y } = state.mouse;
        const targetRotationX = hovered ? -y * 0.5 : -y * 0.2;
        const targetRotationY = hovered ? x * 0.5 : x * 0.2;

        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);

        // Subtle floating animation
        groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.1;

        // Inner parallax for content
        if (contentRef.current) {
            contentRef.current.position.x = THREE.MathUtils.lerp(contentRef.current.position.x, x * 0.5, 0.05);
            contentRef.current.position.y = THREE.MathUtils.lerp(contentRef.current.position.y, y * 0.5, 0.05);
        }

        // Glow pulse
        if (glowRef.current) {
            const pulse = (Math.sin(state.clock.elapsedTime * (hovered ? 6 : 2)) + 1) / 2;
            glowRef.current.opacity = hovered ? 0.4 + pulse * 0.2 : 0.05 + pulse * 0.05;
        }
    });

    const handlePointerOver = () => {
        setHovered(true);
        gsap.to(meshRef.current.scale, { x: 1.05, y: 1.05, z: 1.05, duration: 0.4, ease: 'back.out(1.7)' });
        gsap.to(meshRef.current.position, { z: 1, duration: 0.4 });
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHovered(false);
        gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: 'back.out(1.7)' });
        gsap.to(meshRef.current.position, { z: 0, duration: 0.4 });
        document.body.style.cursor = 'auto';
    };

    return (
        <group ref={groupRef} position={position}>
            <mesh
                ref={meshRef}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={() => onClick(project)}
                castShadow
            >
                <boxGeometry args={[3.2, 4.4, 0.15]} />
                <meshStandardMaterial
                    color="#050505"
                    metalness={0.8}
                    roughness={0.2}
                />

                {/* Cyberpunk Glow Edge */}
                <mesh position={[0, 0, -0.08]}>
                    <boxGeometry args={[3.3, 4.5, 0.02]} />
                    <meshBasicMaterial
                        ref={glowRef}
                        color={accentColor}
                        transparent
                        opacity={0.1}
                    />
                </mesh>

                {/* Featured Effects */}
                {featured && (
                    <>
                        <mesh position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[2.5, 0.02, 16, 100]} />
                            <meshBasicMaterial color={accentColor} transparent opacity={0.3} />
                        </mesh>
                        <Sparkles
                            count={40}
                            scale={5}
                            size={2}
                            speed={0.4}
                            color={accentColor}
                        />
                    </>
                )}

                {/* Content Group */}
                <group ref={contentRef} position={[0, 0, 0.1]}>
                    <Text
                        position={[0, 1.4, 0.1]}
                        fontSize={0.15}
                        color={accentColor}
                        anchorX="center"
                    >
                        {type}
                    </Text>

                    <Text
                        position={[0, 0.8, 0.1]}
                        fontSize={0.35}
                        color="white"
                        maxWidth={2.8}
                        textAlign="center"
                    >
                        {title}
                    </Text>

                    <Text
                        position={[0, -0.8, 0.1]}
                        fontSize={0.12}
                        color="white"
                        maxWidth={2.5}
                        textAlign="center"
                        opacity={0.6}
                        lineHeight={1.4}
                    >
                        {description}
                    </Text>

                    <mesh position={[0, -1.8, 0.05]}>
                        <planeGeometry args={[1, 0.01]} />
                        <meshBasicMaterial color={accentColor} />
                    </mesh>

                    <Text
                        position={[0, -2.1, 0.1]}
                        fontSize={0.1}
                        color={accentColor}
                        letterSpacing={0.2}
                    >
                        EXPLORE PROJECT
                    </Text>
                </group>
            </mesh>
        </group>
    );
};

export default MagneticCard;
