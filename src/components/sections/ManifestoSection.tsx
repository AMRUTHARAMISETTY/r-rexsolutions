import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { manifestoStatements } from '../../data/siteContent';

export function ManifestoSection({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) return undefined;
    const context = gsap.context(() => {
      const statements = gsap.utils.toArray<HTMLElement>('.manifesto-statement');
      const bgLayers = gsap.utils.toArray<HTMLElement>('.manifesto-bg-layer');
      gsap.set(statements, { opacity: 0, y: 36 });
      gsap.set(statements[0], { opacity: 1, y: 0 });
      gsap.set(bgLayers, { opacity: 0, scale: 1 });
      gsap.set(bgLayers[0], { opacity: 1 });

      // The pinned timeline maps one full viewport of scroll to each manifesto beat,
      // crossfading consecutive statements (and their backing image) as the visitor
      // scrolls through the pin, while every image drifts into a slow Ken Burns zoom.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=320%',
          scrub: 0.8,
          pin: true,
        },
      });

      timeline.to(bgLayers, { scale: 1.12, ease: 'none', duration: statements.length }, 0);

      statements.forEach((statement, index) => {
        if (index === 0) return;
        timeline.to(statements[index - 1], { opacity: 0, y: -30, duration: 0.45 }, index - 0.18);
        timeline.to(statement, { opacity: 1, y: 0, duration: 0.45 }, index);
        timeline.to(bgLayers[index - 1], { opacity: 0, duration: 0.6 }, index - 0.18);
        timeline.to(bgLayers[index], { opacity: 1, duration: 0.6 }, index - 0.18);
      });
      timeline.to('.manifesto-light', { scale: 1.4, opacity: 0.9, duration: 3 }, 0);
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="manifesto" className="manifesto-section" ref={sectionRef}>
      <div className="manifesto-bg" aria-hidden="true">
        {manifestoStatements.map((statement) => (
          <div
            className="manifesto-bg-layer"
            key={statement.image}
            style={{ backgroundImage: `url(${statement.image})` }}
          />
        ))}
      </div>
      <div className="manifesto-bg-overlay" aria-hidden="true" />
      <div className="manifesto-light" aria-hidden="true" />
      <div className="section-number">00</div>
      <div className="manifesto-copy">
        {manifestoStatements.map((statement) => (
          <h2 className="manifesto-statement" key={statement.text}>
            {statement.text}
          </h2>
        ))}
      </div>
    </section>
  );
}
