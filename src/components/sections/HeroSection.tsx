import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ChevronRight } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';
import { CinematicBackdrop } from '../background/CinematicBackdrop';
import { FormationExperience } from '../cinematic/FormationExperience';

export function HeroSection({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section id="top" className="hero-section">
      <CinematicBackdrop reducedMotion={reducedMotion} />
      <motion.div className="hero-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
        <div className="hero-copy-block">
          <p className="eyebrow">R-REX SOLUTIONS</p>
          <h1>Transforming Ideas into Intelligent Solutions</h1>
          <p className="hero-copy">
            We build websites, applications, AI-driven systems, digital experiences, and technology solutions with
            precision, creativity, and strong execution.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#contact">
              Start a Project <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary">
              Explore Services <ChevronRight size={18} />
            </ButtonLink>
          </div>
        </div>
        <FormationExperience reducedMotion={reducedMotion} />
      </motion.div>
      <a className="scroll-indicator" href="#manifesto" aria-label="Scroll to manifesto">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
