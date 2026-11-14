import { insights } from '../../data/siteContent';

export function InsightsSection() {
  return (
    <section className="section insights-section" id="insights">
      <div className="section-heading">
        <span className="section-kicker">INSIGHTS</span>
        <h2>Clear notes for better digital decisions.</h2>
        <p>A compact space for practical thinking on discovery, design, engineering and responsible automation.</p>
      </div>
      <div className="insights-grid">
        {insights.map((insight) => (
          <article className="insight-card" key={insight.title}>
            <span>{insight.label}</span>
            <h3>{insight.title}</h3>
            <p>{insight.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
