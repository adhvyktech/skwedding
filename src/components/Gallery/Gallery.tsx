import React, { useState } from 'react';
import { weddingConfig } from '../../config/wedding';
import { GalleryLightbox } from './GalleryLightbox';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { Eye, Sparkles } from 'lucide-react';

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
        padding: '110px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">MOMENTS IN TIME</span>
          <h2 className="section-title">Cherished Memories & Romance</h2>
          <p className="section-subtitle">
            A visual anthology celebrating laughter, quiet glances, and the sacred magic of our shared journey.
          </p>
        </div>

        {/* Asymmetric Magazine Gallery Grid with Living Motion */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {/* Row 1: Item 1 (Spans 7 cols on desktop) */}
          <div
            className="col-span-12 lg:col-span-7 fine-art-photo-frame gold-stationery-frame cursor-pointer group hover-gold-glint"
            data-cursor="view"
            onClick={() => handleOpen(0)}
            style={{
              gridColumn: 'span 12',
              borderRadius: '32px',
              border: '2px solid rgba(201, 164, 92, 0.6)',
              boxShadow: '0 20px 50px rgba(26, 5, 10, 0.6)',
              aspectRatio: '16 / 11',
              maxHeight: '520px',
              position: 'relative',
              cursor: 'pointer',
              backgroundColor: '#FAF6EE',
            }}
          >
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="animate-image-breath"
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
                padding: '24px',
                background: 'linear-gradient(to top, rgba(42, 8, 17, 0.92) 0%, transparent 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.5rem', color: '#FFFDF9', margin: 0 }}>
                  {photos[0].title}
                </h4>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'var(--color-gold-light)', margin: '2px 0 0' }}>
                  {photos[0].subtitle}
                </p>
              </div>
              <div
                style={{
                  background: 'rgba(59, 13, 24, 0.9)',
                  border: '1.5px solid var(--color-gold)',
                  borderRadius: '30px',
                  padding: '6px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-gold-light)',
                }}
              >
                <Eye size={14} />
                <span style={{ fontFamily: 'var(--font-serif-royal)', fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 600 }}>
                  VIEW
                </span>
              </div>
            </div>
          </div>

          {/* Row 1: Item 2 (Spans 5 cols on desktop, Floating Motion) */}
          <div
            className="col-span-12 lg:col-span-5 fine-art-photo-frame gold-stationery-frame cursor-pointer group hover-gold-glint animate-float-subtle"
            data-cursor="view"
            onClick={() => handleOpen(1)}
            style={{
              gridColumn: 'span 12',
              borderRadius: '32px',
              border: '2px solid rgba(201, 164, 92, 0.6)',
              boxShadow: '0 20px 50px rgba(26, 5, 10, 0.6)',
              aspectRatio: '4 / 5',
              maxHeight: '520px',
              position: 'relative',
              cursor: 'pointer',
              backgroundColor: '#FAF6EE',
            }}
          >
            <img
              src={photos[1].src}
              alt={photos[1].alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 15%',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                background: 'linear-gradient(to top, rgba(59, 13, 24, 0.92) 0%, transparent 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.5rem', color: '#FFFDF9', margin: 0 }}>
                  {photos[1].title}
                </h4>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'var(--color-gold-light)', margin: '2px 0 0' }}>
                  {photos[1].subtitle}
                </p>
              </div>
              <div
                style={{
                  background: 'rgba(59, 13, 24, 0.9)',
                  border: '1.5px solid var(--color-gold)',
                  borderRadius: '30px',
                  padding: '6px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--color-gold-light)',
                }}
              >
                <Eye size={14} />
                <span style={{ fontFamily: 'var(--font-serif-royal)', fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 600 }}>
                  VIEW
                </span>
              </div>
            </div>
          </div>

          {/* Subsequent 8 Fine-Art Photographs (Each spans 4 columns / 3 per row on desktop) */}
          {photos.slice(2).map((photo, idx) => (
            <div
              key={photo.id}
              className="col-span-12 md:col-span-6 lg:col-span-4 fine-art-photo-frame gold-stationery-frame cursor-pointer group hover-gold-glint"
              data-cursor="view"
              onClick={() => handleOpen(idx + 2)}
              style={{
                gridColumn: 'span 12',
                borderRadius: '26px',
                border: '1.5px solid rgba(201, 164, 92, 0.5)',
                boxShadow: '0 16px 40px rgba(26, 5, 10, 0.5)',
                aspectRatio: '3 / 4',
                maxHeight: '460px',
                position: 'relative',
                cursor: 'pointer',
                backgroundColor: '#FAF6EE',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.015)';
                e.currentTarget.style.borderColor = 'var(--color-gold-bright)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(201, 164, 92, 0.5)';
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
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
                  padding: '18px 20px',
                  background: 'linear-gradient(to top, rgba(42, 8, 17, 0.92) 0%, transparent 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '1.25rem', color: '#FFFDF9', margin: 0 }}>
                    {photo.title}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--color-gold-light)', margin: '2px 0 0' }}>
                    {photo.subtitle}
                  </p>
                </div>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(59, 13, 24, 0.85)',
                    border: '1px solid var(--color-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold-light)',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={15} />
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

      <style>{`
        @media (min-width: 768px) {
          #gallery .md\\:col-span-6 {
            grid-column: span 6 !important;
          }
        }
        @media (min-width: 1024px) {
          #gallery .lg\\:col-span-7 {
            grid-column: span 7 !important;
          }
          #gallery .lg\\:col-span-5 {
            grid-column: span 5 !important;
          }
          #gallery .lg\\:col-span-4 {
            grid-column: span 4 !important;
          }
        }
      `}</style>
    </section>
  );
};
