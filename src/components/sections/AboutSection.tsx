import { ExternalLink } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';

export function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="about-copy">
        <span className="section-kicker">05 / ABOUT</span>
        <h2>Creativity, technology and execution in one build partner</h2>
        <p>
          R-REX Solutions combines creative thinking, modern technology and disciplined execution to turn ideas into
          real digital products. We listen before building, shape requirements into visible plans, and stay accountable
          from first concept through launch.
        </p>
      </div>
      <div className="leadership-grid">
        <article className="leader-card">
          <h3>Amrutha Ramisetty</h3>
          <p>Founder, R-REX Solutions</p>
          <ButtonLink href="https://www.linkedin.com/in/amrutha-ramisetty/" variant="secondary" external>
            LinkedIn <ExternalLink size={15} />
          </ButtonLink>
        </article>
        <article className="leader-card">
          <h3>Rangu Reddy Dheeraj</h3>
          <p>Co-founder, R-REX Solutions</p>
        </article>
      </div>
    </section>
  );
}
