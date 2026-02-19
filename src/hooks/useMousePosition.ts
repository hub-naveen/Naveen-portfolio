import { useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Returns a ref (not state) holding the latest mouse position.
 * Using a ref prevents re-renders on every mouse move.
 * Consumers should read pos.current inside RAF loops.
 */
export function useMousePosition(): React.MutableRefObject<MousePosition> {
  const pos = useRef<MousePosition>({ x: -9999, y: -9999 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return pos;
}
