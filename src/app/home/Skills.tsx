import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useScrollScale } from '../hooks/useScrollScale';

const skillCategories = [
  { title: 'User Research' },
  { title: 'Product Design' },
  { title: 'Product Strategy' },
  { title: 'Design Systems' },
  { title: 'High Fidelity Prototyping' },
  { title: 'Workshop Facilitation' },
];

export function Skills() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(skillCategories.length).fill(false)
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scales, opacities, setCardRef } = useScrollScale(skillCategories.length);
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

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 mb-12" ref={headingRef}>
          <h2 className="text-3xl font-medium sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text">
            Skills and Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {skillCategories.map((category, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            const isOtherHovered = isAnyHovered && !isHovered;

            // Grid coordinates (3 columns x 2 rows)
            const row = Math.floor(index / 3);
            const col = index % 3;

            const hoveredRow = hoveredIndex !== null ? Math.floor(hoveredIndex / 3) : 0;
            const hoveredCol = hoveredIndex !== null ? hoveredIndex % 3 : 0;

            // Fluid chain reaction: cards contract/push inward towards their adjacent neighbors when a card is hovered
            let shiftX = 0;
            let shiftY = 0;

            if (isHovered) {
              shiftY = -6; // move hovered card slightly upward
            } else if (isOtherHovered) {
              // When hovering on card A (e.g. index 0 - User Research):
              // Card B (index 1 - Product Design) moves right (+shiftX) closer to Card C (index 2 - Product Strategy)
              const deltaCol = col - hoveredCol;
              const deltaRow = row - hoveredRow;

              if (deltaCol > 0) {
                // Cards to the right of the hovered card shift right (closing gap with cards further right)
                shiftX = 20;
              } else if (deltaCol < 0) {
                // Cards to the left of the hovered card shift left
                shiftX = -20;
              }

              if (deltaRow > 0) {
                shiftY = 16;
              } else if (deltaRow < 0) {
                shiftY = -16;
              }
            }

            return (
              <motion.div
                key={category.title}
                ref={setCardRef(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative p-8 bg-[#F7F7F8] dark:bg-gray-900/60 rounded-lg border border-gray-200/60 dark:border-gray-800 flex flex-col items-center justify-center text-center min-h-[150px] origin-center cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${
                  isHovered ? 'z-10 shadow-[0_2px_6px_rgba(0,0,0,0.05)]' : ''
                }`}
                animate={{
                  x: shiftX,
                  y: shiftY + (visibleCards[index] ? 0 : 64),
                  scale: scales[index],
                  opacity: visibleCards[index] ? opacities[index] : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 160,
                  damping: 20,
                  mass: 0.7,
                }}
              >
                <h3 className="font-sans font-medium text-xl sm:text-2xl text-vc-light-text dark:text-vc-dark-text">
                  {category.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}