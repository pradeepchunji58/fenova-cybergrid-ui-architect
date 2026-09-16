import React, { useEffect, useRef, useState } from 'react';

export const TechCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string>('');

  const cursorRef = useRef<HTMLDivElement>(null);
  const horizontalLineRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check for touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    if (isEnabled) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'button, a, input, select, textarea, [role="button"], .interactive-tile, .cursor-pointer'
        );
        if (interactive) {
          setIsHovered(true);
          const customLabel =
            interactive.getAttribute('data-cursor') ||
            interactive.getAttribute('aria-label') ||
            '';
          setHoverLabel(customLabel);
        } else {
          setIsHovered(false);
          setHoverLabel('');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth linear interpolation (lerp) loop
    const lerpFactor = 0.18;
    const render = () => {
      const dx = mousePos.current.x - currentPos.current.x;
      const dy = mousePos.current.y - currentPos.current.y;

      currentPos.current.x += dx * lerpFactor;
      currentPos.current.y += dy * lerpFactor;

      const px = currentPos.current.x;
      const py = currentPos.current.y;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      }

      // 10% opacity full-screen tracking crosshair lines
      if (horizontalLineRef.current) {
        horizontalLineRef.current.style.transform = `translate3d(0, ${py}px, 0)`;
      }
      if (verticalLineRef.current) {
        verticalLineRef.current.style.transform = `translate3d(${px}px, 0, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isEnabled]);

  if (isTouch || !isEnabled) {
    return null;
  }

  return (
    <>
      {/* 1. Full-Screen Horizontal Tracking Guide Line (10% continuity linear line) */}
      <div
        ref={horizontalLineRef}
        className="fixed top-0 left-0 w-screen h-[1px] pointer-events-none z-[9997] will-change-transform"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.10) 15%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.10) 85%, transparent 100%)',
        }}
      />

      {/* 2. Full-Screen Vertical Tracking Guide Line (10% continuity linear line) */}
      <div
        ref={verticalLineRef}
        className="fixed top-0 left-0 w-[1px] h-screen pointer-events-none z-[9997] will-change-transform"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.10) 15%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.10) 85%, transparent 100%)',
        }}
      />

      {/* 3. Floating X-Mark Center Tracker (Highlighted with active Theme Accent) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform -translate-x-1/2 -translate-y-1/2 select-none"
      >
        {/* Center Precise Dot */}
        <div
          className={`w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full transition-all duration-200 bg-theme-accent ${
            isHovered ? 'scale-150 shadow-theme-glow' : 'scale-100'
          }`}
          style={{
            backgroundColor: 'var(--accent-color)',
            boxShadow: isHovered ? '0 0 10px var(--accent-color)' : '0 0 4px var(--accent-color)',
          }}
        />

        {/* Floating "X Mark" Tracker */}
        <div
          className={`absolute -top-3.5 -left-3.5 w-7 h-7 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'scale-125 rotate-45' : 'scale-100 rotate-0'
          }`}
        >
          {/* Diagonal X Arms */}
          <div
            className="absolute w-5 h-[1.5px] rotate-45 transition-colors"
            style={{
              backgroundColor: 'var(--accent-color)',
              boxShadow: '0 0 6px var(--accent-color)',
            }}
          />
          <div
            className="absolute w-5 h-[1.5px] -rotate-45 transition-colors"
            style={{
              backgroundColor: 'var(--accent-color)',
              boxShadow: '0 0 6px var(--accent-color)',
            }}
          />

          {/* Outer Technical Dashed Ring */}
          <div
            className={`absolute inset-0 rounded-full border border-dashed transition-all duration-300 ${
              isHovered
                ? 'scale-125 opacity-100 animate-spin'
                : 'border-white/20 scale-75 opacity-40'
            }`}
            style={{
              borderColor: isHovered ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.25)',
              animationDuration: '6s',
            }}
          />
        </div>

        {/* Hover Micro-Label (NO X/Y numbers as requested) */}
        {hoverLabel && (
          <div
            className="absolute left-4 top-2 px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-widest bg-black/85 border backdrop-blur-sm shadow-xl whitespace-nowrap"
            style={{
              borderColor: 'var(--accent-border)',
              color: 'var(--accent-color)',
            }}
          >
            [{hoverLabel}]
          </div>
        )}
      </div>
    </>
  );
};
