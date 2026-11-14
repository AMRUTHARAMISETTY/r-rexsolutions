import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { brand } from '../../data/siteContent';

const SESSION_KEY = 'rrexIntroComplete';
const logoSrc = '/assets/r_rex_logo.png';

export function Preloader() {
  const [visible, setVisible] = useState(() => sessionStorage.getItem(SESSION_KEY) !== 'true');

  useEffect(() => {
    if (!visible) return;
    const timeout = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setVisible(false);
    }, 3600);
    return () => window.clearTimeout(timeout);
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, 'true');
    setVisible(false);
  };

  return (
    <motion.div className="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} role="status" aria-live="polite">
      <button className="skip-intro" type="button" onClick={dismiss}>
        Skip
      </button>
      <div className="preloader-logo" aria-hidden="true">
        <img className="preloader-logo-trace" src={logoSrc} alt="" width={1262} height={1262} />
        <img className="preloader-logo-fill" src={logoSrc} alt="" width={1262} height={1262} />
      </div>
      <p>{brand.tagline}</p>
    </motion.div>
  );
}
