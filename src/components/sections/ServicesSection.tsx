import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ButtonLink } from '../ui/ButtonLink';
import { services } from '../../data/siteContent';
import LightCables from '../visuals/LightCables';

gsap.registerPlugin(ScrollTrigger);

const logoSrc = '/assets/r_rex_logo.png';

export function ServicesSection({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (reducedMotion || window.innerWidth < 900 || !sectionRef.current) return undefined;
    const context = gsap.context(() => {
      // Desktop service chapters pin the left visual while a rail progress
      // bar and each chapter card reveal in step with scroll position.
      gsap.to('.service-rail-progress', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.35, y: 36 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 76%',
              end: 'top 38%',
              scrub: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="services" className="section service-section" ref={sectionRef}>
      <div className="services-cables" aria-hidden="true">
        <LightCables
          direction="ttb"
          background="#100a05"
          baseColor="#5c2b0d"
          accentColor="#f36b16"
          highlight="#ffd17d"
          speed={42}
          hover={55}
          grab={70}
          bundle={{ bend: 8, count: 42, spread: 92, widthEnd: 280, thickness: 180, widthStart: 0 }}
          flow={{ flow: 220, pulses: 2 }}
        />
      </div>
      <div className="section-heading">
        <span className="section-kicker">01 / SERVICES</span>
        <h2>What we build</h2>
        <p>
          From the first requirement to launch and continuous improvement, we combine strategy, design and
          engineering into one clear delivery process.
        </p>
      </div>
      <div className="services-layout">
        <aside className="service-visual" aria-hidden="true">
          <div className="service-orbit">
            <img src={logoSrc} alt="" />
            <span />
            <span />
            <span />
          </div>
          <div className="service-rail">
            <i className="service-rail-progress" />
          </div>
        </aside>
        <div className="service-list">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="service-card" key={service.number}>
                <div className="service-visual-panel" aria-hidden="true">
                  <Icon size={42} />
                  <span />
                  <span />
                </div>
                <div className="service-card-top">
                  <span>{service.number}</span>
                  <Icon size={28} aria-hidden="true" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.deliverables.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={16} /> {item}
                    </li>
                  ))}
                </ul>
                <ButtonLink href="#contact" variant="ghost">
                  Discuss this service <ArrowRight size={16} />
                </ButtonLink>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
