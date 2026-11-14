import { motion } from 'framer-motion';

const finalLogoSource = '/assets/r_rex_logo_transparent.png';
const wordmark = 'R-REX SOLUTIONS';

type LogoCut = {
  name: string;
  clipPath: string;
  delay: number;
  start: { x: number; y: number; rotateX: number; rotateY: number; rotateZ: number; scale: number };
};

// Each mask exposes pixels from the approved logo artwork, so the final silhouette
// is never redrawn or approximated during the construction sequence.
const logoCuts: LogoCut[] = [
  {
    name: 'head',
    clipPath: 'polygon(24% 14%, 59% 14%, 67% 18%, 71% 23%, 80% 26%, 82% 31%, 82% 37%, 78% 39%, 64% 39%, 55% 35%, 47% 29%, 37% 29%, 30% 40%, 25% 56%, 19% 70%, 19% 46%, 21% 27%, 29% 22%)',
    delay: 0.1,
    start: { x: -340, y: -150, rotateX: 24, rotateY: -44, rotateZ: -15, scale: 0.74 },
  },
  {
    name: 'jaw',
    clipPath: 'polygon(36% 35%, 48% 35%, 59% 41%, 66% 42%, 74% 47%, 80% 47%, 77% 56%, 66% 59%, 59% 56%, 49% 57%, 55% 62%, 50% 68%, 43% 60%, 35% 50%)',
    delay: 0.48,
    start: { x: 310, y: 185, rotateX: -28, rotateY: 36, rotateZ: 13, scale: 0.75 },
  },
  {
    name: 'eye',
    clipPath: 'polygon(58% 21%, 65% 21%, 65% 28%, 58% 28%)',
    delay: 0.84,
    start: { x: 220, y: -190, rotateX: 42, rotateY: 20, rotateZ: 36, scale: 0.45 },
  },
  {
    name: 'brow',
    clipPath: 'polygon(55% 18%, 68% 18%, 68% 25%, 55% 25%)',
    delay: 0.98,
    start: { x: -230, y: -210, rotateX: -36, rotateY: -24, rotateZ: -28, scale: 0.48 },
  },
  {
    name: 'nostril',
    clipPath: 'polygon(75% 25%, 80% 25%, 80% 32%, 75% 32%)',
    delay: 1.1,
    start: { x: 260, y: -40, rotateX: 32, rotateY: 46, rotateZ: 18, scale: 0.48 },
  },
  {
    name: 'x-left',
    clipPath: 'polygon(35% 51%, 50% 51%, 50% 70%, 35% 70%)',
    delay: 1.28,
    start: { x: -300, y: 265, rotateX: 34, rotateY: -42, rotateZ: 26, scale: 0.64 },
  },
  {
    name: 'x-right',
    clipPath: 'polygon(49% 52%, 65% 52%, 65% 70%, 49% 70%)',
    delay: 1.46,
    start: { x: 310, y: 255, rotateX: -31, rotateY: 42, rotateZ: -24, scale: 0.64 },
  },
  {
    name: 'triangle',
    clipPath: 'polygon(43% 58%, 58% 58%, 58% 71%, 43% 71%)',
    delay: 1.66,
    start: { x: 0, y: 330, rotateX: 54, rotateY: 0, rotateZ: 17, scale: 0.52 },
  },
];

export function LogoAssembly({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      className="logo-assembly"
      aria-label="R-REX Solutions logo assembling from its original cut pieces"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.55, delay: 0.1 }}
    >
      <div className="assembly-stage">
        <div className="assembly-atmosphere" aria-hidden="true" />

        {!reducedMotion && logoCuts.map((cut) => (
          <motion.img
            key={cut.name}
            className={`assembly-piece assembly-piece-${cut.name}`}
            src={finalLogoSource}
            alt=""
            draggable={false}
            style={{ clipPath: cut.clipPath }}
            initial={{ opacity: 0, ...cut.start }}
            animate={{ opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 }}
            transition={{ duration: 1.25, delay: cut.delay, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}

        <motion.div className="assembly-wordmark-text" aria-label={wordmark}>
          {Array.from(wordmark).map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              aria-hidden="true"
              initial={reducedMotion ? false : { opacity: 0, y: 16, rotateX: -70, filter: 'blur(7px)' }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
              transition={{ duration: reducedMotion ? 0.01 : 0.42, delay: reducedMotion ? 0 : 2.25 + index * 0.065, ease: [0.22, 1, 0.36, 1] }}
            >
              {letter === ' ' ? '\u00a0' : letter}
            </motion.span>
          ))}
        </motion.div>

        <motion.img
          className="assembly-final-mark"
          src={finalLogoSource}
          alt=""
          draggable={false}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.48, delay: reducedMotion ? 0 : 3.38, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.span
          className="assembly-flare"
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0.1 }}
          animate={reducedMotion ? {} : { opacity: [0, 0.9, 0], scaleX: [0.1, 1, 0.35] }}
          transition={{ duration: 1.05, delay: 2.7, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
