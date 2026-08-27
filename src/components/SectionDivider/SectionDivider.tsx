import React from 'react';

interface SectionDividerProps {
  variant?: 'gold' | 'rose' | 'forest' | 'maroon';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'gold',
  className = '',
}) => {
  const getColors = () => {
    switch (variant) {
      case 'rose':
        return { gold: '#D8BC7A', accent: '#E8968F', dark: '#4A101D' };
      case 'forest':
        return { gold: '#D8BC7A', accent: '#3E7D5A', dark: '#4A101D' };
      case 'maroon':
        return { gold: '#D8BC7A', accent: '#BD2B40', dark: '#2A0811' };
      case 'gold':
      default:
        return { gold: '#C9A45C', accent: '#E1C98A', dark: '#561525' };
    }
  };

  const { gold, accent } = getColors();

  return (
    <div
      className={`w-full flex items-center justify-center my-14 select-none ${className}`}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '52px auto' }}
      aria-hidden="true"
    >
      <svg
        width="260"
        height="36"
        viewBox="0 0 260 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: '85%', height: 'auto' }}
      >
        {/* Left Tapering Gold Line with Dots */}
        <line
          x1="10"
          y1="18"
          x2="105"
          y2="18"
          stroke={gold}
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.75"
        />
        <circle cx="12" cy="18" r="2.5" fill={gold} />
        <circle cx="95" cy="18" r="2" fill={accent} />

        {/* Central Floral Paisley / Lotus Emblem */}
        <g transform="translate(130, 18)">
          {/* Diamond frame */}
          <rect
            x="-6"
            y="-6"
            width="12"
            height="12"
            transform="rotate(45)"
            fill={gold}
            opacity="0.9"
          />
          <rect
            x="-10"
            y="-10"
            width="20"
            height="20"
            transform="rotate(45)"
            stroke={accent}
            strokeWidth="0.9"
            fill="none"
            opacity="0.8"
          />
          
          {/* Left Floral Petal */}
          <path
            d="M-14 0 C-19 -6, -24 -6, -26 0 C-24 6, -19 6, -14 0 Z"
            fill={gold}
            opacity="0.85"
          />
          {/* Right Floral Petal */}
          <path
            d="M14 0 C19 -6, 24 -6, 26 0 C24 6, 19 6, 14 0 Z"
            fill={gold}
            opacity="0.85"
          />

          {/* Top and Bottom buds */}
          <circle cx="0" cy="-14" r="2" fill={accent} />
          <circle cx="0" cy="14" r="2" fill={accent} />
        </g>

        {/* Right Tapering Gold Line with Dots */}
        <line
          x1="155"
          y1="18"
          x2="250"
          y2="18"
          stroke={gold}
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.75"
        />
        <circle cx="165" cy="18" r="2" fill={accent} />
        <circle cx="248" cy="18" r="2.5" fill={gold} />
      </svg>
    </div>
  );
};
