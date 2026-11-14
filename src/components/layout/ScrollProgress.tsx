import { useEffect, useState } from 'react';

export function ScrollProgress({ reducedMotion }: { reducedMotion: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}
