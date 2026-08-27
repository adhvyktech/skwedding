import React, { useState } from 'react';
import type { WeddingEvent } from '../../config/wedding';
import { createGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import { Calendar, MapPin, Clock, Sparkles, ExternalLink, Download, Bell, Flame, PartyPopper } from 'lucide-react';

interface EventCardProps {
  event: WeddingEvent;
  index: number;
}

export const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);

  const getEventIcon = () => {
    switch (event.type) {
      case 'reception_hosur':
        return (
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FAF0E6 0%, #F5EDE0 100%)',
              border: '2px solid #C9A45C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8C1D2F',
              boxShadow: '0 4px 15px rgba(201, 164, 92, 0.25)',
              flexShrink: 0,
            }}
          >
            <Bell size={24} />
          </div>
        );
      case 'wedding_ceremony':
        return (
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FDF3E5 0%, #F5DFBC 100%)',
              border: '2px solid #E1C98A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#561525',
              boxShadow: '0 0 20px rgba(201, 164, 92, 0.5)',
              flexShrink: 0,
            }}
          >
            <Flame size={26} />
          </div>
        );
      case 'reception_coimbatore':
      default:
        return (
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #EAF3EE 0%, #D8E8DF 100%)',
              border: '2px solid #3E7D5A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#163C2A',
              boxShadow: '0 4px 15px rgba(62, 125, 90, 0.25)',
              flexShrink: 0,
            }}
          >
            <PartyPopper size={24} />
          </div>
        );
    }
  };

  return (
    <div
      className="stationery-card gold-stationery-frame"
      style={{
        borderRadius: 'clamp(24px, 4vw, 32px)',
        padding: 'clamp(24px, 4vw, 36px) clamp(20px, 3.5vw, 30px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative',
        backgroundColor: '#FAF6EE',
        border: '1.5px solid rgba(201, 164, 92, 0.55)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Content Area */}
      <div>
        {/* Number & Icon Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-serif-royal)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--color-gold-dark)',
                display: 'block',
                lineHeight: 1,
                marginBottom: '4px',
              }}
            >
              0{index + 1}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif-royal)',
                fontSize: '0.7rem',
                letterSpacing: '0.14em',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: event.colorScheme.accent,
                background: event.colorScheme.tagBg,
                padding: '4px 12px',
                borderRadius: '16px',
                border: `1px solid ${event.colorScheme.border}`,
                display: 'inline-block',
              }}
            >
              {event.badge}
            </span>
          </div>
          {getEventIcon()}
        </div>

        {/* Event Title & Subtitle */}
        <h3
          style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
            color: '#3B0D18',
            lineHeight: 1.15,
            marginBottom: '6px',
          }}
        >
          {event.title}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.84rem',
            fontWeight: 600,
            color: 'var(--color-gold-dark)',
            letterSpacing: '0.04em',
            marginBottom: '18px',
          }}
        >
          {event.subtitle}
        </p>

        {/* Date, Time & Venue Highlight Box */}
        <div
          style={{
            backgroundColor: '#FFFDF9',
            border: '1px solid rgba(201, 164, 92, 0.35)',
            borderRadius: '18px',
            padding: '16px',
            marginBottom: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={16} color="var(--color-crimson)" style={{ flexShrink: 0 }} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.92rem',
                fontWeight: 600,
                color: '#3B0D18',
              }}
            >
              {event.dateDisplay}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="var(--color-forest)" style={{ flexShrink: 0 }} />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: 'var(--color-forest-rich)',
                fontWeight: 600,
              }}
            >
              {event.timeDisplay}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <MapPin size={16} color="var(--color-vermilion)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#3B0D18',
                  display: 'block',
                }}
              >
                {event.venueName}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted-on-light)',
                }}
              >
                {event.venueAddress}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.86rem',
            color: 'var(--text-muted-on-light)',
            lineHeight: 1.55,
            marginBottom: '24px',
          }}
        >
          {event.description}
        </p>
      </div>

      {/* Bottom Button Group */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto', width: '100%' }}>
        {/* Add to Calendar Dropdown */}
        <div style={{ position: 'relative', width: '100%' }}>
          <button
            onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
            className="btn-secondary"
            style={{
              width: '100%',
              backgroundColor: 'rgba(59, 13, 24, 0.08)',
              color: '#3B0D18',
              borderColor: 'var(--color-gold)',
              justifyContent: 'space-between',
              height: '46px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={15} color="var(--color-crimson)" />
              <span>Add to Calendar</span>
            </div>
            <Sparkles size={14} color="var(--color-gold-dark)" />
          </button>

          {calendarMenuOpen && (
            <div
              style={{
                position: 'absolute',
                bottom: '110%',
                left: 0,
                right: 0,
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                boxShadow: '0 15px 35px rgba(42, 8, 17, 0.3)',
                border: '1.5px solid var(--color-gold)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: 30,
              }}
            >
              <a
                href={createGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setCalendarMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: '#3B0D18',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                }}
              >
                <ExternalLink size={14} color="var(--color-forest)" />
                <span>Google Calendar</span>
              </a>

              <button
                onClick={() => {
                  downloadIcsFile(event);
                  setCalendarMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'none',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: '#3B0D18',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                }}
              >
                <Download size={14} color="var(--color-crimson)" />
                <span>Apple / Outlook (.ics file)</span>
              </button>
            </div>
          )}
        </div>

        {/* View Location on Google Maps */}
        <a
          href={event.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-maroon"
          style={{
            width: '100%',
            height: '46px',
            fontSize: '0.84rem',
          }}
        >
          <MapPin size={15} />
          <span>View Location on Maps</span>
        </a>
      </div>
    </div>
  );
};
