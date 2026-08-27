import React from 'react';

interface MonogramProps {
  size?: number;
  className?: string;
  variant?: 'gold' | 'maroon' | 'forest' | 'white';
  showFrame?: boolean;
}

export const Monogram: React.FC<MonogramProps> = ({
  size = 72,
  className = '',
  variant = 'gold',
  showFrame = true,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'maroon':
        return {
          primary: '#681724',
          secondary: '#C5A059',
          accent: '#8C1D2F',
        };
      case 'forest':
        return {
          primary: '#143526',
          secondary: '#C5A059',
          accent: '#2A6348',
        };
      case 'white':
        return {
          primary: '#FFFDF9',
          secondary: '#DFBA73',
          accent: '#FFFFFF',
        };
      case 'gold':
      default:
        return {
          primary: '#C5A059',
          secondary: '#9E7D3B',
          accent: '#DFBA73',
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`inline-flex items-center justify-center relative select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="Sarvesh & Keerthana Monogram"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Outer Circular Laurel / Botanical Ring */}
        {showFrame && (
          <>
            {/* Delicate Thin Outer Ring */}
            <circle
              cx="50"
              cy="50"
              r="47"
              stroke={colors.secondary}
              strokeWidth="0.8"
              strokeDasharray="2 2"
              opacity="0.6"
            />
            {/* Main Circular Ring */}
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke={colors.primary}
              strokeWidth="1.2"
            />
            {/* Inner Ring */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={colors.secondary}
              strokeWidth="0.6"
              opacity="0.5"
            />
            {/* Top & Bottom Botanical Filigree Nodes */}
            <path
              d="M50 3 C51 6, 54 8, 56 8 C54 9, 51 11, 50 14 C49 11, 46 9, 44 8 C46 8, 49 6, 50 3 Z"
              fill={colors.accent}
            />
            <path
              d="M50 97 C51 94, 54 92, 56 92 C54 91, 51 89, 50 86 C49 89, 46 91, 44 92 C46 92, 49 94, 50 97 Z"
              fill={colors.accent}
            />
            {/* Left & Right Floral Accents */}
            <circle cx="6" cy="50" r="1.8" fill={colors.accent} />
            <circle cx="94" cy="50" r="1.8" fill={colors.accent} />
          </>
        )}

        {/* S Letterform */}
        <text
          x="36"
          y="58"
          fontFamily="'Playfair Display', 'Cormorant Garamond', Georgia, serif"
          fontSize="36"
          fontWeight="400"
          fontStyle="italic"
          fill={colors.primary}
          textAnchor="middle"
          style={{ letterSpacing: '-0.05em' }}
        >
          S
        </text>

        {/* Refined Ampersand / Botanical Interlock */}
        <text
          x="50"
          y="53"
          fontFamily="'Alex Brush', cursive"
          fontSize="22"
          fill={colors.accent}
          textAnchor="middle"
          opacity="0.85"
        >
          &
        </text>

        {/* K Letterform */}
        <text
          x="64"
          y="59"
          fontFamily="'Playfair Display', 'Cormorant Garamond', Georgia, serif"
          fontSize="36"
          fontWeight="400"
          fontStyle="italic"
          fill={colors.primary}
          textAnchor="middle"
          style={{ letterSpacing: '-0.05em' }}
        >
          K
        </text>

        {/* Subtle decorative dot beneath */}
        <circle cx="50" cy="72" r="1.5" fill={colors.secondary} opacity="0.8" />
      </svg>
    </div>
  );
};
