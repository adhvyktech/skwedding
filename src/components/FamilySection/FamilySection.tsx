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
        padding: 'clamp(64px, 8vw, 110px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1040px' }}>
        {/* Grand Invitation Stationery Card */}
        <div
          className="stationery-card gold-stationery-frame animate-shadow-breath"
          style={{
            borderRadius: 'clamp(24px, 4vw, 40px)',
            border: '2px solid rgba(201, 164, 92, 0.65)',
            boxShadow: '0 25px 60px rgba(26, 5, 10, 0.55)',
            padding: 'clamp(32px, 5vw, 64px) clamp(20px, 4vw, 56px)',
            textAlign: 'center',
            position: 'relative',
            backgroundColor: '#FAF6EE',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Top Gold Monogram Emblem */}
          <div style={{ marginBottom: '20px' }}>
            <Monogram size={64} variant="gold" showFrame={true} />
          </div>

          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: 'clamp(0.74rem, 1.2vw, 0.85rem)',
              letterSpacing: '0.22em',
              color: 'var(--color-crimson)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '10px',
              fontWeight: 700,
            }}
          >
            {weddingConfig.family.heading}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              color: '#3B0D18',
              fontWeight: 400,
              lineHeight: 1.15,
              marginBottom: '14px',
            }}
          >
            Sarvesh & Keerthana
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-serif-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              color: 'var(--color-forest-rich)',
              maxWidth: '680px',
              margin: '0 auto clamp(24px, 4vw, 36px)',
              lineHeight: 1.5,
            }}
          >
            {weddingConfig.family.blessingNote}
          </p>

          <div
            style={{
              width: '120px',
              height: '1.5px',
              backgroundColor: 'var(--color-gold)',
              margin: '0 auto clamp(24px, 4vw, 32px)',
              opacity: 0.7,
            }}
          />

          {/* Compliments Section Header */}
          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.82rem)',
              letterSpacing: '0.2em',
              color: '#3B0D18',
              fontWeight: 700,
              display: 'block',
              marginBottom: '24px',
            }}
          >
            {weddingConfig.family.subheading}
          </span>

          {/* 3 Family Compliment Rows: Stacks 1-col on Mobile, 3-col on Desktop */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: 'clamp(16px, 2.5vw, 24px)',
              marginBottom: 'clamp(28px, 4vw, 40px)',
              width: '100%',
            }}
          >
            {weddingConfig.family.compliments.map((comp, idx) => (
              <div
                key={idx}
                className="stationery-card hover-gold-glint"
                style={{
                  backgroundColor: '#FFFDF9',
                  borderRadius: '18px',
                  border: '1.5px solid rgba(201, 164, 92, 0.4)',
                  padding: '18px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.04)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: 'clamp(1.2rem, 2.2vw, 1.35rem)',
                    color: '#3B0D18',
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {comp.names[0]}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    color: 'var(--color-gold-dark)',
                    margin: '2px 0',
                    fontWeight: 600,
                  }}
                >
                  &
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: 'clamp(1.2rem, 2.2vw, 1.35rem)',
                    color: '#3B0D18',
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
              borderRadius: 'clamp(18px, 3vw, 24px)',
              border: '1.5px solid rgba(217, 131, 121, 0.45)',
              padding: 'clamp(18px, 3vw, 26px)',
              maxWidth: '560px',
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginBottom: '4px',
              }}
            >
              <Sparkles size={14} color="var(--color-crimson)" />
              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                  letterSpacing: '0.18em',
                  fontWeight: 700,
                  color: 'var(--color-crimson)',
                }}
              >
                {weddingConfig.family.kuttiesHeading}
              </span>
              <Sparkles size={14} color="var(--color-crimson)" />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-serif-display)',
                fontStyle: 'italic',
                fontSize: '1rem',
                color: '#3B0D18',
                marginBottom: '14px',
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
                gap: '12px',
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
                    padding: '8px 18px',
                    borderRadius: '24px',
                    border: '1.5px solid rgba(201, 164, 92, 0.4)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <Heart size={13} fill="var(--color-rose-soft)" color="var(--color-rose-soft)" />
                  <span
                    style={{
                      fontFamily: 'var(--font-serif-display)',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: '#3B0D18',
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
