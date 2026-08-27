import React, { useEffect, useRef } from 'react';
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
  const touchStartX = useRef<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (diffX > 50) {
      onPrev();
    } else if (diffX < -50) {
      onNext();
    }
    touchStartX.current = null;
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(26, 5, 10, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(14px, 2.5vw, 24px)',
        animation: 'fadeInScale 0.3s ease',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#FFFDF9',
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={15} fill="var(--color-gold-bright)" color="var(--color-gold-bright)" />
          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)',
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
            background: 'rgba(59, 13, 24, 0.9)',
            border: '1.5px solid var(--color-gold)',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
          }}
          aria-label="Close Lightbox"
        >
          <X size={18} />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '68vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          margin: 'auto 0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="fine-art-photo-frame"
          style={{
            maxWidth: '100%',
            maxHeight: '64vh',
            borderRadius: 'clamp(18px, 3vw, 28px)',
            border: '2.5px solid var(--color-gold)',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.75)',
            overflow: 'hidden',
            backgroundColor: '#FAF6EE',
          }}
        >
          <img
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            style={{
              maxHeight: '64vh',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Bottom Info & Navigation Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '640px',
          textAlign: 'center',
          color: '#FFFDF9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        <button
          onClick={onPrev}
          style={{
            background: 'rgba(59, 13, 24, 0.85)',
            border: '1.5px solid var(--color-gold)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          aria-label="Previous Photo"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Titles */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: 'var(--font-serif-display)',
              fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
              color: 'var(--color-gold-bright)',
              margin: '0 0 2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {currentPhoto.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              color: '#FAF6EE',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {currentPhoto.subtitle}
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          style={{
            background: 'rgba(59, 13, 24, 0.85)',
            border: '1.5px solid var(--color-gold)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          aria-label="Next Photo"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};
