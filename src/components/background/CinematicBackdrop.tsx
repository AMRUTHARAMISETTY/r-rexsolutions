import { ParticleVortex } from './ParticleVortex';

export function CinematicBackdrop({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="cinematic-backdrop" aria-hidden="true">
      <ParticleVortex
        background="#090604"
        topRadius={1.82}
        waistRadius={0.38}
        waistPosition={0.08}
        bottomRadius={1.28}
        twist={3.8}
        zoom={1.02}
        speed={0.38}
        direction="up"
        strands
        dots
        comets
        repel
        strandColor="#d87814"
        dotColor="#e49328"
        cometColor="#ffd690"
        reducedMotion={reducedMotion}
      />
      <div className="scene-gradient" />
      <div className="blueprint-grid" />
      <div className="vignette" />
    </div>
  );
}
