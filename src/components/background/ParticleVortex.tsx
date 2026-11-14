import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type ParticleVortexProps = {
  background?: string;
  topRadius?: number;
  waistRadius?: number;
  waistPosition?: number;
  bottomRadius?: number;
  twist?: number;
  zoom?: number;
  speed?: number;
  direction?: 'up' | 'down';
  strands?: boolean;
  dots?: boolean;
  comets?: boolean;
  repel?: boolean;
  strandColor?: string;
  dotColor?: string;
  cometColor?: string;
  reducedMotion?: boolean;
};

type Shockwave = {
  mesh: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
  y: number;
  displacement: number;
  velocity: number;
  age: number;
};

type Comet = {
  line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  phase: number;
  y: number;
  collisionY: number;
  collided: boolean;
};

const HEIGHT = 7.2;
const DOT_COUNT = 900;

function radiusAt(y: number, top: number, waist: number, waistPosition: number, bottom: number) {
  const normalized = THREE.MathUtils.clamp(y / HEIGHT + 0.5, 0, 1);
  const pinch = THREE.MathUtils.clamp(0.5 + waistPosition * 0.34, 0.16, 0.84);
  if (normalized <= pinch) {
    return THREE.MathUtils.lerp(bottom, waist, THREE.MathUtils.smoothstep(normalized, 0, pinch));
  }
  return THREE.MathUtils.lerp(waist, top, THREE.MathUtils.smoothstep(normalized, pinch, 1));
}

function createDotMaterial(color: string) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: `
      attribute float aSize;
      attribute float aPhase;
      varying float vFlicker;
      uniform float uTime;
      uniform float uPixelRatio;
      void main() {
        vFlicker = 0.48 + 0.52 * sin(uTime * 4.2 + aPhase);
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uPixelRatio * (14.0 / -viewPosition.z) * (0.72 + vFlicker * 0.55);
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
    fragmentShader: `
      varying float vFlicker;
      uniform vec3 uColor;
      void main() {
        float distanceToCenter = length(gl_PointCoord - vec2(0.5));
        float core = 1.0 - smoothstep(0.04, 0.48, distanceToCenter);
        float halo = 1.0 - smoothstep(0.12, 0.5, distanceToCenter);
        float alpha = (core * 0.58 + halo * 0.12) * (0.34 + vFlicker * 0.5);
        if (alpha < 0.015) discard;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  });
}

