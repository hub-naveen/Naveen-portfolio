import React, { useRef, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glareEnabled?: boolean;
  onClick?: () => void;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  glareEnabled = true,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalized mouse position from -1 to 1
        const normalX = (e.clientX - centerX) / (rect.width / 2);
        const normalY = (e.clientY - centerY) / (rect.height / 2);

        // Tilt values (inverted Y for natural feel)
        const tiltX = -normalY * maxTilt;
        const tiltY = normalX * maxTilt;

        card.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;

        // Update glare position
        if (glareEnabled && glareRef.current) {
          const glareX = ((normalX + 1) / 2) * 100;
          const glareY = ((normalY + 1) / 2) * 100;
          glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)`;
          glareRef.current.style.opacity = '1';
        }
      });
    },
    [maxTilt, perspective, scale, glareEnabled]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const card = cardRef.current;
    if (!card) return;

    // Smooth reset
    card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

    if (glareEnabled && glareRef.current) {
      glareRef.current.style.opacity = '0';
    }

    // Remove transition after reset to avoid sluggish movement
    setTimeout(() => {
      if (card) card.style.transition = 'transform 0.1s ease-out';
    }, 500);
  }, [perspective, glareEnabled]);

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.1s ease-out';
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {children}
      {glareEnabled && (
        <div
          ref={glareRef}
          className="tilt-card-glare"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </div>
  );
};

export default TiltCard;
