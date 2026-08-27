import React, { useEffect, useRef } from 'react';

interface GoldParticle {
  x: number;
  y: number;
  type: 'dust' | 'sparkle' | 'star';
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: string;
  maxOpacity: number;
}

export const GoldJigina: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth < 768;
    const TOTAL_COUNT = isMobile ? 32 : 68;

    const goldColors = [
      '#C9A45C', // Champagne Gold
      '#E1C98A', // Gold Bright
      '#D4AF37', // Metallic Royal Gold
      '#F3E5AB', // Soft Vanilla Gold
      '#FAF6EE', // Ivory Sparkle
    ];

    const createParticle = (startY?: number): GoldParticle => {
      // 60% micro dust, 32% golden sparkles, 8% rare star glints
      const roll = Math.random();
      const type: 'dust' | 'sparkle' | 'star' =
        roll < 0.6 ? 'dust' : roll < 0.92 ? 'sparkle' : 'star';

      let size = 1.0;
      let speedY = 0.2;
      let speedX = 0.05;
      let baseOpacity = 0.35;
      let maxOpacity = 0.6;
      let twinkleSpeed = 0.02;

      if (type === 'dust') {
        size = 0.75 + Math.random() * 1.0;
        speedY = 0.12 + Math.random() * 0.25;
        speedX = (Math.random() - 0.5) * 0.18;
        baseOpacity = 0.2 + Math.random() * 0.25;
        maxOpacity = 0.5;
        twinkleSpeed = 0.015 + Math.random() * 0.02;
      } else if (type === 'sparkle') {
        size = 1.6 + Math.random() * 1.4;
        speedY = 0.18 + Math.random() * 0.35;
        speedX = (Math.random() - 0.5) * 0.25;
        baseOpacity = 0.3;
        maxOpacity = 0.85;
        twinkleSpeed = 0.025 + Math.random() * 0.04;
      } else {
        // Rare 4-point star glint
        size = 3.2 + Math.random() * 2.2;
        speedY = 0.08 + Math.random() * 0.2;
        speedX = (Math.random() - 0.5) * 0.15;
        baseOpacity = 0.1;
        maxOpacity = 0.95;
        twinkleSpeed = 0.02 + Math.random() * 0.03;
      }

      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height,
        type,
        size,
        speedX,
        speedY,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        baseOpacity,
        maxOpacity,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
      };
    };

    const particles: GoldParticle[] = [];
    for (let i = 0; i < TOTAL_COUNT; i++) {
      particles.push(createParticle());
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;
        p.twinklePhase += p.twinkleSpeed;

        // Twinkle factor between 0 and 1
        const sineVal = (Math.sin(p.twinklePhase) + 1) / 2;
        const currentOpacity = p.baseOpacity + sineVal * (p.maxOpacity - p.baseOpacity);

        // Recycle if out of bounds
        if (p.y > height + 25 || p.x < -25 || p.x > width + 25) {
          particles[i] = createParticle(-15);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, currentOpacity));

        if (p.type === 'dust') {
          // Layer 1: Soft circular micro dust speck
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'sparkle') {
          // Layer 2: Diamond gold foil sparkle
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fill();

          // Subtle bright core
          if (sineVal > 0.7) {
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = (sineVal - 0.7) * 3 * currentOpacity;
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Layer 3: Rare 4-point star glint (cross sparkle)
          const s = p.size;
          const beam = s * (0.8 + sineVal * 0.5);

          // Star cross arms
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(-beam, 0);
          ctx.lineTo(beam, 0);
          ctx.moveTo(0, -beam);
          ctx.lineTo(0, beam);
          ctx.stroke();

          // Center diamond glow
          ctx.fillStyle = '#FFFDF9';
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.45);
          ctx.lineTo(s * 0.45, 0);
          ctx.lineTo(0, s * 0.45);
          ctx.lineTo(-s * 0.45, 0);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 14,
      }}
      aria-hidden="true"
    />
  );
};
