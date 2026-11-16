import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, RoundedBox, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

// Colores del brand board: azul #004aad, navy #0b1b3d y el amarillo de la estrella
const palettes = {
  dark: {
    body: '#d3e1ff',
    door: '#eaf1ff',
    accent: '#004aad',
    handle: '#0b1b3d',
    face: '#0b1b3d',
    cheek: '#f3a6c0',
    led: '#ffe476',
    shadow: '#000000',
    sparkle: '#9cc0ff',
  },
  light: {
    body: '#cddcfa',
    door: '#eaf0fa',
    accent: '#004aad',
    handle: '#0b1b3d',
    face: '#0b1b3d',
    cheek: '#e88aa8',
    led: '#f5c400',
    shadow: '#0b1b3d',
    sparkle: '#004aad',
  },
}

const WAVE_DURATION = 3.2

function Fridge({ theme, waveKey, onPoke }) {
  const c = palettes[theme]
  const root = useRef()
  const arm = useRef()
  const forearm = useRef()
  const leftArm = useRef()
  const eyes = useRef()
  const pupils = useRef()
  const led = useRef()
  const waveStart = useRef(0)
  const nextBlink = useRef(2)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    waveStart.current = -1 // reset on next frame
  }, [waveKey])

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : ''
    return () => {
      document.body.style.cursor = ''
    }
  }, [hovered])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (waveStart.current === -1) waveStart.current = t
    const since = t - waveStart.current
    const waving = since < WAVE_DURATION

    // Arm raise envelope (ease in/out) + wave oscillation
    const raise = waving
      ? Math.min(1, since / 0.35) * Math.min(1, (WAVE_DURATION - since) / 0.4)
      : 0
    const targetArm = THREE.MathUtils.lerp(0.25, 2.55, raise)
    arm.current.rotation.z = THREE.MathUtils.damp(arm.current.rotation.z, targetArm, 10, delta)
    forearm.current.rotation.z = waving ? Math.sin(since * 11) * 0.55 * raise : THREE.MathUtils.damp(forearm.current.rotation.z, 0, 8, delta)

    // Idle left arm sway
    leftArm.current.rotation.z = -0.25 + Math.sin(t * 1.6) * 0.06

    // Body: little hop while waving, otherwise follow pointer
    const px = state.pointer.x
    const py = state.pointer.y
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, px * 0.45 + (waving ? Math.sin(since * 5.5) * 0.06 : 0), 4, delta)
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -py * 0.12, 4, delta)
    root.current.rotation.z = waving ? Math.sin(since * 5.5) * 0.04 : THREE.MathUtils.damp(root.current.rotation.z, 0, 4, delta)
    const squash = hovered ? 1.03 : 1
    root.current.scale.y = THREE.MathUtils.damp(root.current.scale.y, squash, 8, delta)

    // Pupils look at pointer
    pupils.current.position.x = THREE.MathUtils.damp(pupils.current.position.x, px * 0.05, 8, delta)
    pupils.current.position.y = THREE.MathUtils.damp(pupils.current.position.y, py * 0.04, 8, delta)

    // Blink
    if (t > nextBlink.current) {
      const p = (t - nextBlink.current) / 0.16
      eyes.current.scale.y = p < 1 ? Math.abs(1 - 2 * p) + 0.05 : 1
      if (p >= 1) nextBlink.current = t + 2.5 + Math.random() * 3
    }

    // Sensor LED pulse
    led.current.emissiveIntensity = 1.2 + Math.sin(t * 4) * 0.8
  })

  return (
    <group
      ref={root}
      position={[0, -0.15, 0]}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        onPoke()
      }}
    >
      {/* Body */}
      <RoundedBox args={[1.5, 2.35, 1.05]} radius={0.22} smoothness={6} castShadow>
        <meshStandardMaterial color={c.body} roughness={0.35} metalness={0.15} />
      </RoundedBox>

      {/* Doors (front panels) */}
      <RoundedBox args={[1.32, 0.78, 0.06]} radius={0.05} smoothness={4} position={[0, 0.66, 0.52]}>
        <meshStandardMaterial color={c.door} roughness={0.3} metalness={0.1} />
      </RoundedBox>
      <RoundedBox args={[1.32, 1.3, 0.06]} radius={0.05} smoothness={4} position={[0, -0.47, 0.52]}>
        <meshStandardMaterial color={c.door} roughness={0.3} metalness={0.1} />
      </RoundedBox>
      {/* Divider line */}
      <mesh position={[0, 0.2, 0.53]}>
        <boxGeometry args={[1.36, 0.05, 0.04]} />
        <meshStandardMaterial color={c.accent} />
      </mesh>

      {/* Handles (like the logo) */}
      <RoundedBox args={[0.3, 0.07, 0.07]} radius={0.03} position={[-0.38, 0.38, 0.58]}>
        <meshStandardMaterial color={c.handle} metalness={0.6} roughness={0.25} />
      </RoundedBox>
      <RoundedBox args={[0.3, 0.07, 0.07]} radius={0.03} position={[-0.38, -0.02, 0.58]}>
        <meshStandardMaterial color={c.handle} metalness={0.6} roughness={0.25} />
      </RoundedBox>

      {/* Face on upper door */}
      <group position={[0.12, 0.7, 0.56]}>
        <group ref={eyes}>
          {[-0.2, 0.2].map((x) => (
            <mesh key={x} position={[x, 0.04, 0]} scale={[1, 1.25, 0.5]}>
              <sphereGeometry args={[0.09, 24, 24]} />
              <meshStandardMaterial color={c.face} roughness={0.2} />
            </mesh>
          ))}
          <group ref={pupils} position={[0, 0, 0.045]}>
            {[-0.2, 0.2].map((x) => (
              <mesh key={x} position={[x + 0.025, 0.08, 0]}>
                <sphereGeometry args={[0.025, 12, 12]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            ))}
          </group>
        </group>
        {/* Cheeks */}
        {[-0.34, 0.34].map((x) => (
          <mesh key={x} position={[x, -0.12, 0]} scale={[1, 0.6, 0.2]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color={c.cheek} transparent opacity={0.7} />
          </mesh>
        ))}
        {/* Smile */}
        <mesh position={[0, -0.1, 0]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.1, 0.022, 12, 24, Math.PI]} />
          <meshStandardMaterial color={c.face} />
        </mesh>
      </group>

      {/* Thermometer display on lower door */}
      <group position={[0.18, -0.55, 0.56]}>
        <RoundedBox args={[0.62, 0.32, 0.03]} radius={0.04}>
          <meshStandardMaterial color={c.face} roughness={0.2} />
        </RoundedBox>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[-0.21 + i * 0.105, -0.06 + [0.02, 0.06, 0.03, 0.09, 0.05][i] / 2, 0.02]}>
            <boxGeometry args={[0.06, 0.04 + [0.02, 0.06, 0.03, 0.09, 0.05][i] * 1.2, 0.01]} />
            <meshStandardMaterial color={c.led} emissive={c.led} emissiveIntensity={0.9} />
          </mesh>
        ))}
      </group>

      {/* IoT antenna + LED */}
      <group position={[0.42, 1.18, 0]}>
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.36, 12]} />
          <meshStandardMaterial color={c.handle} metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshStandardMaterial ref={led} color={c.led} emissive={c.led} emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* Right arm (waving) — pivot at shoulder */}
      <group ref={arm} position={[0.78, 0.25, 0]} rotation={[0, 0, 0.25]}>
        <mesh position={[0, -0.22, 0]}>
          <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
          <meshStandardMaterial color={c.accent} roughness={0.4} />
        </mesh>
        <group ref={forearm} position={[0, -0.42, 0]}>
          <mesh position={[0, -0.12, 0]}>
            <sphereGeometry args={[0.12, 20, 20]} />
            <meshStandardMaterial color={c.body} roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* Left arm */}
      <group ref={leftArm} position={[-0.78, 0.25, 0]} rotation={[0, 0, -0.25]}>
        <mesh position={[0, -0.22, 0]}>
          <capsuleGeometry args={[0.08, 0.3, 8, 16]} />
          <meshStandardMaterial color={c.accent} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.54, 0]}>
          <sphereGeometry args={[0.12, 20, 20]} />
          <meshStandardMaterial color={c.body} roughness={0.4} />
        </mesh>
      </group>

      {/* Legs (from the logo sketch) */}
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, -1.3, 0.05]}>
          <capsuleGeometry args={[0.09, 0.16, 8, 16]} />
          <meshStandardMaterial color={c.accent} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

