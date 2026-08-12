import { Terminal, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 bg-[#06142B]/40 border-t border-[#0060F0]/15">
      <div className="max-w-4xl mx-auto">
        
        {/* Narrative Content */}
        <div>
          <div className="font-mono-tech text-xs text-[#00C0F0] uppercase tracking-widest mb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00C0F0]" />
            ENGINEERING COMPANY
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-6">
            WE DON'T JUST BUILD SOFTWARE.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0060F0] to-[#00C0F0]">
              WE BUILD WHAT COMES NEXT.
            </span>
          </h2>

          <p className="text-[#94A3B8] text-base leading-relaxed mb-6">
            R-REX Solutions is an advanced software engineering and AI systems consultancy. We bridge the gap between complex business requirements and reliable production software.
          </p>

          <p className="text-[#94A3B8] text-base leading-relaxed mb-8">
            Whether you need to automate multi-tiered operational workflows, deploy private LLM pipelines, rebuild legacy ERPs, or launch high-scale SaaS platforms — our senior architects take full technical ownership from ideation to production.
          </p>

          <div className="space-y-3 font-display text-sm text-[#EAF4FF]">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#0060F0]/30 border border-[#00C0F0] flex items-center justify-center text-[#00C0F0]">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Strict Security, IP Ownership, & Data Privacy Guarantees</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#0060F0]/30 border border-[#00C0F0] flex items-center justify-center text-[#00C0F0]">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>Transparent Milestone-Based Delivery & Ongoing SLA Support</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
