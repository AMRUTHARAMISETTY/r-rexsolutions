import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { workItems, type WorkItem } from '../../data/siteContent';

function WorkCard({ item, duplicate = false }: { item: WorkItem; duplicate?: boolean }) {
  const Icon = item.icon;
  return (
    <article className="work-card" aria-hidden={duplicate || undefined}>
      <div className="work-media">
        <img src={item.image} alt="" width={1280} height={853} loading="eager" />
        <div className="work-overlay">
          <span>{item.label}</span>
          <p>{item.solution}</p>
        </div>
      </div>
      <div className="work-caption">
        <span className="work-icon" aria-hidden="true"><Icon size={18} /></span>
        <div>
          <h3>{item.category}</h3>
          <p>{item.title} <span>{item.handle}</span></p>
        </div>
      </div>
    </article>
  );
}

// Only publish client names, results and testimonials after written approval.
export function WorkSection() {
  const [paused, setPaused] = useState(false);
  const topRow = workItems.filter((_, index) => index % 2 === 0);
  const bottomRow = workItems.filter((_, index) => index % 2 === 1);

  return (
    <section className={`section work-section${paused ? ' is-paused' : ''}`} id="work">
      <div className="work-heading-row">
        <div className="section-heading">
          <span className="section-kicker">03 / PROOF SYSTEM</span>
          <h2>Selected Work</h2>
          <p>Original product concepts and capability studies across digital products, AI, automation and brand systems.</p>
        </div>
        <div className="work-controls" aria-label="Showcase controls">
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-label={paused ? 'Play project showcase' : 'Pause project showcase'}
            title={paused ? 'Play project showcase' : 'Pause project showcase'}
          >
            {paused ? <Play size={18} /> : <Pause size={18} />}
          </button>
        </div>
      </div>

      <div className="work-marquee" aria-label="R-REX project showcase, first row moving left to right">
        <div className="work-row-track work-row-forward">
          <div className="work-row-set">
            {topRow.map((item) => <WorkCard key={`top-${item.title}`} item={item} />)}
          </div>
          <div className="work-row-set" aria-hidden="true">
            {topRow.map((item) => <WorkCard key={`top-copy-${item.title}`} item={item} duplicate />)}
          </div>
        </div>
      </div>
      <div className="work-marquee" aria-label="R-REX project showcase, second row moving right to left">
        <div className="work-row-track work-row-reverse">
          <div className="work-row-set">
            {bottomRow.map((item) => <WorkCard key={`bottom-${item.title}`} item={item} />)}
          </div>
          <div className="work-row-set" aria-hidden="true">
            {bottomRow.map((item) => <WorkCard key={`bottom-copy-${item.title}`} item={item} duplicate />)}
          </div>
        </div>
      </div>
    </section>
  );
}
