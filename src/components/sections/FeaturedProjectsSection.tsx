import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, Building2, GraduationCap, Stethoscope, Bot } from 'lucide-react';

interface FeaturedProjectsSectionProps {
  onOpenShowcase?: () => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ onOpenShowcase }) => {
  const projects = [
    {
      category: 'Education & ERP',
      icon: GraduationCap,
      title: 'EduTrack — Campus Management ERP',
      description:
        'A comprehensive digital campus platform enabling automated student attendance, online fee payment gateways, grading report generation, and real-time parent notifications.',
      results: ['5,000+ Active Students Managed', '95% Online Fee Collection Rate', 'Zero Manual Paperwork'],
      tags: ['School ERP', 'Fee Gateway', 'Parent Portal'],
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      category: 'Healthcare & EHR',
      icon: Stethoscope,
      title: 'MedCare — Clinic Booking & Patient Portal',
      description:
        'A secure healthcare platform providing online doctor appointment scheduling, digital prescription management, automated SMS reminders, and clinic billing integration.',
      results: ['45% Reduction in Wait Times', 'Automated Appointment SMS', 'HIPAA/Data Security Compliant'],
      tags: ['Patient Portal', 'Clinic ERP', 'Appointment Booking'],
      gradient: 'from-cyan-600 to-blue-600',
    },
    {
      category: 'Retail & E-Commerce',
      icon: Building2,
      title: 'RetailSync — Multi-Store Inventory Engine',
      description:
        'An integrated inventory management system connecting physical retail store registers with online e-commerce platforms for instant stock sync and automated reordering.',
      results: ['100% Stock Sync Accuracy', 'Automated Low-Stock Alerts', '3x Faster Order Processing'],
      tags: ['Inventory Sync', 'E-Commerce', 'POS Integration'],
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      category: 'AI & Automation',
      icon: Bot,
      title: 'OmniSearch — AI Document & Assistant',
      description:
        'An intelligent business AI assistant trained on internal company files, manuals, and customer FAQs to deliver instant answers and automate customer support tickets.',
      results: ['70% Faster Document Search', '24/7 Automated Support', 'Custom AI Model Training'],
      tags: ['Custom AI Chatbot', 'Document Search', 'Workflow Automation'],
      gradient: 'from-emerald-600 to-teal-600',
    },
  ];

  return (
    <section 
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090b] relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-xs font-semibold text-blue-400 mb-4 border border-blue-500/20">
            CASE STUDIES & FEATURED WORK
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Proven Solutions Delivered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">Real Organizations</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Explore how we help educational institutions, healthcare providers, retail stores, and businesses automate operations and scale.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel rounded-2xl p-8 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                      <Icon className="w-4 h-4" />
                      <span>{project.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIdx) => (
                        <span key={tagIdx} className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="p-4 rounded-xl bg-gray-950/80 border border-white/5 space-y-2 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Business Outcomes:
                    </span>
                    {project.results.map((res, resIdx) => (
                      <div key={resIdx} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {onOpenShowcase && (
                  <button
                    onClick={onOpenShowcase}
                    className="w-full py-3 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-300 hover:text-white font-heading font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-blue-500/30 hover:border-blue-500"
                  >
                    <span>Explore Interactive Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
