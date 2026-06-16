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
import banner from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1543067361 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1633339257118 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1742440710136 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1632516643720 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1760544139691 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1511871893393 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1694878981905 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1621036579842 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1565495296896 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1602343457765 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1759884247160 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1674509036252 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1769794370964 from "../../../asset/images/case-one-banner.jpg";
import imgPhoto1666334111978 from "../../../asset/images/case-one-banner.jpg";


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
    src: imgPhoto1543067361,
    alt: "Architecture exploration",
  },
  {
    src: imgPhoto1633339257118,
    alt: "Product details",
  },
  {
    src: imgPhoto1742440710136,
    alt: "Creative workspace",
  },
  {
    src: imgPhoto1632516643720,
    alt: "Abstract gradient",
  },
  {
    src: imgPhoto1760544139691,
    alt: "Concrete texture",
  },
];

const contentImages = {
  research:
    imgPhoto1511871893393,
  prototype:
    imgPhoto1694878981905,
  testing:
    imgPhoto1621036579842,
  system:
    imgPhoto1565495296896,
  dashboard:
    imgPhoto1602343457765,
  collab:
    imgPhoto1759884247160,
};

// ============================================================
// HeroSection Component
// ============================================================

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);
  const y = useTransform(scrollProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(
    scrollProgress,
    [0, 0.8],
    [1, 0],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const height = el.offsetHeight;
      if (height === 0) return;
      const progress = Math.min(
        Math.max(-rect.top / height, 0),
        1,
      );
      scrollProgress.set(progress);
    };

    window.addEventListener("scroll", update, {
      passive: true,
    });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [scrollProgress]);

  return (
    <div
      ref={ref}
      className="relative h-[85vh] md:h-[95vh] overflow-hidden"
    >
      {/* Top-to-bottom reveal overlay */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 1.2,
          ease: EASE_OUT_EXPO,
          delay: 0.1,
        }}
        className="absolute inset-0 z-20 bg-vc-light-bg dark:bg-vc-dark-bg origin-bottom"
      />

      <motion.div
        style={{ y }}
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 1.8,
          ease: EASE_OUT_EXPO,
          delay: 0.2,
        }}
      >
        <ImageWithFallback
          src={HERO_IMG}
          alt="Model & Datasets"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex items-end"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 md:pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: EASE_OUT_EXPO,
              delay: 0.8,
            }}
          >
            <p className="text-white/70 text-sm tracking-[0.2em] uppercase mb-4">
              Case Study
            </p>
            <h1 className="text-white font-medium text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight max-w-4xl">
              Model & Datasets
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
    {
      label: "Company",
      value: "Humain",
    },
    {
      label: "Product",
      value: "AION (Nawat)",
    },
    {
      label: "Scope",
      value: "Model & Datasets",
    },
    {
      label: "Role",
      value: "Product Designer",
    },
    {
      label: "Duration",
      value: "6 Weeks",
    },
  ];

  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 py-12 md:py-16 border-b border-gray-200 dark:border-gray-800"
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

function SectionLabel({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
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
  rightText: React.ReactNode;
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
          className="text-3xl font-medium leading-tight sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text mb-10 md:mb-14 max-w-3xl tracking-tight"
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
          <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {leftText}
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          {rightHeading && (
            <p className="text-xs tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500 mb-4">
              {rightHeading}
            </p>
          )}
          <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {rightText}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================
// FullBleedImage Component
// ============================================================

function FullBleedImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden"
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
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
      <motion.div
        variants={fadeUp}
        className="aspect-[4/3] overflow-hidden"
      >
        <ImageWithFallback
          src={src1}
          alt={alt1}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div
        variants={fadeUp}
        className="aspect-[4/3] overflow-hidden"
      >
        <ImageWithFallback
          src={src2}
          alt={alt2}
          className="w-full h-full object-cover"
        />
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
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: EASE_OUT_EXPO,
              delay: i * 0.08,
            }}
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
    {
      value: "3.2x",
      label: "Faster dataset-to-experiment workflow",
    },
    {
      value: "-62%",
      label: "Reduction in tool-switching during projects",
    },
    {
      value: "+74%",
      label: "Increase in marketplace contributions",
    },
    {
      value: "200+",
      label: "Beta users onboarded in first month",
    },
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
        <motion.div
          key={stat.value}
          variants={fadeUp}
          className="text-center"
        >
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
          Dashboard Redesign
        </h3>
      </button>
    </motion.div>
  );
}

