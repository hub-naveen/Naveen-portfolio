import React, { useRef, useCallback, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: 'button' | 'a';
  [key: string]: any;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.35,
  radius = 150,
  as: Component = 'button',
  ...props
}) => {
  const btnRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isNear, setIsNear] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < radius) {
          const pull = (1 - distance / radius) * strength;
          const moveX = distX * pull;
          const moveY = distY * pull;

          btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
          setIsNear(true);
        } else {
          btn.style.transform = 'translate(0px, 0px)';
          setIsNear(false);
        }
      });
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const btn = btnRef.current;
    if (!btn) return;

    // Elastic return animation
    btn.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    btn.style.transform = 'translate(0px, 0px)';
    setIsNear(false);

    setTimeout(() => {
      if (btn) btn.style.transition = 'transform 0.15s ease-out';
    }, 600);
  }, []);

  const handleMouseEnter = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transition = 'transform 0.15s ease-out';
  }, []);

  return (
    <div
      className="magnetic-button-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block', padding: `${radius / 4}px` }}
    >
      <Component
        ref={btnRef as any}
        className={`magnetic-button ${isNear ? 'magnetic-active' : ''} ${className}`}
        style={{ willChange: 'transform' }}
        {...props}
      >
        {children}
      </Component>
    </div>
  );
};

export default MagneticButton;
