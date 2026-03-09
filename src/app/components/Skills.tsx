import { useState, useRef, useEffect } from 'react';
import { useScrollScale } from './hooks/useScrollScale';

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

  const { cardRefs, scales, opacities, setCardRef } = useScrollScale(skillCategories.length);
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text">
            Skills and Expertise
          </h2>
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
    </section>
  );
}
