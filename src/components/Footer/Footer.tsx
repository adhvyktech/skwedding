import React from 'react';
import { weddingConfig } from '../../config/wedding';
import { Monogram } from '../Monogram/Monogram';
import { Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer
      id="footer"
      className="py-24 bg-personality-footer relative overflow-hidden text-center text-white"
      style={{
        padding: '110px 24px 70px',
        position: 'relative',
        overflow: 'hidden',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div
        className="section-container relative z-10 w-full flex flex-col items-center justify-center text-center"
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Gold Monogram Seal — Strictly Centered */}
        <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Monogram size={84} variant="gold" showFrame={true} />
        </div>

        {/* Couple Names — Symmetrically Centered */}
        <h2
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(2.4rem, 6vw, 4.6rem)',
            color: '#FFFDF9',
            fontWeight: 400,
            letterSpacing: '0.04em',
            marginBottom: '12px',
            textAlign: 'center',
            width: '100%',
            lineHeight: 1.15,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          {weddingConfig.footer.coupleText}
        </h2>

        {/* Dates & Location — Centered Pill */}
        <p
          style={{
            fontFamily: 'var(--font-serif-royal)',
            fontSize: '0.88rem',
            letterSpacing: '0.22em',
            color: 'var(--color-gold-light)',
            textTransform: 'uppercase',
            marginBottom: '28px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {weddingConfig.footer.datesHighlight} • {weddingConfig.footer.locationText}
        </p>

        {/* Emotional Quote — Centered Script Display */}
        <p
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            color: 'var(--color-gold-bright)',
            lineHeight: 1.3,
            maxWidth: '720px',
            margin: '0 auto 42px',
            textAlign: 'center',
            width: '100%',
            textShadow: '0 0 16px rgba(201, 164, 92, 0.3)',
          }}
        >
          "{weddingConfig.footer.quote}"
        </p>

        {/* Back to Top Button — Centered */}
        <button
          onClick={onScrollToTop}
          className="btn-secondary"
          style={{
            margin: '0 auto 52px',
            height: '48px',
            padding: '0 28px',
            fontSize: '0.82rem',
            letterSpacing: '0.18em',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowUp size={15} />
          <span>BACK TO TOP</span>
        </button>

        {/* Peace Message Bottom Line — Centered */}
        <div
          style={{
            borderTop: '1px solid rgba(201, 164, 92, 0.25)',
            paddingTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '8px',
            opacity: 0.9,
            fontSize: '0.9rem',
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-secondary-on-dark)',
            width: '100%',
          }}
        >
          <Heart size={15} fill="var(--color-gold-bright)" color="var(--color-gold-bright)" />
          <span>{weddingConfig.footer.peaceMessage}</span>
        </div>
      </div>
    </footer>
  );
};