// ============================================================
// ProjectOne — Main Page Component
// ============================================================

export function ProjectOne() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleNextProject = useCallback(
    () => navigate("/project/2"),
    [navigate],
  );

  const handleBackToHome = useCallback(
    () => navigate("/"),
    [navigate],
  );

  // Problem section sticky fade-out
  const problemRef = useRef<HTMLDivElement>(null);
  const problemStickyOpacity = useMotionValue(1);
  useEffect(() => {
    const update = () => {
      const el = problemRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / el.offsetHeight, 0), 1);
      const opacity = progress < 0.25 ? 1 : progress > 0.6 ? 0 : 1 - (progress - 0.25) / 0.35;
      problemStickyOpacity.set(opacity);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [problemStickyOpacity]);

  // Solution section fade-in on entry
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
      ([entry]) =>
        setShowScrollTop(
          entry.boundingClientRect.top < window.innerHeight,
        ),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-vc-light-bg dark:bg-vc-dark-bg min-h-screen -mt-16">
      {/* ============================== */}
      {/* Scroll-to-top Button           */}
      {/* ============================== */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="fixed bottom-8 right-8 z-40 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/60 cursor-pointer transition-colors"
            data-hover
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ============================== */}
      {/* Hero Section                   */}
      {/* ============================== */}
      <HeroSection />

      {/* ============================== */}
      {/* Section 01 — Overview          */}
      {/* ============================== */}
      <div
        id="content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Meta Strip */}
        <MetaStrip />

        {/* Overview Content */}
        <div className="py-20 md:py-32">
          <SectionLabel number="01" label="Overview" />
          <TwoColumnText
            heading="Building a centralized AI ecosystem for models and datasets"
            leftHeading="Platform Overview"
            rightHeading="Case Study Module Overview"
            leftText={
              <>
                <span className="font-semibold">
                  AION (Nawat)
                </span>{" "}
                is an enterprise AI platform developed by HUMAIN
                to support the complete AI lifecycle—from
                infrastructure and governance to
                experimentation, deployment, and monitoring.
                <div className="mt-4">
                  This case study focuses on the Models &
                  Datasets module, designed to streamline how
                  enterprise teams discover, manage, and
                  operationalize AI assets at scale.
                </div>
              </>
            }
            rightText={
              <>
                The{" "}
                <span className="font-semibold">
                  Models & Datasets
                </span>{" "}
                module serves as the central hub for
                discovering, organizing, and managing AI assets
                within AION (Nawat). It brings together asset
                discovery, personal workspace management,
                experimentation, and deployment into a unified
                experience—helping teams collaborate more
                effectively and accelerate AI development.
              </>
            }
          />
        </div>
      </div>

      {/* ============================== */}
      {/* Full Bleed Image — Research    */}
      {/* ============================== */}
      <FullBleedImage
        src={contentImages.research}
        alt="Research phase"
      />

      {/* ============================== */}
      {/* Section 02 — Problem           */}
      {/* ============================== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem & Context */}
        <div
          ref={problemRef}
          className="relative pt-20 md:pt-32 pb-32 md:pb-48"
        >
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col md:flex-row gap-10 md:gap-16"
          >
            {/* Left — Label + Heading (sticky together) */}
            <motion.div
              style={{ opacity: problemStickyOpacity }}
              className="relative md:w-2/5 md:sticky md:top-32 md:self-start shrink-0"
            >
              <SectionLabel number="02" label="Problem" />
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-medium leading-tight sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text tracking-tight"
              >
                No centralized hub for AI assets
              </motion.h2>
            </motion.div>

            {/* Right — Content */}
            <div className="md:w-3/5">
              <motion.p
                variants={fadeUp}
                className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mb-10"
              >
                As the platform scaled, models and datasets
                became core assets in the AI development
                process. However, there was no dedicated,
                centralized module focused specifically on
                managing and discovering these assets.
              </motion.p>
              <motion.div
                variants={staggerChildren}
                className="flex flex-col gap-6"
              >
                {[
                  "Users struggled to organize their own models and datasets, with no structured way to track experiments or versions.",
                  "Discovering reusable assets created by other teams was difficult, leading to duplicated effort and inconsistent practices.",
                  "Limited visibility into available assets caused inefficiencies in collaboration and slowed development cycles.",
                  "A clear need emerged for a structured, intuitive module to streamline discovery, management, experimentation, and deployment.",
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

        {/* ============================== */}
        {/* Section 03 — Solution          */}
        {/* ============================== */}
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
              className="text-3xl font-medium leading-tight sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text mb-10 md:mb-14 max-w-3xl tracking-tight"
            >
              Crafting the Solution
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mb-10"
            >
              To address the fragmented AI asset workflow, we
              designed the{" "}
              <span className="font-semibold">
                Models & Datasets
              </span>{" "}
              module within AION (Nawat) as a centralized
              experience for asset discovery, management,
              experimentation, and deployment. The solution
              brings together shared organizational resources
              and personal workflows into a structured and
              scalable platform.
            </motion.p>
            <div className="flex flex-col gap-4 mb-10">
              <motion.p
                variants={fadeUp}
                className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-semibold"
              >
                The solution was built around two core areas:
              </motion.p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
                <motion.div
                  variants={fadeUp}
                  className="p-5 border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-xs tracking-[0.15em] uppercase text-vc-primary mb-4">
                    01 — Model hub
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    A collaborative space where teams can
                    discover, access, and reuse shared models
                    and datasets across the organization. This
                    improves visibility, reduces duplicated
                    effort, and promotes knowledge sharing.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  className="p-5 border border-gray-200 dark:border-gray-800"
                >
                  <p className="text-xs tracking-[0.15em] uppercase text-vc-primary mb-4">
                    02 — Personal Workspace
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    A focused environment where users can manage
                    their own models, datasets, experiments, and
                    deployments. It provides clear organization,
                    progress tracking, and a seamless path from
                    experimentation to production.
                  </p>
                </motion.div>
              </div>
            </div>
            <motion.p
              variants={fadeUp}
              className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl"
            >
              One of the key considerations in this project was
              ensuring the module could scale effectively as the
              platform grows. Designed for enterprise use, it
              needed to support a continuously expanding number
              of models, datasets, and users without
              compromising usability or performance. By
              separating shared resources from personal assets
              while keeping them connected, the solution
              improves clarity, enhances discoverability, and
              helps streamline the AI development workflow
              within the broader platform.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* ============================== */}
      {/* Two Image Grid                 */}
      {/* ============================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TwoImageGrid
          src1={contentImages.prototype}
          alt1="Interface prototype"
          src2={contentImages.system}
          alt2="Design system"
        />
      </div>

      {/* ============================== */}
      {/* Section 04 — Process           */}
      {/* ============================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Process Content */}
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
              className="text-3xl font-medium leading-tight sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text mb-10 md:mb-14 max-w-3xl tracking-tight"
            >
              From research to reality in 12 weeks
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <motion.div variants={fadeUp}>
                <div className="space-y-8">
                  {[
                    {
                      week: "Weeks 1–3",
                      title: "Research & Discovery",
                      desc: "Interviewed data scientists, ML engineers, and AI researchers to map their end-to-end workflows — from dataset sourcing through model deployment.",
                    },
                    {
                      week: "Weeks 4–6",
                      title:
                        "Marketplace & My Space Architecture",
                      desc: "Designed the information architecture for the collaborative marketplace and My Space workspace, exploring 15+ navigation patterns for seamless transitions between discovery and execution.",
                    },
                    {
                      week: "Weeks 7–9",
                      title: "Prototyping & Iteration",
                      desc: "Built interactive prototypes of key flows — dataset forking, experiment tracking, and deployment pipelines — and tested with 5–8 participants per round.",
                    },
                    {
                      week: "Weeks 10–12",
                      title: "Refinement & Beta Launch",
                      desc: "Polished the design system, finalized deployment workflows, and rolled out a beta to 200+ early adopters with real-time feedback tracking.",
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
              <motion.div
                variants={fadeUp}
                className="aspect-[3/4] overflow-hidden"
              >
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

      {/* ============================== */}
      {/* Section 05 — Research          */}
      {/* ============================== */}
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
              className="text-3xl font-medium leading-tight sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text mb-10 md:mb-14 max-w-3xl tracking-tight"
            >
              Understanding the AI community's unmet needs
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <motion.div
                variants={fadeUp}
                className="space-y-8"
              >
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  We conducted 24 in-depth interviews across
                  four distinct segments — data scientists, ML
                  engineers, AI researchers, and team leads.
                  Each session explored their end-to-end
                  workflows from dataset sourcing through model
                  deployment to uncover friction points and
                  latent needs.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      metric: "24",
                      label: "User interviews conducted",
                      detail:
                        "Across four user segments with sessions averaging 45 minutes each.",
                    },
                    {
                      metric: "1,200+",
                      label: "Survey responses analyzed",
                      detail:
                        "Quantitative data validated qualitative findings from interviews.",
                    },
                    {
                      metric: "8",
                      label: "Competitor platforms audited",
                      detail:
                        "Benchmarking against industry leaders to identify gaps and opportunities.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-vc-primary/30 pl-6"
                    >
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
              <motion.div
                variants={fadeUp}
                className="space-y-6"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={imgPhoto1674509036252}
                    alt="Research synthesis with sticky notes"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={imgPhoto1769794370964}
                    alt="User interview session"
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
                "People don't want another tool — they want one
                place that just works."
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                The most consistent finding was that AI
                practitioners didn't need more features — they
                needed fewer platforms. The constant
                context-switching between dataset repos,
                experiment trackers, and deployment tools was
                the biggest source of friction. This insight
                became the north star for DataDock's unified
                platform approach.
              </p>
            </motion.div>

            {/* Key Insight Card */}
            {/* (above) */}

            {/* Persona Cards */}
            <motion.div
              variants={fadeUp}
              className="mt-16 md:mt-24"
            >
              <p className="text-xs tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500 mb-8">
                Persona
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Priya Sharma",
                    role: "Data Scientist",
                    age: "29",
                    bio: "Works at a mid-size AI startup. Spends 60% of her time sourcing and cleaning datasets across multiple platforms before she can begin any modeling work.",
                    goals: [
                      "Discover high-quality datasets fast",
                      "Track experiments in one place",
                      "Share findings with her team",
                    ],
                    frustrations: [
                      "Scattered datasets across 4+ platforms",
                      "No version control for experiments",
                      "Manual export/import between tools",
                    ],
                  },
                  {
                    name: "Marcus Rivera",
                    role: "ML Engineer",
                    age: "34",
                    bio: "Leads the ML infrastructure team at an enterprise company. Responsible for moving models from prototype to production deployment at scale.",
                    goals: [
                      "Streamlined model deployment",
                      "Reproducible training pipelines",
                      "Team-wide experiment visibility",
                    ],
                    frustrations: [
                      "Deployment requires rebuilding from scratch",
                      "No unified model registry",
                      "Collaboration gaps between research and engineering",
                    ],
                  },
                  {
                    name: "Emily Park",
                    role: "AI Research Lead",
                    age: "38",
                    bio: "Manages a research team of 8. Needs to share models and datasets within the team and with external collaborators while maintaining proper versioning.",
                    goals: [
                      "Collaborative model sharing",
                      "Organized project workspace",
                      "Seamless publishing to community",
                    ],
                    frustrations: [
                      "No centralized workspace for team projects",
                      "Difficult to share work externally",
                      "Lost context between experiment iterations",
                    ],
                  },
                ].map((persona, i) => (
                  <motion.div
                    key={persona.name}
                    variants={fadeUp}
                    className="p-6 md:p-8 border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-full bg-vc-primary/10 flex items-center justify-center">
                        <span className="text-vc-primary text-sm">
                          {persona.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-vc-light-text dark:text-vc-dark-text text-sm">
                          {persona.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {persona.role} · Age {persona.age}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                      {persona.bio}
                    </p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs tracking-[0.1em] uppercase text-vc-primary mb-2">
                          Goals
                        </p>
                        <ul className="space-y-1">
                          {persona.goals.map((g, j) => (
                            <li
                              key={j}
                              className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2"
                            >
                              <span className="text-vc-primary mt-0.5">
                                +
                              </span>
                              {g}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs tracking-[0.1em] uppercase text-gray-400 dark:text-gray-500 mb-2">
                          Frustrations
                        </p>
                        <ul className="space-y-1">
                          {persona.frustrations.map((f, j) => (
                            <li
                              key={j}
                              className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2"
                            >
                              <span className="text-red-400 mt-0.5">
                                -
                              </span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Target Audience Section */}
            <motion.div
              variants={fadeUp}
              className="mt-16 md:mt-24"
            >
              <p className="text-xs tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500 mb-8">
                Target Audience
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                <div>
                  <motion.h3
                    variants={fadeUp}
                    className="text-2xl sm:text-3xl text-vc-light-text dark:text-vc-dark-text tracking-tight mb-6"
                  >
                    Who we're designing for
                  </motion.h3>
                  <motion.p
                    variants={fadeUp}
                    className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8"
                  >
                    DataDock's target audience spans individual
                    AI practitioners to enterprise ML teams.
                    These users range from independent data
                    scientists exploring public datasets to
                    large organizations managing proprietary
                    models and deployment pipelines at scale.
                  </motion.p>
                  <motion.div
                    variants={staggerChildren}
                    className="space-y-4"
                  >
                    {[
                      {
                        segment: "Primary",
                        audience:
                          "Data Scientists & ML Engineers",
                        percentage: "45%",
                        detail:
                          "Core users who discover datasets, train models, and run experiments daily within My Space.",
                      },
                      {
                        segment: "Secondary",
                        audience: "AI Researchers & Academics",
                        percentage: "28%",
                        detail:
                          "Share models and datasets with the community, collaborate on open research, and publish findings.",
                      },
                      {
                        segment: "Tertiary",
                        audience: "ML Team Leads & Managers",
                        percentage: "18%",
                        detail:
                          "Oversee team projects in My Space, track experiment progress, and manage deployment pipelines.",
                      },
                      {
                        segment: "Emerging",
                        audience: "AI Hobbyists & Students",
                        percentage: "9%",
                        detail:
                          "Explore the marketplace to learn, fork datasets for personal projects, and build their AI portfolios.",
                      },
                    ].map((item) => (
                      <motion.div
                        key={item.segment}
                        variants={fadeUp}
                        className="flex items-start gap-5 py-4 border-b border-gray-100 dark:border-gray-800/50 last:border-0"
                      >
                        <span className="text-2xl sm:text-3xl text-vc-primary tracking-tight shrink-0 w-16 text-right">
                          {item.percentage}
                        </span>
                        <div>
                          <p className="text-vc-light-text dark:text-vc-dark-text text-sm mb-1">
                            {item.audience}
                            <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                              {item.segment}
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                <motion.div variants={fadeUp}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <ImageWithFallback
                      src={imgPhoto1666334111978}
                      alt="Target audience analysis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Analysis Section */}
            <motion.div
              variants={fadeUp}
              className="mt-16 md:mt-24"
            >
              <p className="text-xs tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500 mb-8">
                Analysis
              </p>
              <motion.h3
                variants={fadeUp}
                className="text-2xl sm:text-3xl text-vc-light-text dark:text-vc-dark-text tracking-tight mb-10"
              >
                Patterns that shaped our strategy
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    title: "Workflow Fragmentation",
                    desc: "Session recordings revealed users averaged 4.3 tool switches per AI project. 73% of time was spent on data prep and tool navigation rather than actual modeling work.",
                    tag: "Quantitative",
                  },
                  {
                    title: "Discovery-to-Deploy Gap",
                    desc: "Journey mapping identified a critical handoff gap: 52% of users abandoned projects when transitioning from marketplace discovery to personal workspace experimentation.",
                    tag: "Qualitative",
                  },
                  {
                    title: "Competitive Landscape",
                    desc: "Auditing 8 AI platforms (Hugging Face, Kaggle, W&B, etc.) revealed none offered end-to-end coverage — validating DataDock's unified marketplace + workspace approach.",
                    tag: "Competitive",
                  },
                  {
                    title: "Collaboration Patterns",
                    desc: "Team-based users shared datasets and models via email 67% of the time. Only 12% used built-in sharing features, indicating a massive opportunity for native collaboration.",
                    tag: "Behavioral",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="p-6 md:p-8 border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-vc-light-text dark:text-vc-dark-text text-sm">
                        {item.title}
                      </p>
                      <span className="text-[10px] tracking-[0.1em] uppercase text-vc-primary px-2 py-1 border border-vc-primary/20 rounded-full">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
              <motion.div
                variants={fadeUp}
                className="p-8 md:p-10 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-gray-800"
              >
                <p className="text-xs tracking-[0.15em] uppercase text-vc-primary mb-4">
                  Research Synthesis
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                  Triangulating usage analytics, user
                  interviews, and competitive analysis, we
                  identified three strategic pillars for
                  DataDock: a unified marketplace for
                  frictionless discovery, My Space as a personal
                  command center for experiments and projects,
                  and a seamless bridge from experimentation to
                  deployment. These pillars shaped every design
                  decision from information architecture to
                  micro-interactions.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============================== */}
      {/* Section 06 — Gallery           */}
      {/* ============================== */}
      <div className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-14">
          <SectionLabel number="06" label="Gallery" />
        </div>
        <div className="pl-4 sm:pl-6 lg:pl-8">
          <HorizontalGallery />
        </div>
      </div>

      {/* ============================== */}
      {/* Full Bleed Image — Testing     */}
      {/* ============================== */}
      <FullBleedImage
        src={contentImages.testing}
        alt="User testing"
      />

      {/* ============================== */}
      {/* Section 07 — Validation        */}
      {/* Section 08 — Reflection        */}
      {/* Stats Row & Next Project       */}
      {/* ============================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testing & Validation */}
        <div className="py-20 md:py-32">
          <SectionLabel number="07" label="Validation" />
          <TwoColumnText
            heading="Beta testing validated the unified approach"
            leftText="We ran moderated usability testing with 15 AI practitioners across all target segments. Testers completed end-to-end flows — from marketplace discovery through My Space experimentation to deployment readiness — with measurably higher success rates than their existing multi-tool workflows."
            rightText="Participants consistently praised the seamless transition between the marketplace and My Space. The ability to fork a dataset and immediately begin experimenting without switching tools was cited as the single most valuable feature by 80% of beta users."
          />
        </div>

        {/* Stats Row */}
        <StatsRow />

        {/* Reflection */}
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
              className="text-3xl font-medium leading-tight sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text mb-10 md:mb-14 max-w-3xl tracking-tight"
            >
              What I learned along the way
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
              <motion.div
                variants={fadeUp}
                className="space-y-6"
              >
                <div>
                  <p className="text-vc-light-text dark:text-vc-dark-text mb-2">
                    What went well
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    The unified marketplace + workspace model
                    resonated strongly with every user segment.
                    DataDock's "fork and experiment" flow became
                    the most-used feature in beta, validating
                    our core design hypothesis that reducing
                    tool-switching matters more than adding
                    features.
                  </p>
                </div>
                <div>
                  <p className="text-vc-light-text dark:text-vc-dark-text mb-2">
                    Scope of impact
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    The design spanned the entire platform —
                    marketplace discovery, My Space project
                    management, experiment tracking,
                    collaborative sharing, and the deployment
                    pipeline — all built on a cohesive design
                    system with 120+ components.
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="space-y-6"
              >
                <div>
                  <p className="text-vc-light-text dark:text-vc-dark-text mb-2">
                    What could improve
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    We underestimated the complexity of
                    enterprise permissions for shared datasets.
                    Earlier involvement of IT admins and
                    compliance teams would have streamlined the
                    governance features and reduced late-stage
                    scope changes.
                  </p>
                </div>
                <div>
                  <p className="text-vc-light-text dark:text-vc-dark-text mb-2">
                    Looking ahead
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Future iterations will expand collaborative
                    features — real-time co-editing of
                    notebooks, automated model benchmarking, and
                    deeper integrations with popular ML
                    frameworks like PyTorch and TensorFlow
                    directly within My Space.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Next Project Teaser */}
        <NextProject
          onNextClick={handleNextProject}
          onAllClick={handleBackToHome}
        />
      </div>
    </div>
  );
}