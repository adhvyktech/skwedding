import { useEffect } from 'react';
import { Navbar } from './components/Navigation/Navbar';
import { Hero } from './components/Hero/Hero';
import { CoupleSection } from './components/CoupleSection/CoupleSection';
import { Countdown } from './components/Countdown/Countdown';
import { CelebrationJourney } from './components/CelebrationJourney/CelebrationJourney';
import { EventTimeline } from './components/EventTimeline/EventTimeline';
import { FamilySection } from './components/FamilySection/FamilySection';
import { Gallery } from './components/Gallery/Gallery';
import { VenueSection } from './components/VenueSection/VenueSection';
import { RSVP } from './components/RSVP/RSVP';
import { Wishes } from './components/Wishes/Wishes';
import { Footer } from './components/Footer/Footer';
import { FloatingBotanicals } from './components/FloatingBotanicals/FloatingBotanicals';
import { GoldJigina } from './components/GoldJigina/GoldJigina';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { AudioControl } from './components/AudioControl/AudioControl';
import { ambientSound } from './utils/audio';

export function App() {
  // Autoplay music upon load or on first user interaction gesture
  useEffect(() => {
    // Attempt instant autoplay
    ambientSound.play();

    // Fallback on first user interaction to ensure 100% browser compatibility
    const startAudioOnInteraction = () => {
      if (!ambientSound.getIsPlaying()) {
        ambientSound.play();
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('pointerdown', startAudioOnInteraction);
      window.removeEventListener('touchstart', startAudioOnInteraction);
      window.removeEventListener('scroll', startAudioOnInteraction);
      window.removeEventListener('keydown', startAudioOnInteraction);
      window.removeEventListener('click', startAudioOnInteraction);
    };

    window.addEventListener('pointerdown', startAudioOnInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', startAudioOnInteraction, { once: true, passive: true });
    window.addEventListener('scroll', startAudioOnInteraction, { once: true, passive: true });
    window.addEventListener('keydown', startAudioOnInteraction, { once: true, passive: true });
    window.addEventListener('click', startAudioOnInteraction, { once: true, passive: true });

    return cleanup;
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      {/* Interactive Custom Cursor on Desktop */}
      <CustomCursor />

      {/* Subtle Golden Jigina / Metallic Foil Particle System */}
      <GoldJigina />

      {/* Ambient Floating Floral Botanical System */}
      <FloatingBotanicals />

      {/* Floating Audio Ambient Controller with Micro-Chimes */}
      <AudioControl />

      {/* Top Navbar */}
      <Navbar onNavClick={scrollToSection} />

      <main>
        {/* 1. Hero Section — Cinematic Opening */}
        <Hero
          onExploreClick={() => scrollToSection('celebrations')}
          onRsvpClick={() => scrollToSection('rsvp')}
        />

        {/* 2. Couple Section — Editorial Split & Harmony */}
        <CoupleSection />

        {/* 3. Sacred Muhurtham Countdown with Scratch Reveal */}
        <Countdown />

        {/* 4. The Celebration Journey — Auspicious Rituals & Scratch Posters */}
        <CelebrationJourney />

        {/* 5. The 3 Main Wedding Events & Itinerary */}
        <EventTimeline />

        {/* 6. Traditional Family Invitation & Compliments */}
        <FamilySection />

        {/* 7. Asymmetric Editorial Photo Gallery with Living Motion */}
        <Gallery />

        {/* 8. Venues & Celebration Route Map */}
        <VenueSection />

        {/* 9. Interactive RSVP Section */}
        <RSVP />

        {/* 10. Wishes & Guestbook Blessings */}
        <Wishes />
      </main>

      {/* 11. Twilight Closing Footer */}
      <Footer onScrollToTop={scrollToTop} />
    </div>
  );
}

export default App;
