import { RRexLogo } from '../brand/RRexLogo';
import { Zap, RotateCcw } from 'lucide-react';

interface FinaleSectionProps {
  isDisintegrated: boolean;
  onToggleDisintegration: () => void;
}

export const FinaleSection: React.FC<FinaleSectionProps> = ({
  isDisintegrated,
  onToggleDisintegration,
}) => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* R-REX Brand Anchor Mark */}
        <div className="mb-8">
          <RRexLogo showText={true} showTagline={true} size="xl" animated={true} />
        </div>

        <h3 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4">
          INTELLIGENT DIGITAL INFRASTRUCTURE
        </h3>

        <p className="text-[#94A3B8] text-sm sm:text-base max-w-xl mb-8">
          Converting business vision into production-ready software systems through precision digital engineering.
        </p>

        {/* Cinematic 3D Disintegration Trigger Button */}
        <button
          onClick={onToggleDisintegration}
          className={`px-6 py-3 rounded-full border font-mono-tech text-xs font-semibold flex items-center gap-3 transition-all duration-300 cursor-pointer ${
            isDisintegrated
              ? 'bg-[#001040] border-[#00C0F0] text-[#00C0F0] shadow-[0_0_20px_rgba(0,192,240,0.4)]'
              : 'bg-[#06142B]/80 border-[#0060F0]/40 text-white hover:border-[#00C0F0] hover:bg-[#0060F0]/20'
          }`}
        >
          {isDisintegrated ? (
            <>
              <RotateCcw className="w-4 h-4 text-[#00C0F0]" />
              <span>REASSEMBLE R-REX CORE</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-[#00C0F0] animate-pulse" />
              <span>TRIGGER LOGO DISINTEGRATION INTO DATA PARTICLES</span>
            </>
          )}
        </button>

      </div>
    </section>
  );
};
