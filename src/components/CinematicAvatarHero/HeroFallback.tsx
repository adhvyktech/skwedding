import React from 'react';
import { Monogram } from '../Monogram/Monogram';
import { ChevronDown } from 'lucide-react';

interface HeroFallbackProps {
  onExploreClick?: () => void;
  reason?: 'reduced-motion' | 'error' | 'static';
}

export const HeroFallback: React.FC<HeroFallbackProps> = ({
  onExploreClick,
}) => {
  return (
    <section
      className="cinematic-hero-root"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(32px, 6vh, 64px) 20px',
        boxSizing: 'border-box',
        background: 'radial-gradient(circle at center, #120408 0%, #030103 100%)',
      }}
    >
      {/* Centered Monogram & Headings */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '24px',
          zIndex: 10,
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <Monogram size={52} variant="gold" showFrame={true} />
        </div>

        <p
          style={{
            fontFamily: 'var(--font-serif-royal)',
            fontSize: 'clamp(0.68rem, 1.3vw, 0.82rem)',
            letterSpacing: '0.24em',
            color: 'var(--color-gold-light)',
            textTransform: 'uppercase',
            margin: '0 0 6px 0',
          }}
        >
          TOGETHER WITH THEIR FAMILIES
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
            fontWeight: 400,
            color: '#FFFDF9',
            letterSpacing: '0.02em',
            margin: '0 0 8px 0',
          }}
        >
          Sarvesh & Keerthana
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-serif-royal)',
            fontSize: 'clamp(0.72rem, 1.4vw, 0.88rem)',
            letterSpacing: '0.22em',
            color: 'var(--color-gold-bright)',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          13 September 2026
        </p>
      </div>

      {/* Static 3D Avatar Frame in Fine-Art Border */}
      <div
        className="hero-fallback-card"
        style={{
          aspectRatio: '16 / 9',
          maxWidth: '680px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <img
          src="/assets/avatar-frames/ezgif-frame-001.jpg"
          alt="Sarvesh & Keerthana 3D Couple Portrait"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
          onError={(e) => {
            // Fallback to static wedding photo if avatar frame is missing
            (e.target as HTMLImageElement).src = '/assets/photos/couple_traditional_kerala.jpg';
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(3, 1, 3, 0.6) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Scroll to Explore Cue */}
      <button
        onClick={onExploreClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginTop: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--color-gold-light)',
          zIndex: 10,
        }}
        aria-label="Scroll down into wedding invitation"
      >
        <span
          style={{
            fontFamily: 'var(--font-serif-royal)',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          ENTER INVITATION
        </span>
        <div className="animate-float-slow">
          <ChevronDown size={20} color="var(--color-gold)" />
        </div>
      </button>
    </section>
  );
};
