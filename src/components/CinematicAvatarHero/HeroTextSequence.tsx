import React from 'react';
import { Monogram } from '../Monogram/Monogram';
import { ChevronDown } from 'lucide-react';

interface HeroTextSequenceProps {
  progress: number; // 0.0 to 1.0
  onScrollToInvitation?: () => void;
}

// Utility to calculate smooth fade-in and fade-out based on progress ranges
function calculatePhaseOpacity(
  progress: number,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number
): { opacity: number; translateY: number; pointerEvents: 'none' | 'auto' } {
  if (progress < fadeInStart) {
    return { opacity: 0, translateY: 15, pointerEvents: 'none' };
  }
  if (progress >= fadeInStart && progress < fadeInEnd) {
    const ratio = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
    return { opacity: ratio, translateY: 15 * (1 - ratio), pointerEvents: ratio > 0.5 ? 'auto' : 'none' };
  }
  if (progress >= fadeInEnd && progress <= fadeOutStart) {
    return { opacity: 1, translateY: 0, pointerEvents: 'auto' };
  }
  if (progress > fadeOutStart && progress <= fadeOutEnd) {
    const ratio = 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    return { opacity: ratio, translateY: -15 * (1 - ratio), pointerEvents: ratio > 0.5 ? 'auto' : 'none' };
  }
  return { opacity: 0, translateY: -15, pointerEvents: 'none' };
}

