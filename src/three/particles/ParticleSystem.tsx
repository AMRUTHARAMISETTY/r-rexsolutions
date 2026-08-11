import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  scrollProgress?: number;
  mouse?: { x: number; y: number };
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 2500,
  scrollProgress = 0,
  mouse = { x: 0, y: 0 },
}) => {
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate particle positions, sizes, speeds, and colors across 3 Z depths (Foreground, Midground, Background)
  const [positions, colors, sizes, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const vel = new Float32Array(count * 3);

    const colorElectricBlue = new THREE.Color('#0060F0');
    const colorCyan = new THREE.Color('#00C0F0');
    const colorWhite = new THREE.Color('#EAF4FF');

    for (let i = 0; i < count; i++) {
      // 3 Z Depths: Foreground (Z > 10), Midground (-10 < Z < 10), Background (Z < -10)
      const depthTier = Math.random();
      let z = 0;
      let size = 1.0;

      if (depthTier < 0.2) {
        // Foreground: Larger, softer, closer
        z = (Math.random() * 15) + 5;
        size = Math.random() * 3.5 + 2.0;
      } else if (depthTier < 0.7) {
        // Midground: Sharper, main field
        z = (Math.random() * 20) - 10;
        size = Math.random() * 2.0 + 1.0;
      } else {
        // Background: Small, dense, deep
        z = (Math.random() * -30) - 10;
        size = Math.random() * 1.2 + 0.5;
      }

      pos[i * 3] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = z;

      // Color pick
      const cRand = Math.random();
      let particleColor = colorElectricBlue;
      if (cRand < 0.4) particleColor = colorCyan;
      else if (cRand > 0.85) particleColor = colorWhite;

      col[i * 3] = particleColor.r;
      col[i * 3 + 1] = particleColor.g;
      col[i * 3 + 2] = particleColor.b;

      sz[i] = size;

      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return [pos, col, sz, vel];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i);
      let y = posAttr.getY(i);
      let z = posAttr.getZ(i);

      // Algorithmic drift & subtle wave motion
      x += velocities[i * 3] + Math.sin(time * 0.5 + i) * 0.002;
      y += velocities[i * 3 + 1] + Math.cos(time * 0.5 + i) * 0.003;

      // Mouse subtle pull
      x += mouse.x * 0.001 * (z > 0 ? 2 : 0.5);
      y += mouse.y * 0.001 * (z > 0 ? 2 : 0.5);

      // Scroll-driven subtle expansion/convergence
      z += Math.sin(scrollProgress * Math.PI * 2 + i) * 0.01;

      // Boundary wrap
      if (x > 25) x = -25;
      if (x < -25) x = 25;
      if (y > 20) y = -20;
      if (y < -20) y = 20;

      posAttr.setXYZ(i, x, y, z);
    }

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.02 + mouse.x * 0.05;
    pointsRef.current.rotation.x = mouse.y * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
