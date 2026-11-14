import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LogoMark } from '../ui/LogoMark';
import { ButtonLink } from '../ui/ButtonLink';
import { navLinks } from '../../data/siteContent';

const OBSERVED_SECTIONS = ['top', 'services', 'work', 'about', 'insights', 'contact'];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('top');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    OBSERVED_SECTIONS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <LogoMark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a className={active === link.href.slice(1) ? 'active' : ''} href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <ButtonLink href="#contact">Start a Project</ButtonLink>
          <button className="menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          {navLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <ButtonLink href="#contact" className="mobile-start">
            Start a Project
          </ButtonLink>
        </motion.nav>
      )}
    </header>
  );
}
