/**
 * Shared Framer Motion animation variants for R-REX Solutions website.
 * Centralised here so all sections have consistent, on-brand motion.
 */
import type { Variants } from 'framer-motion';

/* Ease curve: fast start, smooth settle */
const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade up with a gentle vertical lift */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   {
    opacity: 1,
    y: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.55, ease: EASE as any },
  },
};

/** Fade in only — no movement */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.45 } },
};

/** Stagger container — children use fadeUp */
export const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.10 } },
};

/** Stagger container with longer delay */
export const staggerSlow: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
