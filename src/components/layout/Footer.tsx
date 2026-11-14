import { LogoMark } from '../ui/LogoMark';
import { brand, navLinks } from '../../data/siteContent';

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <LogoMark />
        <p>{brand.statement}.</p>
      </div>
      <nav aria-label="Footer navigation">
        {navLinks.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="footer-links">
        <a href="https://www.linkedin.com/in/amrutha-ramisetty/" target="_blank" rel="noreferrer noopener">
          Founder LinkedIn
        </a>
        <a href="https://www.linkedin.com/company/135853990/" target="_blank" rel="noreferrer noopener">
          Company LinkedIn
        </a>
        <a href={`mailto:${brand.email}`}>Email</a>
        <a href={brand.phoneHref}>Phone</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms</a>
      </div>
      <p className="copyright">© {new Date().getFullYear()} R-REX Solutions. {brand.tagline}.</p>
    </footer>
  );
}
