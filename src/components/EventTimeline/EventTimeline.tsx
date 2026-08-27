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
        padding: '110px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">CELEBRATION ITINERARY</span>
          <h2 className="section-title">Wedding Events & Celebrations</h2>
          <p className="section-subtitle">
            Three cherished gatherings across Hosur and Coimbatore to bless Sarvesh & Keerthana.
          </p>
        </div>

        {/* 3 Event Cards Grid (Equal Heights) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'stretch',
          }}
        >
          {weddingConfig.events.map((event, idx) => (
            <div key={event.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <EventCard event={event} index={idx} />
            </div>
          ))}
        </div>

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
