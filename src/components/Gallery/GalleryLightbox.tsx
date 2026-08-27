import React, { useEffect } from 'react';
import type { GalleryPhoto } from '../../config/wedding';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(32, 5, 13, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeInScale 0.3s ease',
      }}
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFFDF9',
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={16} fill="var(--color-gold-bright)" color="var(--color-gold-bright)" />
          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: '0.85rem',
              letterSpacing: '0.18em',
              color: 'var(--color-gold-light)',
            }}
          >
            MOMENT {currentIndex + 1} OF {photos.length}
          </span>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1.5px solid var(--color-gold)',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(201, 164, 92, 0.3)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)')}
          aria-label="Close Lightbox"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        style={{
          maxWidth: '90vw',
          maxHeight: '82vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="fine-art-photo-frame"
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            borderRadius: '28px',
            border: '3px solid var(--color-gold)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.7)',
            overflow: 'hidden',
            backgroundColor: '#FAF6EE',
          }}
        >
          <img
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            style={{
              maxHeight: '70vh',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Captions Beneath Image */}
        <div style={{ textAlign: 'center', marginTop: '16px', color: '#FFFDF9' }}>
          <h3
            style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: '1.55rem',
              color: 'var(--color-gold-bright)',
              marginBottom: '4px',
            }}
          >
            {currentPhoto.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.92rem',
              color: '#FAF6EE',
            }}
          >
            {currentPhoto.subtitle}
          </p>
        </div>
      </div>

      {/* Previous Photo Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        style={{
          position: 'absolute',
          left: '24px',
          background: 'rgba(59, 13, 24, 0.8)',
          border: '1.5px solid var(--color-gold)',
          borderRadius: '50%',
          width: '52px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-gold)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(59, 13, 24, 0.8)')}
        aria-label="Previous Photo"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Photo Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        style={{
          position: 'absolute',
          right: '24px',
          background: 'rgba(59, 13, 24, 0.8)',
          border: '1.5px solid var(--color-gold)',
          borderRadius: '50%',
          width: '52px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-gold)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(59, 13, 24, 0.8)')}
        aria-label="Next Photo"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
