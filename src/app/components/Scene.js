"use client";
import { MathUtils } from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Instances, Instance, Environment } from '@react-three/drei'
import { EffectComposer, N8AO, TiltShift2 } from '@react-three/postprocessing'

const particles = Array.from({ length: 72 }, () => ({
  factor: MathUtils.randInt(20, 100),
  speed: MathUtils.randFloat(0.01, 0.75),
  xFactor: MathUtils.randFloatSpread(40),
  yFactor: MathUtils.randFloatSpread(10),
  zFactor: MathUtils.randFloatSpread(10)
}))

function Bubbles() {
  const ref = useRef()
  useFrame((state, delta) => void (ref.current.rotation.y = MathUtils.damp(ref.current.rotation.y, (-state.mouse.x * Math.PI) / 6, 2.75, delta)))
  return (
    <Instances limit={particles.length} ref={ref} castShadow receiveShadow position={[0, 2.5, 0]}>
      <sphereGeometry args={[0.45, 64, 64]} />
      <meshStandardMaterial roughness={1} color="#ffffff" />
      {particles.map((data, i) => (
        <Bubble key={i} {...data} />
      ))}
    </Instances>
  )
}

function Bubble({ factor, speed, xFactor, yFactor, zFactor }) {
  const ref = useRef()
  const size = MathUtils.randFloat(0.01, 0.05);
  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 3)
    ref.current.scale.setScalar(Math.max(size, Math.cos(t)))
    ref.current.position.set(
      Math.cos(t) + Math.sin(t * 1) / 10 + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) + Math.cos(t * 2) / 10 + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) + Math.cos(t * 2) / 10 + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 4
    )
  })
  return <Instance ref={ref} />
}

export default function Scene() {
  return (
    <div className="background-container">
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: false }} camera={{ fov: 250, position: [0, 0, 20] }}>
            <color attach="background" args={['#f0f0f0']} />
            <fog attach="fog" args={['gray', 20, -5]} />
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <Bubbles />
            <EffectComposer disableNormalPass>
                <N8AO aoRadius={6} intensity={2} color="gray" />
                <TiltShift2 blur={0.1} />
            </EffectComposer>
            <Environment preset="city" />
        </Canvas>
    </div>
  )
}
