import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralNetworkNodesProps {
  scrollProgress?: number;
}

export const NeuralNetworkNodes: React.FC<NeuralNetworkNodesProps> = ({ scrollProgress = 0 }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const lineMeshRef = useRef<THREE.LineSegments>(null!);

  const nodeCount = 35;

  // Generate 3D nodes positions and connection line indices
  const { nodePositions, linePositions } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const radius = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      nodes.push(
        new THREE.Vector3(
          radius * Math.cos(theta) * Math.cos(phi),
          radius * Math.sin(phi),
          radius * Math.sin(theta) * Math.cos(phi)
        )
      );
    }

    const linePoints: number[] = [];
    const maxDistance = 7;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < maxDistance) {
          linePoints.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePoints.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    const nPos = new Float32Array(nodeCount * 3);
    nodes.forEach((v, idx) => {
      nPos[idx * 3] = v.x;
      nPos[idx * 3 + 1] = v.y;
      nPos[idx * 3 + 2] = v.z;
    });

    return {
      nodePositions: nPos,
      linePositions: new Float32Array(linePoints),
    };
  }, [nodeCount]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.08 + scrollProgress * Math.PI * 0.5;
    groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Network Nodes (Sphere instancing) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.25}
          color="#00C0F0"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Network Connecting Lines */}
      <lineSegments ref={lineMeshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0060F0"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};
