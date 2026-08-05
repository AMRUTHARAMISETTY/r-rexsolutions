import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, DollarSign, Cpu, HeartHandshake, Layers } from 'lucide-react';

interface WhyChooseUsSectionProps {
  onOpenContact?: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ onOpenContact }) => {
  const pillars = [
    {
      icon: Layers,
      title: 'Built With Modern Technology',
      description: 'We use reliable, industry-standard tools that ensure your software is fast, stable, and easy to maintain — not built on outdated platforms that break down.',
      color: 'text-blue-400',
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing, No Surprises',
      description: 'You get a clear, fixed-budget proposal upfront. No hidden fees, no scope creep, and no surprise invoices. You always know exactly what you\'re paying for.',
      color: 'text-emerald-400',
    },
    {
      icon: Zap,
      title: 'Delivered Fast, On Schedule',
      description: 'We work in short, focused milestones so you see real progress every week. Most projects go live in 4–10 weeks, depending on scope.',
      color: 'text-cyan-400',
    },
    {
      icon: Cpu,
      title: 'AI Built Into Your Software',
      description: 'Need a chatbot that answers customer questions? AI that reads documents automatically? We can add intelligent automation directly into your system.',
      color: 'text-purple-400',
    },
    {
      icon: ShieldCheck,
      title: 'Secure & Built to Scale',
      description: 'Your business data is protected with secure login systems, role-based access, and daily automatic backups. Built to handle growth without breaking.',
      color: 'text-indigo-400',
    },
    {
      icon: HeartHandshake,
      title: 'We Stay With You After Launch',
      description: 'We don\'t just hand over code and disappear. We provide staff training, ongoing maintenance, and technical support whenever you need it.',
      color: 'text-amber-400',
    },
  ];

  return (
    <section
      id="why-us"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090b] relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-xs font-semibold text-cyan-400 mb-4 border border-cyan-500/20">
            WHY BUSINESSES CHOOSE R-REX
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            A Trusted Software Partner{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
              You Can Depend On
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We make it easy for business owners, school administrators, and founders to get reliable software — without needing to understand the technical details.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-panel rounded-2xl p-7 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex items-start gap-4 group"
              >
                <div className={`p-3 rounded-xl bg-gray-950/80 border border-white/10 shrink-0 ${pillar.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="glass-panel rounded-2xl p-8 border border-white/10 bg-gradient-to-r from-blue-950/40 via-gray-900/60 to-purple-950/40 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-bold text-xl text-white mb-2">
              Ready to build software that actually works for your business?
            </h3>
            <p className="text-slate-300 text-sm">
              Book a free 30-minute call. No jargon, no pressure — just a clear conversation about your goals.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-heading font-semibold text-sm transition-all duration-200 shrink-0 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 cursor-pointer"
          >
            Book Free Consultation
          </button>
        </div>

      </div>
    </section>
  );
};
