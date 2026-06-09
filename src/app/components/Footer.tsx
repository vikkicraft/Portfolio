import { ArrowUpRight } from "lucide-react";

const contactLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Email", href: "mailto:hello@example.com" },
  { label: "Resume", href: "#" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-vc-light-bg dark:bg-vc-dark-bg text-vc-light-text dark:text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top divider */}
        <div className="w-full h-px bg-gray-300 dark:bg-gray-700 mb-16"></div>

        {/* CTA heading */}
        <div className="mb-16">
          <h2 className="text-3xl font-medium sm:text-4xl md:text-5xl text-vc-light-text dark:text-vc-dark-text mb-4">
            Let's work together
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Have a project in mind or just want to say hello? I'd love to hear
            from you.
          </p>
        </div>

        {/* Contact links */}
        <div className="flex flex-wrap gap-6 mb-20">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-vc-light-text dark:text-vc-dark-text hover:text-vc-primary dark:hover:text-vc-primary transition-colors"
            >
              <span>{link.label}</span>
              <ArrowUpRight
                size={16}
                className="opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200"
              />
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-300 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-500">
          <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
          <p>Designed & built by Vikki</p>
        </div>
      </div>
    </footer>
  );
}