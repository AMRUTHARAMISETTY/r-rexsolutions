import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../lib/variants';

/* Only genuine/labelled work — never invented clients */
const PROJECTS = [
  {
    label:       'Internal Project',
    title:       'Campus Management Platform',
    description:
      'A unified platform for managing student records, attendance, fee collection, and parent communication — built to replace manual paper-based processes.',
    tags:        ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    outcome:     'Eliminated manual fee collection and attendance tracking for a 500+ student institution.',
  },
  {
    label:       'Prototype',
    title:       'AI Document Assistant',
    description:
      'An AI assistant that reads internal company documents and answers employee questions — reducing the time spent searching for policy information.',
    tags:        ['Python', 'OpenAI', 'FastAPI', 'React'],
    outcome:     'Prototype demonstrated 70% reduction in document search time during internal testing.',
  },
  {
    label:       'Concept',
    title:       'Retail Inventory Sync Engine',
    description:
      'A system that synchronizes inventory between a physical point-of-sale and an online storefront in real-time — eliminating manual stock reconciliation.',
    tags:        ['Next.js', 'TypeScript', 'Webhooks', 'MySQL'],
    outcome:     'Concept validated with a small retail client pilot; full build in progress.',
  },
  {
    label:       'Experimental Build',
    title:       'Automated Workflow Toolkit',
    description:
      'A no-code automation builder that lets non-technical team members create approval workflows, notification triggers, and report schedules without writing code.',
    tags:        ['React', 'n8n', 'REST APIs', 'Tailwind'],
    outcome:     'Experimental build demonstrates the core automation engine with configurable workflows.',
  },
];

const labelStyles: Record<string, string> = {
  'Internal Project':     'text-[var(--blue)]   bg-blue-950/40   border-blue-900/40',
  'Prototype':            'text-[var(--cyan)]   bg-cyan-950/30   border-cyan-900/30',
  'Concept':              'text-amber-400       bg-amber-950/30  border-amber-900/30',
  'Experimental Build':   'text-violet-400      bg-violet-950/30 border-violet-900/30',
};



export function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="section-rrex section-dark"
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
          <span className="badge-rrex mb-5 inline-flex">Our work</span>
          <h2 id="work-heading" className="text-h2 font-display text-white mb-4">
            What we've built.
          </h2>
          <p className="text-body">
            We're a growing team — so we label our work honestly. Projects are
            marked as internal builds, prototypes, or experimental work where
            appropriate. Trust is built through transparency.
          </p>
        </motion.div>

        {/* Projects */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {PROJECTS.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              className="card-rrex p-7 sm:p-8 flex flex-col gap-5"
            >
              {/* Label badge */}
              <span
                className={[
                  'self-start text-xs font-mono font-semibold tracking-widest uppercase px-2.5 py-1 rounded-md border',
                  labelStyles[project.label] ?? 'text-[var(--text-muted)]',
                ].join(' ')}
              >
                {project.label}
              </span>

              {/* Title */}
              <h3 className="text-h3 font-display text-white leading-snug">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-body text-sm flex-1">
                {project.description}
              </p>

              {/* Outcome */}
              <p
                className="text-sm italic leading-relaxed border-l-2 pl-4"
                style={{
                  color:       'var(--text-secondary)',
                  borderColor: 'var(--border-blue)',
                }}
              >
                {project.outcome}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-1 rounded-md"
                    style={{
                      background:  'var(--surface-3)',
                      color:       'var(--text-secondary)',
                      border:      '1px solid var(--border-subtle)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
