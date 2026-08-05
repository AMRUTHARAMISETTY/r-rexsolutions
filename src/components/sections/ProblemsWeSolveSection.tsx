import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Stethoscope, ShoppingBag, Factory, Rocket, Building2, CheckCircle2 } from 'lucide-react';

export const ProblemsWeSolveSection: React.FC = () => {
  const industries = [
    {
      icon: GraduationCap,
      industry: 'Schools & Colleges',
      title: 'Digital Campus & ERP',
      challenge: 'Manual attendance, paper fee receipts, fragmented student records, and slow parent communication.',
      solution: 'Unified ERP with online fee collection, automated attendance, parent portals, and grading systems.',
    },
    {
      icon: Stethoscope,
      industry: 'Healthcare & Clinics',
      title: 'Patient & Clinic Management',
      challenge: 'Long patient queues, manual appointment booking, paper prescriptions, and delayed billing.',
      solution: 'Digital patient scheduling, electronic health records, automated SMS reminders, and integrated billing.',
    },
    {
      icon: ShoppingBag,
      industry: 'Retail & E-Commerce',
      title: 'Omnichannel & Inventory Engine',
      challenge: 'Stock mismatches between store and online shop, manual order tracking, and lost sales.',
      solution: 'Real-time inventory synchronization, automated order dispatch, and custom high-converting web stores.',
    },
    {
      icon: Factory,
      industry: 'Manufacturing & Logistics',
      title: 'Supply & Production Tracking',
      challenge: 'Lack of real-time material visibility, vendor dispatch delays, and manual spreadsheet logging.',
      solution: 'Centralized production analytics, automated inventory alerts, and cloud-based supplier tracking.',
    },
    {
      icon: Rocket,
      industry: 'Startups & Tech Teams',
      title: 'Rapid MVP Development',
      challenge: 'High full-time hiring costs, slow time-to-market, and unvalidated product architectures.',
      solution: 'Dedicated high-velocity engineering team delivering production-ready web and AI products in weeks.',
    },
    {
      icon: Building2,
      industry: 'SMEs & Enterprises',
      title: 'Legacy System Modernization',
      challenge: 'Outdated desktop software, high maintenance costs, and difficulty integrating AI tools.',
      solution: 'Modern cloud web applications, automated workflow pipelines, and seamless API integrations.',
    },
  ];

  return (
    <section 
      id="solutions"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#09090b] relative overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-xs font-semibold text-cyan-400 mb-4 border border-cyan-500/20">
            INDUSTRIES & BUSINESS PROBLEMS WE SOLVE
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Solving Real Challenges for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">Growing Organizations</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Whether you run a school, clinic, retail business, or startup, we replace slow manual tasks with fast, reliable software.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-panel rounded-2xl p-7 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-cyan-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block">
                        {item.industry}
                      </span>
                      <h3 className="font-heading font-bold text-lg text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/15">
                      <span className="text-xs font-bold text-red-400 block mb-1">
                        The Challenge:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.challenge}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/15">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Our Solution:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
