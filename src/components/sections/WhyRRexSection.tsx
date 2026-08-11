import React from 'react';
import { Brain, ShieldCheck, Lightbulb, MessageSquare, Handshake } from 'lucide-react';

interface Principle {
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const principles: Principle[] = [
  {
    title: 'INTELLIGENT',
    tagline: 'We think before we build.',
    description: 'Every line of code and architectural decision is rooted in deep technical analysis and business goal alignment.',
    icon: Brain,
  },
  {
    title: 'RELIABLE',
    tagline: 'We deliver with responsibility.',
    description: 'We commit to strict deadlines, enterprise uptime SLAs, robust test coverage, and production stability.',
    icon: ShieldCheck,
  },
  {
    title: 'INNOVATIVE',
    tagline: 'We use technology the right way.',
    description: 'We leverage modern AI and cloud tools where they drive genuine value, avoiding unnecessary tech clutter.',
    icon: Lightbulb,
  },
  {
    title: 'TRANSPARENT',
    tagline: 'We believe in clear communication.',
    description: 'No hidden dependencies, no vague timelines. Full visibility into sprint progress, code repositories, and costs.',
    icon: MessageSquare,
  },
  {
    title: 'PARTNER',
    tagline: 'We grow together with our clients.',
    description: 'We function as an extended engineering leadership team invested in your long-term scalable success.',
    icon: Handshake,
  },
];

export const WhyRRexSection: React.FC = () => {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 bg-[#06142B]/30 border-y border-[#0060F0]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="font-mono-tech text-xs text-[#00C0F0] uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C0F0]"></span>
            BRAND PHILOSOPHY
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight">
            WHY R-REX?
          </h2>
          <p className="text-[#94A3B8] text-base mt-4">
            Built on core principles that prioritize engineering excellence, clarity, and real-world business outcomes.
          </p>
        </div>

        {/* 5 Principles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rrex-glass-card p-6 rounded-2xl border border-[#00C0F0]/15 flex flex-col justify-between hover:border-[#00C0F0]/50 transition-all duration-300 group"
              >
                <div>
                  {/* Hexagonal Technical Icon Header */}
                  <div className="w-12 h-12 rounded-xl bg-[#001040] border border-[#00C0F0]/30 flex items-center justify-center text-[#00C0F0] mb-6 group-hover:scale-110 group-hover:bg-[#0060F0] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="font-mono-tech text-[10px] text-[#00C0F0] uppercase tracking-widest block mb-1">
                    0{idx + 1} PRINCIPLE
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-[#00C0F0] transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-display text-sm font-semibold text-[#EAF4FF] mb-3">
                    "{p.tagline}"
                  </p>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0060F0]/10 flex items-center justify-between">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C0F0]"></span>
                  <span className="font-mono-tech text-[9px] text-[#94A3B8] uppercase">VERIFIED STANDARD</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
