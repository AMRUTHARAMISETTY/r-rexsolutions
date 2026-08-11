import React from 'react';

interface RRexLogoProps {
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export const RRexLogo: React.FC<RRexLogoProps> = ({
  className = '',
  showText = true,
  showTagline = false,
  size = 'md',
  animated = false,
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-base', tagline: 'text-[9px]' },
    md: { icon: 40, text: 'text-xl', tagline: 'text-[10px]' },
    lg: { icon: 56, text: 'text-2xl', tagline: 'text-xs' },
    xl: { icon: 80, text: 'text-4xl', tagline: 'text-sm' },
  };

  const { icon, text, tagline } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* 3D Geometric R-REX Emblem SVG */}
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`filter drop-shadow-[0_0_12px_rgba(0,192,240,0.4)] transition-transform duration-300 ${
          animated ? 'hover:scale-105' : ''
        }`}
      >
        <defs>
          <linearGradient id="rrexHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0060F0" />
            <stop offset="50%" stopColor="#0035A0" />
            <stop offset="100%" stopColor="#001040" />
          </linearGradient>
          <linearGradient id="rrexCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C0F0" />
            <stop offset="100%" stopColor="#0060F0" />
          </linearGradient>
          <linearGradient id="rrexEyeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#00C0F0" />
          </linearGradient>
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Tech Hex Shield Outline */}
        <path
          d="M 100 10 L 175 50 L 175 150 L 100 190 L 25 150 L 25 50 Z"
          stroke="url(#rrexCyanGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.35"
        />

        {/* T-REX Head Polygon Silhouette (Facing Right) */}
        <path
          d="M 60 40 
             L 135 40 
             L 155 55 
             L 165 75 
             L 145 85 
             L 150 95 
             L 125 105 
             L 115 95 
             L 95 105 
             L 80 135 
             L 60 160 
             L 50 160 
             L 60 120 
             L 75 90 
             L 60 70 Z"
          fill="url(#rrexHeadGrad)"
          stroke="#0060F0"
          strokeWidth="2"
        />

        {/* Glowing Eye Slit */}
        <polygon
          points="135,60 152,64 140,68"
          fill="url(#rrexEyeGrad)"
          filter="url(#cyanGlow)"
        />

        {/* Internal Architectural Tech Cuts */}
        <path
          d="M 75 70 L 120 70 L 105 85 L 75 85 Z"
          fill="rgba(0, 192, 240, 0.2)"
          stroke="#00C0F0"
          strokeWidth="1"
        />

        {/* Interlocking 'X' Symbol at Neck/Chest (Cyan Accent) */}
        <path
          d="M 70 125 L 90 155 L 105 155 L 85 125 Z"
          fill="url(#rrexCyanGrad)"
          filter="url(#cyanGlow)"
        />
        <path
          d="M 90 125 L 70 155 L 85 155 L 105 125 Z"
          fill="url(#rrexCyanGrad)"
          filter="url(#cyanGlow)"
        />

        {/* Edge Highlight Lines */}
        <path
          d="M 60 40 L 135 40 L 155 55"
          stroke="#00C0F0"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Wordmark Text */}
      {showText && (
        <div className="flex flex-col">
          <div className={`font-display font-bold tracking-wider text-white ${text} flex items-center gap-0.5`}>
            <span>R-RE</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0060F0] to-[#00C0F0]">X</span>
            <span className="font-light tracking-widest text-[#94A3B8] ml-2 text-xs uppercase hidden sm:inline-block border-l border-cyan-500/30 pl-2">
              SOLUTIONS
            </span>
          </div>
          {showTagline && (
            <span className={`font-mono-tech tracking-[0.25em] text-[#00C0F0] ${tagline} uppercase font-medium mt-0.5`}>
              IDEAS TO IMPLEMENTATION
            </span>
          )}
        </div>
      )}
    </div>
  );
};
