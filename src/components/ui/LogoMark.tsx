import { brand } from '../../data/siteContent';

const logoSrc = '/assets/r_rex_logo.png';

export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <a className="logo-lockup" href="#top" aria-label="R-REX Solutions home">
      <span className="logo-frame">
        <img src={logoSrc} alt="R-REX Solutions logo" width={40} height={40} />
      </span>
      {!compact && (
        <span className="logo-type">
          <strong>R-REX</strong>
          <small>{brand.tagline}</small>
        </span>
      )}
    </a>
  );
}
