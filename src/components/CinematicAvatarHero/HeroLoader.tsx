import React from 'react';
import { Monogram } from '../Monogram/Monogram';

interface HeroLoaderProps {
  progress: number; // 0.0 to 1.0
  isVisible: boolean;
}

export const HeroLoader: React.FC<HeroLoaderProps> = ({ progress, isVisible }) => {
  return (
    <div
      className="cinematic-loader-container"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        visibility: isVisible ? 'visible' : 'hidden',
      }}
      aria-hidden={!isVisible}
    >
      <div className="cinematic-loader-monogram">
        <Monogram size={72} variant="gold" showFrame={true} />
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p
          style={{
            fontFamily: 'var(--font-serif-royal)',
            fontSize: 'clamp(0.72rem, 1.4vw, 0.86rem)',
            letterSpacing: '0.28em',
            color: 'var(--color-gold-light)',
            textTransform: 'uppercase',
            margin: '0 0 6px 0',
          }}
        >
          SARVESH & KEERTHANA
        </p>
        <p
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
            fontStyle: 'italic',
            color: '#FAF6EE',
            letterSpacing: '0.04em',
            margin: 0,
            opacity: 0.9,
          }}
        >
          Preparing something beautiful...
        </p>
      </div>

      {/* Subtle Luxury Progress Line */}
      <div className="cinematic-loader-bar">
        <div
          className="cinematic-loader-progress"
          style={{
            width: `${Math.min(100, Math.max(8, progress * 100))}%`,
          }}
        />
      </div>
    </div>
  );
};
