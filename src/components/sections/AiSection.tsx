import React from 'react';
import { Cpu, Database, Network, ShieldCheck, ArrowRight } from 'lucide-react';

interface AiSectionProps {
  onOpenContact: () => void;
}

export const AiSection: React.FC<AiSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="ai" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Narrative Content */}
        <div>
          <div className="font-mono-tech text-xs text-[#00C0F0] uppercase tracking-widest mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#00C0F0]" />
            R-REX AI PRACTICE — DEPLOYED, NOT DEMO'D
          </div>
          
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            AI THAT SOLVES{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0060F0] to-[#00C0F0]">
              REAL PROBLEMS.
            </span>
          </h2>

          <div className="p-6 rounded-2xl bg-[#06142B]/70 border border-[#00C0F0]/20 mb-8 backdrop-blur-md">
            <p className="font-display text-lg font-medium text-white mb-2">
              The outcome is what matters. Not the AI brand.
            </p>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              We build practical AI systems that automate real workflows, surface knowledge from your data, sharpen decisions, and create entirely new business capabilities — deployed into your infrastructure, not as a pilot.
            </p>
          </div>

          {/* AI Capabilities Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[#020711]/60 border border-[#0060F0]/20 flex items-start gap-3">
              <Database className="w-5 h-5 text-[#00C0F0] shrink-0 mt-1" />
              <div>
                <h4 className="font-display font-semibold text-white text-sm">Enterprise RAG</h4>
                <p className="text-xs text-[#94A3B8]">Secure vector retrieval over internal company knowledge bases.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#020711]/60 border border-[#0060F0]/20 flex items-start gap-3">
              <Network className="w-5 h-5 text-[#00C0F0] shrink-0 mt-1" />
              <div>
                <h4 className="font-display font-semibold text-white text-sm">Autonomous AI Agents</h4>
                <p className="text-xs text-[#94A3B8]">Multi-agent orchestration handling complex multi-step tasks.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#020711]/60 border border-[#0060F0]/20 flex items-start gap-3">
              <Cpu className="w-5 h-5 text-[#00C0F0] shrink-0 mt-1" />
              <div>
                <h4 className="font-display font-semibold text-white text-sm">Workflow Automation</h4>
                <p className="text-xs text-[#94A3B8]">Automating manual document processing and data entry.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#020711]/60 border border-[#0060F0]/20 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#00C0F0] shrink-0 mt-1" />
              <div>
                <h4 className="font-display font-semibold text-white text-sm">Governance & Privacy</h4>
                <p className="text-xs text-[#94A3B8]">Private model deployments ensuring zero data leaks.</p>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenContact}
            className="btn-primary px-8 py-4 text-sm flex items-center gap-3 group cursor-pointer"
          >
            <span>EXPLORE AI SOLUTIONS</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
