import React from 'react';
import { RRexLogo } from './RRexLogo';

interface BrandLogoProps {
  /**
   * full     — Full horizontal lockup (in this clean version, it is just the emblem).
   * mark     — Mark/emblem only.
   * footer   — Slightly larger, for footer.
   * compact  — Smallest size, inline usage.
   */
  variant?: 'full' | 'mark' | 'footer' | 'compact';
  className?: string;
  /** Additional styles for the element itself */
  imgClassName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  className = '',
}) => {
  const sizeMap = {
    full: 'md' as const,
    compact: 'sm' as const,
    footer: 'lg' as const,
    mark: 'md' as const,
  };

  const size = sizeMap[variant];

  return (
    <div className={`inline-flex items-center shrink-0 ${className}`}>
      <RRexLogo showText={false} size={size} animated={true} />
    </div>
  );
};
