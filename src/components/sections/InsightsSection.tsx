import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../lib/variants';

const ARTICLES = [
  {
    tag:     'AI',
    title:   'Agentic AI Security: Who Controls AI When AI Starts Taking Actions?',
    excerpt:
      'As AI systems evolve from answering questions to taking actions — browsing the web, writing code, sending emails — the question of control becomes critical. What guardrails should exist?',
    readTime: '6 min read',
  },
  {
    tag:     'Automation',
    title:   'The Practical Guide to Workflow Automation for Growing Businesses',
    excerpt:
      'Most businesses waste hours every week on tasks that software could handle automatically. Here\'s how to identify what to automate — and what to avoid.',
    readTime: '5 min read',
  },
  {
    tag:     'SaaS',
    title:   'Why Most SaaS Products Fail Before They Launch',
    excerpt:
      'The most common mistake isn\'t technical — it\'s building before understanding the problem. A look at how to validate product ideas before writing code.',
    readTime: '4 min read',
  },
  {
    tag:     'Software Engineering',
    title:   'When to Build Custom Software vs. Buy an Off-the-Shelf Tool',
    excerpt:
      'The build-vs-buy decision is one of the most consequential a growing business makes. Here\'s a practical framework for making the right call.',
    readTime: '7 min read',
  },
];



export function InsightsSection() {
  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
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
          <span className="badge-rrex badge-blue mb-5 inline-flex">Insights</span>
          <h2 id="insights-heading" className="text-h2 font-display text-white mb-4">
            Technology thinking, plainly written.
          </h2>
          <p className="text-body">
            Practical perspectives on AI, software engineering, automation, and building
            digital products — written for business owners and engineers alike.
          </p>
        </motion.div>

        {/* Article grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {ARTICLES.map((article) => (
            <motion.article
              key={article.title}
              variants={fadeUp}
              className="card-rrex p-7 sm:p-8 flex flex-col gap-4 group cursor-pointer"
            >
              {/* Tag + read time */}
              <div className="flex items-center justify-between">
                <span
                  className="text-label"
                  style={{ color: 'var(--blue)' }}
                >
                  {article.tag}
                </span>
                <span className="text-label" style={{ color: 'var(--text-muted)' }}>
                  {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-display font-semibold text-lg text-white leading-snug
                           group-hover:text-[var(--cyan)] transition-colors duration-200"
              >
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-body text-sm flex-1">
                {article.excerpt}
              </p>

              {/* Read more */}
              <p
                className="text-sm font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: 'var(--blue)' }}
              >
                Read article →
              </p>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
