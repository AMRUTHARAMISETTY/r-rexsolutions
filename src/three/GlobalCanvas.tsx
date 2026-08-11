import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticleSystem } from './particles/ParticleSystem';
import { HolographicTerrain } from './terrain/HolographicTerrain';
import { NeuralNetworkNodes } from './network/NeuralNetworkNodes';
import { GeometricShards } from './shards/GeometricShards';
import { RRexEmblem3D } from './logo/RRexEmblem3D';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface GlobalCanvasProps {
  scrollProgress: number;
  isDisintegrated?: boolean;
}

export const GlobalCanvas: React.FC<GlobalCanvasProps> = ({
  scrollProgress,
  isDisintegrated = false,
}) => {
  const mouse = useMouseParallax();
  const isReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020711]">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 2]}
        gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
      >
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00C0F0" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#0060F0" />
        <directionalLight position={[0, 15, 5]} intensity={1.2} color="#FFFFFF" />

        <Suspense fallback={null}>
          {/* Central R-REX Emblem Intelligence Core */}
          <RRexEmblem3D
            scrollProgress={scrollProgress}
            mouse={isReducedMotion ? { x: 0, y: 0 } : mouse}
            isDisintegrated={isDisintegrated}
          />

          {/* Floating GPU Particle System */}
          <ParticleSystem
            count={isReducedMotion ? 600 : 2500}
            scrollProgress={scrollProgress}
            mouse={mouse}
          />

          {/* Holographic Undulating Dot Terrain */}
          <HolographicTerrain />

          {/* 3D Neural Network Nodes & Connecting Lines */}
          <NeuralNetworkNodes scrollProgress={scrollProgress} />

          {/* Floating Crystal Shards */}
          {!isReducedMotion && <GeometricShards />}
        </Suspense>
      </Canvas>
    </div>
  );
};
