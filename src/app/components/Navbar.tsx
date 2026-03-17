import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import logoImg from "figma:asset/33f095ca7b1c9e3c098376cfa60d9d0e80268110.png";
import { Menu, X, Sun, Moon } from "lucide-react";

const NAV_LINKS = ["My Work", "About", "Skills", "Contact"] as const;

/* ──────────────────────────────────────────────
   THEME CONFIG — Change default theme here:
   "dark"  → dark mode by default
   "light" → light mode by default
   ────────────────────────────────────────────── */
const DEFAULT_THEME: "dark" | "light" = "dark";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : DEFAULT_THEME === "dark";
  });
  const navigate = useNavigate();
  const location = useLocation();

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
      const hash = `#${link.toLowerCase().replace(" ", "-")}`;
      if (location.pathname !== "/") {
        navigate("/" + hash);
      } else {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [location.pathname, navigate]
  );

  const handleLogoClick = useCallback(() => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, navigate]);

  const handleMobileNavClick = useCallback(
    (link: string) => {
      handleNavClick(link);
      setIsMenuOpen(false);
    },
    [handleNavClick]
  );

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
                className="h-6 w-auto dark:invert"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="text-vc-light-text dark:text-gray-300 hover:text-vc-primary dark:hover:text-vc-primary transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                {link}
              </button>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 transition-all hover:-translate-y-0.5 text-vc-light-text dark:text-vc-dark-text hover:text-vc-primary dark:hover:text-vc-primary"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
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
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleMobileNavClick(link)}
                className="block py-2 text-vc-light-text dark:text-gray-300 hover:text-vc-primary dark:hover:text-vc-primary transition-colors cursor-pointer w-full text-left"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}