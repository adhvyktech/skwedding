import React, { useEffect, useRef } from 'react';

interface JiginaParticle {
  x: number;
  y: number;
  size: number;
  aspectRatio: number; // For non-square rectangular / diamond foil speckles
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  baseOpacity: number;
  shimmerPhase: number;
  shimmerSpeed: number;
  color: string;
  depth: 'bg' | 'mg' | 'fg';
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

    // Low particle density (deliberate & discoverable, not overwhelming)
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 14 : 26;

    const goldColors = [
      '#C9A45C', // Champagne Gold
      '#D8BC7A', // Muted Brass
      '#E1C98A', // Gold Bright
      '#A8833B', // Antique Gold
      '#FAF6EE', // Warm Ivory Foil
    ];

    const createParticle = (startY?: number): JiginaParticle => {
      const depth: 'bg' | 'mg' | 'fg' =
        Math.random() > 0.8 ? 'fg' : Math.random() > 0.4 ? 'mg' : 'bg';

      const sizeBase = depth === 'fg' ? 2.6 : depth === 'mg' ? 1.8 : 1.2;
      const speedMult = depth === 'fg' ? 1.2 : depth === 'mg' ? 0.9 : 0.6;
      const baseOpacity = depth === 'fg' ? 0.75 : depth === 'mg' ? 0.55 : 0.35;

      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height,
        size: (sizeBase + Math.random() * 1.2),
        aspectRatio: 0.6 + Math.random() * 0.8, // Rectangular / irregular foil speck
        speedY: (0.15 + Math.random() * 0.35) * speedMult,
        speedX: (-0.15 + Math.random() * 0.3) * speedMult,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        baseOpacity,
        shimmerPhase: Math.random() * Math.PI * 2,
        shimmerSpeed: 0.02 + Math.random() * 0.03,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        depth,
      };
    };

    const particles: JiginaParticle[] = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push(createParticle());
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;
        p.shimmerPhase += p.shimmerSpeed;

        // Subtle shimmer oscillation
        const shimmer = Math.sin(p.shimmerPhase);
        const currentOpacity = Math.max(0.05, Math.min(1, p.baseOpacity + shimmer * 0.25));

        if (p.y > height + 20 || p.x < -20 || p.x > width + 20) {
          particles[i] = createParticle(-10);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = p.color;

        // Draw miniature metallic foil rectangle/rhombus
        const w = p.size;
        const h = p.size * p.aspectRatio;
        ctx.fillRect(-w / 2, -h / 2, w, h);

        // Occasional light glint highlight when shimmer peaks
        if (shimmer > 0.85 && p.depth !== 'bg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = (shimmer - 0.85) * 4;
          ctx.fillRect(-w * 0.3, -h * 0.3, w * 0.6, h * 0.6);
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
        zIndex: 12,
      }}
      aria-hidden="true"
    />
  );
};
