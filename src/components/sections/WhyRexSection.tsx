import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../lib/variants';

const PILLARS = [
  {
    title:       'Direct communication',
    description: 'You talk to the people building your product. No account managers, no intermediaries. Direct, fast, and honest communication at every stage.',
  },
  {
    title:       'Transparent process',
    description: 'You see what we\'re building before it\'s finished. We share live previews, explain trade-offs, and keep you informed — not in the dark.',
  },
  {
    title:       'Cost efficiency',
    description: 'A lean team means lower overhead and faster decisions. You get senior-level engineering without the enterprise price tag or the slow bureaucracy.',
  },
  {
    title:       'Flexible collaboration',
    description: 'We adapt to how you work. Fixed-scope projects, ongoing retainers, or collaborative partnerships — whatever fits your business at this stage.',
  },
  {
    title:       'Modern technology',
    description: 'We use reliable, maintained tools — not outdated stacks or trendy frameworks that haven\'t proven themselves. Your software should last.',
  },
  {
    title:       'Long-term support',
    description: 'We don\'t disappear after launch. We offer maintenance, updates, and technical support — because software is a long-term investment.',
  },
  {
    title:       'Fast response',
    description: 'When something is urgent, we act quickly. A small, focused team means no waiting for approval chains when your business needs a solution now.',
  },
  {
    title:       'Agile delivery',
    description: 'We work in short sprints with regular check-ins. You see progress weekly, not just at the end — and can adjust direction when needed.',
  },
];



export function WhyRexSection() {
  return (
    <section
      id="about"
      aria-labelledby="why-rex-heading"
      className="section-rrex section-darker"
    >
      <div className="container-rrex">

        {/* Header */}
        <motion.div
          className="max-w-2xl mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="badge-rrex badge-blue mb-5 inline-flex">Why R-REX</span>
          <h2 id="why-rex-heading" className="text-h2 font-display text-white mb-4">
            What working with us actually looks like.
          </h2>
          <p className="text-body">
            We're a young technology company. We believe that's a strength —
            we move quickly, communicate directly, and care about the outcome
            because every project matters to us.
          </p>
        </motion.div>

        {/* Pillars */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              className="card-rrex p-6 flex flex-col gap-3"
            >
              <h3
                className="font-display font-semibold text-base text-white leading-snug"
              >
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Honest note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 p-8 sm:p-10 rounded-2xl"
          style={{
            background:    'var(--surface-2)',
            border:        '1px solid var(--border-subtle)',
          }}
        >
          <div className="max-w-2xl">
            <p className="text-label mb-4" style={{ color: 'var(--text-muted)' }}>
              About the team
            </p>
            <p className="text-lg font-display font-medium text-white mb-3 leading-relaxed">
              "Young enough to move quickly. Serious enough to build responsibly."
            </p>
            <p className="text-body">
              R-REX Solutions was founded by developers who built software through
              real projects, hackathons, and engineering practice. We don't claim
              enterprise scale or decades of experience — we claim{' '}
              <strong style={{ color: 'var(--text-primary)' }}>
                practical engineering, transparent communication, and genuine
                commitment to your business outcomes.
              </strong>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
