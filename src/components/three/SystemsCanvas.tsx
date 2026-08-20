import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import SystemsNetwork from './SystemsNetwork';

export default function SystemsCanvas() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 11], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <SystemsNetwork reducedMotion={reducedMotion} />
    </Canvas>
  );
}
