import React from 'react';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

interface CtaSectionProps {
  onOpenContact: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenContact }) => {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <div className="rrex-glass-card p-10 sm:p-16 rounded-3xl border border-[#00C0F0]/40 relative overflow-hidden shadow-[0_0_80px_rgba(0,96,240,0.3)]">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#001040] border border-[#00C0F0]/40 mb-6">
            <Sparkles className="w-4 h-4 text-[#00C0F0]" />
            <span className="font-mono-tech text-xs text-[#00C0F0] uppercase tracking-widest font-semibold">
              YOUR PROBLEM. OUR SYSTEM. LET'S GO.
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            HAVE AN IDEA?{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0060F0] via-[#00C0F0] to-[#60A5FA]">
              LET'S BUILD IT.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-10">
            Describe what you want to build. We'll assess the right approach, scope the architecture, and take full ownership from whiteboard to production — without the typical agency overhead.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenContact}
              className="btn-primary w-full sm:w-auto px-8 py-4 text-base flex items-center justify-center gap-3 group cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenContact}
              className="btn-secondary w-full sm:w-auto px-8 py-4 text-base flex items-center justify-center gap-3 group cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 text-[#00C0F0]" />
              <span>TALK TO R-REX</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
