import { useState, useEffect } from 'react';

interface MousePosition {
  x: number; // Normalized -1 to 1
  y: number; // Normalized -1 to 1
  pixelX: number;
  pixelY: number;
}

export const useMouseParallax = () => {
  const [mouse, setMouse] = useState<MousePosition>({
    x: 0,
    y: 0,
    pixelX: 0,
    pixelY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (e.clientX / innerWidth) * 2 - 1;
      const normalizedY = -(e.clientY / innerHeight) * 2 + 1;

      setMouse({
        x: normalizedX,
        y: normalizedY,
        pixelX: e.clientX,
        pixelY: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouse;
};
