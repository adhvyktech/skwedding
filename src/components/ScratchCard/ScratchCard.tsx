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
  minHeight = 260,
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
          particleCount: 50,
          spread: 80,
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
    const w = (canvas.width = rect.width);
    const h = (canvas.height = rect.height || minHeight);

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
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.strokeStyle = 'rgba(201, 164, 92, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(16, 16, w - 32, h - 32);

    // 3. Central Gold Emblem & Botanical Filigree
    const cx = w / 2;
    const cy = h / 2;

    // Diamond emblem
    ctx.save();
    ctx.translate(cx, cy - 20);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = 'rgba(201, 164, 92, 0.25)';
    ctx.fillRect(-20, -20, 40, 40);
    ctx.strokeStyle = '#C9A45C';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-20, -20, 40, 40);
    ctx.restore();

    // Small Gold Lotus / Star Center
    ctx.fillStyle = '#A8833B';
    ctx.beginPath();
    ctx.arc(cx, cy - 20, 5, 0, Math.PI * 2);
    ctx.fill();

    // 4. Elegant Typography on Surface
    ctx.fillStyle = '#3B0D18';
    ctx.font = '600 13px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, cx, cy + 22);

    ctx.fillStyle = '#6E5C58';
    ctx.font = '400 11.5px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(subtitle, cx, cy + 44);

    setCanvasReady(true);
  }, [title, subtitle, minHeight]);

  useEffect(() => {
    if (isAlreadyRevealed) {
      setIsRevealed(true);
      return;
    }

    const timer = setTimeout(() => {
      drawScratchSurface();
    }, 100);

    const handleResize = () => {
      if (!isRevealed && !isSmokeDissolving) {
        drawScratchSurface();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
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
    if (totalScratchedDistanceRef.current > 240 || strokeSegmentsRef.current >= 3) {
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
      }}
    >
      {/* Underlying Content Being Revealed */}
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: isRevealed ? 1 : 0.95,
          transition: 'opacity 0.6s ease',
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
          }}
          title="Scratch 2-3 times to reveal details"
        />
      )}

      {/* Accessible Fallback Reveal Button */}
      {!isRevealed && !isSmokeDissolving && (
        <div
          style={{
            position: 'absolute',
            bottom: '14px',
            right: '14px',
            zIndex: 20,
          }}
        >
          <button
            onClick={triggerRevealCelebration}
            className="btn-primary"
            style={{
              height: '36px',
              padding: '0 14px',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            }}
          >
            <Wand2 size={13} />
            <span>Reveal</span>
          </button>
        </div>
      )}

      {/* Scratch Prompt Pill on Top-Left */}
      {!isRevealed && !isSmokeDissolving && (
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            zIndex: 20,
            backgroundColor: 'rgba(59, 13, 24, 0.92)',
            border: '1px solid var(--color-gold)',
            borderRadius: '20px',
            padding: '4px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            pointerEvents: 'none',
          }}
        >
          <Sparkles size={11} color="var(--color-gold-bright)" />
          <span
            style={{
              fontFamily: 'var(--font-serif-royal)',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              color: 'var(--color-gold-light)',
            }}
          >
            SCRATCH 2–3 TIMES TO UNLOCK
          </span>
        </div>
      )}
    </div>
  );
};
