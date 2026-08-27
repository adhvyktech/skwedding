import React from 'react';
import { weddingConfig } from '../../config/wedding';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { MapPin, Navigation, Sparkles, Car } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const { venues, routeDistance } = weddingConfig.venueData;

  return (
    <section
      id="venues"
      className="py-24 bg-personality-venue relative overflow-hidden"
      style={{
        padding: 'clamp(64px, 8vw, 110px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1160px' }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">DIRECTIONS & LOCATION</span>
          <h2 className="section-title">Ceremonial Venues & Travel</h2>
          <p className="section-subtitle">
            Find directions to Saraswathi Mahal in Hosur and the Reception Venue in Coimbatore.
          </p>
        </div>

        {/* Route Travel Connection Bar */}
        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto clamp(24px, 4vw, 36px)',
            backgroundColor: '#FAF2EF',
            border: '1.5px solid rgba(217, 131, 121, 0.45)',
            borderRadius: '24px',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          <Car size={16} color="var(--color-crimson)" style={{ flexShrink: 0 }} />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.78rem, 1.3vw, 0.88rem)',
              color: '#3B0D18',
              fontWeight: 600,
            }}
          >
            {routeDistance}
          </span>
        </div>

        {/* 2 Venue Cards: Stacks 1-col on Mobile, 2-col on Desktop */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(24px, 4vw, 36px)',
            alignItems: 'stretch',
            marginBottom: 'clamp(32px, 5vw, 48px)',
            width: '100%',
          }}
        >
          {venues.map((venue, idx) => (
            <div
              key={idx}
              className="stationery-card gold-stationery-frame hover-gold-glint"
              style={{
                borderRadius: 'clamp(24px, 4vw, 36px)',
                border: '2px solid rgba(201, 164, 92, 0.65)',
                padding: 'clamp(24px, 4vw, 36px)',
                backgroundColor: '#FAF6EE',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 16px 45px rgba(26, 5, 10, 0.5)',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div>
                {/* Top City Badge & Tag */}
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
                      fontSize: '0.72rem',
                      letterSpacing: '0.14em',
                      color: idx === 0 ? 'var(--color-crimson)' : 'var(--color-forest-rich)',
                      backgroundColor: idx === 0 ? '#FAF0E6' : '#EAF3EE',
                      border: `1px solid ${idx === 0 ? 'rgba(140, 29, 47, 0.35)' : 'rgba(22, 60, 42, 0.35)'}`,
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {venue.tag}
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'var(--color-gold-dark)',
                    }}
                  >
                    {venue.city.toUpperCase()}
                  </span>
                </div>

                {/* Venue Name */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                    color: '#3B0D18',
                    lineHeight: 1.2,
                    marginBottom: '8px',
                  }}
                >
                  {venue.name}
                </h3>

                {/* Full Address */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    marginBottom: '18px',
                  }}
                >
                  <MapPin size={16} color="var(--color-crimson)" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      color: 'var(--text-muted-on-light)',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {venue.address}
                  </p>
                </div>

                {/* Events Hosted List */}
                <div
                  style={{
                    backgroundColor: '#FFFDF9',
                    borderRadius: '16px',
                    border: '1px solid rgba(201, 164, 92, 0.35)',
                    padding: '14px',
                    marginBottom: '20px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.14em',
                      color: 'var(--color-gold-dark)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    EVENTS AT THIS VENUE:
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {venue.eventsHosted.map((ev, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={12} color="var(--color-crimson)" />
                        <span
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.84rem',
                            fontWeight: 600,
                            color: '#3B0D18',
                          }}
                        >
                          {ev}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <a
                href={venue.mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-maroon"
                style={{
                  width: '100%',
                  height: '48px',
                  fontSize: '0.86rem',
                }}
              >
                <Navigation size={16} />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          ))}
        </div>

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
