import { useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  external?: boolean;
  className?: string;
};

/**
 * CTA link with a restrained magnetic hover: on desktop pointers the button
 * drifts a few pixels toward the cursor and springs back on release. Touch
 * input and prefers-reduced-motion both skip the pull entirely.
 */
export function ButtonLink({ children, href, variant = 'primary', external = false, className = '' }: ButtonLinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reducedMotionRef = useRef(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 22, mass: 0.4 });

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse' || !ref.current) return;
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotionRef.current) return;
    const bounds = ref.current.getBoundingClientRect();
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * 0.24);
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * 0.32);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      className={`magnetic-btn btn btn-${variant} ${className}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.a>
  );
}
