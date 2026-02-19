import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityTarget: number;
  twinkleSpeed: number;
}

export interface SpaceBackgroundHandle {
  triggerWarp: () => void;
}

interface Props {
  starCount?: number;
}

const SpaceBackground = forwardRef<SpaceBackgroundHandle, Props>(
  ({ starCount = 110 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const rafRef = useRef<number>(0);
    const warpRef = useRef<{ active: boolean; progress: number }>({
      active: false,
      progress: 0,
    });

    useImperativeHandle(ref, () => ({
      triggerWarp: () => {
        warpRef.current = { active: true, progress: 0 };
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const makeStars = (w: number, h: number): Star[] =>
        Array.from({ length: starCount }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          size: Math.random() * 1.6 + 0.3,
          opacity: Math.random() * 0.45 + 0.08,
          opacityTarget: Math.random() * 0.45 + 0.08,
          twinkleSpeed: 0.004 + Math.random() * 0.006,
        }));

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        starsRef.current = makeStars(canvas.width, canvas.height);
      };

      resize();
      window.addEventListener('resize', resize);

      const cx = () => canvas.width / 2;
      const cy = () => canvas.height / 2;

      const draw = () => {
        const w = canvas.width;
        const h = canvas.height;
        const warp = warpRef.current;

        ctx.clearRect(0, 0, w, h);

        // Draw deep-space gradient background
        const bg = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), Math.hypot(w, h) / 2);
        bg.addColorStop(0, '#0a1628');
        bg.addColorStop(0.5, '#06101e');
        bg.addColorStop(1, '#030810');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);

        // Nebula blobs — very subtle
        const drawNebula = (nx: number, ny: number, r: number, color: string, alpha: number) => {
          const grad = ctx.createRadialGradient(
            nx * w, ny * h, 0,
            nx * w, ny * h, r * Math.min(w, h)
          );
          grad.addColorStop(0, color.replace(')', `, ${alpha})`).replace('rgb', 'rgba'));
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, w, h);
        };

        drawNebula(0.2, 0.25, 0.45, 'rgb(139, 92, 246', 0.04);
        drawNebula(0.75, 0.65, 0.4,  'rgb(0, 180, 216',  0.04);
        drawNebula(0.5,  0.1,  0.3,  'rgb(34, 211, 238',  0.03);

        // Update & draw stars
        starsRef.current.forEach((s) => {
          // Twinkle
          if (Math.abs(s.opacity - s.opacityTarget) < 0.005) {
            s.opacityTarget = Math.random() * 0.45 + 0.08;
          }
          s.opacity += (s.opacityTarget - s.opacity) * s.twinkleSpeed;

          // Warp mode: accelerate stars away from center
          let drawAsTail = false;
          let tailLen = 0;
          if (warp.active) {
            const accel = Math.min(warp.progress / 30, 1);
            const dx = s.x - cx();
            const dy = s.y - cy();
            const dist = Math.hypot(dx, dy) || 1;
            const speed = accel * 6;
            s.x += (dx / dist) * speed;
            s.y += (dy / dist) * speed;
            tailLen = accel * 18;
            drawAsTail = true;
          }

          // Normal drift
          s.x += s.vx;
          s.y += s.vy;

          // Wrap
          if (s.x < 0) s.x = w;
          else if (s.x > w) s.x = 0;
          if (s.y < 0) s.y = h;
          else if (s.y > h) s.y = 0;

          if (drawAsTail && tailLen > 1) {
            // Draw as a stretched line from center
            const dx = s.x - cx();
            const dy = s.y - cy();
            const dist = Math.hypot(dx, dy) || 1;
            const nx = dx / dist;
            const ny = dy / dist;
            ctx.beginPath();
            ctx.moveTo(s.x - nx * tailLen, s.y - ny * tailLen);
            ctx.lineTo(s.x, s.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${s.opacity * 0.8})`;
            ctx.lineWidth = s.size * 0.6;
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(226, 232, 240, ${s.opacity})`;
            ctx.fill();
          }
        });

        // Progress & end warp
        if (warp.active) {
          warp.progress += 1;
          if (warp.progress >= 80) {
            warp.active = false;
            warp.progress = 0;
          }
        }

        rafRef.current = requestAnimationFrame(draw);
      };

      rafRef.current = requestAnimationFrame(draw);

      return () => {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener('resize', resize);
      };
    }, [starCount]);

    return (
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
    );
  }
);

SpaceBackground.displayName = 'SpaceBackground';
export default SpaceBackground;
