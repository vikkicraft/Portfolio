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
import banner from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1651342489820 from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1639493115941 from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1581682101370 from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1622814859704 from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1691525891769 from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1653548410454 from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1730818027653 from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1580894894513 from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1770507423228 from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1759661966728 from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1662469567531 from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1759884247160 from "../../../asset/images/case-three-banner.jpg";
import imgPhoto1716703742354 from "../../../asset/images/case-three-banner.jpg";

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
    src: imgPhoto1651342489820,
    alt: "Architecture detail",
  },
  {
    src: imgPhoto1639493115941,
    alt: "Abstract gradient",
  },
  {
    src: imgPhoto1581682101370,
    alt: "Geometric abstract",
  },
  {
    src: imgPhoto1622814859704,
    alt: "Modern workspace",
  },
  {
    src: imgPhoto1691525891769,
    alt: "City skyline",
  },
];

const contentImages = {
  research:
    imgPhoto1653548410454,
  prototype:
    imgPhoto1730818027653,
  testing:
    imgPhoto1580894894513,
  system:
    imgPhoto1770507423228,
  dashboard:
    imgPhoto1759661966728,
  collab:
    imgPhoto1662469567531,
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
          alt="Dashboard Redesign"
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
              Dashboard Redesign
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
    { label: "Client", value: "FinTech Startup" },
    { label: "Role", value: "Lead Designer" },
    { label: "Year", value: "2025" },
    { label: "Duration", value: "8 Weeks" },
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
        <ImageWithFallback src={src1} alt={alt1} className="w-full h-full object-cover" />
      </motion.div>
      <motion.div variants={fadeUp} className="aspect-[4/3] overflow-hidden">
        <ImageWithFallback src={src2} alt={alt2} className="w-full h-full object-cover" />
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
    { value: "4.8x", label: "Faster decision-making with new dashboards" },
    { value: "-45%", label: "Reduction in user-reported confusion" },
    { value: "+88%", label: "Increase in daily active usage" },
    { value: "150+", label: "Components in the new design system" },
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
          Design System
        </h3>
      </button>
    </motion.div>
  );
}

// ============================================================
// ProjectTwo — Main Page Component
// ============================================================

