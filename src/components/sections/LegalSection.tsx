const legalItems = [
  { id: 'privacy', title: 'Privacy Policy', text: 'How R-REX Solutions collects, uses, and protects contact and project information.' },
  { id: 'terms', title: 'Terms of Service', text: 'The terms that govern use of this website and our project engagements.' },
  { id: 'cookies', title: 'Cookie Policy', text: 'How essential storage and optional analytics help us keep the site reliable.' },
  { id: 'accessibility', title: 'Accessibility Statement', text: 'Our commitment to an inclusive, keyboard-friendly, and readable experience.' },
  { id: 'refunds', title: 'Refund & Cancellation Policy', text: 'The process for changes, cancellations, deposits, and approved refunds.' },
] as const;

export function LegalSection() {
  return (
    <section className="section legal-section" aria-labelledby="legal-heading">
      <div className="section-heading">
        <span className="section-kicker">POLICIES / TERMS</span>
        <h2 id="legal-heading">Clear terms for confident collaboration.</h2>
      </div>
      <div className="legal-grid">
        {legalItems.map((item) => (
          <article className="legal-card" id={item.id} key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
