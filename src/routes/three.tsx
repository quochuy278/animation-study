import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

export const Route = createFileRoute('/three')({
  component: ThreePage,
})

function ThreePage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="study-page">
      <section className="study-hero">
        <div>
          <p className="eyebrow">React Three Fiber</p>
          <h1 className="study-title">Use 3D to practice motion with light, depth, and camera.</h1>
          <p className="study-copy">
            React Three Fiber lets you build Three.js scenes with React components. This example is
            intentionally small so you can tweak meshes, lights, and camera movement without getting
            lost in engine setup.
          </p>
        </div>
        <div className="study-meta">
          <span>Focus: scene composition</span>
          <span>Great for: hero sections, product reveals, interactive worlds</span>
        </div>
      </section>

      <section className="panel canvas-panel">
        <div className="section-heading">
          <h2>Interactive scene</h2>
          <p>Drag to orbit. Hover the main mesh. The motion comes from the render loop, not CSS.</p>
        </div>
        <div className="canvas-frame">
          {isMounted ? (
            <Canvas dpr={[1, 1.75]}>
              <color attach="background" args={['#09090f']} />
              <fog attach="fog" args={['#09090f', 8, 18]} />
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 1.6, 6]} />
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 6, 4]} intensity={2.3} />
                <pointLight position={[-4, -1, -2]} intensity={18} color="#f97316" />
                <SceneObjects />
                <OrbitControls enablePan={false} maxDistance={9} minDistance={4} />
              </Suspense>
            </Canvas>
          ) : (
            <div className="canvas-fallback">Preparing WebGL scene...</div>
          )}
        </div>
      </section>
    </div>
  )
}

function SceneObjects() {
  const meshRef = useRef<THREE.Mesh | null>(null)
  const ringRef = useRef<THREE.Mesh | null>(null)
  const [hovered, setHovered] = useState(false)

  const materialColor = useMemo(() => new THREE.Color('#f4d35e'), [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.55
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        hovered ? 0.7 : 0.25,
        0.08,
      )
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.18
      meshRef.current.scale.lerp(
        new THREE.Vector3(hovered ? 1.18 : 1, hovered ? 1.18 : 1, hovered ? 1.18 : 1),
        0.08,
      )
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3
      ringRef.current.rotation.x += delta * 0.22
    }
  })

  return (
    <>
      <Float speed={1.7} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh
          ref={meshRef}
          position={[0, 0.9, 0]}
          castShadow
          receiveShadow
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <icosahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial
            color={materialColor}
            roughness={0.18}
            metalness={0.35}
            emissive={hovered ? '#f97316' : '#12121a'}
            emissiveIntensity={hovered ? 0.45 : 0.08}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]} position={[0, 0.9, 0]}>
        <torusGeometry args={[1.85, 0.04, 16, 120]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={0.45} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
        <circleGeometry args={[5, 80]} />
        <meshStandardMaterial color="#11131d" roughness={1} />
      </mesh>
    </>
  )
}
