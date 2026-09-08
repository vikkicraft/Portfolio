import { Plus, Download } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "motion/react";
import profileImage from "../../asset/images/profile.png";

const NAVBAR_HEIGHT = 64;
const FADE_RANGE = 200;

const experiences = [
  {
    company: "Company-1",
    role: "UX Designer",
    period: "Jun 2024-Today",
    details:
      "Led cross-platform AI experiences and high-profile features such as Satellite SOS on Pixel 9 and Android Private Space, shaping long-term Android strategies, enhancing user engagement for billions globally, and fostering cross-functional collaboration and design community initiatives.",
  },
  {
    company: "Company-2",
    role: "UI/UX Designer",
    period: "2022-2024",
    details:
      "Led design initiatives for major clients across multiple industries, driving digital transformation through user-centered design strategies and building high-performing design teams.",
  },
  {
    company: "Company-3",
    role: "UI/UX Designer",
    period: "2011-2022",
    details:
      "Worked with clients from banking, non-profit, retail, energy, and telecommunications sectors to bring disruptive digital products and services to market, while helping grow clients' own design capabilities and teams.",
  },
];

export function About() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredExpIndex, setHoveredExpIndex] = useState<number | null>(null);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const rafRef = useRef<number>(0);

  const posX = useMotionValue(0);
  const posY = useMotionValue(0);
  const isEnteringRef = useRef(true); // true = next move is the entry move

  // Snap to placeholder's top-left — button left-aligns with caption text
  const snapToHome = useCallback(() => {
    const wrapper = wrapperRef.current;
    const placeholder = placeholderRef.current;
    if (!wrapper || !placeholder) return;
    const wr = wrapper.getBoundingClientRect();
    const pr = placeholder.getBoundingClientRect();
    animate(posX, pr.left - wr.left, { duration: 0.8, ease: [0.16, 1, 0.3, 1] });
    animate(posY, pr.top - wr.top, { duration: 0.8, ease: [0.16, 1, 0.3, 1] });
    isEnteringRef.current = true; // reset so next entry bounces again
  }, [posX, posY]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const wrapper = wrapperRef.current;
      const placeholder = placeholderRef.current;
      if (!wrapper || !placeholder) return;
      const wr = wrapper.getBoundingClientRect();
      const pr = placeholder.getBoundingClientRect();
      posX.set(pr.left - wr.left);
      posY.set(pr.top - wr.top);
    }, 50);
    window.addEventListener('resize', snapToHome);
    return () => { clearTimeout(timer); window.removeEventListener('resize', snapToHome); };
  }, [snapToHome, posX, posY]);

  // Track mouse only within image — center button on cursor, clamped to image bounds
  const handleImageMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = imgContainerRef.current;
    const wrapper = wrapperRef.current;
    const btn = btnRef.current;
    if (!container || !wrapper || !btn) return;

    const imgRect = container.getBoundingClientRect();
    const wr = wrapper.getBoundingClientRect();
    const halfW = btn.offsetWidth / 2;
    const halfH = btn.offsetHeight / 2;

    // Center pill on cursor — no clamping, pill can extend beyond image edges
    const targetX = e.clientX - wr.left - halfW;
    const targetY = e.clientY - wr.top - halfH;

    if (isEnteringRef.current) {
      // Pill gliding from home — super smooth, relaxing ease
      animate(posX, targetX, { duration: 0.7, ease: [0.16, 1, 0.3, 1] });
      animate(posY, targetY, { duration: 0.7, ease: [0.16, 1, 0.3, 1] });
      isEnteringRef.current = false;
    } else {
      // Tight follow during cursor movement
      animate(posX, targetX, { type: "spring", stiffness: 500, damping: 38 });
      animate(posY, targetY, { type: "spring", stiffness: 500, damping: 38 });
    }
  }, [posX, posY]);

  const handleImageLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const related = e.relatedTarget;
    if (related instanceof Node && btnRef.current?.contains(related)) return;
    setIsImageHovered(false);
    snapToHome();
  }, [snapToHome]);

  // Use ref-based scroll handling to avoid re-renders on every scroll event
  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending rAF to avoid stacking
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const img = imgRef.current;

        // About section opacity based on project card 2 position
        const projectCard2 = document.getElementById("project-card-2");
        if (projectCard2 && section) {
          const cardTop = projectCard2.getBoundingClientRect().top;
          const opacity =
            cardTop <= NAVBAR_HEIGHT
              ? Math.min(1, (NAVBAR_HEIGHT - cardTop) / FADE_RANGE)
              : 0;
          section.style.opacity = String(opacity);
        }

        // Grayscale effect on profile image
        if (img) {
          const imgTop = img.getBoundingClientRect().top;
          let grayscale: number;
          if (imgTop <= NAVBAR_HEIGHT) {
            grayscale = 1;
          } else if (imgTop <= NAVBAR_HEIGHT + FADE_RANGE) {
            grayscale = 1 - (imgTop - NAVBAR_HEIGHT) / FADE_RANGE;
          } else {
            grayscale = 0;
          }
          img.style.filter = `grayscale(${grayscale * 100}%)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const toggleExpand = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 bg-vc-light-bg dark:bg-vc-dark-bg transition-opacity duration-100"
      style={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left section - Title */}
          <div className="md:sticky md:top-20 md:self-start flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-medium sm:text-4xl md:text-5xl mb-8 text-vc-light-text dark:text-vc-dark-text self-start">
              About player
            </h2>
            {/* Wrapper: provides positioning context for the floating button */}
            <div ref={wrapperRef} className="relative w-full max-w-md">
              {/* Image — only this area tracks the cursor */}
              <div
                ref={imgContainerRef}
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={handleImageLeave}
                onMouseMove={handleImageMouseMove}
              >
                <img
                  ref={imgRef}
                  src={profileImage}
                  alt="Profile"
                  className="w-full aspect-square object-cover rounded-lg transition-[filter] duration-100"
                />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                What I look like on a good day
              </p>

              {/* Invisible placeholder — reserves space and provides home coordinates */}
              <div ref={placeholderRef} className="mt-4 invisible flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium">
                <Download size={16} />
                <span>Download resume</span>
              </div>

              {/* Single floating button — springs between home and cursor, always chip style */}
              <motion.button
                ref={btnRef}
                onMouseLeave={(e) => {
                  const related = e.relatedTarget;
                  if (related instanceof Node && imgContainerRef.current?.contains(related)) return;
                  setIsImageHovered(false);
                  snapToHome();
                }}
                className="absolute top-0 left-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/20 text-vc-light-text dark:text-vc-dark-text shadow-[0_4px_24px_rgba(0,0,0,0.12)] text-sm font-medium"
                style={{ x: posX, y: posY }}
              >
                <Download size={16} />
                <span>Download resume</span>
              </motion.button>
            </div>
          </div>

          {/* Right section - Text content */}
          <div className="md:pt-[4.5rem]">
            <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg mb-16">
              <p>
                I'm Vikas, a UX Designer with 5+ years of experience designing
                enterprise SaaS, AI-powered platforms, and data-driven
                applications. Currently, I work on complex enterprise and AI
                products, building scalable design systems and crafting user
                experiences for ML, data operations, and workflow-driven
                platforms.
              </p>
              <p>
                I enjoy solving complex problems through thoughtful,
                user-centered design and collaborating closely with product,
                engineering, and development teams to bring impactful digital
                experiences to life.
              </p>
              <p>
                Before Google, I worked as a Senior UX Designer at McKinsey &
                Company, helping clients from banking, non-profit, retail,
                energy, and telco, to bring disruptive digital products and
                services to market, and help grow clients' own design teams.
              </p>
              <p>
                Outside of work, I enjoy painting, gaming, DIY projects,
                and exploring new technologies that inspire creativity and
                continuous learning.
              </p>
            </div>

            {/* Experience section */}
            <div>
              <h3 className="text-[12px] tracking-wide text-gray-600 dark:text-gray-400 mb-8">
                EXPERIENCE
              </h3>

              <div className="space-y-3">
                {experiences.map((exp, index) => {
                  const isHovered = expandedIndex === index || hoveredExpIndex === index;
                  const isAnyHovered = hoveredExpIndex !== null;
                  const isOtherHovered = isAnyHovered && hoveredExpIndex !== index;

                  let shiftY = 0;
                  if (hoveredExpIndex === index) {
                    shiftY = -6;
                  } else if (isOtherHovered) {
                    shiftY = index < hoveredExpIndex! ? -16 : 16;
                  }

                  return (
                  <motion.div
                    key={exp.company + exp.period}
                    onMouseEnter={() => setHoveredExpIndex(index)}
                    onMouseLeave={() => setHoveredExpIndex(null)}
                    animate={{ y: shiftY }}
                    transition={{ type: 'spring', stiffness: 160, damping: 20, mass: 0.7 }}
                    className={`rounded-lg border border-gray-200/60 dark:border-gray-800 bg-[#F7F7F8] dark:bg-gray-900/60 overflow-hidden ${isHovered ? 'shadow-[0_2px_6px_rgba(0,0,0,0.05)]' : ''}`}
                  >
                    <div
                      className="px-6 py-5 cursor-pointer"
                      onClick={() => toggleExpand(index)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-2xl font-medium sm:text-3xl text-vc-light-text dark:text-vc-dark-text mb-2">
                            {exp.company}
                          </h4>
                          <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                            {exp.role}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            {exp.period}
                          </p>
                        </div>
                        <button
                          className="flex-shrink-0 ml-4 text-vc-light-text dark:text-vc-dark-text transition-transform duration-300"
                          style={{
                            transform:
                              expandedIndex === index
                                ? "rotate(45deg)"
                                : "rotate(0deg)",
                          }}
                        >
                          <Plus size={24} />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {expandedIndex === index && exp.details && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-gray-200/60 dark:border-gray-800">
                              <p className="text-gray-700 dark:text-gray-300">
                                {exp.details}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}