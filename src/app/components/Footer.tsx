const quickLinks = [
  { label: "My Work", href: "#my-work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Email", href: "#" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-vc-light-bg dark:bg-vc-dark-bg text-vc-light-text dark:text-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top divider line */}
        <div className="w-full h-px bg-gray-300 dark:bg-gray-700 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl mb-4 text-vc-light-text dark:text-vc-dark-text">
              Let's talk
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {/* Add your contact info or tagline here */}
            </p>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h3 className="text-xl mb-4 text-vc-light-text dark:text-vc-dark-text">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-vc-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Social */}
          <div>
            <h3 className="text-xl mb-4 text-vc-light-text dark:text-vc-dark-text">
              Connect
            </h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-vc-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
