import { audiences } from '../../data/siteContent';

export function WhoWeServeSection() {
  return (
    <section className="section audience-section" id="audiences">
      <div className="section-heading">
        <span className="section-kicker">05 / WHO WE SERVE</span>
        <h2>Built for people turning serious requirements into shipped products.</h2>
      </div>
      <div className="audience-grid">
        {audiences.map((audience) => (
          <article className="audience-card" key={audience.title}>
            <h3>{audience.title}</h3>
            <p>{audience.pain}</p>
            <strong>{audience.outcome}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
