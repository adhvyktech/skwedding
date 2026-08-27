import React from 'react';
import { weddingConfig } from '../../config/wedding';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { MapPin, Navigation, Compass, ExternalLink, Sparkles, Building2, Landmark } from 'lucide-react';

export const VenueSection: React.FC = () => {
  const { venues, routeDistance } = weddingConfig.venueData;

  return (
    <section
      id="venue"
      className="py-24 bg-personality-venue relative overflow-hidden"
      style={{
        padding: '110px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">DESTINATIONS & TRAVEL</span>
          <h2 className="section-title">The Wedding Venues</h2>
          <p className="section-subtitle">
            Guiding our esteemed family and friends to our celebration destinations in Hosur & Coimbatore.
          </p>
        </div>

        {/* Grand Travel Route & Venue Visual Container */}
        <div
          className="stationery-card gold-stationery-frame"
          style={{
            borderRadius: '36px',
            padding: 'clamp(28px, 4vw, 52px)',
            marginBottom: '48px',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#FAF6EE',
          }}
        >
          {/* Background Compass Watermark */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              opacity: 0.08,
              color: 'var(--color-maroon)',
            }}
          >
            <Compass size={180} />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '36px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Travel Route Bar */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                padding: '20px 26px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #FFFDF9 0%, #F5EDE0 100%)',
                border: '1.5px solid var(--color-gold)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-maroon-dark)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(59, 13, 24, 0.3)',
                  }}
                >
                  <Navigation size={20} />
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.14em',
                      color: 'var(--color-maroon-dark)',
                      fontWeight: 700,
                      display: 'block',
                    }}
                  >
                    CELEBRATION TRAIL
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      color: 'var(--text-muted-on-light)',
                    }}
                  >
                    Hosur (12-13 Sep) ➔ Coimbatore (15 Sep)
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  padding: '8px 18px',
                  borderRadius: '30px',
                  border: '1.5px solid var(--color-gold)',
                }}
              >
                <Sparkles size={15} color="var(--color-gold-dark)" />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: 'var(--color-forest)',
                  }}
                >
                  {routeDistance}
                </span>
              </div>
            </div>

            {/* Venues Grid (Equal Heights) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '30px',
                alignItems: 'stretch',
              }}
            >
              {venues.map((venue, idx) => (
                <div
                  key={venue.name}
                  style={{
                    backgroundColor: '#FFFDF9',
                    borderRadius: '26px',
                    border: '1.5px solid rgba(201, 164, 92, 0.45)',
                    padding: '32px 26px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.35s ease',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-gold)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201, 164, 92, 0.45)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div>
                    {/* Top Row Tag & City */}
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
                          fontSize: '0.75rem',
                          letterSpacing: '0.15em',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          color: idx === 0 ? 'var(--color-crimson)' : 'var(--color-forest)',
                          backgroundColor: idx === 0 ? '#FAF0E6' : '#EAF3EE',
                          padding: '5px 14px',
                          borderRadius: '16px',
                          border: `1px solid ${idx === 0 ? 'rgba(140, 29, 47, 0.2)' : 'rgba(30, 78, 55, 0.2)'}`,
                        }}
                      >
                        {venue.tag}
                      </span>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: '#FAF6EE',
                          border: '1.5px solid var(--color-gold)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-gold-dark)',
                        }}
                      >
                        {idx === 0 ? <Landmark size={20} /> : <Building2 size={20} />}
                      </div>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif-display)',
                        fontSize: '1.85rem',
                        color: 'var(--color-maroon-dark)',
                        lineHeight: 1.2,
                        marginBottom: '8px',
                      }}
                    >
                      {venue.name}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '18px' }}>
                      <MapPin size={18} color="var(--color-vermilion)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9rem',
                          color: 'var(--text-muted-on-light)',
                          lineHeight: 1.5,
                        }}
                      >
                        {venue.address}
                      </p>
                    </div>

                    {/* Events Hosted Pill */}
                    <div style={{ marginBottom: '28px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-serif-royal)',
                          fontSize: '0.74rem',
                          letterSpacing: '0.14em',
                          color: 'var(--color-maroon-dark)',
                          fontWeight: 700,
                          display: 'block',
                          marginBottom: '10px',
                        }}
                      >
                        EVENTS AT THIS VENUE:
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {venue.eventsHosted.map((ev) => (
                          <div
                            key={ev}
                            style={{
                              backgroundColor: '#FAF6EE',
                              padding: '8px 14px',
                              borderRadius: '10px',
                              border: '1px solid rgba(201, 164, 92, 0.3)',
                              fontSize: '0.85rem',
                              fontFamily: 'var(--font-sans)',
                              color: 'var(--color-forest-rich)',
                              fontWeight: 600,
                            }}
                          >
                            • {ev}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Open in Google Maps Button */}
                  <a
                    href={venue.mapsQuery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-maroon"
                    style={{
                      width: '100%',
                      height: '46px',
                      fontSize: '0.86rem',
                    }}
                  >
                    <ExternalLink size={15} />
                    <span>View Location on Maps</span>
                  </a>
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
