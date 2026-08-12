import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeUp } from '../../lib/variants';

interface ProblemItem {
  challenge: string;
  solution: string;
  service: string;
  description: string;
}

const PROBLEMS: ProblemItem[] = [
  {
    challenge: 'Reduce manual work',
    solution:  'AI & Automation',
    service:   'AI & Automation',
    description:
      'We automate repetitive workflows so your team spends more time on decisions that matter — not data entry, report generation, or copy-paste tasks.',
  },
  {
    challenge: 'Connect your operations',
    solution:  'ERP & Business Systems',
    service:   'Business Systems',
    description:
      'Siloed tools cost you time and accuracy. We build unified business platforms that connect your sales, inventory, finance, and operations in one place.',
  },
  {
    challenge: 'Build a digital product',
    solution:  'Custom Software & SaaS',
    service:   'Digital Products',
    description:
      'Have an idea for a web app, platform, or SaaS? We take it from concept to production — handling architecture, design, development, and deployment.',
  },
  {
    challenge: 'Improve customer experience',
    solution:  'Web & Mobile',
    service:   'Digital Products',
    description:
      'First impressions are digital. We build fast, intuitive web and mobile experiences that convert visitors into customers and keep them coming back.',
  },
  {
    challenge: 'Make better decisions',
    solution:  'Data & AI Solutions',
    service:   'AI & Automation',
    description:
      'Gut-feel decisions are costly. We build dashboards, analytics systems, and AI tools that surface the right insights at the right time.',
  },
];

interface ProblemSolutionsSectionProps {
  onOpenContact: (service: string) => void;
}

export function ProblemSolutionsSection({ onOpenContact }: ProblemSolutionsSectionProps) {
  const [active, setActive] = useState(0);
  const current = PROBLEMS[active];

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="section-rrex section-dark"
    >
      <div className="container-rrex">

        {/* Header */}
        <motion.div
          className="max-w-2xl mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <span className="badge-rrex mb-5 inline-flex">Technology starts with the problem</span>
          <h2 id="solutions-heading" className="text-h2 font-display text-white mb-4">
            What are you trying to solve?
          </h2>
          <p className="text-body">
            Every technology decision starts with a business problem. Tell us yours,
            and we'll show you how we approach it.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Problem selector */}
          <div
            className="lg:col-span-2 flex flex-col gap-2"
            role="tablist"
            aria-label="Business challenges"
          >
            {PROBLEMS.map((item, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={active === i}
                aria-controls={`problem-panel-${i}`}
                onClick={() => setActive(i)}
                className={[
                  'group text-left px-5 py-4 rounded-xl border transition-all duration-200',
                  'flex items-center justify-between gap-3',
                  active === i
                    ? 'bg-[var(--surface-3)] border-[var(--border-blue)] text-white'
                    : 'border-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:border-[var(--border-subtle)] hover:text-white',
                ].join(' ')}
              >
                <span className="font-medium text-sm leading-snug">
                  {item.challenge}
                </span>
                <ArrowRight
                  className={[
                    'w-4 h-4 shrink-0 transition-all duration-200',
                    active === i
                      ? 'text-[var(--blue)] opacity-100'
                      : 'text-[var(--text-muted)] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0',
                  ].join(' ')}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div
            className="lg:col-span-3 flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                id={`problem-panel-${active}`}
                role="tabpanel"
                aria-label={current.challenge}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.30 }}
                className="card-rrex p-8 sm:p-10 flex flex-col gap-6"
              >
                {/* Routing label */}
                <div>
                  <span className="text-label text-[var(--text-muted)]">
                    Your challenge
                  </span>
                  <p className="text-lg font-semibold text-white mt-1">
                    {current.challenge}
                  </p>
                </div>

                {/* Arrow connector */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                  <span className="text-label text-[var(--blue)]">→</span>
                  <div className="h-px flex-1 bg-[var(--border-subtle)]" />
                </div>

                {/* Solution */}
                <div>
                  <span className="text-label text-[var(--text-muted)]">
                    Our approach
                  </span>
                  <p className="text-xl font-semibold text-gradient font-display mt-1">
                    {current.solution}
                  </p>
                </div>

                {/* Description */}
                <p className="text-body leading-relaxed">
                  {current.description}
                </p>

                {/* CTA */}
                <button
                  onClick={() => onOpenContact(current.service)}
                  className="btn btn-primary self-start mt-2"
                >
                  <span>Discuss this with us</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
