import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '../../data/siteContent';

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) return undefined;
    const context = gsap.context(() => {
      // The fossil-spine line fills as the visitor scrolls the timeline, and
      // each stage slides in from the left as it enters view.
      gsap.to('.timeline-line-progress', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'bottom 50%',
          scrub: true,
        },
      });
      gsap.utils.toArray<HTMLElement>('.timeline-step').forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          x: -28,
          duration: 0.6,
          scrollTrigger: {
            trigger: step,
            start: 'top 78%',
          },
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="process" className="section process-section" ref={sectionRef}>
      <div className="section-heading narrow">
        <span className="section-kicker">02 / PROCESS</span>
        <h2>How an idea becomes a working solution</h2>
        <p>
          Discover the real requirement. Design the right experience. Build with discipline. Validate before launch.
          Improve with evidence.
        </p>
      </div>
      <div className="timeline">
        <div className="timeline-line" aria-hidden="true">
          <i className="timeline-line-progress" />
        </div>
        {processSteps.map((step) => (
          <article className="timeline-step" key={step.number}>
            <span>{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
