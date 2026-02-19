import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef    = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible,  setIsVisible]  = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Keep hover in a ref so the RAF loop can read it without stale closure
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const hasTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (hasTouch) {
      setIsTouchDevice(true);
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    // Circle lags behind — interpolated position
    let circleX = 0;
    let circleY = 0;
    // Glow lags more — softer trail
    let glowX = 0;
    let glowY = 0;
    let rafId: number;
    let visible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        setIsVisible(true);
      }
      // Dot snaps instantly (GPU transform)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const onMouseLeave = () => { visible = false; setIsVisible(false); };
    const onMouseEnter = () => { visible = true;  setIsVisible(true);  };

    const addHoverListeners = () => {
      const els = document.querySelectorAll<Element>(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, label'
      );
      const enter = () => { isHoveringRef.current = true;  setIsHovering(true);  };
      const leave = () => { isHoveringRef.current = false; setIsHovering(false); };
      els.forEach((el) => {
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
      return { els, enter, leave };
    };

    const animate = () => {
      const ease        = 0.13;   // circle easing
      const glowEase    = 0.08;   // glow easing (softer)
      const hoverScale  = isHoveringRef.current ? 1.45 : 1;

      circleX += (mouseX - circleX) * ease;
      circleY += (mouseY - circleY) * ease;
      glowX   += (mouseX - glowX)   * glowEase;
      glowY   += (mouseY - glowY)   * glowEase;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${circleX}px, ${circleY}px) scale(${hoverScale})`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX}px, ${glowY}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove',  onMouseMove,  { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    // Add hover listeners + observe DOM mutations for new interactive elements
    let { els, enter, leave } = addHoverListeners();

    const observer = new MutationObserver(() => {
      els.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
      ({ els, enter, leave } = addHoverListeners());
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove',  onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      els.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  if (isTouchDevice) return null;

  const opacity = isVisible ? 1 : 0;

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          opacity,
          transform: 'translate(-9999px, -9999px)',
          background: isHovering
            ? 'radial-gradient(circle, #e879f9 0%, #8b5cf6 100%)'
            : '#22d3ee',
          boxShadow: isHovering
            ? '0 0 8px rgba(232,121,249,0.8)'
            : '0 0 8px rgba(34,211,238,0.8)',
          transition: 'background 0.25s ease, box-shadow 0.25s ease, opacity 0.2s ease',
        }}
      />

      {/* Trailing ring — lags slightly */}
      <div
        ref={circleRef}
        className={`custom-cursor-circle ${isHovering ? 'custom-cursor-hover' : ''}`}
        style={{
          opacity,
          transform: 'translate(-9999px, -9999px)',
          borderColor: isHovering
            ? 'rgba(139, 92, 246, 0.65)'
            : 'rgba(34, 211, 238, 0.45)',
          boxShadow: isHovering
            ? 'inset 0 0 8px rgba(139,92,246,0.15)'
            : 'none',
        }}
      />

      {/* Soft glow — lags most, gives trailing light feel */}
      <div
        ref={glowRef}
        className="custom-cursor-glow"
        style={{
          opacity: isVisible ? (isHovering ? 0.8 : 0.55) : 0,
          transform: 'translate(-9999px, -9999px)',
          width: isHovering ? 80 : 56,
          height: isHovering ? 80 : 56,
          top: isHovering ? -40 : -28,
          left: isHovering ? -40 : -28,
          background: isHovering
            ? 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(34,211,238,0.16) 0%, transparent 70%)',
          transition: 'width 0.4s ease, height 0.4s ease, top 0.4s ease, left 0.4s ease, background 0.3s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
};

export default CustomCursor;

