import React, { useRef, useEffect, useCallback } from 'react';
import { framePreloader } from '../../utils/framePreloader';

interface FrameSequenceCanvasProps {
  currentFrameIndex: number;
  totalFrames: number;
  opacity?: number;
  scale?: number;
  onCanvasReady?: () => void;
}

const ORIGINAL_WIDTH = 1280;
const ORIGINAL_HEIGHT = 720;
const ASPECT_RATIO = ORIGINAL_WIDTH / ORIGINAL_HEIGHT;

export const FrameSequenceCanvas: React.FC<FrameSequenceCanvasProps> = ({
  currentFrameIndex,
  totalFrames,
  opacity = 1,
  scale = 1,
  onCanvasReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastDrawnIndexRef = useRef<number>(-1);
  const lastDrawnSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      // Ensure index is within valid bounds
      const safeIndex = Math.max(0, Math.min(totalFrames - 1, Math.floor(index)));
      const img = framePreloader.getNearestFrame(safeIndex);

      if (!img || !img.complete || img.naturalWidth === 0) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.floor(width * dpr);
      const pixelHeight = Math.floor(height * dpr);

      // Resize canvas buffer if logical dimensions changed
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Contain-fit calculation (always maintains aspect ratio, centered)
      const containerAspect = width / height;
      let drawW = width;
      let drawH = height;
      let drawX = 0;
      let drawY = 0;

      // Responsive avatar sizing: On mobile, ensure generous breathing room
      const effectiveScale = scale;

      if (containerAspect > ASPECT_RATIO) {
        // Wide screens: constrained by height
        drawH = height * effectiveScale;
        drawW = drawH * ASPECT_RATIO;
        drawX = (width - drawW) / 2;
        drawY = (height - drawH) / 2;
      } else {
        // Tall screens (mobile): constrained by width
        drawW = width * effectiveScale;
        drawH = drawW / ASPECT_RATIO;
        drawX = (width - drawW) / 2;
        drawY = (height - drawH) / 2;
      }

      // Smooth image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.globalAlpha = opacity;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();

      lastDrawnIndexRef.current = safeIndex;
      lastDrawnSizeRef.current = { w: width, h: height };
    },
    [totalFrames, opacity, scale]
  );

  // Redraw on currentFrameIndex, opacity, or scale change
  useEffect(() => {
    renderFrame(currentFrameIndex);
  }, [currentFrameIndex, opacity, scale, renderFrame]);

  // Handle ResizeObserver for responsive resizing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (onCanvasReady) {
      onCanvasReady();
    }

    const resizeObserver = new ResizeObserver(() => {
      renderFrame(currentFrameIndex);
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [renderFrame, currentFrameIndex, onCanvasReady]);

  return (
    <div
      ref={containerRef}
      className="cinematic-canvas-container"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        className="cinematic-avatar-canvas"
        style={{
          display: 'block',
          willChange: 'transform',
        }}
      />
    </div>
  );
};
