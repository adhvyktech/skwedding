import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../config/wedding';
import { ScratchCard } from '../ScratchCard/ScratchCard';
import { SectionDivider } from '../SectionDivider/SectionDivider';
import { Sparkles, Calendar, RotateCcw } from 'lucide-react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

const STORAGE_SCRATCH_DATE_KEY = 'sk_wedding_date_scratched_v2';

export const Countdown: React.FC = () => {
  const targetDate = new Date(weddingConfig.countdown.targetDateIso).getTime();

  const [hasScratchedDate, setHasScratchedDate] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_SCRATCH_DATE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const calculateTime = (): TimeRemaining => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [time, setTime] = useState<TimeRemaining>(calculateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleDateRevealed = () => {
    setHasScratchedDate(true);
    try {
      localStorage.setItem(STORAGE_SCRATCH_DATE_KEY, 'true');
    } catch {
      // Ignore
    }
  };

  const handleResetDateScratch = () => {
    setHasScratchedDate(false);
    try {
      localStorage.removeItem(STORAGE_SCRATCH_DATE_KEY);
    } catch {
      // Ignore
    }
  };

  const pad = (n: number) => n.toString().padStart(2, '0');

  const timeUnits = [
    { label: 'DAYS', value: pad(time.days) },
    { label: 'HOURS', value: pad(time.hours) },
    { label: 'MINUTES', value: pad(time.minutes) },
    { label: 'SECONDS', value: pad(time.seconds) },
  ];

  return (
    <section
      id="countdown"
      className="py-24 bg-personality-countdown relative overflow-hidden"
      style={{
        padding: 'clamp(64px, 8vw, 110px) 0',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div className="section-container" style={{ maxWidth: '960px' }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">THE SACRED COUNTDOWN</span>
          <h2 className="section-title">{weddingConfig.countdown.title}</h2>
          <p className="section-subtitle">
            Every passing moment brings us closer to the sacred Muhurtham in Hosur.
          </p>
        </div>

        {/* Scratch-to-Reveal Date Card vs Live Countdown Timer */}
        {!hasScratchedDate ? (
          <div
            style={{
              maxWidth: '680px',
              margin: '0 auto clamp(32px, 5vw, 48px)',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <ScratchCard
              minHeight={260}
              title="REVEAL THE AUSPICIOUS DATE"
              subtitle="Scratch 2-3 times to unlock the wedding date & live countdown"
              onReveal={handleDateRevealed}
              borderRadius={32}
            >
              {/* Card Revealed Content */}
              <div
                className="stationery-card gold-stationery-frame"
                style={{
                  padding: 'clamp(28px, 5vw, 44px) clamp(20px, 4vw, 36px)',
                  textAlign: 'center',
                  backgroundColor: '#FAF6EE',
                  borderRadius: '32px',
                  border: '2px solid var(--color-gold)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Calendar size={18} color="var(--color-crimson)" />
                  <span
                    style={{
                      fontFamily: 'var(--font-serif-royal)',
                      fontSize: '0.78rem',
                      letterSpacing: '0.2em',
                      color: 'var(--color-crimson)',
                      fontWeight: 700,
                    }}
                  >
                    THE SACRED DATE HAS BEEN CHOSEN
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
                    color: '#3B0D18',
                    lineHeight: 1.15,
                    margin: '6px 0 10px',
                  }}
                >
                  13 September 2026
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
                    color: 'var(--color-gold-dark)',
                    fontWeight: 600,
                  }}
                >
                  4:20 AM – 6:20 AM IST • Saraswathi Mahal, Hosur
                </p>
              </div>
            </ScratchCard>
          </div>
        ) : (
          /* Live Countdown Container: 2x2 on Mobile, 4-in-a-row on Tablet/Desktop */
          <div style={{ marginBottom: 'clamp(32px, 5vw, 48px)', width: '100%' }}>
            <div
              className="stationery-card gold-stationery-frame"
              style={{
                borderRadius: 'clamp(24px, 4vw, 36px)',
                border: '2px solid rgba(201, 164, 92, 0.65)',
                padding: 'clamp(24px, 4vw, 40px)',
                backgroundColor: '#FAF6EE',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(26, 5, 10, 0.6)',
              }}
            >
              {/* Revealed Date Tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FAF2EF',
                  border: '1.5px solid rgba(217, 131, 121, 0.4)',
                  padding: '6px 18px',
                  borderRadius: '30px',
                  marginBottom: '20px',
                }}
              >
                <Sparkles size={14} color="var(--color-crimson)" />
                <span
                  style={{
                    fontFamily: 'var(--font-serif-royal)',
                    fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                    letterSpacing: '0.14em',
                    color: 'var(--color-crimson)',
                    fontWeight: 700,
                  }}
                >
                  {weddingConfig.countdown.targetDisplay}
                </span>
              </div>

              {/* 2x2 Grid on Mobile, 4-col on Tablet/Desktop */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))',
                  gap: 'clamp(12px, 2.5vw, 20px)',
                  maxWidth: '720px',
                  margin: '0 auto 24px',
                }}
              >
                {timeUnits.map((unit, idx) => (
                  <div
                    key={idx}
                    className="hover-gold-glint"
                    style={{
                      backgroundColor: '#FFFDF9',
                      borderRadius: 'clamp(16px, 3vw, 24px)',
                      border: '1.5px solid rgba(201, 164, 92, 0.45)',
                      padding: 'clamp(16px, 3vw, 24px) clamp(10px, 2vw, 16px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <span
                      className="animate-number-roll"
                      style={{
                        fontFamily: 'var(--font-serif-display)',
                        fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
                        fontWeight: 600,
                        color: '#3B0D18',
                        lineHeight: 1,
                        marginBottom: '4px',
                      }}
                    >
                      {unit.value}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif-royal)',
                        fontSize: 'clamp(0.65rem, 1.1vw, 0.75rem)',
                        letterSpacing: '0.18em',
                        color: 'var(--color-gold-dark)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Replay Scratch Option */}
              <button
                onClick={handleResetDateScratch}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted-on-light)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-sans)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-crimson)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted-on-light)')}
              >
                <RotateCcw size={13} />
                <span>Replay Date Scratch Reveal</span>
              </button>
            </div>
          </div>
        )}

        <SectionDivider variant="gold" />
      </div>
    </section>
  );
};
