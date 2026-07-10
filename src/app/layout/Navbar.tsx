import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import logoImg from "../../asset/images/logo.png";
import {
  Menu,
  X,
  Sun,
  Moon,
  Volume2,
  VolumeX,
} from "lucide-react";

import { useAudio } from "../audio/AudioProvider";

const HOME_NAV_LINKS = [
  "My Work",
  "About",
  "Skills",
  "Contact",
] as const;

// Project routing: prev/next per project (circular)
const PROJECT_NAV: Record<
  string,
  { prev: string; next: string }
> = {
  "/project/1": { prev: "/project/3", next: "/project/2" },
  "/project/2": { prev: "/project/1", next: "/project/3" },
  "/project/3": { prev: "/project/2", next: "/project/1" },
};

/* ──────────────────────────────────────────────
   THEME CONFIG — Change default theme here:
   "dark"  → dark mode by default
   "light" → light mode by default
   ────────────────────────────────────────────── */
const DEFAULT_THEME: "dark" | "light" = "light";

export function Navbar() {
  const { isPlaying, play, pause, playClick } = useAudio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : DEFAULT_THEME === "dark";
  });
  const navigate = useNavigate();
  const location = useLocation();

  const isProjectPage = location.pathname in PROJECT_NAV;
  const projectNav = PROJECT_NAV[location.pathname];

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  // Sync <html> class on mount
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const handleNavClick = useCallback(
    (link: string) => {
      playClick();
      setIsMenuOpen(false);

      const hash = `#${link.toLowerCase().replace(" ", "-")}`;

      if (location.pathname !== "/") {
        navigate("/" + hash);
      } else {
        const el = document.querySelector(hash);

        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    },
    [location.pathname, navigate, playClick],
  );

  const handleMobileNavClick = useCallback(
    (link: string) => {
      playClick();
      setIsMenuOpen(false);
      
      const hash = `#${link.toLowerCase().replace(" ", "-")}`;
      
      // Navigate or scroll with a slight delay to allow menu to close smoothly on mobile
      setTimeout(() => {
        if (location.pathname !== "/") {
          navigate("/" + hash);
        } else {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 100);
    },
    [location.pathname, navigate, playClick]
  );

  const handleLogoClick = useCallback(() => {
  if (location.pathname !== "/") {
    navigate("/");
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}, [location.pathname, navigate]);

  const handleContactClick = useCallback(() => {
    playClick();

    const el = document.querySelector("#contact");

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }

    setIsMenuOpen(false);
  }, [playClick]);

  const btnClass =
    "text-vc-light-text dark:text-gray-300 hover:text-vc-primary dark:hover:text-vc-primary transition-all hover:-translate-y-0.5 cursor-pointer";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 dark:bg-[#131313]/30 backdrop-blur-md border-b border-gray-200/10 dark:border-gray-700/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={handleLogoClick}
              className="cursor-pointer flex items-center"
            >
              <ImageWithFallback
                src={logoImg}
                alt="Portfolio"
                className="h-6 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isProjectPage ? (
              <>
                <button
                  className={btnClass}
                  onClick={async () => {
                    await playClick();
                    navigate("/");
                  }}
                >
                  Home
                </button>
                <button
                  className={btnClass}
                  onClick={() => {
                    playClick();
                    navigate(projectNav.prev);
                  }}
                >
                  Previous
                </button>
                <button
                  className={btnClass}
                  onClick={() => {
                    playClick();
                    navigate(projectNav.next);
                  }}
                >
                  Next
                </button>
                <button
                  className={btnClass}
                  onClick={handleContactClick}
                >
                  Contact
                </button>
              </>
            ) : (
              HOME_NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavClick(link)}
                  className={btnClass}
                >
                  {link}
                </button>
              ))
            )}

            <div className="flex items-center gap-2">
              {/* Sound Toggle Button */}

              <button
                onClick={() => {
                  if (isPlaying) {
                    pause();
                  } else {
                    play();
                  }
                }}
                className="p-2 transition-all hover:-translate-y-0.5 text-vc-light-text dark:text-vc-dark-text hover:text-vc-primary"
                aria-label="Toggle soundtrack"
              >
                {isPlaying ? (
                  <Volume2 size={20} />
                ) : (
                  <VolumeX size={20} />
                )}
              </button>

              {/* Theme Toggle Button */}

              <button
                onClick={toggleTheme}
                className="p-2 transition-all hover:-translate-y-0.5 text-vc-light-text dark:text-vc-dark-text hover:text-vc-primary dark:hover:text-vc-primary"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => {
                if (isPlaying) {
                  pause();
                } else {
                  play();
                }
              }}
              className="p-2 transition-all hover:-translate-y-0.5 text-vc-light-text dark:text-vc-dark-text hover:text-vc-primary"
              aria-label="Toggle soundtrack"
            >
              {isPlaying ? (
                <Volume2 size={20} />
              ) : (
                <VolumeX size={20} />
              )}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 transition-all hover:-translate-y-0.5 text-vc-light-text dark:text-vc-dark-text"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="p-2 text-vc-light-text dark:text-vc-dark-text"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] bg-white dark:bg-[#131313] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-5 right-4 p-2 text-vc-light-text dark:text-vc-dark-text"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center justify-center space-y-10">
              {isProjectPage ? (
                <>
                  <button
                    className="text-3xl font-medium text-vc-light-text dark:text-gray-300 hover:text-vc-primary transition-colors cursor-pointer"
                    onClick={async () => {
                      await playClick();
                      navigate("/");
                      setIsMenuOpen(false);
                    }}
                  >
                    Home
                  </button>
                  <button
                    className="text-3xl font-medium text-vc-light-text dark:text-gray-300 hover:text-vc-primary transition-colors cursor-pointer"
                    onClick={() => {
                      navigate(projectNav.prev);
                      setIsMenuOpen(false);
                    }}
                  >
                    Previous
                  </button>
                  <button
                    className="text-3xl font-medium text-vc-light-text dark:text-gray-300 hover:text-vc-primary transition-colors cursor-pointer"
                    onClick={() => {
                      navigate(projectNav.next);
                      setIsMenuOpen(false);
                    }}
                  >
                    Next
                  </button>
                  <button
                    className="text-3xl font-medium text-vc-light-text dark:text-gray-300 hover:text-vc-primary transition-colors cursor-pointer"
                    onClick={handleContactClick}
                  >
                    Contact
                  </button>
                </>
              ) : (
                HOME_NAV_LINKS.map((link) => (
                  <button
                    key={link}
                    onClick={() => handleMobileNavClick(link)}
                    className="text-4xl font-medium text-vc-light-text dark:text-gray-300 hover:text-vc-primary transition-colors cursor-pointer"
                  >
                    {link}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}