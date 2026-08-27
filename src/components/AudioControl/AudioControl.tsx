import React, { useState, useEffect } from 'react';
import { ambientSound } from '../../utils/audio';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';

export const AudioControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(ambientSound.getIsPlaying());
  const [currentTrack, setCurrentTrack] = useState(ambientSound.getCurrentTrack());
  const [currentTrackIndex, setCurrentTrackIndex] = useState(ambientSound.getCurrentTrackIndex());
  const [volume, setVolume] = useState(ambientSound.getVolume());
  const [isMuted, setIsMuted] = useState(ambientSound.getIsMuted());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const unsubscribe = ambientSound.subscribe(() => {
      setIsPlaying(ambientSound.getIsPlaying());
      setCurrentTrack(ambientSound.getCurrentTrack());
      setCurrentTrackIndex(ambientSound.getCurrentTrackIndex());
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
        bottom: '24px',
        right: '24px',
        zIndex: 50,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Expanded Control Panel on Hover / Active */}
      {isHovered ? (
        <div
          style={{
            backgroundColor: 'rgba(42, 8, 17, 0.96)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid var(--color-gold)',
            borderRadius: '28px',
            padding: '16px 20px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.65)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minWidth: '280px',
            maxWidth: '320px',
            animation: 'fadeInScale 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            color: '#FFFDF9',
          }}
        >
          {/* Top Row: Track Info & Index */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
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
                <Music size={14} />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif-display)',
                    fontSize: '1.05rem',
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
                    fontSize: '0.74rem',
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

            <span
              style={{
                fontFamily: 'var(--font-serif-royal)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                color: 'var(--color-gold-light)',
                backgroundColor: 'rgba(201, 164, 92, 0.15)',
                padding: '3px 8px',
                borderRadius: '12px',
                border: '1px solid rgba(201, 164, 92, 0.3)',
                flexShrink: 0,
              }}
            >
              {currentTrackIndex + 1} / 2
            </span>
          </div>

          {/* Center Controls: Prev, Play/Pause, Next */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
            <button
              onClick={handlePrev}
              style={{
                background: 'none',
                border: '1px solid rgba(201, 164, 92, 0.4)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold-light)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(201, 164, 92, 0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              aria-label="Previous Track"
            >
              <SkipBack size={15} />
            </button>

            <button
              onClick={handleTogglePlay}
              style={{
                background: 'linear-gradient(135deg, var(--color-gold-bright) 0%, var(--color-gold) 100%)',
                border: 'none',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2A0811',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(201, 164, 92, 0.4)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
            >
              {isPlaying ? <Pause size={18} fill="#2A0811" /> : <Play size={18} fill="#2A0811" style={{ marginLeft: '2px' }} />}
            </button>

            <button
              onClick={handleNext}
              style={{
                background: 'none',
                border: '1px solid rgba(201, 164, 92, 0.4)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold-light)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(201, 164, 92, 0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              aria-label="Next Track"
            >
              <SkipForward size={15} />
            </button>
          </div>

          {/* Bottom Row: Volume Slider & Mute Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '4px', borderTop: '1px solid rgba(201, 164, 92, 0.2)' }}>
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
              {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
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
        /* Compact Floating Pill Badge */
        <button
          onClick={handleTogglePlay}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            height: '46px',
            padding: '0 20px',
            borderRadius: '40px',
            backgroundColor: isPlaying ? 'rgba(86, 21, 37, 0.95)' : 'rgba(59, 13, 24, 0.9)',
            color: 'var(--color-gold-light)',
            border: '1.5px solid var(--color-gold)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          aria-label={isPlaying ? 'Pause Ambient Wedding Melody' : 'Play Ambient Wedding Melody'}
        >
          {isPlaying ? (
            <>
              {/* Animated Equalizer Wave Bars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '16px' }}>
                <div
                  style={{
                    width: '3px',
                    height: '100%',
                    backgroundColor: 'var(--color-gold-bright)',
                    borderRadius: '2px',
                    animation: 'pulseGoldGlow 0.8s ease-in-out infinite alternate',
                  }}
                />
                <div
                  style={{
                    width: '3px',
                    height: '60%',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '2px',
                    animation: 'pulseGoldGlow 1.2s ease-in-out infinite alternate 0.2s',
                  }}
                />
                <div
                  style={{
                    width: '3px',
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
                  fontSize: '0.78rem',
                  letterSpacing: '0.14em',
                  fontWeight: 600,
                  color: 'var(--color-gold-light)',
                }}
              >
                {currentTrack.title.split(' ')[0]} {currentTrack.title.split(' ')[1] || ''}
              </span>
            </>
          ) : (
            <>
              <Music size={16} color="var(--color-gold-light)" />
              <span
                style={{
                  fontFamily: 'var(--font-serif-royal)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.14em',
                  fontWeight: 600,
                  color: 'var(--color-gold-light)',
                }}
              >
                PLAY MUSIC
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
};
