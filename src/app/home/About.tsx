import { Plus, Download } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number>(0);

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
            <img
              ref={imgRef}
              src={profileImage}
              alt="Profile"
              className="w-full max-w-md aspect-square object-cover transition-[filter] duration-100"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              What I look like on a good day
            </p>
            <button className="mt-4 flex items-center gap-2 text-vc-light-text dark:text-vc-dark-text hover:text-vc-primary dark:hover:text-vc-primary transition-colors">
              <Download size={20} />
              <span>Download my resume</span>
            </button>
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

              <div className="border-b border-gray-300 dark:border-gray-700 mb-0"></div>

              <div className="space-y-0">
                {experiences.map((exp, index) => (
                  <div key={exp.company + exp.period}>
                    <div
                      className="py-6 group"
                      data-hover
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
                            <div className="mt-6">
                              <p className="text-gray-700 dark:text-gray-300">
                                {exp.details}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {index < experiences.length - 1 && (
                      <div className="border-b border-gray-300 dark:border-gray-700"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}