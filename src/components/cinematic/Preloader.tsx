import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { logoSections } from './LogoAssembly';

const SESSION_KEY = 'rrexIntroComplete';
const logoSrc = '/assets/r_rex_logo_transparent.png';

export function Preloader({ reducedMotion }: { reducedMotion: boolean }) {
  const [visible, setVisible] = useState(() => sessionStorage.getItem(SESSION_KEY) !== 'true');

  useEffect(() => {
    if (!visible) return;
    const timeout = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setVisible(false);
    }, reducedMotion ? 250 : 9600);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion, visible]);

  if (!visible) return null;

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setVisible(false);
  };

  return (
    <motion.div
      className="preloader cinematic-intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="status"
      aria-label="R-REX Solutions logo reveal"
    >
      <button className="skip-intro" type="button" onClick={dismiss}>
        Skip
      </button>
      <div className="intro-particles" aria-hidden="true" />
      <div className="intro-stage" aria-hidden="true">
        <motion.div
          className="intro-core-light"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={reducedMotion ? { opacity: 0.7, scale: 1 } : { opacity: [0, 0.38, 0.18, 0.72, 0.35], scale: [0.3, 0.8, 1, 1.35, 1] }}
          transition={{ duration: reducedMotion ? 0.01 : 8.6, ease: 'easeInOut' }}
        />
        {!reducedMotion && logoSections.map((cut) => (
          <motion.img
            key={cut.name}
            className={`intro-piece intro-piece-${cut.name}`}
            src={logoSrc}
            alt=""
            draggable={false}
            style={{ clipPath: cut.clipPath }}
            initial={{ opacity: 0, ...cut.start }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 1.35, delay: 1.15 + cut.delay * 1.35, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        <motion.img
          className="intro-final-logo"
          src={logoSrc}
          alt=""
          draggable={false}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.38, delay: reducedMotion ? 0 : 8.5, ease: 'easeOut' }}
        />
        <motion.span
          className="intro-energy-wave"
          initial={{ opacity: 0, scaleX: 0.05 }}
          animate={reducedMotion ? {} : { opacity: [0, 1, 0], scaleX: [0.05, 1.1, 1.5] }}
          transition={{ duration: 0.9, delay: 5.45, ease: 'easeOut' }}
        />
      </div>
      <p className="intro-caption">R-REX SOLUTIONS</p>
    </motion.div>
  );
}