export function ParticleVortex({
  background = '#090604',
  topRadius = 2.15,
  waistRadius = 0.46,
  waistPosition = 0.06,
  bottomRadius = 1.48,
  twist = 3.6,
  zoom = 1,
  speed = 0.42,
  direction = 'up',
  strands = true,
  dots = true,
  comets = true,
  repel = true,
  strandColor = '#f9a32c',
  dotColor = '#ffb84a',
  cometColor = '#fff1cf',
  reducedMotion = false,
}: ParticleVortexProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      setFallback(true);
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(background);
    scene.fog = new THREE.FogExp2(background, 0.052);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
    camera.position.set(0, 0.05, 11.8 / Math.max(zoom, 0.35));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.84;
    mount.appendChild(renderer.domElement);

    const rig = new THREE.Group();
    rig.position.set(1.65, 0.05, 0);
    scene.add(rig);

    const strandGroup = new THREE.Group();
    rig.add(strandGroup);
    if (strands) {
      const strandMaterial = new THREE.LineBasicMaterial({
        color: strandColor,
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const brightMaterial = strandMaterial.clone();
      brightMaterial.opacity = 0.3;
      const strandCount = 38;
      const segments = 150;
      for (let strandIndex = 0; strandIndex < strandCount; strandIndex += 1) {
        const points: THREE.Vector3[] = [];
        const baseAngle = (strandIndex / strandCount) * Math.PI * 2;
        for (let segment = 0; segment < segments; segment += 1) {
          const t = segment / (segments - 1);
          const y = (t - 0.5) * HEIGHT;
          const radius = radiusAt(y, topRadius, waistRadius, waistPosition, bottomRadius);
          const angle = baseAngle + t * twist * Math.PI * 2 + Math.sin(t * 18 + baseAngle) * 0.035;
          points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius * 0.52));
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        strandGroup.add(new THREE.Line(geometry, strandIndex % 6 === 0 ? brightMaterial : strandMaterial));
      }
    }

    const dotGeometry = new THREE.BufferGeometry();
    const dotBase = new Float32Array(DOT_COUNT * 3);
    const dotPositions = new Float32Array(DOT_COUNT * 3);
    const dotSizes = new Float32Array(DOT_COUNT);
    const dotPhases = new Float32Array(DOT_COUNT);
    for (let index = 0; index < DOT_COUNT; index += 1) {
      const y = (Math.random() - 0.5) * HEIGHT;
      const radius = radiusAt(y, topRadius, waistRadius, waistPosition, bottomRadius) * (0.76 + Math.random() * 0.32);
      const angle = Math.random() * Math.PI * 2 + (y / HEIGHT + 0.5) * twist * Math.PI * 2;
      const offset = index * 3;
      dotBase[offset] = Math.cos(angle) * radius;
      dotBase[offset + 1] = y;
      dotBase[offset + 2] = Math.sin(angle) * radius * 0.54;
      dotPositions[offset] = dotBase[offset];
      dotPositions[offset + 1] = dotBase[offset + 1];
      dotPositions[offset + 2] = dotBase[offset + 2];
      dotSizes[index] = 0.8 + Math.random() * 1.2;
      dotPhases[index] = Math.random() * Math.PI * 2;
    }
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    dotGeometry.setAttribute('aSize', new THREE.BufferAttribute(dotSizes, 1));
    dotGeometry.setAttribute('aPhase', new THREE.BufferAttribute(dotPhases, 1));
    const dotMaterial = createDotMaterial(dotColor);
    const dotField = new THREE.Points(dotGeometry, dotMaterial);
    dotField.visible = dots;
    rig.add(dotField);

    const baseRingMaterial = new THREE.MeshBasicMaterial({
      color: strandColor,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    for (let ringIndex = 0; ringIndex < 7; ringIndex += 1) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.65 + ringIndex * 0.38, 0.67 + ringIndex * 0.38, 96), baseRingMaterial.clone());
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -HEIGHT * 0.5 - 0.08;
      ring.scale.y = 0.48;
      rig.add(ring);
    }

    const shockwaves: Shockwave[] = [];
    const spawnShockwave = (y: number) => {
      const radius = radiusAt(y, topRadius, waistRadius, waistPosition, bottomRadius);
      const material = new THREE.MeshBasicMaterial({
        color: cometColor,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(new THREE.RingGeometry(radius * 0.88, radius * 0.94, 72), material);
      mesh.rotation.x = Math.PI / 2;
      mesh.position.y = y;
      mesh.scale.set(0.72, 0.38, 0.72);
      rig.add(mesh);
      shockwaves.push({ mesh, y, displacement: 1, velocity: 0, age: 0 });
    };

    const cometMaterial = new THREE.LineBasicMaterial({
      color: cometColor,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const cometList: Comet[] = [];
    if (comets) {
      for (let cometIndex = 0; cometIndex < 4; cometIndex += 1) {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(14 * 3), 3));
        const line = new THREE.Line(geometry, cometMaterial.clone());
        rig.add(line);
        cometList.push({
          line,
          phase: Math.random() * Math.PI * 2,
          y: -HEIGHT * 0.5 + Math.random() * HEIGHT,
          collisionY: -2.1 + Math.random() * 4.2,
          collided: false,
        });
      }
    }

    const pointer = new THREE.Vector2(0.35, 0);
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    if (repel && !reducedMotion) window.addEventListener('pointermove', onPointerMove, { passive: true });

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
      camera.aspect = Math.max(width, 1) / Math.max(height, 1);
      camera.updateProjectionMatrix();
      dotMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
      renderer.render(scene, camera);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    const flowDirection = direction === 'up' ? 1 : -1;
    let frame = 0;
    let previousTime = performance.now();
    const render = (time: number) => {
      const delta = Math.min((time - previousTime) / 1000, 0.034);
      previousTime = time;
      const elapsed = time / 1000;
      rig.rotation.y += delta * speed * flowDirection;
      dotMaterial.uniforms.uTime.value = elapsed * Math.max(speed, 0.08);

      if (repel) {
        const targetX = 1.65 - (pointer.x - 0.28) * 0.42;
        const targetY = 0.05 - pointer.y * 0.18;
        rig.position.x += (targetX - rig.position.x) * 0.035;
        rig.position.y += (targetY - rig.position.y) * 0.035;
      }

      cometList.forEach((comet) => {
        const previousY = comet.y;
        comet.y += delta * (1.65 + speed * 2.1) * flowDirection;
        if ((flowDirection > 0 && comet.y > HEIGHT * 0.62) || (flowDirection < 0 && comet.y < -HEIGHT * 0.62)) {
          comet.y = flowDirection > 0 ? -HEIGHT * 0.62 : HEIGHT * 0.62;
          comet.collisionY = -2.2 + Math.random() * 4.4;
          comet.collided = false;
          comet.phase = Math.random() * Math.PI * 2;
        }
        const crossed = flowDirection > 0
          ? previousY < comet.collisionY && comet.y >= comet.collisionY
          : previousY > comet.collisionY && comet.y <= comet.collisionY;
        if (crossed && !comet.collided) {
          spawnShockwave(comet.collisionY);
          comet.collided = true;
        }
        const positions = comet.line.geometry.getAttribute('position') as THREE.BufferAttribute;
        for (let tail = 0; tail < 14; tail += 1) {
          const tailY = comet.y - flowDirection * tail * 0.075;
          const radius = radiusAt(tailY, topRadius, waistRadius, waistPosition, bottomRadius) * 0.93;
          const angle = comet.phase + (tailY / HEIGHT + 0.5) * twist * Math.PI * 2;
          positions.setXYZ(tail, Math.cos(angle) * radius, tailY, Math.sin(angle) * radius * 0.54);
        }
        positions.needsUpdate = true;
      });

      for (let index = shockwaves.length - 1; index >= 0; index -= 1) {
        const wave = shockwaves[index];
        const acceleration = -16 * wave.displacement - 7.2 * wave.velocity;
        wave.velocity += acceleration * delta;
        wave.displacement += wave.velocity * delta;
        wave.age += delta;
        const expansion = 1 + wave.age * 1.45;
        wave.mesh.scale.set(expansion, 0.38, expansion);
        wave.mesh.material.opacity = Math.max(0, 0.68 * (1 - wave.age / 1.45));
        if (wave.age > 1.45) {
          rig.remove(wave.mesh);
          wave.mesh.geometry.dispose();
          wave.mesh.material.dispose();
          shockwaves.splice(index, 1);
        }
      }

      if (dots && shockwaves.length) {
        const positions = dotGeometry.getAttribute('position') as THREE.BufferAttribute;
        for (let dotIndex = 0; dotIndex < DOT_COUNT; dotIndex += 1) {
          const offset = dotIndex * 3;
          const baseX = dotBase[offset];
          const baseY = dotBase[offset + 1];
          const baseZ = dotBase[offset + 2];
          let ripple = 0;
          shockwaves.forEach((wave) => {
            const distance = baseY - wave.y;
            ripple += wave.displacement * Math.exp(-(distance * distance) / 0.24) * 0.22;
          });
          const radialLength = Math.max(Math.hypot(baseX, baseZ), 0.001);
          positions.setXYZ(dotIndex, baseX + (baseX / radialLength) * ripple, baseY, baseZ + (baseZ / radialLength) * ripple * 0.54);
        }
        positions.needsUpdate = true;
      }

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };

    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      frame = window.requestAnimationFrame(render);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [background, bottomRadius, cometColor, comets, direction, dotColor, dots, reducedMotion, repel, speed, strandColor, strands, topRadius, twist, waistPosition, waistRadius, zoom]);

  return (
    <div ref={mountRef} className={`particle-vortex${fallback ? ' is-fallback' : ''}`} aria-hidden="true">
      {fallback && <span className="particle-vortex-fallback" />}
    </div>
  );
}
