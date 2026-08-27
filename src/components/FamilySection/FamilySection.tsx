import React from 'react';
import { weddingConfig } from '../../config/wedding';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { Monogram } from '../Monogram/Monogram';
import { Heart, Sparkles } from 'lucide-react';

export const FamilySection: React.FC = () => {
  return (
    <section
      id="family"
      className="py-24 bg-personality-family relative overflow-hidden"
      style={{
        padding: '110px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1040px', margin: '0 auto' }}>
        {/* Grand Invitation Stationery Card */}
        <div
          className="stationery-card gold-stationery-frame animate-shadow-breath"
          style={{
            borderRadius: '40px',
            border: '2px solid rgba(201, 164, 92, 0.65)',
            boxShadow: '0 25px 60px rgba(26, 5, 10, 0.55)',
            padding: 'clamp(40px, 6vw, 70px) clamp(24px, 5vw, 60px)',
            textAlign: 'center',
            position: 'relative',
            backgroundColor: '#FAF6EE',
          }}
        >
          {/* Top Gold Monogram Emblem */}
          <div style={{ marginBottom: '24px' }}>
            <Monogram size={72} variant="gold" showFrame={true} />
          </div>

          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: '0.85rem',
              letterSpacing: '0.25em',
              color: 'var(--color-crimson)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '12px',
              fontWeight: 600,
            }}
          >
            {weddingConfig.family.heading}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
              color: 'var(--color-maroon-dark)',
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            Sarvesh & Keerthana
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-serif-display)',
              fontStyle: 'italic',
              fontSize: '1.25rem',
              color: 'var(--color-forest-rich)',
              maxWidth: '680px',
              margin: '0 auto 40px',
              lineHeight: 1.5,
            }}
          >
            {weddingConfig.family.blessingNote}
          </p>

          <div
            style={{
              width: '140px',
              height: '1.5px',
              backgroundColor: 'var(--color-gold)',
              margin: '0 auto 36px',
              opacity: 0.7,
            }}
          />

          {/* Compliments Section */}
          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: '0.82rem',
              letterSpacing: '0.22em',
              color: 'var(--color-maroon-dark)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '28px',
            }}
          >
            {weddingConfig.family.subheading}
          </span>

          {/* 3 Family Compliment Rows */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
              marginBottom: '44px',
            }}
          >
            {weddingConfig.family.compliments.map((comp, idx) => (
              <div
                key={idx}
                className="stationery-card hover-gold-glint"
                style={{
                  backgroundColor: '#FFFDF9',
                  borderRadius: '20px',
                  border: '1.5px solid rgba(201, 164, 92, 0.4)',
                  padding: '20px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.04)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: '1.35rem',
                    color: 'var(--color-maroon-dark)',
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {comp.names[0]}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    color: 'var(--color-gold-dark)',
                    margin: '3px 0',
                    fontWeight: 600,
                  }}
                >
                  &
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: '1.35rem',
                    color: 'var(--color-maroon-dark)',
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {comp.names[1]}
                </span>
              </div>
            ))}
          </div>

          {/* Kutties Section: Adhvik Guhan & Ananyaa to their Chaacha & Chaachi */}
          <div
            style={{
              backgroundColor: '#FAF2EF',
              borderRadius: '24px',
              border: '1.5px solid rgba(217, 131, 121, 0.45)',
              padding: '26px',
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '4px',
              }}
            >
              <Sparkles size={15} color="var(--color-crimson)" />
              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: '0.82rem',
                  letterSpacing: '0.2em',
                  fontWeight: 700,
                  color: 'var(--color-crimson)',
                }}
              >
                {weddingConfig.family.kuttiesHeading}
              </span>
              <Sparkles size={15} color="var(--color-crimson)" />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-serif-display)',
                fontStyle: 'italic',
                fontSize: '1.05rem',
                color: 'var(--color-maroon-dark)',
                marginBottom: '16px',
              }}
            >
              "{weddingConfig.family.kuttiesCallingText}"
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
              }}
            >
              {weddingConfig.family.kutties.map((kutty, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: '#FFFFFF',
                    padding: '9px 22px',
                    borderRadius: '24px',
                    border: '1.5px solid rgba(201, 164, 92, 0.4)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <Heart size={14} fill="var(--color-rose-soft)" color="var(--color-rose-soft)" />
                  <span
                    style={{
                      fontFamily: 'var(--font-serif-display)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      color: 'var(--color-maroon-dark)',
                    }}
                  >
                    {kutty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
