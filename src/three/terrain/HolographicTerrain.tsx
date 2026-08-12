import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WIDTH = 60;
const HEIGHT = 40;
const COUNT_X = 80;
const COUNT_Z = 60;
const NUM_PARTICLES = COUNT_X * COUNT_Z;

export const HolographicTerrain: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(NUM_PARTICLES * 3);
    const col = new Float32Array(NUM_PARTICLES * 3);

    const cyan = new THREE.Color('#00C0F0');
    const blue = new THREE.Color('#0060F0');

    let idx = 0;
    for (let ix = 0; ix < COUNT_X; ix++) {
      for (let iz = 0; iz < COUNT_Z; iz++) {
        const x = (ix / COUNT_X) * WIDTH - WIDTH / 2;
        const z = (iz / COUNT_Z) * HEIGHT - HEIGHT / 2;
        const y = -8; // Position at bottom plane

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = z;

        const mixRatio = Math.sin((ix / COUNT_X) * Math.PI) * 0.5 + 0.5;
        const particleColor = cyan.clone().lerp(blue, mixRatio);

        col[idx * 3] = particleColor.r;
        col[idx * 3 + 1] = particleColor.g;
        col[idx * 3 + 2] = particleColor.b;

        idx++;
      }
    }

    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position;
    const time = state.clock.getElapsedTime();

    let idx = 0;
    for (let ix = 0; ix < COUNT_X; ix++) {
      for (let iz = 0; iz < COUNT_Z; iz++) {
        const u = ix / COUNT_X;
        const v = iz / COUNT_Z;

        // Wave formula for undulating holographic mesh
        const wave = Math.sin(u * 10 + time * 1.5) * Math.cos(v * 8 + time * 1.2) * 1.5
                   + Math.sin(u * 20 - time) * 0.5;

        posAttr.setY(idx, -8 + wave);
        idx++;
      }
    }

    posAttr.needsUpdate = true;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
