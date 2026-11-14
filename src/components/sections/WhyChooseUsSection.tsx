import { values } from '../../data/siteContent';

export function WhyChooseUsSection() {
  return (
    <section id="why-rrex" className="section why-section">
      <div className="why-statement">
        <span className="section-kicker">04 / WHY R-REX</span>
        <h2>Clear thinking. Reliable execution. Visible progress.</h2>
      </div>
      <div className="value-grid">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <article className="value-panel" key={value.title}>
              <Icon size={24} />
              <h3>{value.title}</h3>
            </article>
          );
        })}
      </div>
    </section>
  );
}
