import Link from 'next/link'
import Logo from '@/components/Logo'
import NewsletterInline from '@/components/NewsletterInline'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#180f41] text-white dark:bg-[#0d0b1e]">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <NewsletterInline compact />
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <Link href="/" aria-label="DigitalNerdHQ Blog">
              <Logo size="md" showTagline darkBg />
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
              Where digital minds level up. Articles on digital marketing, tech, entrepreneurship, and online business.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://twitter.com/digitalnerdhq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Twitter/X"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#ef4d50] flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ willChange: 'transform' }}
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/digitalnerdhq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#ef4d50] flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ willChange: 'transform' }}
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/brightafam45"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on GitHub"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#ef4d50] flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ willChange: 'transform' }}
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Blog column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Blog
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/blog', label: 'All Articles' },
                { href: '/tags', label: 'Topics' },
                { href: '/authors', label: 'Authors' },
                { href: '/search', label: 'Search' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: 'https://www.digitalnerdhq.com/about', label: 'About' },
                { href: 'https://www.digitalnerdhq.com/courses', label: 'Courses' },
                { href: 'https://www.digitalnerdhq.com/product', label: 'Product' },
                { href: 'https://www.digitalnerdhq.com/faq', label: 'FAQ' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: 'https://www.digitalnerdhq.com/contact', label: 'Contact Us' },
                { href: 'https://www.digitalnerdhq.com', label: 'Main Site ↗' },
                { href: 'https://digitalnerdhq.hashnode.dev', label: 'Hashnode Profile ↗' },
                { href: 'https://www.digitalnerdhq.com/testimonials', label: 'Testimonials' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; {currentYear} DigitalNerdHQ. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Built with{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              Next.js
            </a>
            {' & '}
            <a
              href="https://hashnode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              Hashnode
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
