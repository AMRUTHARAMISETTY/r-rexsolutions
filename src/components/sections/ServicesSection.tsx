import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Globe, Database, Smartphone, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onOpenContact?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const services = [
    {
      icon: Bot,
      title: 'AI Solutions & Automation',
      description:
        'Custom AI assistants, intelligent chatbots, automated document processing, workflow automation, recommendation systems, and data analytics.',
      highlights: ['Custom Chatbots', 'Workflow Automation', 'Document AI', 'Smart Analytics'],
      badge: 'AI & Automation',
      color: 'text-cyan-400',
      borderGlow: 'hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
    },
    {
      icon: Globe,
      title: 'Web Applications & SaaS',
      description:
        'Fast, responsive web applications, customer portals, e-commerce engines, and modern SaaS platforms designed for high conversion and reliability.',
      highlights: ['Client Portals', 'Modern Web Apps', 'E-Commerce Engines', 'SaaS Platforms'],
      badge: 'Web & SaaS',
      color: 'text-blue-400',
      borderGlow: 'hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
    },
    {
      icon: Database,
      title: 'ERP & Business Systems',
      description:
        'Tailored management platforms for schools, colleges, hospitals, retail, and manufacturing. Centralize records, billing, inventory, and operations.',
      highlights: ['Campus Management', 'Hospital ERP', 'Inventory & Billing', 'Custom CRMs'],
      badge: 'Enterprise ERP',
      color: 'text-purple-400',
      borderGlow: 'hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description:
        'Intuitive iOS & Android mobile applications built for seamless user experiences, offline access, push notifications, and fast cloud backends.',
      highlights: ['iOS & Android Apps', 'Cross-Platform', 'Real-time Sync', 'Intuitive UI'],
      badge: 'Mobile Apps',
      color: 'text-emerald-400',
      borderGlow: 'hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
    },
    {
      icon: ShieldCheck,
      title: 'Security & Performance',
      description:
        'Bank-grade authentication, role-based access controls, optimized database queries, fast page load speeds, and high-availability hosting.',
      highlights: ['Role-Based Access', 'Data Encryption', 'Sub-second Load Times', 'Reliable Hosting'],
      badge: 'Security & Speed',
      color: 'text-amber-400',
      borderGlow: 'hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    },
    {
      icon: Cpu,
      title: 'Backend & Cloud Infrastructure',
      description:
        'Scalable cloud architecture, API integrations, automated database backups, and resilient cloud hosting designed to grow with your business.',
      highlights: ['API Integrations', 'Cloud Migration', 'Automated Backups', 'Scalable Hosting'],
      badge: 'Cloud & API',
      color: 'text-indigo-400',
      borderGlow: 'hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]',
    },
  ];

  return (
    <section 
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090b] relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-xs font-semibold text-blue-400 mb-4 border border-blue-500/20">
            OUR SOLUTIONS & SERVICES
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Custom Technology Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200">Real Business Growth</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We deliver tailored software solutions that streamline your operations, enhance customer experience, and increase profitability.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`glass-panel rounded-2xl p-8 border border-white/10 transition-all duration-300 relative group flex flex-col justify-between ${service.borderGlow}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-xl bg-gray-950/90 border border-white/10 ${service.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-2 mb-6">
                    {service.highlights.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onOpenContact}
                    className="w-full py-2.5 px-4 rounded-xl glass-panel-subtle hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/40 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Discuss This Solution</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
