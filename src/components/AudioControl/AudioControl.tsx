import React, { useState, useEffect } from 'react';
import { ambientSound } from '../../utils/audio';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, X } from 'lucide-react';

export const AudioControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(ambientSound.getIsPlaying());
  const [currentTrack, setCurrentTrack] = useState(ambientSound.getCurrentTrack());
  const [volume, setVolume] = useState(ambientSound.getVolume());
  const [isMuted, setIsMuted] = useState(ambientSound.getIsMuted());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = ambientSound.subscribe(() => {
      setIsPlaying(ambientSound.getIsPlaying());
      setCurrentTrack(ambientSound.getCurrentTrack());
      setVolume(ambientSound.getVolume());
      setIsMuted(ambientSound.getIsMuted());
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    ambientSound.toggle();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    ambientSound.nextTrack();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    ambientSound.prevTrack();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ambientSound.setVolume(val);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    ambientSound.toggleMute();
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'max(16px, env(safe-area-inset-bottom))',
        right: '16px',
        zIndex: 90,
        pointerEvents: 'auto',
      }}
    >
      {/* Expanded Control Panel */}
      {isExpanded ? (
        <div
          style={{
            backgroundColor: 'rgba(42, 8, 17, 0.96)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid var(--color-gold)',
            borderRadius: '24px',
            padding: '14px 18px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.65)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: 'min(290px, calc(100vw - 32px))',
            animation: 'fadeInScale 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            color: '#FFFDF9',
            boxSizing: 'border-box',
          }}
        >
          {/* Top Row: Track Info & Close Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(201, 164, 92, 0.2)',
                  border: '1px solid var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold-bright)',
                  flexShrink: 0,
                }}
              >
                <Music size={13} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#FFFDF9',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {currentTrack.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.7rem',
                    color: 'var(--color-gold-light)',
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {currentTrack.artist}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-gold-light)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Collapse Player"
            >
              <X size={16} />
            </button>
          </div>

          {/* Center Controls: Prev, Play/Pause, Next */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <button
              onClick={handlePrev}
              style={{
                background: 'none',
                border: '1px solid rgba(201, 164, 92, 0.4)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold-light)',
                cursor: 'pointer',
              }}
              aria-label="Previous Track"
            >
              <SkipBack size={14} />
            </button>

            <button
              onClick={handleTogglePlay}
              style={{
                background: 'linear-gradient(135deg, var(--color-gold-bright) 0%, var(--color-gold) 100%)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2A0811',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(201, 164, 92, 0.4)',
              }}
              aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            >
              {isPlaying ? <Pause size={16} fill="#2A0811" /> : <Play size={16} fill="#2A0811" style={{ marginLeft: '2px' }} />}
            </button>

            <button
              onClick={handleNext}
              style={{
                background: 'none',
                border: '1px solid rgba(201, 164, 92, 0.4)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold-light)',
                cursor: 'pointer',
              }}
              aria-label="Next Track"
            >
              <SkipForward size={14} />
            </button>
          </div>

          {/* Bottom Row: Volume Slider & Mute Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px', borderTop: '1px solid rgba(201, 164, 92, 0.2)' }}>
            <button
              onClick={handleToggleMute}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-gold-light)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              style={{
                width: '100%',
                height: '4px',
                borderRadius: '2px',
                accentColor: 'var(--color-gold-bright)',
                cursor: 'pointer',
              }}
              aria-label="Volume Slider"
            />
          </div>
        </div>
      ) : (
        /* Compact Floating Pill Button */
        <button
          onClick={() => {
            if (!isPlaying) {
              ambientSound.toggle();
            } else {
              setIsExpanded(true);
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '42px',
            padding: '0 16px',
            borderRadius: '30px',
            backgroundColor: isPlaying ? 'rgba(86, 21, 37, 0.95)' : 'rgba(59, 13, 24, 0.9)',
            color: 'var(--color-gold-light)',
            border: '1.5px solid var(--color-gold)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          aria-label={isPlaying ? 'Music Options' : 'Play Music'}
        >
          {isPlaying ? (
            <>
              {/* Equalizer Bars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2.5px', height: '14px' }}>
                <div
                  style={{
                    width: '2.5px',
                    height: '100%',
                    backgroundColor: 'var(--color-gold-bright)',
                    borderRadius: '2px',
                    animation: 'pulseGoldGlow 0.8s ease-in-out infinite alternate',
                  }}
                />
                <div
                  style={{
                    width: '2.5px',
                    height: '60%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '2px',
                    animation: 'pulseGoldGlow 1.2s ease-in-out infinite alternate 0.2s',
                  }}
                />
                <div
                  style={{
                    width: '2.5px',
                    height: '80%',
                    backgroundColor: 'var(--color-gold-bright)',
                    borderRadius: '2px',
                    animation: 'pulseGoldGlow 1s ease-in-out infinite alternate 0.4s',
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  color: 'var(--color-gold-light)',
                }}
              >
                ♫ MUSIC
              </span>
            </>
          ) : (
            <>
              <Music size={14} color="var(--color-gold-light)" />
              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  color: 'var(--color-gold-light)',
                }}
              >
                ♫ MUSIC
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
