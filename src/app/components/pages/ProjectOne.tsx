import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
const EASE_SMOOTH = [0.25, 0.1, 0.25, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

const riseChildren = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO, delay: i * 0.1 },
  }),
};

const viewportOnce = { once: true } as const;
const viewportOnceMargin = { once: true, margin: "-50px" } as const;

const metaItems = [
  { label: 'ROLE', value: 'Product Designer' },
  { label: 'TIMELINE', value: 'Jan \u2013 Mar 2025' },
  { label: 'TEAM', value: '3 Designers, 5 Engineers' },
  { label: 'TOOLS', value: 'Figma, React, Tailwind' },
] as const;

const challengePoints = [
  'Complex multi-step workflows with no clear progress indicators',
  'Inconsistent UI patterns across different sections of the app',
  'Low discoverability of powerful features hidden in deep menus',
  'High drop-off rates during onboarding flow',
] as const;

const processSteps = [
  {
    num: '01',
    title: 'Research & Discovery',
    desc: 'Conducted 20+ user interviews, analyzed usage analytics, and mapped existing user journeys to identify friction points.',
  },
  {
    num: '02',
    title: 'Ideation & Prototyping',
    desc: 'Explored multiple concepts through wireframes and interactive prototypes, testing with users at each iteration.',
  },
  {
    num: '03',
    title: 'Delivery & Validation',
    desc: 'Worked closely with engineers on implementation, ran A/B tests, and iterated based on post-launch metrics.',
  },
] as const;

const resultStats = [
  { value: '+40%', color: 'text-vc-primary', desc: 'Improvement in task completion rates' },
  { value: '\u221225%', color: 'text-vc-secondary', desc: 'Reduction in support tickets' },
  { value: '+60%', color: 'text-vc-primary', desc: 'Increase in feature adoption' },
] as const;

export function ProjectOne() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className="pt-16 bg-vc-light-bg dark:bg-vc-dark-bg min-h-screen">
      {/* Back button */}
      <div className="fixed top-20 left-0 right-0 z-40 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            animate={{
              borderRadius: isScrolled ? '9999px' : '0px',
              paddingTop: isScrolled ? '10px' : '8px',
              paddingBottom: isScrolled ? '10px' : '8px',
              paddingLeft: isScrolled ? '10px' : '16px',
              paddingRight: isScrolled ? '10px' : '16px',
              gap: isScrolled ? '0px' : '8px',
            }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            onClick={handleBackToHome}
            className="pointer-events-auto flex items-center h-9 text-gray-600 dark:text-gray-400 hover:text-vc-light-text dark:hover:text-vc-dark-text cursor-pointer border border-gray-300 dark:border-gray-600 bg-vc-light-bg dark:bg-vc-dark-bg"
            data-hover
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <AnimatePresence mode="wait">
              {!isScrolled && (
                <motion.span
                  key="back-text"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                  className="text-sm overflow-hidden whitespace-nowrap"
                >
                  Back to Home
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Spacer for fixed back button */}
      <div className="h-16"></div>

      {/* Hero image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="aspect-[8/3] overflow-hidden"
        >
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 0.4, ease: EASE_SMOOTH }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Project Title 1"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Project info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Title and meta */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceMargin}
          className="mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="text-4xl sm:text-5xl md:text-6xl text-vc-light-text dark:text-vc-dark-text mb-6"
          >
            Project Title 1
          </motion.h1>
          <div className="w-full h-px bg-gray-300 dark:bg-gray-700 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metaItems.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={riseChildren}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1 tracking-wide">{item.label}</p>
                <p className="text-sm text-vc-light-text dark:text-vc-dark-text">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Overview */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceMargin}
          className="mb-16 max-w-3xl"
        >
          <h2 className="text-2xl sm:text-3xl text-vc-light-text dark:text-vc-dark-text mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This project focused on redesigning the core user experience for a SaaS platform serving over 50,000 active users. The goal was to simplify complex workflows, reduce cognitive load, and increase feature adoption across the product.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Through extensive user research, iterative prototyping, and close collaboration with engineering, we delivered a solution that improved task completion rates by 40% and reduced support tickets by 25%.
          </p>
        </motion.div>

        {/* Challenge */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceMargin}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl text-vc-light-text dark:text-vc-dark-text mb-4">The Challenge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              className="max-w-xl"
              variants={riseChildren}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Users were struggling with a fragmented navigation structure and inconsistent interaction patterns that had evolved organically over several years. Key pain points included:
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                {challengePoints.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2"
                    custom={i + 1}
                    variants={riseChildren}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                  >
                    <span className="text-vc-primary mt-1">&mdash;</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="aspect-[4/3] overflow-hidden"
              variants={riseChildren}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1630852722172-a1943ca8a55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwY2FzZSUyMHN0dWR5fGVufDF8fHx8MTc3MjQ2MTQxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Design research"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Process */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceMargin}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl text-vc-light-text dark:text-vc-dark-text mb-4">Process</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
            We followed a structured design thinking approach, moving from research and discovery through ideation, prototyping, and validation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                className="border border-gray-200 dark:border-gray-700 p-6"
                custom={i}
                variants={riseChildren}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-2 tracking-wide">{step.num}</p>
                <h3 className="text-vc-light-text dark:text-vc-dark-text mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="aspect-[16/7] overflow-hidden"
            variants={rise}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnceMargin}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1532102235608-dc8fc689c9ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBwcm9jZXNzJTIwd2lyZWZyYW1lfGVufDF8fHx8MTc3MjQ2MTQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Design process"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Results */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceMargin}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl text-vc-light-text dark:text-vc-dark-text mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            {resultStats.map((stat, i) => (
              <motion.div
                key={stat.value}
                className="border border-gray-200 dark:border-gray-700 p-6"
                custom={i}
                variants={riseChildren}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
              >
                <p className={`text-4xl ${stat.color} mb-2`}>{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="max-w-3xl">
            <p className="text-gray-600 dark:text-gray-400">
              The redesign was rolled out in phases over 8 weeks, with positive reception from both users and stakeholders. The new design system components are now used across 3 additional product areas.
            </p>
          </div>
        </motion.div>

        {/* Next project teaser */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnceMargin}
          className="py-12 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">Next Project</p>
            <button
              onClick={handleBackToHome}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-vc-primary dark:hover:text-vc-primary transition-colors cursor-pointer"
              data-hover
            >
              View All Projects &rarr;
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}