import React, { useRef, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { ambientSound } from '../../utils/audio';
import { Sparkles, Wand2 } from 'lucide-react';

interface ScratchCardProps {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  minHeight?: number;
  title?: string;
  subtitle?: string;
  onReveal?: () => void;
  className?: string;
  borderRadius?: number;
  isAlreadyRevealed?: boolean;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  children,
  width = '100%',
  minHeight = 240,
  title = 'SCRATCH TO REVEAL',
  subtitle = 'Scratch with finger or mouse to unlock this sealed invitation',
  onReveal,
  className = '',
  borderRadius = 32,
  isAlreadyRevealed = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(isAlreadyRevealed);
  const [isSmokeDissolving, setIsSmokeDissolving] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  const isDrawingRef = useRef(false);
  const totalScratchedDistanceRef = useRef(0);
  const strokeSegmentsRef = useRef(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const isTriggeredRef = useRef(false);

  const triggerRevealCelebration = useCallback(() => {
    if (isTriggeredRef.current) return;
    isTriggeredRef.current = true;
    setIsSmokeDissolving(true);

    // Play subtle chime as mist begins dissipating
    ambientSound.playChime('reveal');

    // 1.8s Full Golden Mist & Smoke Dissipation Animation Delay
    setTimeout(() => {
      setIsRevealed(true);

      // Celebratory gold, crimson & rose confetti petal burst
      try {
        confetti({
          particleCount: 45,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#E1C98A', '#C9A45C', '#8C1D2F', '#FAF6EE', '#2B6B4D'],
        });
      } catch {
        // Ignore if confetti is absent
      }

      if (onReveal) {
        onReveal();
      }
    }, 1750);
  }, [onReveal]);

  const drawScratchSurface = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const w = (canvas.width = Math.max(rect.width, 240));
    const h = (canvas.height = Math.max(rect.height, minHeight));

    // 1. Luxury Warm Ivory & Gold Parchment Gradient
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#FAF5EC');
    gradient.addColorStop(0.5, '#F5EDE0');
    gradient.addColorStop(1, '#EFE4D2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // 2. Subtle Traditional Gold Border
    ctx.strokeStyle = '#C9A45C';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, w - 16, h - 16);

    ctx.strokeStyle = 'rgba(201, 164, 92, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, w - 28, h - 28);

    // 3. Central Gold Emblem & Botanical Filigree
    const cx = w / 2;
    const cy = h / 2;

    // Diamond emblem
    ctx.save();
    ctx.translate(cx, cy - 18);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = 'rgba(201, 164, 92, 0.25)';
    ctx.fillRect(-18, -18, 36, 36);
    ctx.strokeStyle = '#C9A45C';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-18, -18, 36, 36);
    ctx.restore();

    // Small Gold Lotus / Star Center
    ctx.fillStyle = '#A8833B';
    ctx.beginPath();
    ctx.arc(cx, cy - 18, 5, 0, Math.PI * 2);
    ctx.fill();

    // 4. Elegant Typography on Surface
    ctx.fillStyle = '#3B0D18';
    ctx.font = '600 12px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, cx, cy + 22);

    ctx.fillStyle = '#6E5C58';
    ctx.font = '400 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(subtitle, cx, cy + 40);

    setCanvasReady(true);
  }, [title, subtitle, minHeight]);

  useEffect(() => {
    if (isAlreadyRevealed) {
      setIsRevealed(true);
      return;
    }

    const timer = setTimeout(() => {
      drawScratchSurface();
    }, 80);

    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        if (!isRevealed && !isSmokeDissolving) {
          drawScratchSurface();
        }
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [isAlreadyRevealed, drawScratchSurface, isRevealed, isSmokeDissolving]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed || isSmokeDissolving) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 48;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPosRef.current) {
      const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);
      totalScratchedDistanceRef.current += dist;

      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPosRef.current = { x, y };

    // After 2 to 3 deliberate scratch strokes
    if (totalScratchedDistanceRef.current > 200 || strokeSegmentsRef.current >= 3) {
      triggerRevealCelebration();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    strokeSegmentsRef.current++;
    lastPosRef.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    strokeSegmentsRef.current++;
    lastPosRef.current = null;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !e.touches[0]) return;
    scratch(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      style={{
        width,
        minHeight: `${minHeight}px`,
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        overflow: 'hidden',
        boxSizing: 'border-box',
        maxWidth: '100%',
      }}
    >
      {/* Underlying Content Being Revealed */}
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: isRevealed ? 1 : 0.95,
          transition: 'opacity 0.6s ease',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </div>

      {/* Canvas Scratch Foil Surface with 1.8s Mist / Smoke Dissolve Transition */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={isSmokeDissolving ? 'animate-smoke-dissolve' : ''}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            cursor: 'grab',
            zIndex: 15,
            touchAction: 'none',
            borderRadius: `${borderRadius}px`,
            opacity: canvasReady ? 1 : 0,
            transition: isSmokeDissolving ? 'none' : 'opacity 0.2s ease',
            boxSizing: 'border-box',
          }}
          title="Scratch 2-3 times to reveal details"
        />
      )}

      {/* Accessible Fallback Reveal Button */}
      {!isRevealed && !isSmokeDissolving && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            zIndex: 20,
          }}
        >
          <button
            onClick={triggerRevealCelebration}
            className="btn-primary"
            style={{
              minHeight: '36px',
              padding: '0 14px',
              fontSize: '0.74rem',
              letterSpacing: '0.08em',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            }}
          >
            <Wand2 size={12} />
            <span>Reveal</span>
          </button>
        </div>
      )}

      {/* Scratch Prompt Pill on Top-Left */}
      {!isRevealed && !isSmokeDissolving && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 20,
            backgroundColor: 'rgba(59, 13, 24, 0.92)',
            border: '1px solid var(--color-gold)',
            borderRadius: '20px',
            padding: '4px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            pointerEvents: 'none',
            maxWidth: 'calc(100% - 24px)',
          }}
        >
          <Sparkles size={11} color="var(--color-gold-bright)" style={{ flexShrink: 0 }} />
          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              color: 'var(--color-gold-light)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            SCRATCH 2–3 TIMES TO UNLOCK
          </span>
        </div>
      )}
    </div>
  );
};
