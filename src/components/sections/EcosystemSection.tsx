import React, { useState } from 'react';
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

export const EcosystemSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<SystemNode>(nodes[0]);

  return (
    <section id="ecosystem" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="font-mono-tech text-xs text-[#00C0F0] uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C0F0]"></span>
            SYNCHRONIZED INFRASTRUCTURE
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight">
            TECHNOLOGY ECOSYSTEM
          </h2>
          <p className="text-[#94A3B8] text-base mt-4">
            The R-REX ENGINE connects disconnected tech stacks into a single, synchronized digital infrastructure.
          </p>
        </div>

        {/* Ecosystem Radial Graphic + Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Radial Ecosystem Interactive Nodes (Left 7 cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[420px]">
            {/* Center Core R-REX ENGINE */}
            <div className="z-10 p-6 rounded-full bg-gradient-to-br from-[#0060F0] to-[#00C0F0] shadow-[0_0_50px_rgba(0,192,240,0.5)] border-4 border-[#020711] text-center w-36 h-36 flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition-transform">
              <span className="font-mono-tech text-[9px] text-white/80 uppercase tracking-widest">CENTRAL</span>
              <span className="font-display font-bold text-sm text-white leading-tight">R-REX ENGINE</span>
            </div>

            {/* Connecting Orbit Rings */}
            <div className="absolute w-[320px] h-[320px] rounded-full border border-[#00C0F0]/20 border-dashed animate-spin [animation-duration:40s]"></div>
            <div className="absolute w-[440px] h-[440px] rounded-full border border-[#0060F0]/15"></div>

            {/* Surrounding 8 Nodes */}
            <div className="absolute inset-0 flex items-center justify-center">
              {nodes.map((node, idx) => {
                const angle = (idx / nodes.length) * Math.PI * 2;
                const radius = 170; // Position radius in px
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const Icon = node.icon;
                const isSelected = selectedNode.id === node.id;

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className={`absolute z-20 p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 flex items-center gap-2 group cursor-pointer ${
                      isSelected
                        ? 'bg-[#0060F0] border-[#00C0F0] text-white shadow-[0_0_25px_rgba(0,192,240,0.6)] scale-110'
                        : 'bg-[#06142B]/80 border-[#0060F0]/30 text-[#00C0F0] hover:bg-[#001040] hover:border-[#00C0F0]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-mono-tech text-[10px] font-semibold tracking-wider text-white hidden sm:inline-block">
                      {node.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Node Technical Spec Card (Right 5 cols) */}
          <div className="lg:col-span-5">
            <div className="rrex-glass-card p-8 rounded-3xl border border-[#00C0F0]/30 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#0060F0]/20 pb-4 mb-6">
                <span className="font-mono-tech text-xs text-[#00C0F0] bg-[#001040] px-3 py-1 rounded border border-[#0060F0]/40 uppercase">
                  {selectedNode.category}
                </span>
                <span className="font-mono-tech text-[10px] text-[#94A3B8]">CONNECTED TO R-REX ENGINE</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="p-3.5 rounded-2xl bg-[#0060F0] text-white border border-[#00C0F0]/40">
                  {React.createElement(selectedNode.icon, { className: 'w-7 h-7' })}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">{selectedNode.name}</h3>
                  <p className="text-xs text-[#00C0F0] font-mono-tech">SYSTEM MODULE</p>
                </div>
              </div>

              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                {selectedNode.description}
              </p>

              <div className="p-4 rounded-xl bg-[#020711] border border-[#0060F0]/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Data Latency:</span>
                  <span className="font-mono-tech text-[#00C0F0]">&lt; 15ms</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Security Layer:</span>
                  <span className="font-mono-tech text-[#00C0F0]">AES-256 / Zero Trust</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Sync Frequency:</span>
                  <span className="font-mono-tech text-[#00C0F0]">Real-Time WebSockets</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
