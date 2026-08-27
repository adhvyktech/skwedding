import React from 'react';
import { Monogram } from '../Monogram/Monogram';

interface NavbarProps {
  onNavClick?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header
      role="banner"
      style={{
        width: '100%',
        maxWidth: '100vw',
        padding: 'clamp(20px, 3.5vw, 36px) 14px clamp(12px, 2vw, 20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 20,
        backgroundColor: 'transparent',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '560px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Centered SK Monogram Seal */}
        <div style={{ marginBottom: '10px' }}>
          <Monogram size={56} variant="gold" showFrame={true} />
        </div>

        {/* Wedding Identity Names */}
        <span
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(1.4rem, 3.5vw, 2.1rem)',
            letterSpacing: '0.04em',
            color: '#FFFDF9',
            lineHeight: 1.2,
            fontWeight: 400,
            display: 'block',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)',
          }}
        >
          Sarvesh & Keerthana
        </span>

        {/* Auspicious Date */}
        <span
          style={{
            fontFamily: 'var(--font-serif-royal)',
            fontSize: 'clamp(0.68rem, 1.4vw, 0.8rem)',
            letterSpacing: '0.24em',
            color: 'var(--color-gold-bright)',
            textTransform: 'uppercase',
            marginTop: '4px',
            display: 'block',
          }}
        >
          13 September 2026
        </span>

        {/* Subtle Decorative Gold Linework */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            maxWidth: '220px',
            margin: '12px auto 0',
          }}
        >
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(201, 164, 92, 0.6))',
            }}
          />
          <div
            style={{
              width: '5px',
              height: '5px',
              backgroundColor: 'var(--color-gold-bright)',
              transform: 'rotate(45deg)',
            }}
          />
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(to left, transparent, rgba(201, 164, 92, 0.6))',
            }}
          />
        </div>
      </div>
    </header>
  );
};
