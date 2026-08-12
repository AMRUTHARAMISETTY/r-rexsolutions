import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RRexEmblem3DProps {
  scrollProgress?: number;
  mouse?: { x: number; y: number };
  isDisintegrated?: boolean;
}

export const RRexEmblem3D: React.FC<RRexEmblem3DProps> = ({
  scrollProgress = 0,
  mouse = { x: 0, y: 0 },
  isDisintegrated = false,
}) => {
  const meshGroupRef = useRef<THREE.Group>(null!);
  const disintegratedPointsRef = useRef<THREE.Points>(null!);

  // Build high-precision 2D shape for 3D Extrusion matching R-REX logo geometry
  const shape = useMemo(() => {
    const s = new THREE.Shape();

    // T-REX Silhouette Facing Right
    s.moveTo(-1.2, -1.8);
    s.lineTo(1.2, -1.8);
    s.lineTo(1.8, -1.0);
    s.lineTo(2.2, -0.2);
    s.lineTo(1.5, 0.2);
    s.lineTo(1.7, 0.6);
    s.lineTo(0.8, 1.0);
    s.lineTo(0.5, 0.7);
    s.lineTo(-0.2, 1.0);
    s.lineTo(-0.8, 1.8);
    s.lineTo(-1.6, 2.2);
    s.lineTo(-2.0, 2.2);
    s.lineTo(-1.6, 1.0);
    s.lineTo(-1.0, 0.0);
    s.lineTo(-1.5, -0.8);
    s.closePath();

    return s;
  }, []);

  const extrudeSettings = useMemo(() => ({
    steps: 2,
    depth: 0.6,
    bevelEnabled: true,
    bevelThickness: 0.12,
    bevelSize: 0.1,
    bevelSegments: 4,
  }), []);

  // Disintegration particles data
  const [disintegratedPos, disintegratedVel] = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1;

      vel[i * 3] = (Math.random() - 0.5) * 0.08;
      vel[i * 3 + 1] = Math.random() * 0.06 + 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }

    return [pos, vel];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshGroupRef.current) {
      // Rotation & gentle float
      meshGroupRef.current.rotation.y = time * 0.25 + mouse.x * 0.3 + scrollProgress * Math.PI * 0.8;
      meshGroupRef.current.rotation.x = mouse.y * 0.2 + Math.sin(time * 0.8) * 0.05;
      meshGroupRef.current.position.y = Math.sin(time * 1.5) * 0.15;
    }

    // Disintegration animation step
    if (isDisintegrated && disintegratedPointsRef.current) {
      const geo = disintegratedPointsRef.current.geometry;
      const posAttr = geo.attributes.position;
      for (let i = 0; i < 1200; i++) {
        let x = posAttr.getX(i) + disintegratedVel[i * 3];
        let y = posAttr.getY(i) + disintegratedVel[i * 3 + 1];
        let z = posAttr.getZ(i) + disintegratedVel[i * 3 + 2];
        posAttr.setXYZ(i, x, y, z);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0.5, 0]}>
      {/* Active 3D Metallic Emblem Mesh (Hidden during full disintegration) */}
      {!isDisintegrated ? (
        <group ref={meshGroupRef}>
          {/* Main Metallic Extruded Body */}
          <mesh castShadow receiveShadow>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshStandardMaterial
              color="#0060F0"
              metalness={0.9}
              roughness={0.15}
              emissive="#001040"
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Glowing Cyan Eye Accent */}
          <mesh position={[0.8, 0.4, 0.38]}>
            <coneGeometry args={[0.15, 0.4, 3]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>

          {/* Interlocking 'X' Accent Mark at Neck/Chest - Aligned perfectly to the neck silhouette */}
          <group position={[-0.7, -1.2, 0.35]}>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.9, 0.2, 0.2]} />
              <meshStandardMaterial color="#00C0F0" emissive="#00C0F0" emissiveIntensity={0.8} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.9, 0.2, 0.2]} />
              <meshStandardMaterial color="#00C0F0" emissive="#00C0F0" emissiveIntensity={0.8} />
            </mesh>
          </group>
        </group>
      ) : (
        /* Disintegrated Data Particles */
        <points ref={disintegratedPointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[disintegratedPos, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.15}
            color="#00C0F0"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
};
