import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Desktop-only amber glow that trails the pointer. Touch input is ignored via
 * the pointerType check, and the `.cursor-glow` rule is hidden entirely under
 * the mobile breakpoint in index.css as a second line of defense.
 */
export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 120, damping: 30 });
  const springY = useSpring(y, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x.set(event.clientX - 180);
      y.set(event.clientY - 180);
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [x, y]);

  return <motion.div className="cursor-glow" style={{ x: springX, y: springY }} aria-hidden="true" />;
}
