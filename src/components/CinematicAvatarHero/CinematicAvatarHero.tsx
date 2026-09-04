import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { framePreloader } from '../../utils/framePreloader';
import { FrameSequenceCanvas } from './FrameSequenceCanvas';
import { ParticleAtmosphere } from './ParticleAtmosphere';
import { HeroTextSequence } from './HeroTextSequence';
import { HeroLoader } from './HeroLoader';
import { HeroFallback } from './HeroFallback';
import './cinematicHero.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

interface CinematicAvatarHeroProps {
  onScrollToInvitation?: () => void;
}

export const CinematicAvatarHero: React.FC<CinematicAvatarHeroProps> = ({
  onScrollToInvitation,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedWrapperRef = useRef<HTMLDivElement | null>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [isCriticalLoaded, setIsCriticalLoaded] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [preloadProgress, setPreloadProgress] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  // Listen to reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsCriticalLoaded(true);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Preload frames progressively
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isMounted = true;

    framePreloader.preload({
      totalFrames: TOTAL_FRAMES,
      criticalThreshold: 20,
      onProgress: (progress) => {
        if (isMounted) {
          setPreloadProgress(progress);
        }
      },
      onCriticalReady: () => {
        if (isMounted) {
          setIsCriticalLoaded(true);
        }
      },
      onError: () => {
        if (isMounted) {
          // If critical preload fails completely, fall back gracefully
          if (!framePreloader.getLoadedFrames().some((f) => f !== null)) {
            setHasError(true);
          }
        }
      },
    });

    // Fallback timer: ensure loader disappears after 2.5s maximum even on very slow networks
    const fallbackTimer = setTimeout(() => {
      if (isMounted && !isCriticalLoaded) {
        setIsCriticalLoaded(true);
      }
    }, 2500);

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
    };
  }, [prefersReducedMotion, isCriticalLoaded]);

  // Set up GSAP ScrollTrigger pinning and frame synchronization
  useEffect(() => {
    if (prefersReducedMotion || hasError) return;

    const container = containerRef.current;
    const pinnedWrapper = pinnedWrapperRef.current;
    if (!container || !pinnedWrapper) return;

    // Refresh ScrollTrigger once DOM is ready
    ScrollTrigger.refresh();

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=260% top', // Pinned distance (~2.6 screen heights for natural rotation pacing)
      pin: pinnedWrapper,
      pinSpacing: true,
      scrub: 0.6, // Silky smooth scrubbing
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));
        setScrollProgress(progress);

        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
        );
        setCurrentFrameIndex(targetFrame);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [prefersReducedMotion, hasError, isCriticalLoaded]);

  // Smooth scroll past the pinned hero directly into the wedding invitation
  const handleScrollToInvitation = useCallback(() => {
    if (onScrollToInvitation) {
      onScrollToInvitation();
      return;
    }

    const container = containerRef.current;
    if (container) {
      const containerBottom = container.offsetTop + container.offsetHeight;
      window.scrollTo({
        top: containerBottom,
        behavior: 'smooth',
      });
    } else {
      const el = document.getElementById('wedding-invitation-start') || document.getElementById('hero');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [onScrollToInvitation]);

  // If user prefers reduced motion or error occurred, show luxury static fallback
  if (prefersReducedMotion || hasError) {
    return (
      <HeroFallback
        onExploreClick={handleScrollToInvitation}
        reason={prefersReducedMotion ? 'reduced-motion' : 'error'}
      />
    );
  }

  // Calculate dynamic background color transition:
  // 0.0 -> pure black rgb(3, 1, 3)
  // 0.6 -> dark wine rgb(20, 4, 8)
  // 1.0 -> wedding deep burgundy rgb(42, 8, 17) (#2A0811)
  const bgR = Math.round(3 + scrollProgress * (42 - 3));
  const bgG = Math.round(1 + scrollProgress * (8 - 1));
  const bgB = Math.round(3 + scrollProgress * (17 - 3));
  const dynamicBgColor = `rgb(${bgR}, ${bgG}, ${bgB})`;

  return (
    <section
      ref={containerRef}
      id="cinematic-hero"
      className="cinematic-hero-root"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: dynamicBgColor,
      }}
    >
      {/* Minimal Luxury Preloader */}
      <HeroLoader progress={preloadProgress} isVisible={!isCriticalLoaded} />

      {/* Pinned Viewport Container */}
      <div
        ref={pinnedWrapperRef}
        className="cinematic-hero-pinned-wrapper"
        style={{
          backgroundColor: dynamicBgColor,
        }}
      >
        {/* Dynamic Atmospheric Warmth Gradient */}
        <div
          className="cinematic-hero-bg"
          style={{
            background: `radial-gradient(ellipse at center, rgba(86, 21, 37, ${
              0.1 + scrollProgress * 0.35
            }) 0%, ${dynamicBgColor} 80%)`,
          }}
        />

        {/* Golden Halo behind Couple */}
        <div
          className="cinematic-hero-halo"
          style={{
            opacity: 0.6 + scrollProgress * 0.4,
          }}
        />

        {/* Golden Ceremonial Particle System */}
        <ParticleAtmosphere progress={scrollProgress} opacity={isCriticalLoaded ? 1 : 0} />

        {/* 3D Couple Avatar Turntable Canvas */}
        <FrameSequenceCanvas
          currentFrameIndex={currentFrameIndex}
          totalFrames={TOTAL_FRAMES}
          opacity={isCriticalLoaded ? 1 : 0}
          scale={0.92}
        />

        {/* Soft Vignette Overlay */}
        <div className="cinematic-vignette" />

        {/* Scroll-Driven Typography Phase Sequence */}
        <HeroTextSequence
          progress={scrollProgress}
          onScrollToInvitation={handleScrollToInvitation}
        />
      </div>

      {/* Anchor marker indicating start of main wedding invitation */}
      <div id="wedding-invitation-start" style={{ position: 'relative', top: '-10px' }} />
    </section>
  );
};
