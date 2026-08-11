import React from 'react';
import { Cpu, Database, Network, ShieldCheck, ArrowRight } from 'lucide-react';

interface AiSectionProps {
  onOpenContact: () => void;
}

export const AiSection: React.FC<AiSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="ai" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative Content */}
          <div className="lg:col-span-6">
            <div className="font-mono-tech text-xs text-[#00C0F0] uppercase tracking-widest mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00C0F0]" />
              INTELLIGENT SYSTEMS ENGINE
            </div>
            
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              AI THAT SOLVES{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0060F0] to-[#00C0F0]">
                REAL PROBLEMS.
              </span>
            </h2>

            <div className="p-6 rounded-2xl bg-[#06142B]/70 border border-[#00C0F0]/20 mb-8 backdrop-blur-md">
              <p className="font-display text-lg font-medium text-white mb-2">
                AI is not the product. The outcome is.
              </p>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                We design practical AI systems that automate workflows, connect knowledge, improve decisions and create new capabilities.
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

          {/* Right Visual Interactive Neural Network Card */}
          <div className="lg:col-span-6 relative">
            <div className="rrex-glass-card p-8 rounded-3xl border border-[#00C0F0]/20 relative overflow-hidden">
              {/* Circuit Header */}
              <div className="flex items-center justify-between border-b border-[#0060F0]/20 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#00C0F0] animate-ping"></span>
                  <span className="font-mono-tech text-xs text-[#EAF4FF] tracking-wider">NEURAL CORE PIPELINE</span>
                </div>
                <span className="font-mono-tech text-[10px] text-[#00C0F0] bg-[#001040] px-2.5 py-1 rounded border border-[#0060F0]/30">
                  ACTIVE 99.98%
                </span>
              </div>

              {/* Neural Nodes Diagram Mockup */}
              <div className="space-y-4 font-mono-tech text-xs">
                <div className="p-3 rounded-lg bg-[#020711] border border-[#0060F0]/30 flex items-center justify-between text-[#94A3B8]">
                  <span>[01] INGESTION</span>
                  <span className="text-[#00C0F0]">Unstructured Data / APIs</span>
                </div>
                <div className="w-0.5 h-4 bg-[#00C0F0] mx-auto"></div>
                <div className="p-3 rounded-lg bg-[#06142B] border border-[#00C0F0]/40 flex items-center justify-between text-white font-semibold shadow-[0_0_15px_rgba(0,192,240,0.2)]">
                  <span>[02] EMBEDDING & RAG</span>
                  <span className="text-[#00C0F0]">Vector DB Search</span>
                </div>
                <div className="w-0.5 h-4 bg-[#00C0F0] mx-auto"></div>
                <div className="p-3 rounded-lg bg-[#020711] border border-[#0060F0]/30 flex items-center justify-between text-[#94A3B8]">
                  <span>[03] LLM ORCHESTRATION</span>
                  <span className="text-[#00C0F0]">Contextual Reasoning</span>
                </div>
                <div className="w-0.5 h-4 bg-[#00C0F0] mx-auto"></div>
                <div className="p-3 rounded-lg bg-[#001040] border border-[#00C0F0]/50 flex items-center justify-between text-[#EAF4FF]">
                  <span>[04] AUTOMATED ACTION</span>
                  <span className="text-[#00C0F0]">Production Execution</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