export function Mascot({ theme, compact = false }) {
  const [waveKey, setWaveKey] = useState(0)
  const c = palettes[theme]
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  return (
    <Canvas
      shadows
      dpr={compact ? [1, 1.5] : [1, 2]}
      // pan-y: en pantallas táctiles el scroll vertical sigue funcionando aunque el dedo empiece sobre Tracky
      style={{ touchAction: 'pan-y' }}
      camera={{ position: [0, 0.3, 5.6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      aria-label="Mascota 3D de Coldtrack saludando"
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <ambientLight intensity={theme === 'dark' ? 0.55 : 0.8} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} castShadow />
      <pointLight position={[-3, 1, 2]} intensity={12} color="#004aad" />
      <pointLight position={[3, -1, 3]} intensity={8} color="#9cc0ff" />
      <Float speed={2} rotationIntensity={0.15} floatIntensity={0.5} floatingRange={[-0.05, 0.08]}>
        <Fridge theme={theme} waveKey={waveKey} onPoke={() => setWaveKey((k) => k + 1)} />
      </Float>
      <Sparkles count={compact ? 18 : 40} scale={[5, 4, 3]} size={2.5} speed={0.35} color={c.sparkle} opacity={0.7} />
      <ContactShadows position={[0, -1.6, 0]} opacity={theme === 'dark' ? 0.6 : 0.3} scale={6} blur={2.6} far={2} color={c.shadow} />
    </Canvas>
  )
}

export default Mascot
