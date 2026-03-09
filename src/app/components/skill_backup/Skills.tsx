import { useState, useRef, useEffect, useCallback } from 'react';
import { ParticleCanvas, ParticleCanvasHandle } from './ParticleCanvas';
import { useScrollScale } from './hooks/useScrollScale';
import exampleImage from 'figma:asset/5bb6a0cebc40881a5efc2e1db8d3c119e825c8ea.png';
import alternateImage from 'figma:asset/a385169d7c0760f2b5a68061f10df6f93458fd52.png';
import snapImage from 'figma:asset/2f626f2e7e176e7c3b4d0f5362652e624f109789.png';

const skillCategories = [
  { title: 'User Research' },
  { title: 'Product Design' },
  { title: 'Product Strategy' },
  { title: 'Design Systems' },
  { title: 'High Fidelity Prototyping' },
  { title: 'Workshop Facilitation' },
];

const SNAP_CARD_INDICES = [1, 4, 5]; // Cards 2, 5, and 6 (0-indexed)
const ANIMATION_DURATION = 2000;

export function Skills() {
  const [isAlternateImage, setIsAlternateImage] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [hasSnapped, setHasSnapped] = useState(false);
  const [showSnapImage, setShowSnapImage] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(skillCategories.length).fill(false)
  );

  const { cardRefs, scales, opacities, setCardRef } = useScrollScale(skillCategories.length);
  const particleCanvasRef = useRef<ParticleCanvasHandle>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // IntersectionObserver for staggered reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;
          lastScrollY.current = currentScrollY;

          if (isScrollingDown) {
            skillCategories.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  if (prev[index]) return prev; // Skip if already visible
                  const next = [...prev];
                  next[index] = true;
                  return next;
                });
              }, index * 150);
            });
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '-50% 0px -50% 0px',
      }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  const createParticleEffects = useCallback(() => {
    SNAP_CARD_INDICES.forEach((cardIndex, snapIndex) => {
      setTimeout(() => {
        const cardElement = cardRefs.current[cardIndex];
        if (!cardElement) return;

        particleCanvasRef.current?.addParticleSystem(
          cardElement,
          ANIMATION_DURATION,
          () => {}
        );

        cardElement.style.transition = 'opacity 0.6s ease-out';
        cardElement.style.opacity = '0';
      }, snapIndex * ANIMATION_DURATION);
    });
  }, [cardRefs]);

  const handleSnap = useCallback(() => {
    if (!hasSnapped) {
      setIsAlternateImage(true);
      setIsSnapped(true);
      setHasSnapped(true);

      setTimeout(() => createParticleEffects(), 50);
      setTimeout(() => setIsAlternateImage(false), 2000);
    } else {
      setShowSnapImage(true);

      setTimeout(() => {
        setIsSnapped(false);
        setShowSnapImage(false);
        setHasSnapped(false);
        particleCanvasRef.current?.clearParticleEffects();

        SNAP_CARD_INDICES.forEach((cardIndex) => {
          const cardElement = cardRefs.current[cardIndex];
          if (cardElement) cardElement.style.opacity = '1';
        });
      }, 1000);
    }
  }, [hasSnapped, createParticleEffects, cardRefs]);

  const currentImage = showSnapImage
    ? snapImage
    : isAlternateImage
      ? alternateImage
      : exampleImage;

  return (
    <section id="skills" className="py-20 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 mb-12" ref={headingRef}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text">
            Skills and Expertise
          </h2>
          <img
            src={currentImage}
            alt="Skills icon"
            className="w-12 h-12 transition-all duration-300 ease-in-out hover:scale-110 -translate-y-1"
            onClick={handleSnap}
            data-hover
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              ref={setCardRef(index)}
              className="relative p-8 bg-white dark:bg-gray-900/50 rounded-none border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center min-h-[150px] transition-all duration-700 ease-out origin-top"
              style={{
                transform: `scale(${scales[index]}) translateY(${visibleCards[index] ? '0' : '4rem'})`,
                opacity: visibleCards[index] ? opacities[index] : 0,
              }}
            >
              <h3 className="font-sans text-xl sm:text-2xl text-vc-light-text dark:text-vc-dark-text">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <ParticleCanvas ref={particleCanvasRef} />
    </section>
  );
}
