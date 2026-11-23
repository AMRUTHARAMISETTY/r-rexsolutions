import { motion } from 'framer-motion';

const finalLogoSource = '/assets/r_rex_logo_transparent.png';

type LogoSection = {
  name: string;
  clipPath: string;
  delay: number;
  start: { x: number; y: number; scale: number };
};

// These non-destructive windows reveal aligned regions of the approved artwork.
// Every section uses the same full-resolution source and returns to the same origin,
// so the animation cannot distort or redraw the logo geometry.
export const logoSections: LogoSection[] = [
  {
    name: 'head-neck', clipPath: 'inset(7% 12% 34% 14%)', delay: 1.2, start: { x: -70, y: -56, scale: 0.92 },
  },
  {
    name: 'jaw', clipPath: 'inset(30% 11% 39% 28%)', delay: 3.2, start: { x: 78, y: 8, scale: 0.9 },
  },
  {
    name: 'orange-chevron', clipPath: 'inset(45% 49% 19% 29%)', delay: 5.8, start: { x: -78, y: 72, scale: 0.88 },
  },
  {
    name: 'gold-chevron', clipPath: 'inset(45% 27% 19% 49%)', delay: 6.05, start: { x: 78, y: 72, scale: 0.88 },
  },
  {
    name: 'ivory-triangle', clipPath: 'inset(56% 39% 18% 39%)', delay: 7.6, start: { x: 0, y: 96, scale: 0.86 },
  },
  {
    name: 'orange-eye', clipPath: 'inset(16% 36% 64% 56%)', delay: 4.7, start: { x: 18, y: -48, scale: 0.82 },
  },
  {
    name: 'r-rex-wordmark', clipPath: 'inset(72% 54% 11% 4%)', delay: 8.3, start: { x: -88, y: 18, scale: 0.94 },
  },
  {
    name: 'solutions-wordmark', clipPath: 'inset(72% 4% 11% 45%)', delay: 8.65, start: { x: 88, y: 18, scale: 0.94 },
  },
];

export function LogoAssembly({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      className="logo-assembly"
      aria-label="R-REX Solutions logo forming from its original artwork"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.55, delay: 0.1 }}
    >
      <div className="assembly-stage">
        <div className="assembly-atmosphere" aria-hidden="true" />

        {!reducedMotion && logoSections.map((cut) => (
          <motion.img
            key={cut.name}
            className={`assembly-piece assembly-piece-${cut.name}`}
            src={finalLogoSource}
            alt=""
            draggable={false}
            style={{ clipPath: cut.clipPath }}
            initial={{ opacity: 0, ...cut.start }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: cut.delay, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        <motion.span
          className="assembly-flare"
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0.1 }}
          animate={reducedMotion ? {} : { opacity: [0, 0.9, 0], scaleX: [0.1, 1, 0.35] }}
          transition={{ duration: 0.8, delay: 9.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
