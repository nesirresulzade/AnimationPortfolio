"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"

function Hexagon({ position, baseHeight, phase, pauseMouse }: { position: [number, number, number]; baseHeight: number; phase: number; pauseMouse?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse, viewport } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return

    const mouseX = pauseMouse ? 10000 : (mouse.x * viewport.width) / 2
    // Invert Y so DOM-like downward movement increases positive value
    const mouseY = pauseMouse ? 10000 : -(mouse.y * viewport.height) / 2

    const dx = position[0] - mouseX
    const dy = position[2] - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)

    const proximity = Math.max(0, 4 - dist)
    // Remove sinusoidal wave motion to avoid bottom "water wave" effect
    // Add a small, per-hex idle bobbing using a random phase so motion feels alive
    // Increased bobbing speed from 1.5 -> 3.0 for a livelier motion
    const idle = Math.sin(state.clock.elapsedTime * 3.0 + phase) * 0.08

    const targetHeight = baseHeight + proximity * 0.8 + idle

    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetHeight, 0.1)
    meshRef.current.position.y = meshRef.current.scale.y / 2
  })

  return (
    <mesh ref={meshRef} position={[position[0], baseHeight / 2, position[2]]} castShadow receiveShadow>
      <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
      <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.05} />
    </mesh>
  )
}

function Grid({ pauseMouse }: { pauseMouse?: boolean }) {
  const hexSize = 0.55
  const { viewport } = useThree()

  const cols = Math.ceil(viewport.width / (hexSize * 1.75)) + 8
  const rows = Math.ceil(viewport.height / (hexSize * 1.5)) + 8

  const hexagons = useMemo(() => {
    const hexes: { id: string; position: [number, number, number]; baseHeight: number; phase: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c + (r % 2) * 0.5) * hexSize * 1.75
        const z = r * hexSize * 1.5

        const baseHeight = 0.4 + Math.random() * 0.6

        const phase = Math.random() * Math.PI * 2

        hexes.push({
          id: `${r}-${c}`,
          position: [x - (cols * hexSize * 1.75) / 2, 0, z - (rows * hexSize * 1.5) / 2],
          baseHeight,
          phase,
        })
      }
    }
    return hexes
  }, [rows, cols, hexSize])

  return (
    <group rotation={[Math.PI / 12, 0, 0]}>
      {hexagons.map((hex) => (
        <Hexagon key={hex.id} position={hex.position} baseHeight={hex.baseHeight} phase={hex.phase} pauseMouse={pauseMouse} />
      ))}
    </group>
  )
}

export default function HexagonGrid({ pauseMouse = false }: { pauseMouse?: boolean }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <Canvas className="w-full h-full" shadows camera={{ position: [0, 10, 12], fov: 45 }}>
        <color attach="background" args={["transparent"]} />

        <ambientLight intensity={0.6} />
        <spotLight
          position={[10, 20, 10]}
          angle={0.2}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, 10, -10]} intensity={1} color="#e0e7ff" />

        <Grid pauseMouse={pauseMouse} />

        {/* ContactShadows removed to eliminate bottom shadow/wave-like overlay */}

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
