import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../config/wedding';
import { ScratchCard } from '../ScratchCard/ScratchCard';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  const [hasRevealedDate, setHasRevealedDate] = useState<boolean>(() => {
    try {
      return localStorage.getItem('wedding_date_revealed') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(weddingConfig.countdown.targetDateIso).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isComplete: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDateReveal = () => {
    try {
      localStorage.setItem('wedding_date_revealed', 'true');
    } catch {
      // Ignore
    }
    setHasRevealedDate(true);
  };

  const handleReplayReveal = () => {
    try {
      localStorage.removeItem('wedding_date_revealed');
    } catch {
      // Ignore
    }
    setHasRevealedDate(false);
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const timeUnits = [
    { label: 'DAYS', value: formatNumber(timeLeft.days) },
    { label: 'HOURS', value: formatNumber(timeLeft.hours) },
    { label: 'MINUTES', value: formatNumber(timeLeft.minutes) },
    { label: 'SECONDS', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <section
      id="countdown"
      className="py-24 bg-personality-countdown relative overflow-hidden text-center select-none"
      style={{
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="section-container relative z-10" style={{ maxWidth: '1080px', margin: '0 auto' }}>
        {/* Outer Grand Invitation Panel Card */}
        <div
          className="animate-shadow-breath"
          style={{
            backgroundColor: 'rgba(59, 13, 24, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid var(--color-gold)',
            borderRadius: '40px',
            padding: 'clamp(36px, 6vw, 64px) clamp(24px, 4vw, 48px)',
            boxShadow: '0 25px 60px rgba(26, 5, 10, 0.6)',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '36px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(201, 164, 92, 0.18)',
                padding: '7px 20px',
                borderRadius: '30px',
                border: '1.5px solid var(--color-gold)',
                marginBottom: '16px',
              }}
            >
              <Sparkles size={14} color="var(--color-gold-bright)" />
              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.2em',
                  color: 'var(--color-gold-light)',
                  textTransform: 'uppercase',
                }}
              >
                AUSPICIOUS MUHURTHAM COUNTDOWN
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                fontWeight: 400,
                color: '#FFFDF9',
                lineHeight: 1.2,
                marginBottom: '10px',
              }}
            >
              {weddingConfig.countdown.title}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: 'var(--color-gold-light)',
                letterSpacing: '0.08em',
              }}
            >
              {weddingConfig.countdown.subtitle}
            </p>
          </div>

          {/* Date Scratch Reveal Stage OR Live Counter */}
          {!hasRevealedDate ? (
            <div style={{ maxWidth: '640px', margin: '0 auto 36px' }}>
              <ScratchCard
                minHeight={260}
                title="A SACRED DATE HAS BEEN CHOSEN"
                subtitle="Scratch to reveal the auspicious Muhurtham date & time"
                borderRadius={28}
                onReveal={handleDateReveal}
              >
                <div
                  style={{
                    backgroundColor: '#FAF6EE',
                    borderRadius: '28px',
                    border: '2px solid var(--color-gold)',
                    padding: '36px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.2em',
                      color: 'var(--color-crimson)',
                      fontWeight: 700,
                    }}
                  >
                    THE AUSPICIOUS MUHURTHAM
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif-display)',
                      fontSize: '2.6rem',
                      color: 'var(--color-maroon-dark)',
                      lineHeight: 1.1,
                      margin: 0,
                    }}
                  >
                    13 September 2026
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: 'var(--color-forest-rich)',
                    }}
                  >
                    4:20 AM – 6:20 AM (Brahma Muhurtham) • Saraswathi Mahal, Hosur
                  </p>
                </div>
              </ScratchCard>
            </div>
          ) : (
            <>
              {/* 4 Time Digit Cards (Warm Ivory on Maroon) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '20px',
                  maxWidth: '820px',
                  margin: '0 auto 32px',
                }}
              >
                {timeUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="stationery-card animate-breathe"
                    style={{
                      backgroundColor: '#FAF6EE',
                      border: '1.5px solid var(--color-gold)',
                      borderRadius: '24px',
                      padding: '26px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = 'var(--color-gold-bright)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'var(--color-gold)';
                    }}
                  >
                    <div
                      key={unit.value}
                      className="animate-number-roll"
                      style={{
                        fontFamily: 'var(--font-serif-display)',
                        fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
                        fontWeight: 600,
                        lineHeight: 1,
                        color: 'var(--color-maroon-dark)',
                        marginBottom: '8px',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {unit.value}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif-royal)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.22em',
                        color: 'var(--color-crimson)',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Replay Reveal Option */}
              <div style={{ marginBottom: '24px' }}>
                <button
                  onClick={handleReplayReveal}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-gold-light)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    opacity: 0.8,
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
                >
                  <RotateCcw size={13} />
                  <span>Replay Date Scratch Reveal</span>
                </button>
              </div>
            </>
          )}

          {/* Auspicious Blessing Quote */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', opacity: 0.95 }}>
            <Heart size={15} color="var(--color-gold-bright)" fill="var(--color-gold-bright)" />
            <span
              style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: '1.1rem',
                fontStyle: 'italic',
                color: '#FFF9F0',
              }}
            >
              "Every moment brings us closer to a lifetime of love and shared happiness."
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
