import { LockOpen, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useCallback, useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollScale } from '../hooks/useScrollScale';
import casestudyOne from "../../asset/images/case-one-banner.jpg";
import casestudyTwo from "../../asset/images/case-two-banner.jpg";
import casestudyThree from "../../asset/images/case-three-banner.jpg";

const projects = [
  {
    id: 1,
    title: 'Model & Datasets',
    description: 'An all-in-one AI platform to explore, share, and discover datasets & models',
    image:
      casestudyOne,
    locked: false,
    route: '/project/1',
  },
  {
    id: 2,
    title: 'Dashboard Redesign',
    description: 'Transforming a cluttered analytics interface into a focused, role-based experience',
    image:
      casestudyTwo,
    locked: false,
    route: '/project/2',
  },
  {
    id: 3,
    title: 'Design System',
    description: 'Building a scalable design language with 240+ components for healthcare',
    image:
      casestudyThree,
    locked: false,
    route: '/project/3',
  },
];

export function MyWork() {
  const navigate = useNavigate();
  const { scales, opacities, setCardRef } = useScrollScale(projects.length);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleProjectClick = useCallback(
    (project: (typeof projects)[number]) => {
      if (project.route) {
        sessionStorage.setItem('homeScrollY', String(window.scrollY));
        navigate(project.route);
      }
    },
    [navigate]
  );

  return (
    <section id="my-work" className="py-20 bg-vc-light-bg dark:bg-vc-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-medium sm:text-4xl md:text-5xl mb-12 text-vc-light-text dark:text-vc-dark-text">
          My Tetris work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            const isOtherHovered = isAnyHovered && !isHovered;

            // Compute fluid displacement matching Skills cards motion
            let shiftX = 0;
            let shiftY = 0;

            if (isHovered) {
              shiftY = -6; // Hovered card shifts slightly upward
            } else if (isOtherHovered) {
              if (index === 0) {
                // Card 0 (top full width) shifts up if card 1 or 2 hovered
                shiftY = -16;
              } else if (hoveredIndex === 0) {
                // Cards 1 & 2 shift down if card 0 hovered
                shiftY = 16;
              } else if (index === 1 && hoveredIndex === 2) {
                // Card 1 shifts left if card 2 hovered
                shiftX = -20;
              } else if (index === 2 && hoveredIndex === 1) {
                // Card 2 shifts right if card 1 hovered
                shiftX = 20;
              }
            }

            return (
              <motion.div
                key={project.id}
                ref={setCardRef(index)}
                id={index === 1 ? 'project-card-2' : undefined}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group cursor-pointer origin-top ${
                  index === 0 ? 'md:col-span-2' : ''
                } ${isHovered ? 'z-10' : ''}`}
                animate={{
                  x: shiftX,
                  y: shiftY,
                  scale: scales[index],
                  opacity: opacities[index],
                }}
                transition={{
                  type: 'spring',
                  stiffness: 160,
                  damping: 20,
                  mass: 0.7,
                }}
                data-hover
                onClick={() => handleProjectClick(project)}
              >
                <div
                  className={`relative ${
                    index === 0
                      ? 'aspect-[16/9] md:aspect-[8/3]'
                      : 'aspect-[16/9]'
                  } bg-gray-200 dark:bg-gray-800 hover:opacity-90 transition-all duration-500 ease-out mb-2 overflow-hidden rounded-lg`}
                >
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-1.5 rounded-md">
                    {project.locked ? (
                      <Lock className="w-4 h-4 text-red-500" />
                    ) : (
                      <LockOpen className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-vc-light-text dark:text-vc-dark-text group-hover:text-vc-primary transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300 mt-0.5 leading-snug">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}