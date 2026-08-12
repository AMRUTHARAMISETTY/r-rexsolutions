import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  metrics: string;
  details: string;
  client: string;
}

const projects: Project[] = [
  {
    id: 'nexus-ai',
    title: 'Nexus Intelligence RAG Platform',
    category: 'ENTERPRISE AI & RAG',
    description: 'Autonomous multi-agent document intelligence platform processing 50,000+ financial contracts with 99.4% accuracy.',
    tech: ['Python', 'LangChain', 'Pinecone', 'React', 'FastAPI', 'PostgreSQL'],
    metrics: '85% Faster Contract Audits',
    details: 'Architected a private retrieval-augmented generation engine for a global investment firm. The platform indexes multi-format PDF/Excel records, executes semantic vector queries, and surfaces precise inline citations for compliance teams.',
    client: 'Global Investment Enterprise',
  },
  {
    id: 'apex-erp',
    title: 'Apex Cloud ERP Ecosystem',
    category: 'ERP & BUSINESS SYSTEMS',
    description: 'Unified multi-entity enterprise resource planning platform integrating real-time inventory, CRM, and automated accounting.',
    tech: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS Elastic', 'Redis'],
    metrics: '$2.4M Annual Cost Savings',
    details: 'Replaced legacy disconnected software packages with a modern single-pane-of-glass ERP system. Handles multi-currency transactions, automated invoice processing, and live warehouse inventory sync across 14 international locations.',
    client: 'Supply Chain Operations Group',
  },
  {
    id: 'pulse-health',
    title: 'Pulse AI Clinical Telehealth Mobile Suite',
    category: 'MOBILE & CLINICAL AI',
    description: 'HIPAA-compliant iOS/Android ecosystem with real-time patient remote monitoring and predictive diagnostic assistant.',
    tech: ['React Native', 'TypeScript', 'TensorFlow Lite', 'WebRTC', 'GCP'],
    metrics: '200K+ Active Monthly Patients',
    details: 'Engineered a secure cross-platform mobile suite enabling HD encrypted video consultations, Bluetooth medical device data streaming, and automated AI clinical note summarization.',
    client: 'Healthcare Systems Network',
  },
];

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#0060F0]/15 pb-8">
          <div>
            <div className="font-mono-tech text-xs text-[#00C0F0] uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00C0F0]" />
              R-REX BUILD LOG — SYSTEMS WE'VE SHIPPED
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
              ENGINEERING SHOWCASE
            </h2>
          </div>
          <p className="text-[#94A3B8] max-w-md text-sm sm:text-base font-normal">
            A selection of mission-critical platforms and AI systems designed, engineered, and deployed by R-REX Solutions.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="rrex-glass-card group rounded-3xl overflow-hidden border border-[#00C0F0]/15 flex flex-col justify-between cursor-pointer hover:border-[#00C0F0]/50 transition-all duration-300"
            >
              {/* Visual Banner Area */}
              <div className="h-52 bg-gradient-to-br from-[#001040] via-[#06142B] to-[#020711] p-6 relative flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0060F0]/20 rounded-full blur-2xl group-hover:bg-[#00C0F0]/30 transition-all"></div>
                
                <div className="flex items-center justify-between z-10">
                  <span className="font-mono-tech text-[10px] text-[#00C0F0] bg-[#020711]/80 px-2.5 py-1 rounded border border-[#0060F0]/40">
                    {proj.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#020711]/60 flex items-center justify-center text-[#00C0F0] group-hover:bg-[#0060F0] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="z-10">
                  <span className="font-mono-tech text-xs text-[#00C0F0] font-semibold block mb-1">
                    {proj.metrics}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-[#00C0F0] transition-colors">
                    {proj.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {proj.description}
                </p>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tech.map((t) => (
                      <span key={t} className="font-mono-tech text-[10px] text-[#EAF4FF] bg-[#001040]/60 px-2 py-0.5 rounded border border-[#0060F0]/20">
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="font-mono-tech text-xs text-[#00C0F0] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020711]/85 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="rrex-glass-card max-w-2xl w-full p-8 rounded-3xl border border-[#00C0F0]/40 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-[#94A3B8] hover:text-white p-2 rounded-lg bg-[#06142B]"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="font-mono-tech text-xs text-[#00C0F0] bg-[#001040] px-3 py-1 rounded border border-[#0060F0]/40 inline-block mb-4">
                {selectedProject.category}
              </span>

              <h3 className="font-display text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
              <p className="font-mono-tech text-xs text-[#94A3B8] mb-6">CLIENT: {selectedProject.client}</p>

              <div className="p-4 rounded-xl bg-[#0060F0]/15 border border-[#00C0F0]/30 mb-6">
                <span className="font-mono-tech text-xs text-[#00C0F0] font-bold block mb-1">IMPACT MEASUREMENT</span>
                <span className="font-display text-xl font-bold text-white">{selectedProject.metrics}</span>
              </div>

              <h4 className="font-display font-semibold text-white mb-2">SYSTEM ARCHITECTURE & SOLUTION</h4>
              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">{selectedProject.details}</p>

              <h4 className="font-mono-tech text-xs uppercase text-white mb-3">ENGINEERING TECH STACK</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="font-mono-tech text-xs text-[#00C0F0] bg-[#06142B] px-3 py-1 rounded-md border border-[#00C0F0]/30">
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="btn-primary w-full py-3.5 text-sm font-semibold"
              >
                CLOSE CASE STUDY
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
