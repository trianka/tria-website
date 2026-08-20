import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SystemsNetworkProps {
  reducedMotion: boolean;
}

interface NetworkGeometry {
  positions: Float32Array;
  edgePositions: Float32Array;
}

function generateNetwork(count: number, radius: number, maxEdgeDist: number, maxNeighbors: number): NetworkGeometry {
  const positions = new Float32Array(count * 3);
  const points: THREE.Vector3[] = [];

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * Math.cbrt(Math.random());
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    points.push(new THREE.Vector3(x, y, z));
  }

  const edgeSet = new Set<string>();
  const edgePositions: number[] = [];

  for (let i = 0; i < count; i++) {
    const distances: { j: number; d: number }[] = [];
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      const d = points[i].distanceTo(points[j]);
      if (d < maxEdgeDist) distances.push({ j, d });
    }
    distances.sort((a, b) => a.d - b.d);
    for (const { j } of distances.slice(0, maxNeighbors)) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);
      const a = points[i];
      const b = points[j];
      edgePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }

  return { positions, edgePositions: new Float32Array(edgePositions) };
}

export default function SystemsNetwork({ reducedMotion }: SystemsNetworkProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.08, y: 0 });

  const count = useMemo(() => (typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 150), []);
  const { positions, edgePositions } = useMemo(() => generateNetwork(count, 6, 2.6, 3), [count]);

  useEffect(() => {
    if (reducedMotion) return;
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reducedMotion]);

  useFrame((_state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (reducedMotion) {
      group.rotation.set(0.1, 0.3, 0);
      return;
    }

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

    targetRotation.current.y = scrollProgress * Math.PI * 0.6 + pointer.current.x * 0.25;
    targetRotation.current.x = 0.1 - pointer.current.y * 0.15;

    const ease = Math.min(delta * 2, 1);
    group.rotation.y += (targetRotation.current.y - group.rotation.y) * ease;
    group.rotation.x += (targetRotation.current.x - group.rotation.x) * ease;
    group.rotation.z += delta * 0.02;
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2f6e67" transparent opacity={0.35} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#5eeada" size={0.065} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  );
}
