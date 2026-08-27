import React from 'react';
import { weddingConfig } from '../../config/wedding';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { Heart, Sparkles } from 'lucide-react';

export const CoupleSection: React.FC = () => {
  return (
    <section
      id="couple"
      className="py-24 bg-personality-couple relative overflow-hidden"
      style={{
        padding: 'clamp(64px, 8vw, 110px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">THE BRIDE & THE GROOM</span>
          <h2 className="section-title">Two Hearts, One Sacred Vow</h2>
          <p className="section-subtitle">
            With the blessings of our parents, family, and elders, we joyfully invite you to celebrate our union.
          </p>
        </div>

        {/* 2-Column Responsive Split Cards (1-Col on Mobile, 2-Col on Tablet/Desktop) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(24px, 4vw, 40px)',
            alignItems: 'stretch',
            marginBottom: 'clamp(32px, 5vw, 48px)',
          }}
        >
          {/* Groom Card: Sarvesh */}
          <div
            className="stationery-card gold-stationery-frame"
            style={{
              borderRadius: 'clamp(24px, 4vw, 36px)',
              border: '2px solid rgba(201, 164, 92, 0.65)',
              padding: 'clamp(24px, 4vw, 36px)',
              backgroundColor: '#FAF6EE',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                className="fine-art-photo-frame"
                style={{
                  aspectRatio: '4 / 5',
                  maxHeight: '380px',
                  borderRadius: 'clamp(20px, 3vw, 26px)',
                  marginBottom: '20px',
                  border: '1.5px solid var(--color-gold-border)',
                }}
              >
                <img
                  src="/assets/photos/couple_traditional_kerala.jpg"
                  alt="Sarvesh - The Groom"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                  }}
                />
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.22em',
                  color: 'var(--color-crimson)',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                THE GROOM
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-serif-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  color: '#3B0D18',
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                {weddingConfig.couple.groom}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.86rem, 1.2vw, 0.94rem)',
                  color: 'var(--text-muted-on-light)',
                  lineHeight: 1.6,
                  marginTop: '12px',
                }}
              >
                Son of <strong>S. Ramprasad & R. Yasodha Devi</strong>. Stepping into this holy union with immense gratitude, looking forward to creating a lifetime of joy and togetherness with Keerthana.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '20px',
                paddingTop: '14px',
                borderTop: '1px dashed rgba(201, 164, 92, 0.35)',
              }}
            >
              <Sparkles size={14} color="var(--color-gold-bright)" />
              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  color: 'var(--color-gold-dark)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Hosur • Coimbatore
              </span>
            </div>
          </div>

          {/* Bride Card: Keerthana */}
          <div
            className="stationery-card gold-stationery-frame"
            style={{
              borderRadius: 'clamp(24px, 4vw, 36px)',
              border: '2px solid rgba(201, 164, 92, 0.65)',
              padding: 'clamp(24px, 4vw, 36px)',
              backgroundColor: '#FAF6EE',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                className="fine-art-photo-frame"
                style={{
                  aspectRatio: '4 / 5',
                  maxHeight: '380px',
                  borderRadius: 'clamp(20px, 3vw, 26px)',
                  marginBottom: '20px',
                  border: '1.5px solid var(--color-gold-border)',
                }}
              >
                <img
                  src="/assets/photos/couple_muhurtham_silk.jpg"
                  alt="Keerthana - The Bride"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                  }}
                />
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.22em',
                  color: 'var(--color-crimson)',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                THE BRIDE
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-serif-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  color: '#3B0D18',
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                {weddingConfig.couple.bride}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.86rem, 1.2vw, 0.94rem)',
                  color: 'var(--text-muted-on-light)',
                  lineHeight: 1.6,
                  marginTop: '12px',
                }}
              >
                Daughter of <strong>Sekar Singh & Latha Bai</strong>. Embarking on this sacred path of love, companionship, and laughter, surrounded by the warm blessings of parents and family.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '20px',
                paddingTop: '14px',
                borderTop: '1px dashed rgba(201, 164, 92, 0.35)',
              }}
            >
              <Heart size={14} fill="var(--color-crimson)" color="var(--color-crimson)" />
              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  color: 'var(--color-gold-dark)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Auspicious Union • 2026
              </span>
            </div>
          </div>
        </div>

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
