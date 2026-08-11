import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
      setScrollProgress(progress);

      // Section calculation based on scroll percentages
      if (progress < 0.12) setActiveSection('hero');
      else if (progress < 0.28) setActiveSection('services');
      else if (progress < 0.42) setActiveSection('ai');
      else if (progress < 0.58) setActiveSection('process');
      else if (progress < 0.72) setActiveSection('ecosystem');
      else if (progress < 0.88) setActiveSection('projects');
      else setActiveSection('contact');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, activeSection };
};