export const HeroTextSequence: React.FC<HeroTextSequenceProps> = ({
  progress,
  onScrollToInvitation,
}) => {
  // Phase 1: Opening Monogram & Names (0.00 -> 0.28)
  const phase1 = calculatePhaseOpacity(progress, 0.0, 0.05, 0.18, 0.28);

  // Phase 2: "Two Lives. One Beautiful Beginning." (0.28 -> 0.65)
  const phase2 = calculatePhaseOpacity(progress, 0.28, 0.36, 0.54, 0.64);

  // Phase 3: "13 September 2026" (0.64 -> 0.88)
  const phase3 = calculatePhaseOpacity(progress, 0.64, 0.72, 0.82, 0.88);

  // Phase 4: "Our Wedding Begins Here" (0.86 -> 1.0)
  const phase4 = calculatePhaseOpacity(progress, 0.86, 0.93, 1.0, 1.0);

  return (
    <div
      className="cinematic-overlay-content"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {/* ---------------- PHASE 1: OPENING ---------------- */}
      <div
        className="hero-text-card hero-text-top"
        style={{
          opacity: phase1.opacity,
          transform: `translateY(${phase1.translateY}px)`,
          pointerEvents: phase1.pointerEvents,
        }}
      >
        <div style={{ marginBottom: '8px' }}>
          <Monogram size={48} variant="gold" showFrame={true} />
        </div>
        <p
          style={{
            fontFamily: 'var(--font-serif-royal)',
            fontSize: 'clamp(0.68rem, 1.2vw, 0.8rem)',
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
            fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: '#FFFDF9',
            letterSpacing: '0.02em',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.7)',
            margin: 0,
          }}
        >
          <span>Sarvesh</span>
          <span
            style={{
              fontFamily: 'var(--font-script)',
              color: 'var(--color-gold-bright)',
              fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
              margin: '0 clamp(6px, 1.4vw, 14px)',
              fontWeight: 300,
            }}
          >
            &
          </span>
          <span>Keerthana</span>
        </h1>
      </div>

      {/* Initial Scroll Down Instruction (visible during Phase 1) */}
      <div
        className="hero-text-card hero-text-bottom"
        style={{
          opacity: phase1.opacity,
          transform: `translateY(${phase1.translateY}px)`,
          pointerEvents: phase1.pointerEvents,
        }}
      >
        <button
          onClick={onScrollToInvitation}
          className="hero-scroll-cue"
          aria-label="Scroll to explore 3D couple avatar turntable"
        >
          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: 'clamp(0.65rem, 1.1vw, 0.74rem)',
              letterSpacing: '0.22em',
              color: 'var(--color-gold-light)',
              textTransform: 'uppercase',
            }}
          >
            SCROLL TO ROTATE & EXPLORE
          </span>
          <div className="hero-scroll-mouse">
            <div className="hero-scroll-wheel" />
          </div>
        </button>
      </div>

      {/* ---------------- PHASE 2: TWO LIVES ---------------- */}
      <div
        className="hero-text-card hero-text-bottom"
        style={{
          opacity: phase2.opacity,
          transform: `translateY(${phase2.translateY}px)`,
          pointerEvents: phase2.pointerEvents,
          bottom: 'clamp(32px, 8vh, 64px)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-serif-royal)',
            fontSize: 'clamp(0.7rem, 1.2vw, 0.82rem)',
            letterSpacing: '0.28em',
            color: 'var(--color-gold-light)',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}
        >
          THE SACRED PROMISE
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(1.8rem, 4.2vw, 3.2rem)',
            fontWeight: 400,
            lineHeight: 1.25,
            color: '#FFFDF9',
            letterSpacing: '0.04em',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            margin: 0,
          }}
        >
          TWO LIVES.
          <br />
          <span
            style={{
              fontStyle: 'italic',
              color: 'var(--color-gold-shimmer)',
            }}
          >
            ONE BEAUTIFUL BEGINNING.
          </span>
        </h2>
      </div>

      {/* ---------------- PHASE 3: THE DATE & SACRED UNION ---------------- */}
      <div
        className="hero-text-card hero-text-bottom"
        style={{
          opacity: phase3.opacity,
          transform: `translateY(${phase3.translateY}px)`,
          pointerEvents: phase3.pointerEvents,
          bottom: 'clamp(32px, 8vh, 64px)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif-royal)',
            fontSize: 'clamp(0.68rem, 1.1vw, 0.78rem)',
            letterSpacing: '0.24em',
            color: 'var(--color-gold-bright)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          SAVE THE SACRED DATE
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 400,
            color: '#FFFDF9',
            letterSpacing: '0.06em',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.8)',
            margin: '0 0 6px 0',
          }}
        >
          13 SEPTEMBER 2026
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.76rem, 1.2vw, 0.88rem)',
            letterSpacing: '0.12em',
            color: 'var(--color-ivory-warm)',
            opacity: 0.9,
            margin: 0,
          }}
        >
          HOSUR & COIMBATORE • TAMIL NADU
        </p>
      </div>

      {/* ---------------- PHASE 4: TRANSITION REVEAL ---------------- */}
      <div
        className="hero-text-card hero-text-bottom"
        style={{
          opacity: phase4.opacity,
          transform: `translateY(${phase4.translateY}px)`,
          pointerEvents: phase4.pointerEvents,
          bottom: 'clamp(28px, 6vh, 52px)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-serif-royal)',
            fontSize: 'clamp(0.7rem, 1.2vw, 0.82rem)',
            letterSpacing: '0.24em',
            color: 'var(--color-gold-bright)',
            textTransform: 'uppercase',
            margin: '0 0 6px 0',
          }}
        >
          WELCOME TO OUR CELEBRATION
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(1.9rem, 4.4vw, 3.2rem)',
            fontWeight: 400,
            color: '#FFFDF9',
            letterSpacing: '0.04em',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            margin: '0 0 16px 0',
          }}
        >
          OUR WEDDING BEGINS HERE
        </h2>

        <button
          onClick={onScrollToInvitation}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            pointerEvents: 'auto',
          }}
          aria-label="Scroll down into wedding invitation"
        >
          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              color: 'var(--color-gold-light)',
              textTransform: 'uppercase',
            }}
          >
            ENTER INVITATION
          </span>
          <div className="animate-float-slow">
            <ChevronDown size={20} color="var(--color-gold-bright)" />
          </div>
        </button>
      </div>
    </div>
  );
};
