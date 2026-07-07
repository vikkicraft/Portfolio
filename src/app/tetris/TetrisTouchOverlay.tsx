import { useEffect, useRef, useCallback } from 'react';

const TAP_THRESHOLD_PX = 12;
const TAP_THRESHOLD_MS = 300;
const DIRECTION_LOCK_THRESHOLD = 6; // px to determine horizontal vs vertical
const SYNTHETIC_SUPPRESS_MS = 400; // suppress browser-synthesized mousemove after touch

/**
 * Translates touch events into the mouse/click events that TetrisGrid
 * already listens to on `window`. Horizontal drags move the block,
 * vertical drags scroll the page normally, taps rotate.
 */
export function TetrisTouchOverlay({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const prevTouchXRef = useRef<number | null>(null);
  const virtualCursorXRef = useRef<number | null>(null);
  const directionRef = useRef<'none' | 'horizontal' | 'vertical'>('none');
  const suppressUntilRef = useRef<number>(0);

  const isInsideHero = useCallback(
    (clientX: number, clientY: number) => {
      // Ignore clicks/taps in the navbar area (top 64px of screen)
      if (clientY < 64) return false;

      const hero = heroRef.current;
      if (!hero) return false;
      const rect = hero.getBoundingClientRect();
      return (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      );
    },
    [heroRef]
  );

  const isInteractiveElement = useCallback((target: EventTarget | null): boolean => {
    if (!target || !(target instanceof HTMLElement)) return false;
    const interactive = target.closest('a, button, [role="button"], input, textarea, select');
    return interactive !== null;
  }, []);

  useEffect(() => {
    // Capture-phase listener to suppress browser-synthesized mousemove
    // events that fire ~300ms after touch. Without this, TetrisGrid snaps
    // the block to the tap position via the synthetic mousemove.
    const suppressSyntheticMouseMove = (e: MouseEvent) => {
      if (
        Date.now() < suppressUntilRef.current &&
        !(e as any).__synthetic
      ) {
        e.stopImmediatePropagation();
      }
    };

    // Also suppress the browser-synthesized click that fires ~300ms after
    // a tap. Without this, TetrisGrid receives two clicks (ours + synthetic)
    // causing a double rotation that appears to do nothing.
    // Only suppress if the click target is NOT an interactive element (button, link, etc.)
    const suppressSyntheticClick = (e: MouseEvent) => {
      if (
        Date.now() < suppressUntilRef.current &&
        !(e as any).__synthetic
      ) {
        // Don't suppress clicks on interactive elements (buttons, links, inputs)
        const target = e.target as HTMLElement | null;
        if (target && target.closest('a, button, [role="button"], input, textarea, select, label')) {
          return; // Let the click through
        }
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    };

    // Keep virtualCursorX in sync with real desktop mouse movements
    const syncMouseMove = (e: MouseEvent) => {
      if (!(e as any).__synthetic) {
        virtualCursorXRef.current = e.clientX;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const target = e.target as HTMLElement;

      // Ignore if tapping on or inside the navbar
      if (target?.closest('nav')) return;
      
      if (!isInsideHero(touch.clientX, touch.clientY)) return;
      if (isInteractiveElement(e.target)) return;

      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
      prevTouchXRef.current = touch.clientX;
      directionRef.current = 'none';

      // Do NOT preventDefault here — allow vertical scrolling to begin
    };

    const handleTouchMove = (e: TouchEvent) => {
      const start = touchStartRef.current;
      if (!start || prevTouchXRef.current === null) return;

      const touch = e.touches[0];

      // Determine drag direction on first significant movement
      if (directionRef.current === 'none') {
        const dx = Math.abs(touch.clientX - start.x);
        const dy = Math.abs(touch.clientY - start.y);

        if (dx < DIRECTION_LOCK_THRESHOLD && dy < DIRECTION_LOCK_THRESHOLD) {
          return; // Not enough movement to determine direction yet
        }

        if (dy > dx) {
          // Vertical drag — let the browser scroll, stop tracking
          directionRef.current = 'vertical';
          touchStartRef.current = null;
          prevTouchXRef.current = null;
          return;
        }

        // Horizontal drag — we handle this
        directionRef.current = 'horizontal';
      }

      if (directionRef.current !== 'horizontal') return;

      // Prevent scroll for horizontal drags
      e.preventDefault();

      // Calculate delta from previous touch position
      const delta = touch.clientX - prevTouchXRef.current;
      prevTouchXRef.current = touch.clientX;

      // Initialize virtualCursorX to screen center if never set
      if (virtualCursorXRef.current === null) {
        virtualCursorXRef.current = window.innerWidth / 2;
      }

      // Apply delta to virtual cursor position
      virtualCursorXRef.current = Math.max(
        0,
        Math.min(window.innerWidth, virtualCursorXRef.current + delta)
      );

      const syntheticEvent = new MouseEvent('mousemove', {
        clientX: virtualCursorXRef.current,
        clientY: touch.clientY,
        bubbles: true,
        cancelable: true,
      });
      (syntheticEvent as any).__synthetic = true;
      window.dispatchEvent(syntheticEvent);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const start = touchStartRef.current;
      if (!start) return;

      const touch = e.changedTouches[0];
      const dx = Math.abs(touch.clientX - start.x);
      const dy = Math.abs(touch.clientY - start.y);
      const dt = Date.now() - start.time;

      // Suppress browser-synthesized mousemove after any hero touch
      suppressUntilRef.current = Date.now() + SYNTHETIC_SUPPRESS_MS;

      // If it was a significant horizontal drag, it was a move, not a rotate/tap
      if (directionRef.current === 'horizontal' && dx > TAP_THRESHOLD_PX) {
        touchStartRef.current = null;
        prevTouchXRef.current = null;
        directionRef.current = 'none';
        return;
      }

      // Short, stationary touch → tap → rotate
      // Increase threshold slightly for real devices and ensure it's not a vertical scroll
      if (dx < TAP_THRESHOLD_PX * 1.5 && dy < TAP_THRESHOLD_PX * 1.5 && dt < TAP_THRESHOLD_MS) {
        // Prevent default to stop browser zoom/scroll interference
        if (e.cancelable) e.preventDefault();
        
        const syntheticClick = new MouseEvent('click', {
          clientX: touch.clientX,
          clientY: touch.clientY,
          bubbles: true,
          cancelable: true,
        });
        (syntheticClick as any).__synthetic = true;
        window.dispatchEvent(syntheticClick);
      }

      touchStartRef.current = null;
      prevTouchXRef.current = null;
      directionRef.current = 'none';
    };

    // Capture-phase listener fires BEFORE TetrisGrid's bubble-phase listener
    window.addEventListener('mousemove', suppressSyntheticMouseMove, { capture: true });
    window.addEventListener('click', suppressSyntheticClick, { capture: true });
    window.addEventListener('mousemove', syncMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', suppressSyntheticMouseMove, { capture: true });
      window.removeEventListener('click', suppressSyntheticClick, { capture: true });
      window.removeEventListener('mousemove', syncMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isInsideHero, isInteractiveElement]);

  // No DOM element needed — purely event-driven
  return null;
}