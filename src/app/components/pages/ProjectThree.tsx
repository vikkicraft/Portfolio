import {
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { useNavigate } from "react-router";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  AnimatePresence,
} from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import banner from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1624607702690 from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1770507423228 from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1581682101370 from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1639493115941 from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1767449441925 from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1768987439382 from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1759661966728 from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1662469567531 from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1622814859704 from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1641567535859 from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1716703742354 from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1653548410454 from "../../../asset/images/case-two-banner.jpg";
import imgPhoto1580894894513 from "../../../asset/images/case-two-banner.jpg";

// ============================================================
// Animation Constants
// ============================================================

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const viewportOnce = { once: true, margin: "-80px" } as const;

// ============================================================
// Image Assets
// ============================================================

const HERO_IMG =
  banner;

const galleryImages = [
  {
    src: imgPhoto1624607702690,
    alt: "Minimal flat lay",
  },
  {
    src: imgPhoto1770507423228,
    alt: "Color palette typography",
  },
  {
    src: imgPhoto1581682101370,
    alt: "Geometric patterns",
  },
  {
    src: imgPhoto1639493115941,
    alt: "Abstract gradient",
  },
  {
    src: imgPhoto1767449441925,
    alt: "Digital interface",
  },
];

const contentImages = {
  research:
    imgPhoto1768987439382,
  prototype:
    imgPhoto1759661966728,
  testing:
    imgPhoto1662469567531,
  system:
    imgPhoto1622814859704,
  dashboard:
    imgPhoto1641567535859,
  collab:
    imgPhoto1716703742354,
};

// ============================================================
// HeroSection Component
// ============================================================

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);
  const y = useTransform(scrollProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const height = el.offsetHeight;
      if (height === 0) return;
      const progress = Math.min(Math.max(-rect.top / height, 0), 1);
      scrollProgress.set(progress);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [scrollProgress]);

  return (
    <div ref={ref} className="relative h-[85vh] md:h-[95vh] overflow-hidden">
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.1 }}
        className="absolute inset-0 z-20 bg-vc-light-bg dark:bg-vc-dark-bg origin-bottom"
      />
      <motion.div
        style={{ y }}
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay: 0.2 }}
      >
        <ImageWithFallback
          src={HERO_IMG}
          alt="Design System"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>
      <motion.div style={{ opacity }} className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 md:pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.8 }}
          >
            <p className="text-white/70 text-sm tracking-[0.2em] uppercase mb-4">
              Case Study
            </p>
            <h1 className="text-white font-medium text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight max-w-4xl">
              Design System
            </h1>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================
// MetaStrip Component
// ============================================================

