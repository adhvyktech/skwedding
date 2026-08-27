import React from 'react';
import type { CelebrationEvent } from '../../config/wedding';
import { ScratchCard } from '../ScratchCard/ScratchCard';
import { X, Calendar, Clock, MapPin, Sparkles, Heart } from 'lucide-react';

interface CelebrationEventModalProps {
  event: CelebrationEvent | null;
  onClose: () => void;
}

export const CelebrationEventModal: React.FC<CelebrationEventModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(32, 5, 13, 0.94)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeInScale 0.3s ease',
      }}
      onClick={onClose}
    >
      {/* Modal Card Wrapper with strict viewport containment (NO vertical scroll needed) */}
      <div
        style={{
          width: '100%',
          maxWidth: '740px',
          maxHeight: 'min(90vh, 520px)',
          position: 'relative',
          borderRadius: '32px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 30,
            background: 'rgba(59, 13, 24, 0.9)',
            border: '1.5px solid var(--color-gold)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-gold)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(59, 13, 24, 0.9)')}
          aria-label="Close Event Poster"
        >
          <X size={18} />
        </button>

        {/* Scratch to Reveal Wrapper */}
        <ScratchCard
          minHeight={380}
          title={`REVEAL ${event.name.toUpperCase()}`}
          subtitle="Tap or scratch anywhere to reveal event details"
          borderRadius={32}
        >
          {/* Revealed Miniature Wedding Poster with 2-Column Responsive Layout */}
          <div
            className="stationery-card gold-stationery-frame"
            style={{
              padding: 'clamp(20px, 3vw, 28px)',
              backgroundColor: '#FAF6EE',
              borderRadius: '32px',
              border: '2px solid var(--color-gold)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              maxHeight: 'min(90vh, 520px)',
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
          >
            {/* Top / Main Content Area */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: event.image ? 'repeat(auto-fit, minmax(220px, 1fr))' : '1fr',
                gap: '20px',
                alignItems: 'center',
                marginBottom: '12px',
              }}
            >
              {/* Left Column: Event Image with Arched Border */}
              {event.image && (
                <div
                  className="fine-art-photo-frame"
                  style={{
                    width: '100%',
                    height: '180px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: '2px solid var(--color-gold-border)',
                  }}
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '8px 12px',
                      background: 'linear-gradient(to top, rgba(42, 8, 17, 0.85) 0%, transparent 100%)',
                      color: '#FFFDF9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-serif-royal)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.12em',
                        color: 'var(--color-gold-light)',
                      }}
                    >
                      {event.badge}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif-royal)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--color-gold-bright)',
                      }}
                    >
                      {event.number}
                    </span>
                  </div>
                </div>
              )}

              {/* Right Column: Event Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif-display)',
                      fontSize: 'clamp(1.5rem, 2.5vw, 1.95rem)',
                      color: 'var(--color-maroon-dark)',
                      lineHeight: 1.15,
                      margin: 0,
                    }}
                  >
                    {event.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--color-gold-dark)',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      marginTop: '2px',
                    }}
                  >
                    {event.subtitle}
                  </p>
                </div>

                {/* Compact Schedule Info Box */}
                <div
                  style={{
                    backgroundColor: '#FFFDF9',
                    borderRadius: '16px',
                    border: '1px solid rgba(201, 164, 92, 0.35)',
                    padding: '10px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={15} color="var(--color-crimson)" />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-maroon-dark)' }}>
                      {event.dateDisplay}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={15} color="var(--color-forest)" />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-forest-rich)' }}>
                      {event.timeDisplay}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <MapPin size={15} color="var(--color-vermilion)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--text-primary-on-light)' }}>
                      <strong>{event.venueName}</strong> • {event.venueAddress}
                    </span>
                  </div>
                </div>

                {/* Short Story */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted-on-light)',
                    lineHeight: 1.45,
                    margin: 0,
                  }}
                >
                  {event.description}
                </p>
              </div>
            </div>

            {/* Bottom Celebration Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                paddingTop: '8px',
                borderTop: '1px dashed rgba(201, 164, 92, 0.35)',
              }}
            >
              <Sparkles size={13} color="var(--color-gold-bright)" />
              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  color: 'var(--color-crimson)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Sarvesh & Keerthana Wedding Celebration
              </span>
              <Heart size={13} fill="var(--color-crimson)" color="var(--color-crimson)" />
            </div>
          </div>
        </ScratchCard>
      </div>
    </div>
  );
};
