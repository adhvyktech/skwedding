import React, { useState } from 'react';
import { weddingConfig } from '../../config/wedding';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { Heart, Sparkles } from 'lucide-react';

export const CoupleSection: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="couple"
      className="py-24 bg-personality-couple relative overflow-hidden"
      style={{
        padding: '110px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">MEET THE BRIDE & GROOM</span>
          <h2 className="section-title">Two Souls, Bound in Sacred Love</h2>
          <p
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              color: 'var(--color-gold-bright)',
              lineHeight: 1.2,
              marginTop: '10px',
            }}
          >
            {weddingConfig.couple.coreQuote}
          </p>
        </div>

        {/* Interactive Layered Split-to-Unify Composition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'center',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left Column: Sarvesh Profile & Words */}
          <div
            className="stationery-card gold-stationery-frame"
            style={{
              padding: '36px 28px',
              borderRadius: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transform: `translate(${tilt.x * -0.4}px, ${tilt.y * -0.4}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <div className="fine-art-photo-frame" style={{ width: '240px', height: '300px', borderRadius: '24px', marginBottom: '20px' }}>
              <img
                src={weddingConfig.couple.outdoorPhoto}
                alt="Sarvesh"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <span
              style={{
                fontFamily: 'var(--font-serif-royal)',
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                color: 'var(--color-crimson)',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'block',
                marginBottom: '4px',
              }}
            >
              THE GROOM
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: '2.4rem',
                color: 'var(--color-maroon-dark)',
                lineHeight: 1.1,
                marginBottom: '8px',
              }}
            >
              Sarvesh
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.92rem',
                color: 'var(--text-muted-on-light)',
                maxWidth: '300px',
                lineHeight: 1.6,
              }}
            >
              A steadfast companion with an open heart, boundless warmth, and a quiet strength that anchors every shared dream.
            </p>
          </div>

          {/* Center Column: Unifying Romantic Portrait Card */}
          <div
            className="flex flex-col items-center text-center relative"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Romantic Center Arched Portrait */}
            <div
              className="fine-art-photo-frame gold-stationery-frame"
              style={{
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '3 / 4',
                borderRadius: '36px 36px 28px 28px',
                border: '3px solid rgba(201, 164, 92, 0.75)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55)',
                transform: `translate(${tilt.x * 0.7}px, ${tilt.y * 0.7}px)`,
                transition: 'transform 0.3s ease-out',
                position: 'relative',
                backgroundColor: '#FAF6EE',
              }}
            >
              <img
                src={weddingConfig.couple.closeupPhoto}
                alt="Sarvesh & Keerthana eye to eye"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 30%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px 16px 18px',
                  background: 'linear-gradient(to top, rgba(42, 8, 17, 0.9) 0%, transparent 100%)',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Heart size={16} fill="var(--color-gold-bright)" color="var(--color-gold-bright)" />
                  <span
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.88rem',
                      letterSpacing: '0.18em',
                      color: 'var(--color-gold-light)',
                    }}
                  >
                    SOUL TO SOUL
                  </span>
                </div>
              </div>
            </div>

            {/* Gold Pill Badge under Portrait */}
            <div
              style={{
                marginTop: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(59, 13, 24, 0.92)',
                padding: '8px 20px',
                borderRadius: '30px',
                border: '1.5px solid var(--color-gold)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              }}
            >
              <Sparkles size={14} color="var(--color-gold-bright)" />
              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--color-gold-light)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                13 September 2026 • Hosur
              </span>
            </div>
          </div>

          {/* Right Column: Keerthana Profile & Words */}
          <div
            className="stationery-card gold-stationery-frame"
            style={{
              padding: '36px 28px',
              borderRadius: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transform: `translate(${tilt.x * 0.4}px, ${tilt.y * 0.4}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            <div className="fine-art-photo-frame" style={{ width: '240px', height: '300px', borderRadius: '24px', marginBottom: '20px' }}>
              <img
                src={weddingConfig.couple.embracePhoto}
                alt="Keerthana"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>

            <span
              style={{
                fontFamily: 'var(--font-serif-royal)',
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                color: 'var(--color-crimson)',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'block',
                marginBottom: '4px',
              }}
            >
              THE BRIDE
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: '2.4rem',
                color: 'var(--color-maroon-dark)',
                lineHeight: 1.1,
                marginBottom: '8px',
              }}
            >
              Keerthana
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.92rem',
                color: 'var(--text-muted-on-light)',
                maxWidth: '300px',
                lineHeight: 1.6,
              }}
            >
              A graceful presence with an infectious smile, boundless empathy, and a radiance that illuminates every step of this journey.
            </p>
          </div>
        </div>

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
