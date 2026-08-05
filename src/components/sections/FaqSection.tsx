import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How long does a custom software or AI project take to build?',
      answer:
        'Small tools, landing pages, and AI chatbots typically take 2 to 4 weeks. Full custom ERP systems, complex web portals, or mobile apps take between 6 to 12 weeks. We work in bi-weekly sprints so you see live progress every step of the way.',
    },
    {
      question: 'How much does custom software development cost?',
      answer:
        'We provide transparent, fixed-budget proposals upfront so you never face unexpected costs. After a brief discovery consultation, we provide a detailed proposal tailored to your timeline and budget.',
    },
    {
      question: 'Do we own the source code and intellectual property upon completion?',
      answer:
        'Yes, 100%. Upon final handoff, you own all source code, database architectures, graphics, and intellectual property with zero ongoing licensing fees to us.',
    },
    {
      question: 'What technology stack do you use to build software?',
      answer:
        'We use battle-tested, modern enterprise tools including React, Next.js, TypeScript, Python, Node.js, PostgreSQL, AWS/Cloud hosting, and state-of-the-art AI models (OpenAI, Claude). Everything is built for speed, security, and scalability.',
    },
    {
      question: 'Do you offer ongoing post-launch maintenance and technical support?',
      answer:
        'Yes. We offer dedicated post-launch support packages including bug fixes, security updates, server monitoring, feature enhancements, and staff training.',
    },
    {
      question: 'Can you integrate AI automation into our existing software systems?',
      answer:
        'Absolutely. We design custom API integrations and middleware that securely plug AI chatbots, document automation, and analytics into your existing CRMs, ERPs, or custom web portals.',
    },
  ];

  return (
    <section 
      id="faq"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090b] relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-xs font-semibold text-blue-400 mb-4 border border-blue-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">Know Before Starting</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Have a question about working with R-REX SOLUTIONS? Here are answers to common questions from our clients.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
