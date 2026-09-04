import React, { useRef, useEffect } from 'react';

interface ParticleAtmosphereProps {
  progress?: number; // 0.0 to 1.0 scroll progress
  opacity?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  baseOpacity: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  hue: string;
}

export const ParticleAtmosphere: React.FC<ParticleAtmosphereProps> = ({
  progress = 0,
  opacity = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const isMobile = width < 768;
    const particleCount = isMobile ? 36 : 72;

    const colors = [
      'rgba(201, 164, 92,',  // Antique Gold
      'rgba(225, 201, 138,', // Bright Champagne Gold
      'rgba(245, 230, 190,', // Gold Shimmer
      'rgba(255, 253, 245,', // Jasmine White/Glint
      'rgba(216, 188, 122,', // Warm Gold Light
    ];

    const initParticles = () => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.2 + 0.8,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -(Math.random() * 0.35 + 0.1), // Gentle upward drift
          baseOpacity: Math.random() * 0.5 + 0.3,
          opacity: 0.5,
          twinkleSpeed: Math.random() * 0.03 + 0.015,
          twinkleOffset: Math.random() * Math.PI * 2,
          hue: color,
        });
      }
      particlesRef.current = particles;
    };

    const handleResize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initParticles();
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Warm atmospheric glow multiplier based on progress (emerges subtly)
      const atmosphericMultiplier = Math.min(1.3, 0.7 + progress * 0.6) * opacity;

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Calculate twinkling opacity
        const twinkle = Math.sin(time * p.twinkleSpeed + p.twinkleOffset);
        const currentOpacity = Math.max(
          0.1,
          Math.min(1, (p.baseOpacity + twinkle * 0.25) * atmosphericMultiplier)
        );

        // Draw soft ceremonial particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.hue} ${currentOpacity})`;
        ctx.fill();

        // Add soft halo glint to larger particles
        if (p.size > 1.8 && twinkle > 0.4) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.hue} ${currentOpacity * 0.25})`;
          ctx.fill();
        }
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [opacity, progress]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 3,
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
};
