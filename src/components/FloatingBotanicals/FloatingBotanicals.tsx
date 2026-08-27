import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  type: 'rose_red' | 'rose_pink' | 'jasmine' | 'marigold' | 'leaf';
  opacity: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  oscillationOffset: number;
  depth: 'fg' | 'mg' | 'bg';
}

export const FloatingBotanicals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect reduced motion
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

    const PETAL_COUNT = window.innerWidth < 768 ? 16 : 28;
    const petals: Petal[] = [];

    const types: ('rose_red' | 'rose_pink' | 'jasmine' | 'marigold' | 'leaf')[] = [
      'rose_red',
      'rose_pink',
      'jasmine',
      'jasmine',
      'marigold',
      'leaf',
    ];

    const createPetal = (startY?: number): Petal => {
      const depthType: 'fg' | 'mg' | 'bg' = Math.random() > 0.75 ? 'fg' : Math.random() > 0.4 ? 'mg' : 'bg';
      const sizeMult = depthType === 'fg' ? 1.4 : depthType === 'mg' ? 1.0 : 0.7;
      const speedMult = depthType === 'fg' ? 1.3 : depthType === 'mg' ? 1.0 : 0.7;

      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height,
        size: (10 + Math.random() * 12) * sizeMult,
        speedY: (0.4 + Math.random() * 0.6) * speedMult,
        speedX: (-0.3 + Math.random() * 0.6) * speedMult,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.018,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: depthType === 'fg' ? 0.75 : depthType === 'mg' ? 0.65 : 0.45,
        oscillationSpeed: 0.008 + Math.random() * 0.012,
        oscillationDistance: 15 + Math.random() * 25,
        oscillationOffset: Math.random() * 100,
        depth: depthType,
      };
    };

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push(createPetal());
    }

    let time = 0;

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      const s = p.size;

      if (p.type === 'rose_red') {
        // Deep Crimson / Velvet Rose Petal
        ctx.fillStyle = '#9E1C2E';
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.7);
        ctx.bezierCurveTo(s * 0.65, -s * 0.85, s * 0.85, s * 0.35, 0, s * 0.85);
        ctx.bezierCurveTo(-s * 0.85, s * 0.35, -s * 0.65, -s * 0.85, 0, -s * 0.7);
        ctx.fill();

        // Inner velvet highlight
        ctx.fillStyle = '#BD2B40';
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.3);
        ctx.bezierCurveTo(s * 0.35, -s * 0.45, s * 0.35, s * 0.25, 0, s * 0.55);
        ctx.fill();
      } else if (p.type === 'rose_pink') {
        // Soft Blush Pink Rose Petal
        ctx.fillStyle = '#E8968F';
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.7);
        ctx.bezierCurveTo(s * 0.6, -s * 0.8, s * 0.8, s * 0.3, 0, s * 0.8);
        ctx.bezierCurveTo(-s * 0.8, s * 0.3, -s * 0.6, -s * 0.8, 0, -s * 0.7);
        ctx.fill();

        // Inner shadow
        ctx.fillStyle = '#C8645C';
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.25);
        ctx.bezierCurveTo(s * 0.3, -s * 0.35, s * 0.3, s * 0.2, 0, s * 0.45);
        ctx.fill();
      } else if (p.type === 'jasmine') {
        // South Indian White Jasmine Bloom (5 delicate petals with gold center)
        ctx.fillStyle = '#FFFDF5';
        for (let i = 0; i < 5; i++) {
          ctx.save();
          ctx.rotate((i * Math.PI * 2) / 5);
          ctx.beginPath();
          ctx.ellipse(0, -s * 0.45, s * 0.18, s * 0.45, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        // Gold Center Bud
        ctx.fillStyle = '#E8BD56';
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.14, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'marigold') {
        // Vibrant Saffron/Orange Marigold Petal
        ctx.fillStyle = '#F0A52B';
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.65);
        ctx.quadraticCurveTo(s * 0.55, 0, 0, s * 0.75);
        ctx.quadraticCurveTo(-s * 0.55, 0, 0, -s * 0.65);
        ctx.fill();

        // Edge gold tint
        ctx.fillStyle = '#FFC94A';
        ctx.beginPath();
        ctx.arc(0, -s * 0.35, s * 0.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Tender Leaf Green
        ctx.fillStyle = '#3E7D5A';
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.65);
        ctx.quadraticCurveTo(s * 0.45, 0, 0, s * 0.65);
        ctx.quadraticCurveTo(-s * 0.45, 0, 0, -s * 0.65);
        ctx.fill();

        // Center Gold Vein
        ctx.strokeStyle = '#C9A45C';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.5);
        ctx.lineTo(0, s * 0.5);
        ctx.stroke();
      }

      ctx.restore();
    };

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += Math.sin((time + p.oscillationOffset) * p.oscillationSpeed) * 0.4 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 40 || p.x < -40 || p.x > width + 40) {
          petals[i] = createPetal(-25);
        }

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 15,
      }}
      aria-hidden="true"
    />
  );
};
