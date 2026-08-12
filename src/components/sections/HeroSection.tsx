import { ArrowRight, ChevronDown, Sparkles, Layers } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06142B]/80 border border-[#00C0F0]/30 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(0,192,240,0.15)] animate-rrex-float">
          <Sparkles className="w-4 h-4 text-[#00C0F0]" />
          <span className="font-mono-tech text-xs uppercase tracking-widest text-[#00C0F0] font-semibold">
            R-REX SOLUTIONS — ENGINEERING WHAT'S NEXT
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6 max-w-4xl">
          TRANSFORMING IDEAS{' '}
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#0060F0] via-[#00C0F0] to-[#60A5FA]">
            INTO INTELLIGENT
          </span>
          SOLUTIONS.
        </h1>

        {/* Supporting Paragraph */}
        <p className="text-base sm:text-xl text-[#94A3B8] max-w-2xl font-normal leading-relaxed mb-10">
          From business requirements to production-ready software, AI systems and intelligent automation — we turn ideas into reliable digital solutions.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <button
            onClick={onOpenContact}
            className="btn-primary w-full sm:w-auto px-8 py-4 text-base flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <a
            href="#services"
            className="btn-secondary w-full sm:w-auto px-8 py-4 text-base flex items-center justify-center gap-3 group"
          >
            <span>EXPLORE SOLUTIONS</span>
            <Layers className="w-5 h-5 text-[#00C0F0] transition-transform group-hover:scale-110" />
          </a>
        </div>

        {/* Key Highlight Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl pt-8 border-t border-[#0060F0]/15">
          <div className="flex flex-col items-center p-3 rounded-lg bg-[#06142B]/30 border border-[#00C0F0]/10">
            <span className="font-display font-bold text-xl text-white">100%</span>
            <span className="font-mono-tech text-[10px] text-[#94A3B8] uppercase">Proprietary Code</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-[#06142B]/30 border border-[#00C0F0]/10">
            <span className="font-display font-bold text-xl text-[#00C0F0]">AI-Native</span>
            <span className="font-mono-tech text-[10px] text-[#94A3B8] uppercase">System Design</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-[#06142B]/30 border border-[#00C0F0]/10">
            <span className="font-display font-bold text-xl text-white">Zero</span>
            <span className="font-mono-tech text-[10px] text-[#94A3B8] uppercase">Outsourced Dev</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-[#06142B]/30 border border-[#00C0F0]/10">
            <span className="font-display font-bold text-xl text-[#00C0F0]">End-to-End</span>
            <span className="font-mono-tech text-[10px] text-[#94A3B8] uppercase">Full Delivery</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[#94A3B8]">Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 text-[#00C0F0] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