function MetaStrip() {
  const items = [
    { label: "Client", value: "Healthcare Platform" },
    { label: "Role", value: "Design Systems Lead" },
    { label: "Year", value: "2024" },
    { label: "Duration", value: "16 Weeks" },
  ];

  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-12 md:py-16 border-b border-gray-200 dark:border-gray-800"
    >
      {items.map((item) => (
        <motion.div key={item.label} variants={fadeUp}>
          <p className="text-xs tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500 mb-2">
            {item.label}
          </p>
          <p className="text-vc-light-text dark:text-vc-dark-text text-sm">
            {item.value}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================
// SectionLabel Component
// ============================================================

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex items-center gap-3 mb-8 md:mb-12"
    >
      <span className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
        {number}
      </span>
      <span className="w-8 h-px bg-gray-300 dark:bg-gray-700" />
      <span className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
        {label}
      </span>
    </motion.div>
  );
}

// ============================================================
// TwoColumnText Component
// ============================================================

function TwoColumnText({
  heading,
  leftText,
  rightText,
  leftHeading,
  rightHeading,
}: {
  heading?: string;
  leftText: React.ReactNode;
  rightText: string;
  leftHeading?: string;
  rightHeading?: string;
}) {
  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {heading && (
        <motion.h2
          variants={fadeUp}
          className="text-3xl font-medium sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text mb-10 md:mb-14 max-w-3xl tracking-tight"
        >
          {heading}
        </motion.h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
        <motion.div variants={fadeUp}>
          {leftHeading && (
            <p className="text-xs tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500 mb-4">
              {leftHeading}
            </p>
          )}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {leftText}
          </p>
        </motion.div>
        <motion.div variants={fadeUp}>
          {rightHeading && (
            <p className="text-xs tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500 mb-4">
              {rightHeading}
            </p>
          )}
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {rightText}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================
// FullBleedImage Component
// ============================================================

function FullBleedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden"
    >
      <ImageWithFallback src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}

// ============================================================
// TwoImageGrid Component
// ============================================================

function TwoImageGrid({
  src1,
  alt1,
  src2,
  alt2,
}: {
  src1: string;
  alt1: string;
  src2: string;
  alt2: string;
}) {
  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
    >
      <motion.div variants={fadeUp} className="aspect-[4/3] overflow-hidden">
        <ImageWithFallback src={src1} alt={alt1} className="w-full h-full object-contain" />
      </motion.div>
      <motion.div variants={fadeUp} className="aspect-[4/3] overflow-hidden">
        <ImageWithFallback src={src2} alt={alt2} className="w-full h-full object-contain" />
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// HorizontalGallery Component
// ============================================================

function HorizontalGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto pb-6 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
            className="flex-shrink-0 w-[75vw] sm:w-[55vw] md:w-[40vw] lg:w-[30vw] aspect-[3/4] overflow-hidden"
          >
            <ImageWithFallback
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// StatsRow Component
// ============================================================

function StatsRow() {
  const stats = [
    { value: "240+", label: "Components in the design system" },
    { value: "-70%", label: "Reduction in design-to-dev handoff time" },
    { value: "6x", label: "Faster prototyping with shared tokens" },
    { value: "98%", label: "Adoption rate across product teams" },
  ];

  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-16 md:py-24 border-y border-gray-200 dark:border-gray-800"
    >
      {stats.map((stat) => (
        <motion.div key={stat.value} variants={fadeUp} className="text-center">
          <p className="text-3xl sm:text-4xl md:text-5xl text-vc-primary mb-3 tracking-tight">
            {stat.value}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 tracking-wide">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ============================================================
// NextProject Component
// ============================================================

function NextProject({
  onNextClick,
  onAllClick,
}: {
  onNextClick: () => void;
  onAllClick: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="py-20 md:py-32"
    >
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
          Next Project
        </p>
        <button
          onClick={onAllClick}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-vc-light-text dark:hover:text-vc-dark-text transition-colors cursor-pointer"
          data-hover
        >
          All Projects
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={onNextClick}
        className="w-full text-left group cursor-pointer"
        data-hover
      >
        <div className="relative aspect-[21/9] overflow-hidden mb-6">
          <ImageWithFallback
            src={contentImages.dashboard}
            alt="Next project preview"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl text-vc-light-text dark:text-vc-dark-text tracking-tight group-hover:text-vc-primary transition-colors duration-300">
          Model & Datasets
        </h3>
      </button>
    </motion.div>
  );
}

// ============================================================
// ProjectThree — Main Page Component
// ============================================================

export function ProjectThree() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleBackToHome = useCallback(() => navigate("/"), [navigate]);
  const handleNextProject = useCallback(() => navigate("/project/1"), [navigate]);

  const problemRef = useRef<HTMLDivElement>(null);
  const problemStickyOpacity = useMotionValue(1);
  useEffect(() => {
    const update = () => {
      const el = problemRef.current;
      if (!el) return;
      const progress = Math.min(Math.max(-el.getBoundingClientRect().top / el.offsetHeight, 0), 1);
      const opacity = progress < 0.25 ? 1 : progress > 0.6 ? 0 : 1 - (progress - 0.25) / 0.35;
      problemStickyOpacity.set(opacity);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [problemStickyOpacity]);

  const solutionRef = useRef<HTMLDivElement>(null);
  const solutionInView = useInView(solutionRef, { once: true, margin: "-10%" });
  const solutionOpacity = useMotionValue(0);
  useEffect(() => {
    solutionOpacity.set(solutionInView ? 1 : 0);
  }, [solutionInView, solutionOpacity]);

  useEffect(() => {
    const el = solutionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowScrollTop(entry.boundingClientRect.top < window.innerHeight),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-vc-light-bg dark:bg-vc-dark-bg min-h-screen -mt-16">
      {/* Scroll-to-top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-40 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/60 cursor-pointer transition-colors"
            data-hover
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <HeroSection />

      {/* Section 01 — Overview */}
      <div id="content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MetaStrip />

        <div className="py-20 md:py-32">
          <SectionLabel number="01" label="Overview" />
          <TwoColumnText
            heading="Building a scalable design language for healthcare"
            leftHeading="Project Summary"
            rightHeading="Context"
            leftText={
              <>
                The{" "}
                <span className="font-semibold">Design System</span> project
                established a unified component library, token architecture, and
                documentation framework for a healthcare platform serving millions of
                patients. The system ensures accessibility compliance (WCAG 2.1 AA)
                across every touchpoint.
              </>
            }
            rightText="The healthcare platform had grown organically across 4 product teams, each building their own UI patterns. This led to visual inconsistency, duplicated effort, and accessibility gaps — critical issues in a regulated industry where every pixel impacts patient trust."
          />
        </div>
      </div>

      {/* Full Bleed Image — Research */}
      <FullBleedImage src={contentImages.research} alt="Research phase" />

      {/* Section 02 — Problem */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={problemRef} className="relative pt-20 md:pt-32 pb-32 md:pb-48">
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col md:flex-row gap-10 md:gap-16"
          >
            <motion.div
              style={{ opacity: problemStickyOpacity }}
              className="relative md:w-2/5 md:sticky md:top-32 md:self-start shrink-0"
            >
              <SectionLabel number="02" label="Problem" />
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-medium sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text tracking-tight"
              >
                Four teams, four different design languages
              </motion.h2>
            </motion.div>

            <div className="md:w-3/5">
              <motion.p
                variants={fadeUp}
                className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mb-10"
              >
                Without a shared design system, each product team had developed their own
                component libraries, color palettes, and interaction patterns. Patients
                navigating between features experienced jarring visual shifts that eroded
                trust in a platform handling sensitive health data.
              </motion.p>
              <motion.div variants={staggerChildren} className="flex flex-col gap-6">
                {[
                  "Visual inconsistency across products created a fragmented patient experience and reduced perceived reliability",
                  "Engineers rebuilt similar components from scratch for each team, wasting an estimated 30% of frontend development time",
                  "Accessibility compliance was unevenly applied — some screens met WCAG AA, others failed basic contrast requirements",
                  "Onboarding new designers took 6+ weeks because there were no shared patterns, tokens, or documentation to reference",
                ].map((point, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex items-start gap-4 p-5 border border-gray-200 dark:border-gray-800"
                  >
                    <span className="text-xs text-vc-primary mt-1 shrink-0">
                      0{i + 1}
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Section 03 — Solution */}
        <motion.div
          ref={solutionRef}
          style={{ opacity: solutionOpacity }}
          className="relative pb-20 md:pb-32"
        >
          <SectionLabel number="03" label="Solution" />
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-medium sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text mb-10 md:mb-14 max-w-3xl tracking-tight"
            >
              One system, infinite composability
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mb-10"
            >
              We built a comprehensive design system from the ground up — starting with
              design tokens and primitives, then composing them into production-ready
              components. The system was designed to be{" "}
              <span className="font-semibold">accessible by default</span> and{" "}
              <span className="font-semibold">themeable per product</span> while
              maintaining visual cohesion.
            </motion.p>
            <div className="flex flex-col gap-4 mb-10">
              <motion.p
                variants={fadeUp}
                className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-semibold"
              >
                The system was structured in three layers:
              </motion.p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
                <motion.div
                  variants={fadeUp}
                  className="p-5 border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-xs tracking-[0.15em] uppercase text-vc-primary mb-4">
                    01 — Foundation Layer
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Design tokens for color, spacing, typography, and elevation.
                    Semantic naming ensures tokens adapt across themes while maintaining
                    accessibility ratios automatically.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  className="p-5 border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-xs tracking-[0.15em] uppercase text-vc-primary mb-4">
                    02 — Component Layer
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    240+ components built with React and documented in Storybook. Each
                    component ships with built-in ARIA attributes, keyboard navigation,
                    and responsive behavior out of the box.
                  </p>
                </motion.div>
              </div>
            </div>
            <motion.p
              variants={fadeUp}
              className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl"
            >
              The third layer — the pattern library — documents how components combine
              into common UX flows like patient onboarding, appointment scheduling, and
              health record browsing. This gives teams a head start on new features while
              ensuring consistency across the platform.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Two Image Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TwoImageGrid
          src1={contentImages.prototype}
          alt1="Component library"
          src2={contentImages.system}
          alt2="Token architecture"
        />
      </div>

      {/* Section 04 — Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 md:py-32">
          <SectionLabel number="04" label="Process" />
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-medium sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text mb-10 md:mb-14 max-w-3xl tracking-tight"
            >
              From audit to adoption in 16 weeks
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <motion.div variants={fadeUp}>
                <div className="space-y-8">
                  {[
                    {
                      week: "Weeks 1-4",
                      title: "Component Audit & Token Architecture",
                      desc: "Catalogued 380+ existing components across all teams, identified 62% duplication, and designed the semantic token structure that would unify them.",
                    },
                    {
                      week: "Weeks 5-8",
                      title: "Foundation & Primitives",
                      desc: "Built the token system, primitive components (Button, Input, Card, etc.), and established the contribution model for cross-team collaboration.",
                    },
                    {
                      week: "Weeks 9-12",
                      title: "Complex Components & Patterns",
                      desc: "Composed primitives into complex patterns — data tables, form wizards, navigation systems — each with comprehensive accessibility testing.",
                    },
                    {
                      week: "Weeks 13-16",
                      title: "Documentation & Rollout",
                      desc: "Launched Storybook documentation, ran adoption workshops for all 4 teams, and established the governance model for ongoing system evolution.",
                    },
                  ].map((phase, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-gray-200 dark:border-gray-800 pl-6"
                    >
                      <p className="text-xs text-vc-primary tracking-wider uppercase mb-1">
                        {phase.week}
                      </p>
                      <p className="text-vc-light-text dark:text-vc-dark-text mb-1">
                        {phase.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="aspect-[3/4] overflow-hidden">
                <ImageWithFallback
                  src={contentImages.collab}
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section 05 — Research */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-20 md:pb-32">
          <SectionLabel number="05" label="Research" />
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-medium sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text mb-10 md:mb-14 max-w-3xl tracking-tight"
            >
              Learning from both users and makers
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <motion.div variants={fadeUp} className="space-y-8">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Design systems serve two audiences: end users who interact with the
                  products, and the designers and engineers who build them. We researched
                  both to ensure the system would be adopted internally while improving
                  the patient experience externally.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      metric: "380+",
                      label: "Existing components audited",
                      detail:
                        "Across 4 product teams, revealing 62% overlap and 23 accessibility failures.",
                    },
                    {
                      metric: "16",
                      label: "Designer & engineer interviews",
                      detail:
                        "Understanding pain points in the current workflow and wishlist items for the new system.",
                    },
                    {
                      metric: "6",
                      label: "Industry design systems studied",
                      detail:
                        "Material Design, Carbon, Polaris, Atlassian, Lightning, and Primer for governance patterns.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="border-l-2 border-vc-primary/30 pl-6">
                      <p className="text-2xl sm:text-3xl text-vc-primary tracking-tight mb-1">
                        {item.metric}
                      </p>
                      <p className="text-vc-light-text dark:text-vc-dark-text text-sm mb-1">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="space-y-6">
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={imgPhoto1653548410454}
                    alt="Wireframe sketches"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={imgPhoto1580894894513}
                    alt="Usability testing"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
            <motion.div
              variants={fadeUp}
              className="mt-12 md:mt-16 p-8 md:p-10 border border-gray-200 dark:border-gray-800"
            >
              <p className="text-xs tracking-[0.15em] uppercase text-vc-primary mb-4">
                Key Insight
              </p>
              <p className="text-xl sm:text-2xl text-vc-light-text dark:text-vc-dark-text tracking-tight max-w-3xl mb-4">
                "The best design system is one that teams actually want to use."
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                Our research showed that previous standardization attempts failed not
                because of poor components, but because of poor developer experience.
                Teams bypassed the system when it was faster to build from scratch. This
                insight shaped our obsession with API ergonomics, documentation quality,
                and frictionless adoption paths.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Section 06 — Gallery */}
      <div className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14">
          <SectionLabel number="06" label="Gallery" />
        </div>
        <div className="pl-4 sm:pl-6 lg:pl-8">
          <HorizontalGallery />
        </div>
      </div>

      {/* Full Bleed Image — Testing */}
      <FullBleedImage src={contentImages.testing} alt="Team collaboration" />

      {/* Section 07 — Validation, Section 08 — Reflection, Stats & Next */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 md:py-32">
          <SectionLabel number="07" label="Validation" />
          <TwoColumnText
            heading="Adoption metrics exceeded every target"
            leftText="Within 8 weeks of launch, all 4 product teams had migrated their core flows to the new system. The 98% adoption rate was driven by demonstrably faster development cycles — teams reported building new features 6x faster using pre-built patterns versus their old custom components."
            rightText="Accessibility compliance jumped from 64% to 100% across all products. Patient satisfaction scores for interface consistency improved by 34 points. The governance model we established — with rotating 'system stewards' from each team — ensured the system continued evolving without becoming a bottleneck."
          />
        </div>

        <StatsRow />

        <div className="py-20 md:py-32">
          <SectionLabel number="08" label="Reflection" />
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-medium sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text mb-10 md:mb-14 max-w-3xl tracking-tight"
            >
              What I learned along the way
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
              <motion.div variants={fadeUp} className="space-y-6">
                <div>
                  <p className="text-vc-light-text dark:text-vc-dark-text mb-2">
                    What went well
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Starting with tokens instead of components was the right call. It
                    forced alignment on the visual language before anyone built a single
                    button. The governance model with rotating stewards created genuine
                    ownership across all teams.
                  </p>
                </div>
                <div>
                  <p className="text-vc-light-text dark:text-vc-dark-text mb-2">
                    Scope of impact
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    The system now powers every patient-facing screen and internal tool.
                    It includes 240+ components, 48 documented patterns, comprehensive
                    Storybook documentation, and Figma libraries that stay in sync with
                    code through automated tooling.
                  </p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="space-y-6">
                <div>
                  <p className="text-vc-light-text dark:text-vc-dark-text mb-2">
                    What could improve
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    We should have built the Figma-to-code sync pipeline from day one
                    instead of adding it in week 14. The manual sync period created
                    drift between design files and production components that took weeks
                    to reconcile.
                  </p>
                </div>
                <div>
                  <p className="text-vc-light-text dark:text-vc-dark-text mb-2">
                    Looking ahead
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Future plans include AI-assisted component generation, automated
                    visual regression testing in CI/CD, and expanding the system to
                    support native iOS and Android platforms with shared design tokens.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <NextProject onNextClick={handleNextProject} onAllClick={handleBackToHome} />
      </div>
    </div>
  );
}