export function ProjectTwo() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleBackToHome = useCallback(() => navigate("/"), [navigate]);
  const handleNextProject = useCallback(() => navigate("/project/3"), [navigate]);

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
            heading="Redesigning the analytics dashboard for clarity and speed"
            leftHeading="Project Summary"
            rightHeading="Context"
            leftText={
              <>
                The{" "}
                <span className="font-semibold">Dashboard Redesign</span> project
                focused on transforming a cluttered, legacy analytics interface into a
                clean, intuitive experience. The goal was to surface critical financial
                metrics faster while reducing cognitive load for daily users.
              </>
            }
            rightText="The client, a fast-growing fintech startup, had outgrown their initial dashboard. As the product scaled to 50K+ users, the original interface became a bottleneck — key metrics were buried, navigation was confusing, and new users took weeks to feel productive."
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
                Information overload with no clear hierarchy
              </motion.h2>
            </motion.div>

            <div className="md:w-3/5">
              <motion.p
                variants={fadeUp}
                className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mb-10"
              >
                The existing dashboard tried to show everything at once, resulting in a
                wall of charts and numbers that overwhelmed users instead of empowering
                them. Critical KPIs were lost among secondary metrics.
              </motion.p>
              <motion.div variants={staggerChildren} className="flex flex-col gap-6">
                {[
                  "Users couldn't identify the most important metrics at a glance, leading to delayed decision-making",
                  "Navigation between different data views required 4+ clicks, creating friction in daily workflows",
                  "The dashboard lacked responsive design, forcing mobile users to pinch and zoom constantly",
                  "No customization options meant every user saw the same view regardless of their role or priorities",
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
              A focused, role-based dashboard experience
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mb-10"
            >
              We redesigned the dashboard around the principle of{" "}
              <span className="font-semibold">progressive disclosure</span> — showing
              users exactly what they need when they need it. The new interface adapts
              to user roles, surfacing the most relevant metrics first.
            </motion.p>
            <div className="flex flex-col gap-4 mb-10">
              <motion.p
                variants={fadeUp}
                className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-semibold"
              >
                The redesign was built on two core principles:
              </motion.p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
                <motion.div
                  variants={fadeUp}
                  className="p-5 border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-xs tracking-[0.15em] uppercase text-vc-primary mb-4">
                    01 — Progressive Disclosure
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Surface the top 3-5 KPIs immediately, with deeper analytics
                    available through intuitive drill-downs. Users see a clean
                    summary first, then explore details on demand.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  className="p-5 border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-xs tracking-[0.15em] uppercase text-vc-primary mb-4">
                    02 — Role-Based Views
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Executives, analysts, and operations teams each get a tailored
                    default view. Customizable widget layouts let users further
                    personalize their workspace without overwhelming the base
                    experience.
                  </p>
                </motion.div>
              </div>
            </div>
            <motion.p
              variants={fadeUp}
              className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl"
            >
              The new dashboard reduced time-to-insight by 4.8x while maintaining
              access to all underlying data. By establishing a clear visual hierarchy
              and consistent interaction patterns, we eliminated the learning curve
              that had plagued the previous version.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Two Image Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TwoImageGrid
          src1={contentImages.prototype}
          alt1="Interface prototype"
          src2={contentImages.system}
          alt2="Design system"
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
              From audit to launch in 8 weeks
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <motion.div variants={fadeUp}>
                <div className="space-y-8">
                  {[
                    {
                      week: "Weeks 1-2",
                      title: "UX Audit & Stakeholder Interviews",
                      desc: "Conducted a comprehensive heuristic evaluation of the existing dashboard and interviewed 12 stakeholders across executive, analyst, and operations roles to map their daily workflows.",
                    },
                    {
                      week: "Weeks 3-4",
                      title: "Information Architecture & Wireframes",
                      desc: "Reorganized the metric hierarchy based on user research, created role-based wireframes, and tested 8 different layout patterns for optimal information density.",
                    },
                    {
                      week: "Weeks 5-6",
                      title: "High-Fidelity Design & Prototyping",
                      desc: "Built interactive prototypes with real data connections, designed the component library, and conducted 3 rounds of usability testing with 6 participants each.",
                    },
                    {
                      week: "Weeks 7-8",
                      title: "Development Handoff & Beta",
                      desc: "Delivered detailed specs with Figma dev mode, supported engineering during implementation, and ran a 2-week beta with the client's power users.",
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
              Uncovering the real pain behind dashboard fatigue
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <motion.div variants={fadeUp} className="space-y-8">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We combined quantitative analytics with qualitative interviews to
                  build a complete picture of how different user segments interacted
                  with the existing dashboard. Session recordings revealed that users
                  spent 68% of their time searching rather than analyzing.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      metric: "12",
                      label: "Stakeholder interviews conducted",
                      detail:
                        "Spanning executives, analysts, and operations across 3 organizational levels.",
                    },
                    {
                      metric: "2,400+",
                      label: "Session recordings analyzed",
                      detail:
                        "Heat maps and click patterns revealed the most underused and overused features.",
                    },
                    {
                      metric: "5",
                      label: "Competing products benchmarked",
                      detail:
                        "Analysis of Stripe, Plaid, Mercury, Brex, and Ramp dashboards for best practices.",
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
                    src={imgPhoto1759884247160}
                    alt="Research brainstorming session"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={imgPhoto1716703742354}
                    alt="Design review meeting"
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
                "Users don't need more data — they need the right data at the right
                moment."
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                The most impactful finding was that dashboard overload wasn't a data
                problem but a hierarchy problem. Users had access to every metric but
                lacked context about which ones mattered most for their current task.
                This insight drove our progressive disclosure approach.
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
      <FullBleedImage src={contentImages.testing} alt="User testing" />

      {/* Section 07 — Validation, Section 08 — Reflection, Stats & Next */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 md:py-32">
          <SectionLabel number="07" label="Validation" />
          <TwoColumnText
            heading="Real-time metrics validated the new hierarchy"
            leftText="We conducted A/B testing with 500 active users over two weeks. The new dashboard showed a 4.8x improvement in time-to-insight for executive users, and a 45% reduction in support tickets related to data confusion. Task completion rates improved across all three user segments."
            rightText="Post-launch surveys revealed a Net Promoter Score of 72 for the new dashboard (up from 31). Users particularly praised the role-based default views and the ability to customize their layout without losing the curated experience. Mobile usage increased by 340% within the first month."
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
                    The progressive disclosure approach was a breakthrough. Instead of
                    fighting over which metrics to show, we created a system that
                    adapts. The role-based defaults eliminated 90% of first-week
                    confusion for new users.
                  </p>
                </div>
                <div>
                  <p className="text-vc-light-text dark:text-vc-dark-text mb-2">
                    Scope of impact
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    The project touched every layer — from the component library and
                    design tokens to the data visualization framework and responsive
                    grid system. We delivered 150+ components that now serve as the
                    foundation for all future product screens.
                  </p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="space-y-6">
                <div>
                  <p className="text-vc-light-text dark:text-vc-dark-text mb-2">
                    What could improve
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    We should have involved the data engineering team earlier. Some
                    visualization concepts had to be simplified because the underlying
                    APIs couldn't deliver real-time aggregations at the speed our
                    designs assumed.
                  </p>
                </div>
                <div>
                  <p className="text-vc-light-text dark:text-vc-dark-text mb-2">
                    Looking ahead
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Next phase includes AI-powered anomaly detection surfaced directly
                    in the dashboard, natural language queries for custom reports, and
                    collaborative annotations so teams can discuss trends in context.
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
