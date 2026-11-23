import { ExternalLink } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';
import { socialLinks } from '../../data/siteContent';

export function LinkedInSection() {
  return (
    <section className="linkedin-section">
      <div>
        <span className="section-kicker">SOCIAL</span>
        <h2>Follow what we are building</h2>
      </div>
      <div className="social-grid">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a href={link.href} target="_blank" rel="noreferrer noopener" key={link.href}>
              <Icon size={20} />
              {link.label}
              <ExternalLink size={15} />
            </a>
          );
        })}
      </div>
      <ButtonLink href="https://www.linkedin.com/company/135853990/" external>
        Follow R-REX Solutions <ExternalLink size={16} />
      </ButtonLink>
    </section>
  );
}
