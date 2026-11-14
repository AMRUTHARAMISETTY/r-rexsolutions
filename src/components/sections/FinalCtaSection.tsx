import { ArrowRight, MessageCircle } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';
import { brand } from '../../data/siteContent';

const logoSrc = '/assets/r_rex_logo.png';

export function FinalCtaSection() {
  return (
    <section className="final-cta">
      <div className="final-symbol" aria-hidden="true">
        <img src={logoSrc} alt="" />
      </div>
      <div className="final-copy">
        <h2>Let's build something powerful.</h2>
        <p>Tell us what you want to build. We will help you turn it into a precise, polished digital product.</p>
        <div className="hero-actions">
          <ButtonLink href="#contact">
            Start a Project <ArrowRight size={18} />
          </ButtonLink>
          <ButtonLink href={brand.whatsapp} variant="secondary" external>
            Message on WhatsApp <MessageCircle size={18} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
