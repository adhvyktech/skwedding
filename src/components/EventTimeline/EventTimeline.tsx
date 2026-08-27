import React from 'react';
import { weddingConfig } from '../../config/wedding';
import { EventCard } from './EventCard';
import { SectionDivider } from '../SectionDivider/SectionDivider';

export const EventTimeline: React.FC = () => {
  return (
    <section
      id="events"
      className="py-24 bg-personality-events relative overflow-hidden"
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
          <span className="section-eyebrow">CELEBRATION ITINERARY</span>
          <h2 className="section-title">Wedding Events & Celebrations</h2>
          <p className="section-subtitle">
            Three cherished gatherings across Hosur and Coimbatore to bless Sarvesh & Keerthana.
          </p>
        </div>

        {/* 3 Event Cards Grid (1-Col on Mobile, 3-Col on Desktop) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(24px, 4vw, 36px)',
            alignItems: 'stretch',
            width: '100%',
          }}
        >
          {weddingConfig.events.map((event, idx) => (
            <div key={event.id} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
              <EventCard event={event} index={idx} />
            </div>
          ))}
        </div>

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
