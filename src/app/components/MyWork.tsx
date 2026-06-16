import { LockOpen, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useScrollScale } from './hooks/useScrollScale';
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
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={setCardRef(index)}
              id={index === 1 ? 'project-card-2' : undefined}
              className={`group cursor-pointer transition-all duration-700 ease-out origin-top ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
              style={{
                transform: `scale(${scales[index]})`,
                opacity: opacities[index],
              }}
              data-hover
              onClick={() => handleProjectClick(project)}
            >
              <div
                className={`relative ${
                  index === 0
                    ? 'aspect-[16/9] md:aspect-[8/3]'
                    : 'aspect-[16/9]'
                } bg-gray-200 dark:bg-gray-800 hover:opacity-90 transition-all duration-300 ease-in-out mb-2 overflow-hidden`}
              >
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white dark:bg-gray-900 p-1.5">
                  {project.locked ? (
                    <Lock className="w-4 h-4 text-red-500" />
                  ) : (
                    <LockOpen className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium text-vc-light-text dark:text-vc-dark-text">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}