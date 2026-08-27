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
        padding: '12px',
        animation: 'fadeInScale 0.3s ease',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      {/* Modal Card Wrapper with strict viewport containment */}
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: 'min(90vh, 560px)',
          position: 'relative',
          borderRadius: 'clamp(20px, 4vw, 32px)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
          margin: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 30,
            background: 'rgba(59, 13, 24, 0.92)',
            border: '1.5px solid var(--color-gold)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          }}
          aria-label="Close Event Poster"
        >
          <X size={16} />
        </button>

        {/* Scratch to Reveal Wrapper */}
        <ScratchCard
          minHeight={340}
          title={`REVEAL ${event.name.toUpperCase()}`}
          subtitle="Scratch 2-3 times to unlock event poster"
          borderRadius={28}
        >
          {/* Revealed Miniature Wedding Poster */}
          <div
            className="stationery-card gold-stationery-frame"
            style={{
              padding: 'clamp(16px, 3.5vw, 28px)',
              backgroundColor: '#FAF6EE',
              borderRadius: 'clamp(20px, 4vw, 28px)',
              border: '2px solid var(--color-gold)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              maxHeight: 'min(90vh, 560px)',
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
          >
            {/* Top / Main Content Area */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: event.image ? 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))' : '1fr',
                gap: '16px',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              {/* Event Image */}
              {event.image && (
                <div
                  className="fine-art-photo-frame"
                  style={{
                    width: '100%',
                    height: '160px',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1.5px solid var(--color-gold-border)',
                  }}
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '6px 10px',
                      background: 'linear-gradient(to top, rgba(42, 8, 17, 0.88) 0%, transparent 100%)',
                      color: '#FFFDF9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-serif-royal)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.12em',
                        color: 'var(--color-gold-light)',
                      }}
                    >
                      {event.badge}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif-royal)',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: 'var(--color-gold-bright)',
                      }}
                    >
                      {event.number}
                    </span>
                  </div>
                </div>
              )}

              {/* Event Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif-display)',
                      fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
                      color: '#3B0D18',
                      lineHeight: 1.15,
                      margin: 0,
                    }}
                  >
                    {event.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.78rem',
                      color: 'var(--color-gold-dark)',
                      fontWeight: 600,
                      marginTop: '2px',
                    }}
                  >
                    {event.subtitle}
                  </p>
                </div>

                {/* Schedule Info Box */}
                <div
                  style={{
                    backgroundColor: '#FFFDF9',
                    borderRadius: '14px',
                    border: '1px solid rgba(201, 164, 92, 0.35)',
                    padding: '8px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={13} color="var(--color-crimson)" style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, color: '#3B0D18' }}>
                      {event.dateDisplay}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={13} color="var(--color-forest)" style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-forest-rich)' }}>
                      {event.timeDisplay}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <MapPin size={13} color="var(--color-vermilion)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--text-primary-on-light)' }}>
                      <strong>{event.venueName}</strong> • {event.venueAddress}
                    </span>
                  </div>
                </div>

                {/* Short Story */}
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted-on-light)',
                    lineHeight: 1.4,
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
                gap: '6px',
                paddingTop: '6px',
                borderTop: '1px dashed rgba(201, 164, 92, 0.35)',
              }}
            >
              <Sparkles size={12} color="var(--color-gold-bright)" />
              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  color: 'var(--color-crimson)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Sarvesh & Keerthana Wedding
              </span>
              <Heart size={12} fill="var(--color-crimson)" color="var(--color-crimson)" />
            </div>
          </div>
        </ScratchCard>
      </div>
    </div>
  );
};
