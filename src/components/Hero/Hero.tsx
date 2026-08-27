import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../config/wedding';
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
      className="relative flex items-center justify-center overflow-hidden bg-personality-hero"
      style={{
        minHeight: 'calc(100vh - 120px)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(20px, 4vw, 50px) 0 clamp(40px, 6vw, 70px)',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Background Soft Radial Ambient Lights & Traditional Filigree */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(90vw, 650px)',
            height: 'min(90vw, 650px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201, 164, 92, 0.18) 0%, rgba(86, 21, 37, 0.45) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Main Hero Container — Responsive & Centered */}
      <div
        className="section-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        {/* Step 1: Family Invitation Eyebrow */}
        <p
          className={`section-eyebrow transition-all duration-1000 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
          style={{
            fontSize: 'clamp(0.72rem, 1.4vw, 0.92rem)',
            letterSpacing: '0.22em',
            marginBottom: '8px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {weddingConfig.couple.invitationHeading}
        </p>

        {/* Step 2: The Couple Names */}
        <div
          className={`transition-all duration-1000 delay-150 ${
            isLoaded ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
          }`}
          style={{
            marginBottom: '10px',
            position: 'relative',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: 'clamp(2.4rem, 7vw, 5.4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#FFFDF9',
              letterSpacing: '-0.01em',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              textAlign: 'center',
              margin: '0 auto',
            }}
          >
            <span>Sarvesh</span>
            <span
              style={{
                fontFamily: 'var(--font-script)',
                color: 'var(--color-gold-bright)',
                fontSize: 'clamp(2rem, 5.5vw, 4.2rem)',
                margin: '0 clamp(8px, 1.8vw, 16px)',
                fontWeight: 300,
                display: 'inline-block',
                transform: 'translateY(-2px)',
                textShadow: '0 0 15px rgba(201, 164, 92, 0.4)',
              }}
            >
              &
            </span>
            <span>Keerthana</span>
          </h1>
        </div>

        {/* Step 3: Invitation Subtitle */}
        <p
          className={`transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)',
            fontStyle: 'italic',
            color: 'var(--text-secondary-on-dark)',
            maxWidth: '620px',
            margin: '0 auto clamp(20px, 3.5vw, 32px)',
            lineHeight: 1.45,
            textAlign: 'center',
          }}
        >
          "{weddingConfig.couple.invitationSubtitle}"
        </p>

        {/* Step 4: Couple Arched Portrait Frame — Responsive & Centered */}
        <div
          className={`relative transition-all duration-1000 delay-450 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
          style={{
            position: 'relative',
            maxWidth: '440px',
            width: '100%',
            margin: '0 auto clamp(24px, 4vw, 36px)',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* Outer Gold Ornamental Arched Ring */}
          <div
            style={{
              position: 'absolute',
              inset: 'clamp(-8px, -1.5vw, -12px)',
              borderRadius: 'clamp(32px, 5vw, 40px) clamp(32px, 5vw, 40px) clamp(24px, 4vw, 32px) clamp(24px, 4vw, 32px)',
              border: '1.5px solid rgba(201, 164, 92, 0.45)',
              pointerEvents: 'none',
            }}
          />

          {/* Portrait Container */}
          <div
            className="fine-art-photo-frame"
            style={{
              borderRadius: 'clamp(28px, 4.5vw, 36px) clamp(28px, 4.5vw, 36px) clamp(22px, 3.5vw, 28px) clamp(22px, 3.5vw, 28px)',
              border: '2.5px solid rgba(201, 164, 92, 0.7)',
              boxShadow: '0 20px 50px rgba(26, 5, 10, 0.7)',
              aspectRatio: '4 / 5',
              width: '100%',
              maxHeight: '460px',
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: '#FAF6EE',
            }}
          >
            <img
              src={weddingConfig.couple.heroPhoto}
              alt="Sarvesh & Keerthana traditional wedding portrait"
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
                padding: 'clamp(14px, 2.5vw, 22px)',
                background: 'linear-gradient(to top, rgba(42, 8, 17, 0.92) 0%, transparent 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <div style={{ color: '#FFFFFF', textAlign: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif-royal)',
                    fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)',
                    letterSpacing: '0.2em',
                    color: 'var(--color-gold-light)',
                    display: 'block',
                  }}
                >
                  THE SACRED UNION
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(0.74rem, 1.2vw, 0.84rem)',
                    color: '#FFF9F0',
                    opacity: 0.95,
                    display: 'block',
                    marginTop: '2px',
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
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(59, 13, 24, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1.5px solid var(--color-gold)',
              borderRadius: '50px',
              padding: '5px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
              whiteSpace: 'nowrap',
              zIndex: 15,
            }}
          >
            <Sparkles size={13} color="var(--color-gold-bright)" />
            <span
              style={{
                fontFamily: 'var(--font-serif-royal)',
                fontSize: 'clamp(0.65rem, 1.1vw, 0.72rem)',
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

        {/* Action Buttons: Responsive Wrap */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            marginBottom: '28px',
            width: '100%',
          }}
        >
          <button onClick={onRsvpClick} className="btn-primary" style={{ flex: '1 1 200px', maxWidth: '280px' }}>
            <Heart size={15} fill="#2A0811" />
            <span>Celebrate With Us (RSVP)</span>
          </button>
          <button onClick={onExploreClick} className="btn-secondary" style={{ flex: '1 1 200px', maxWidth: '280px' }}>
            <Calendar size={15} />
            <span>View 3 Wedding Events</span>
          </button>
        </div>

        {/* Scroll to Explore Indicator */}
        <button
          onClick={onExploreClick}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginTop: '4px',
            opacity: 0.85,
            transition: 'opacity 0.3s ease',
            margin: '4px auto 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
          aria-label="Scroll to explore invitation"
        >
          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: '0.72rem',
              letterSpacing: '0.22em',
              color: 'var(--color-gold-light)',
              textTransform: 'uppercase',
            }}
          >
            SCROLL TO EXPLORE
          </span>
          <div className="animate-float-slow">
            <ChevronDown size={18} color="var(--color-gold)" />
          </div>
        </button>
      </div>
    </section>
  );
};
