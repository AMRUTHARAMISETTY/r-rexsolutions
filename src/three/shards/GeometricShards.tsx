import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const GeometricShards: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);

  const shardsCount = 18;

  const shardsData = useMemo(() => {
    return Array.from({ length: shardsCount }).map(() => ({
      position: [
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20 - 5,
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.2,
      rotationSpeed: [
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
      ] as [number, number, number],
      type: Math.random() > 0.5 ? 'tetrahedron' : 'octahedron',
    }));
  }, [shardsCount]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      const data = shardsData[i];
      child.rotation.x += data.rotationSpeed[0];
      child.rotation.y += data.rotationSpeed[1];
      child.position.y += Math.sin(time + i) * 0.003;
    });
  });

  return (
    <group ref={groupRef}>
      {shardsData.map((shard, idx) => (
        <mesh key={idx} position={shard.position} scale={shard.scale}>
          {shard.type === 'tetrahedron' ? (
            <tetrahedronGeometry args={[1, 0]} />
          ) : (
            <octahedronGeometry args={[1, 0]} />
          )}
          <meshPhysicalMaterial
            color="#0060F0"
            emissive="#00C0F0"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            wireframe={idx % 3 === 0}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}
    </group>
  );
};
