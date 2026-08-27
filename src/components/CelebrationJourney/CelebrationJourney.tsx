import React, { useState } from 'react';
import { weddingConfig } from '../../config/wedding';
import type { CelebrationEvent } from '../../config/wedding';
import { CelebrationEventModal } from './CelebrationEventModal';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { Sparkles, Calendar, Clock, MapPin, Eye } from 'lucide-react';

export const CelebrationJourney: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CelebrationEvent | null>(null);

  const events = weddingConfig.celebrationJourney;

  return (
    <section
      id="celebrations"
      className="py-24 bg-personality-story relative overflow-hidden"
      style={{
        padding: 'clamp(64px, 8vw, 110px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1240px' }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">THE AUSPICIOUS CELEBRATION JOURNEY</span>
          <h2 className="section-title">Rituals, Festivities & Sacred Moments</h2>
          <p className="section-subtitle">
            From fragrant turmeric rituals to the eternal Muhurtham vows, explore the ceremonies uniting Sarvesh & Keerthana.
          </p>
        </div>

        {/* Responsive Events Grid (1-Col on Mobile, 2-Col on Tablet, 3-Col on Desktop) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(20px, 3.5vw, 32px)',
            marginBottom: 'clamp(32px, 5vw, 48px)',
            width: '100%',
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="stationery-card gold-stationery-frame cursor-pointer group hover-gold-glint"
              style={{
                borderRadius: 'clamp(24px, 4vw, 32px)',
                border: '1.5px solid rgba(201, 164, 92, 0.55)',
                padding: 'clamp(22px, 3.5vw, 30px)',
                backgroundColor: '#FAF6EE',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 12px 35px rgba(26, 5, 10, 0.45)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div>
                {/* Top Number & Badge Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--color-gold-bright)',
                      textShadow: '0 0 10px rgba(201, 164, 92, 0.3)',
                    }}
                  >
                    {event.number}
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.12em',
                      color: event.isConfirmed ? 'var(--color-crimson)' : 'var(--color-forest)',
                      backgroundColor: event.colorScheme.tagBg,
                      border: `1px solid ${event.colorScheme.border}`,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {event.badge}
                  </span>
                </div>

                {/* Event Photo if available */}
                {event.image && (
                  <div
                    className="fine-art-photo-frame"
                    style={{
                      aspectRatio: '16 / 9',
                      maxHeight: '180px',
                      borderRadius: 'clamp(16px, 2.5vw, 20px)',
                      marginBottom: '16px',
                      border: '1.5px solid var(--color-gold-border)',
                    }}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 20%',
                      }}
                    />
                  </div>
                )}

                {/* Event Name & Subtitle */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                    color: '#3B0D18',
                    lineHeight: 1.2,
                    margin: '0 0 4px',
                  }}
                >
                  {event.name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    color: 'var(--color-gold-dark)',
                    fontWeight: 600,
                    marginBottom: '14px',
                  }}
                >
                  {event.subtitle}
                </p>

                {/* Schedule Info Box */}
                <div
                  style={{
                    backgroundColor: '#FFFDF9',
                    borderRadius: '16px',
                    border: '1px solid rgba(201, 164, 92, 0.35)',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    marginBottom: '14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={14} color="var(--color-crimson)" style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 600, color: '#3B0D18' }}>
                      {event.dateDisplay}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={14} color="var(--color-forest)" style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-forest-rich)' }}>
                      {event.timeDisplay}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <MapPin size={14} color="var(--color-vermilion)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-primary-on-light)' }}>
                      <strong>{event.venueName}</strong> • {event.venueAddress}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.84rem',
                    color: 'var(--text-muted-on-light)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {event.description}
                </p>
              </div>

              {/* Bottom Action: Reveal Poster Trigger */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '18px',
                  paddingTop: '12px',
                  borderTop: '1px dashed rgba(201, 164, 92, 0.35)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={13} color="var(--color-gold-bright)" />
                  <span
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.12em',
                      color: 'var(--color-crimson)',
                      fontWeight: 600,
                    }}
                  >
                    SEALED INVITATION
                  </span>
                </div>

                <button
                  type="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#FAF2EF',
                    border: '1px solid var(--color-gold)',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    color: 'var(--color-crimson)',
                    cursor: 'pointer',
                  }}
                >
                  <Eye size={12} />
                  <span>Scratch Poster</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Event Scratch Modal */}
        <CelebrationEventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
