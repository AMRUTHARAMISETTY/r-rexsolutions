import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Cpu, Code, Cloud, Database, Building2, Zap, BarChart3, GitFork } from 'lucide-react';

interface SystemNode {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const nodes: SystemNode[] = [
  { id: 'ai', name: 'AI AGENTS', category: 'INTELLIGENCE', description: 'Generative AI models, agentic workflows & custom RAG pipelines.', icon: Cpu },
  { id: 'software', name: 'SOFTWARE PLATFORMS', category: 'ENGINEERING', description: 'High-scale web apps, SaaS platforms & enterprise backend services.', icon: Code },
  { id: 'cloud', name: 'CLOUD INFRASTRUCTURE', category: 'DEVOPS', description: 'Multi-cloud architecture, Kubernetes, CI/CD & auto-scaling.', icon: Cloud },
  { id: 'data', name: 'DATA ECOSYSTEM', category: 'ANALYTICS', description: 'Real-time data streaming, data lakes & ETL pipelines.', icon: Database },
  { id: 'erp', name: 'ERP & CRM', category: 'ENTERPRISE', description: 'Unified enterprise resource planning & customer management systems.', icon: Building2 },
  { id: 'automation', name: 'WORKFLOW AUTOMATION', category: 'EFFICIENCY', description: 'End-to-end automated process orchestration.', icon: Zap },
  { id: 'analytics', name: 'PREDICTIVE ANALYTICS', category: 'INSIGHTS', description: 'Business intelligence dashboards & forecasting algorithms.', icon: BarChart3 },
  { id: 'integrations', name: 'API INTEGRATIONS', category: 'CONNECTIVITY', description: 'Secure REST/GraphQL APIs, webhooks & microservices mesh.', icon: GitFork },
];

const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 13,
    },
  },
};

const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 80 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 13,
    },
  },
};

export const EcosystemSection: React.FC = () => {
  return (
    <section id="ecosystem" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="font-mono-tech text-xs text-[#00C0F0] uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C0F0]"></span>
            THE R-REX STACK — CONNECTED BY DESIGN
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight">
            TECHNOLOGY ECOSYSTEM
          </h2>
          <p className="text-[#94A3B8] text-base mt-4 leading-relaxed">
            We don't build isolated tools. Every system we create integrates into one synchronized operational intelligence layer — built for scale, speed and security.
          </p>
        </div>

        {/* Ecosystem Cards - One-by-One Vertical Stack with Alternate Slide Entrance */}
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
          {nodes.map((node, idx) => {
            const Icon = node.icon;
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={node.id}
                variants={isEven ? slideLeftVariants : slideRightVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                className="rrex-glass-card h-72 rounded-2xl border border-[#00C0F0]/15 relative overflow-hidden group cursor-pointer"
              >
                {/* Front Face - Only Title, Category & Icon */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 transition-transform duration-300 group-hover:-translate-y-4">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#001040] border border-[#00C0F0]/30 flex items-center justify-center text-[#00C0F0] group-hover:bg-[#0060F0] group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono-tech text-[9px] text-[#00C0F0] tracking-widest uppercase block mt-6 mb-2">
                      {node.category}
                    </span>
                    <h3 className="font-display font-bold text-xl text-white tracking-tight">
                      {node.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#00C0F0]/70 font-mono-tech">
                    <span>REVEAL DETAILS</span>
                    <span className="animate-pulse">→</span>
                  </div>
                </div>

                {/* Slide-Up Panel (Complete Info) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#001040] to-[#06142B] border-t-2 border-[#00C0F0] p-6 flex flex-col justify-between z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono-tech text-[9px] text-[#00C0F0] bg-[#001040] px-2 py-0.5 rounded border border-[#0060F0]/25">
                        {node.category}
                      </span>
                      <span className="font-mono-tech text-[9px] text-[#94A3B8]">ACTIVE</span>
                    </div>
                    <h4 className="font-display font-bold text-md text-white mb-2">{node.name}</h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {node.description}
                    </p>
                  </div>

                  {/* Tech Specs Block */}
                  <div className="space-y-2 pt-4 border-t border-[#0060F0]/20">
                    <div className="flex items-center justify-between text-[10px] font-mono-tech">
                      <span className="text-[#94A3B8]/80">LATENCY</span>
                      <span className="text-[#00C0F0]">&lt; 15ms</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono-tech">
                      <span className="text-[#94A3B8]/80">SECURITY</span>
                      <span className="text-[#00C0F0]">AES-256 / Zero Trust</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono-tech">
                      <span className="text-[#94A3B8]/80">SYNC FREQ</span>
                      <span className="text-[#00C0F0]">Real-Time</span>
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
