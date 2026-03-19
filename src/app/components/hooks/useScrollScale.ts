import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollScaleOptions {
  navbarHeight?: number;
  scaleRange?: number;
  opacityRange?: number;
  minScale?: number;
}

/**
 * Applies a scale-down and fade-out effect to cards as they scroll beneath the navbar.
 * Used by MyWork and Skills sections for consistent scroll behavior.
 * Uses rAF throttling to batch DOM reads and prevent layout thrashing.
 */
export function useScrollScale(
  count: number,
  options: ScrollScaleOptions = {}
) {
  const {
    navbarHeight = 80,
    scaleRange = 500,
    opacityRange = 400,
    minScale = 0.9,
  } = options;

  const cardRefs = useRef<(HTMLDivElement | null)[]>(new Array(count).fill(null));
  const [scales, setScales] = useState<number[]>(new Array(count).fill(1));
  const [opacities, setOpacities] = useState<number[]>(new Array(count).fill(1));
  const rafRef = useRef<number>(0);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return; // Skip if a frame is already scheduled

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const newScales: number[] = [];
        const newOpacities: number[] = [];

        cardRefs.current.forEach((card, i) => {
          if (!card) {
            newScales.push(1);
            newOpacities.push(1);
            return;
          }

          const cardTop = card.getBoundingClientRect().top;

          if (cardTop < navbarHeight) {
            const distance = navbarHeight - cardTop;
            newScales.push(Math.max(minScale, 1 - distance / scaleRange));
            newOpacities.push(Math.max(0, 1 - distance / opacityRange));
          } else {
            newScales.push(1);
            newOpacities.push(1);
          }
        });

        // Only update state if values actually changed
        setScales((prev) => {
          for (let i = 0; i < prev.length; i++) {
            if (prev[i] !== newScales[i]) return newScales;
          }
          return prev;
        });
        setOpacities((prev) => {
          for (let i = 0; i < prev.length; i++) {
            if (prev[i] !== newOpacities[i]) return newOpacities;
          }
          return prev;
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [navbarHeight, scaleRange, opacityRange, minScale]);

  return { cardRefs, scales, opacities, setCardRef };
}