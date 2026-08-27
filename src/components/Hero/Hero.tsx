import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../config/wedding';
import { Monogram } from '../Monogram/Monogram';
import { ChevronDown, Calendar, Sparkles, Heart } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onRsvpClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onRsvpClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-personality-hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '110px 20px 70px',
        overflow: 'hidden',
      }}
    >
      {/* Background Soft Radial Ambient Lights & Traditional Filigree */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '750px',
            height: '750px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201, 164, 92, 0.18) 0%, rgba(86, 21, 37, 0.45) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Traditional South Indian Corner Filigree Leaves (Top-Left) */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            opacity: 0.35,
            color: 'var(--color-gold)',
          }}
        >
          <path
            d="M10 10 C70 10, 120 60, 120 120 C120 70, 160 20, 190 10"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M30 10 C30 60, 80 100, 120 100"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <circle cx="120" cy="120" r="3.5" fill="var(--color-gold-bright)" />
          <circle cx="190" cy="10" r="3" fill="var(--color-crimson)" />
        </svg>

        {/* Traditional South Indian Corner Filigree Leaves (Top-Right) */}
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            opacity: 0.35,
            transform: 'scaleX(-1)',
            color: 'var(--color-gold)',
          }}
        >
          <path
            d="M10 10 C70 10, 120 60, 120 120 C120 70, 160 20, 190 10"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M30 10 C30 60, 80 100, 120 100"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <circle cx="120" cy="120" r="3.5" fill="var(--color-gold-bright)" />
          <circle cx="190" cy="10" r="3" fill="var(--color-crimson)" />
        </svg>
      </div>

      {/* Main Hero Container — Perfectly Centered */}
      <div
        className="section-container relative z-10 w-full flex flex-col items-center text-center"
        style={{
          maxWidth: '1180px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          margin: '0 auto',
          zIndex: 10,
        }}
      >
        {/* Step 1: Royal Gold Monogram */}
        <div
          className={`transition-all duration-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
          }`}
          style={{
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="relative inline-block animate-float-gentle" style={{ margin: '0 auto' }}>
            <Monogram size={88} variant="gold" showFrame={true} />
            <div
              style={{
                position: 'absolute',
                inset: -8,
                borderRadius: '50%',
                border: '1px dashed rgba(201, 164, 92, 0.5)',
                animation: 'spinSlow 45s linear infinite',
              }}
            />
          </div>
        </div>

        {/* Step 2: Family Invitation Eyebrow */}
        <p
          className={`section-eyebrow transition-all duration-1000 delay-150 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
          style={{
            fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
            letterSpacing: '0.25em',
            marginBottom: '10px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {weddingConfig.couple.invitationHeading}
        </p>

        {/* Step 3: The Couple Names */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
          }`}
          style={{
            marginBottom: '12px',
            position: 'relative',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: 'clamp(3rem, 7.5vw, 6.2rem)',
              fontWeight: 400,
              lineHeight: 1.08,
              color: '#FFFDF9',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 25px rgba(0, 0, 0, 0.5)',
              textAlign: 'center',
              margin: '0 auto',
            }}
          >
            <span>Sarvesh</span>
            <span
              style={{
                fontFamily: 'var(--font-script)',
                color: 'var(--color-gold-bright)',
                fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
                margin: '0 16px',
                fontWeight: 300,
                display: 'inline-block',
                transform: 'translateY(-4px)',
                textShadow: '0 0 15px rgba(201, 164, 92, 0.4)',
              }}
            >
              &
            </span>
            <span>Keerthana</span>
          </h1>
        </div>

        {/* Step 4: Short Invitation Subtitle */}
        <p
          className={`transition-all duration-1000 delay-450 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(1.15rem, 2vw, 1.55rem)',
            fontStyle: 'italic',
            color: 'var(--text-secondary-on-dark)',
            maxWidth: '680px',
            margin: '0 auto 34px',
            lineHeight: 1.4,
            textAlign: 'center',
          }}
        >
          "{weddingConfig.couple.invitationSubtitle}"
        </p>

        {/* Step 5: Couple Arched Portrait Frame — Symmetrically Centered */}
        <div
          className={`relative transition-all duration-1000 delay-600 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
          style={{
            position: 'relative',
            maxWidth: '460px',
            width: '100%',
            margin: '0 auto 38px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* Outer Gold Ornamental Arched Ring */}
          <div
            style={{
              position: 'absolute',
              inset: -12,
              borderRadius: '40px 40px 32px 32px',
              border: '1.5px solid rgba(201, 164, 92, 0.45)',
              pointerEvents: 'none',
            }}
          />

          {/* Portrait Container */}
          <div
            className="fine-art-photo-frame"
            style={{
              borderRadius: '36px 36px 28px 28px',
              border: '3px solid rgba(201, 164, 92, 0.7)',
              boxShadow: '0 25px 60px rgba(26, 5, 10, 0.7)',
              aspectRatio: '4 / 5',
              width: '100%',
              maxHeight: '480px',
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: '#FAF6EE',
            }}
          >
            <img
              src={weddingConfig.couple.heroPhoto}
              alt="Sarvesh & Keerthana romantic wedding portrait"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
              }}
            />

            {/* Gradient Shade with Gold Label */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '42%',
                background: 'linear-gradient(to top, rgba(42, 8, 17, 0.92) 0%, transparent 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <div style={{ color: '#FFFFFF', textAlign: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif-royal)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.22em',
                    color: 'var(--color-gold-light)',
                    display: 'block',
                  }}
                >
                  THE SACRED UNION
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: '#FFF9F0',
                    opacity: 0.95,
                  }}
                >
                  Hosur & Coimbatore • September 2026
                </span>
              </div>
            </div>
          </div>

          {/* Centered Auspicious Muhurtham Badge on Top Arch */}
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(59, 13, 24, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1.5px solid var(--color-gold)',
              borderRadius: '50px',
              padding: '7px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              whiteSpace: 'nowrap',
              zIndex: 15,
            }}
          >
            <Sparkles size={14} color="var(--color-gold-bright)" />
            <span
              style={{
                fontFamily: 'var(--font-serif-royal)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: 'var(--color-gold-light)',
                textTransform: 'uppercase',
              }}
            >
              Auspicious Muhurtham
            </span>
          </div>
        </div>

        {/* Action Buttons: Symmetrically Centered */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-750 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            marginBottom: '36px',
            width: '100%',
          }}
        >
          <button onClick={onRsvpClick} className="btn-primary">
            <Heart size={16} fill="#2A0811" />
            <span>Celebrate With Us (RSVP)</span>
          </button>
          <button onClick={onExploreClick} className="btn-secondary">
            <Calendar size={16} />
            <span>View 3 Wedding Events</span>
          </button>
        </div>

        {/* Scroll to Explore Indicator */}
        <button
          onClick={onExploreClick}
          className="group flex flex-col items-center gap-2 bg-transparent border-none cursor-pointer select-none"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginTop: '8px',
            opacity: 0.85,
            transition: 'opacity 0.3s ease',
            margin: '8px auto 0',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
          aria-label="Scroll to explore invitation"
        >
          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: '0.75rem',
              letterSpacing: '0.24em',
              color: 'var(--color-gold-light)',
              textTransform: 'uppercase',
            }}
          >
            SCROLL TO EXPLORE
          </span>
          <div className="animate-float-slow">
            <ChevronDown size={20} color="var(--color-gold)" />
          </div>
        </button>
      </div>
    </section>
  );
};
