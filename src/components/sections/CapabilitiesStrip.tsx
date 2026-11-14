import { useMemo } from 'react';
import { capabilities } from '../../data/siteContent';

export function CapabilitiesStrip() {
  const repeated = useMemo(() => [...capabilities, ...capabilities], []);

  return (
    <section id="capabilities" className="capability-section" aria-label="Capabilities">
      <div className="capability-track">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}
