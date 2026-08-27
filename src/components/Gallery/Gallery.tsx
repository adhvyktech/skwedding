import React, { useState } from 'react';
import { weddingConfig } from '../../config/wedding';
import { GalleryLightbox } from './GalleryLightbox';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { Eye } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = weddingConfig.gallery;

  const handleOpen = (idx: number) => {
    setLightboxIndex(idx);
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : photos.length - 1));
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! < photos.length - 1 ? prev! + 1 : 0));
    }
  };

  return (
    <section
      id="gallery"
      className="py-24 bg-personality-gallery relative overflow-hidden"
      style={{
        padding: 'clamp(64px, 8vw, 110px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1280px' }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">MOMENTS IN TIME</span>
          <h2 className="section-title">Cherished Memories & Romance</h2>
          <p className="section-subtitle">
            A visual anthology celebrating laughter, quiet glances, and the sacred magic of our shared journey.
          </p>
        </div>

        {/* Responsive Magazine Gallery Grid (2-col on Mobile/Tablet, 3/4-col on Desktop) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(16px, 2.5vw, 28px)',
            alignItems: 'stretch',
            width: '100%',
          }}
        >
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              className="fine-art-photo-frame gold-stationery-frame cursor-pointer group hover-gold-glint"
              data-cursor="view"
              onClick={() => handleOpen(idx)}
              style={{
                borderRadius: 'clamp(20px, 3vw, 28px)',
                border: '1.5px solid rgba(201, 164, 92, 0.55)',
                boxShadow: '0 16px 40px rgba(26, 5, 10, 0.5)',
                aspectRatio: idx === 0 ? '4 / 5' : '3 / 4',
                maxHeight: '480px',
                position: 'relative',
                cursor: 'pointer',
                backgroundColor: '#FAF6EE',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                width: '100%',
                boxSizing: 'border-box',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--color-gold-bright)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(201, 164, 92, 0.55)';
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 'clamp(14px, 2vw, 20px)',
                  background: 'linear-gradient(to top, rgba(42, 8, 17, 0.92) 0%, transparent 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif-display)', fontSize: 'clamp(1.15rem, 2vw, 1.4rem)', color: '#FFFDF9', margin: 0 }}>
                    {photo.title}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--color-gold-light)', margin: '2px 0 0' }}>
                    {photo.subtitle}
                  </p>
                </div>
                <div
                  style={{
                    background: 'rgba(59, 13, 24, 0.9)',
                    border: '1px solid var(--color-gold)',
                    borderRadius: '20px',
                    padding: '4px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--color-gold-light)',
                    flexShrink: 0,
                  }}
                >
                  <Eye size={12} />
                  <span style={{ fontFamily: 'var(--font-serif-royal)', fontSize: '0.65rem', letterSpacing: '0.1em', fontWeight: 600 }}>
                    VIEW
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <GalleryLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
