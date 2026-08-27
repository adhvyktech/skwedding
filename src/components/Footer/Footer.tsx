import React from 'react';
import { weddingConfig } from '../../config/wedding';
import { Monogram } from '../Monogram/Monogram';
import { Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  const { coupleText, datesHighlight, locationText, quote, peaceMessage } = weddingConfig.footer;

  const scrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      role="contentinfo"
      className="py-20 bg-personality-footer relative overflow-hidden"
      style={{
        padding: 'clamp(60px, 8vw, 90px) 0 clamp(40px, 6vw, 60px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="section-container"
        style={{
          maxWidth: '840px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Centered SK Monogram Emblem */}
        <div style={{ marginBottom: '20px' }}>
          <Monogram size={72} variant="gold" showFrame={true} />
        </div>

        {/* Couple Names Headline */}
        <h2
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(2rem, 6vw, 3.6rem)',
            color: '#FFFDF9',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '0.04em',
            margin: '0 0 10px',
            textAlign: 'center',
            width: '100%',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.4)',
          }}
        >
          {coupleText}
        </h2>

        {/* Dates & Location Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'rgba(59, 13, 24, 0.75)',
            border: '1.5px solid var(--color-gold)',
            borderRadius: '30px',
            padding: '6px 18px',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: 'clamp(0.68rem, 1.2vw, 0.78rem)',
              letterSpacing: '0.16em',
              color: 'var(--color-gold-bright)',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {datesHighlight} • {locationText}
          </span>
        </div>

        {/* Core Romantic Quote */}
        <p
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            color: 'var(--color-gold-light)',
            maxWidth: '560px',
            margin: '0 auto 10px',
            lineHeight: 1.4,
          }}
        >
          "{quote}"
        </p>

        {/* Sacred Peace Message */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.82rem, 1.3vw, 0.92rem)',
            color: 'var(--text-secondary-on-dark)',
            maxWidth: '580px',
            margin: '0 auto 28px',
            lineHeight: 1.5,
          }}
        >
          {peaceMessage}
        </p>

        {/* Decorative Gold Filigree Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            width: '100%',
            maxWidth: '240px',
            margin: '0 auto 28px',
          }}
        >
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(201, 164, 92, 0.6))',
            }}
          />
          <Heart size={14} fill="var(--color-gold-bright)" color="var(--color-gold-bright)" />
          <div
            style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(to left, transparent, rgba(201, 164, 92, 0.6))',
            }}
          />
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="btn-secondary"
          style={{
            fontSize: '0.78rem',
            padding: '8px 20px',
            minHeight: '42px',
            color: '#FFFDF9',
          }}
          aria-label="Back to top of wedding invitation"
        >
          <ArrowUp size={14} />
          <span>BACK TO TOP</span>
        </button>

        {/* Footer Peace Bottom Note */}
        <p
          style={{
            fontFamily: 'var(--font-serif-royal)',
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            color: 'var(--color-gold-dark)',
            textTransform: 'uppercase',
            marginTop: '28px',
          }}
        >
          Crafted with eternal love • Sarvesh & Keerthana • 2026
        </p>
      </div>
    </footer>
  );
};
