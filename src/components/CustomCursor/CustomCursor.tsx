import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="view"]')) {
        setCursorType('view');
      } else if (
        target.closest('a, button, input, textarea, select, [role="button"], .clickable')
      ) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth trailing animation loop
    let animId: number;
    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animId = requestAnimationFrame(updateTrailing);
    };
    animId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Center Precise Dot */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#C5A059',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
      />

      {/* Trailing Outer Ring / Badge */}
      <div
        className="fixed pointer-events-none z-50 flex items-center justify-center transition-all duration-200 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: cursorType === 'view' ? '64px' : cursorType === 'hover' ? '44px' : '26px',
          height: cursorType === 'view' ? '64px' : cursorType === 'hover' ? '44px' : '26px',
          borderRadius: '50%',
          border: cursorType === 'view' ? '1px solid #C5A059' : '1px solid rgba(197, 160, 89, 0.5)',
          backgroundColor:
            cursorType === 'view'
              ? 'rgba(104, 23, 36, 0.85)'
              : cursorType === 'hover'
              ? 'rgba(197, 160, 89, 0.12)'
              : 'transparent',
          backdropFilter: cursorType === 'view' ? 'blur(4px)' : 'none',
          transform: 'translate(-50%, -50%)',
          color: '#FFFDF9',
          fontSize: '10px',
          fontFamily: 'var(--font-serif-royal)',
          letterSpacing: '0.15em',
          fontWeight: 600,
          zIndex: 9998,
        }}
      >
        {cursorType === 'view' && <span>VIEW</span>}
      </div>
    </>
  );
};
