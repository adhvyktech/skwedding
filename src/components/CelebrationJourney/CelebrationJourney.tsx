import React, { useState } from 'react';
import { weddingConfig } from '../../config/wedding';
import type { CelebrationEvent } from '../../config/wedding';
import { CelebrationEventModal } from './CelebrationEventModal';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { Sparkles, Flower, Music, Flame, HeartHandshake, PartyPopper, Crown, Eye } from 'lucide-react';

export const CelebrationJourney: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CelebrationEvent | null>(null);

  const getIcon = (name: string, color: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles size={22} color={color} />;
      case 'Flower':
        return <Flower size={22} color={color} />;
      case 'Music':
        return <Music size={22} color={color} />;
      case 'Flame':
        return <Flame size={22} color={color} />;
      case 'PartyPopper':
        return <PartyPopper size={22} color={color} />;
      case 'Crown':
        return <Crown size={22} color={color} />;
      case 'HeartHandshake':
      default:
        return <HeartHandshake size={22} color={color} />;
    }
  };

  return (
    <section
      id="celebrations"
      className="py-24 bg-personality-story relative overflow-hidden"
      style={{
        padding: '110px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1120px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">A SACRED ITINERARY OF JOY</span>
          <h2 className="section-title">The Celebration Journey</h2>
          <p className="section-subtitle">
            A cherished visual anthology of our wedding rituals and gatherings. Tap any celebration card to scratch and reveal its sealed details.
          </p>
        </div>

        {/* Timeline Journey Container */}
        <div style={{ position: 'relative', maxWidth: '920px', margin: '0 auto' }}>
          {/* Central Gold Timeline Line */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              bottom: '40px',
              left: '50%',
              width: '2px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, rgba(201, 164, 92, 0.3) 0%, rgba(225, 201, 138, 0.85) 30%, rgba(201, 164, 92, 0.85) 70%, rgba(201, 164, 92, 0.3) 100%)',
            }}
          />

          {/* Celebration Event Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
            {weddingConfig.celebrationJourney.map((event, idx) => {
              const isEven = idx % 2 === 0;
              const motionClass =
                idx % 3 === 0 ? 'animate-breathe' : idx % 3 === 1 ? 'animate-float-subtle' : 'animate-shadow-breath';

              return (
                <div
                  key={event.id}
                  className="flex flex-col md:flex-row items-center"
                  style={{
                    display: 'flex',
                    flexDirection: isEven ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    width: '100%',
                  }}
                >
                  {/* Miniature Sealed Invitation Card */}
                  <div
                    className={`stationery-card gold-stationery-frame cursor-pointer ${motionClass}`}
                    onClick={() => setSelectedEvent(event)}
                    style={{
                      width: '100%',
                      maxWidth: '400px',
                      padding: '30px 24px',
                      borderRadius: '28px',
                      textAlign: isEven ? 'right' : 'left',
                      zIndex: 2,
                      cursor: 'pointer',
                      border: '1.5px solid rgba(201, 164, 92, 0.45)',
                      backgroundColor: '#FAF6EE',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-gold-bright)';
                      e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(201, 164, 92, 0.45)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                    {/* Top Badge & Number */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isEven ? 'flex-end' : 'flex-start',
                        gap: '10px',
                        marginBottom: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-serif-royal)',
                          fontSize: '0.72rem',
                          letterSpacing: '0.18em',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          color: event.colorScheme.accent,
                          background: event.colorScheme.tagBg,
                          padding: '4px 12px',
                          borderRadius: '14px',
                          border: `1px solid ${event.colorScheme.border}`,
                        }}
                      >
                        {event.badge}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-serif-royal)',
                          fontSize: '1.15rem',
                          fontWeight: 700,
                          color: 'var(--color-gold-dark)',
                        }}
                      >
                        {event.number}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif-display)',
                        fontSize: '1.85rem',
                        color: 'var(--color-maroon-dark)',
                        lineHeight: 1.2,
                        marginBottom: '4px',
                      }}
                    >
                      {event.name}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--color-gold-dark)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '12px',
                      }}
                    >
                      {event.subtitle}
                    </p>

                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9rem',
                        color: 'var(--text-muted-on-light)',
                        lineHeight: 1.55,
                        marginBottom: '16px',
                      }}
                    >
                      {event.description}
                    </p>

                    {/* Scratch to Reveal Action Badge */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#FFFDF9',
                        padding: '7px 16px',
                        borderRadius: '20px',
                        border: '1.5px solid var(--color-gold)',
                        boxShadow: '0 4px 12px rgba(201, 164, 92, 0.2)',
                      }}
                    >
                      <Sparkles size={14} color="var(--color-crimson)" />
                      <span
                        style={{
                          fontFamily: 'var(--font-serif-royal)',
                          fontSize: '0.74rem',
                          letterSpacing: '0.12em',
                          fontWeight: 700,
                          color: 'var(--color-maroon-dark)',
                        }}
                      >
                        SCRATCH TO REVEAL DETAILS
                      </span>
                      <Eye size={13} color="var(--color-gold-dark)" />
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div
                    onClick={() => setSelectedEvent(event)}
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      backgroundColor: '#561525',
                      border: '2px solid var(--color-gold-bright)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 20px rgba(201, 164, 92, 0.55)',
                      zIndex: 5,
                      margin: '20px',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    title="Tap to unlock event details"
                  >
                    {getIcon(event.iconName, 'var(--color-gold-bright)')}
                  </div>

                  {/* Spacer for desktop layout balance */}
                  <div className="hidden md:block" style={{ width: '100%', maxWidth: '400px' }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Scratch-to-Reveal Poster Modal */}
        <CelebrationEventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
