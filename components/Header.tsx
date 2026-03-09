'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleSubscribeClick = () => {
    // Dispatch a custom event that NewsletterPopup listens for
    window.dispatchEvent(new CustomEvent('open-newsletter'))
    setMobileOpen(false)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Articles' },
    { href: '/tags', label: 'Topics' },
  ]

  return (
    <header
      className={`sticky top-1 z-40 bg-primary transition-all duration-300 ${
        scrolled ? 'shadow-lg shadow-primary/30 border-b border-white/10' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="DigitalNerdHQ Blog Home"
          >
            <span className="font-heading font-800 text-xl text-white tracking-tight group-hover:text-white/90 transition-colors">
              DigitalNerdHQ
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent ml-0.5 mb-2 align-middle" />
            </span>
            <span className="text-white/40 text-sm font-ui font-normal hidden sm:inline">
              Blog
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-ui text-sm text-white/80 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}

            <a
              href="https://www.digitalnerdhq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-ui text-sm text-white/60 hover:text-white/90 px-3 py-1.5 rounded-md hover:bg-white/10 transition-all duration-200 ml-1"
            >
              ← Main Site
            </a>

            <button
              onClick={handleSubscribeClick}
              className="ml-3 font-ui text-sm font-medium bg-accent hover:bg-accent/90 text-white px-4 py-1.5 rounded-md transition-all duration-200 hover:shadow-md hover:shadow-accent/30 active:scale-95"
            >
              Subscribe
            </button>
          </nav>

          {/* Mobile: Subscribe + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleSubscribeClick}
              className="font-ui text-xs font-medium bg-accent hover:bg-accent/90 text-white px-3 py-1.5 rounded-md transition-all duration-200"
            >
              Subscribe
            </button>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">Open menu</span>
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          className="px-4 pt-2 pb-4 border-t border-white/10 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-ui text-sm text-white/80 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.digitalnerdhq.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="font-ui text-sm text-white/60 hover:text-white/90 px-3 py-2 rounded-md hover:bg-white/10 transition-all duration-200"
          >
            ← Main Site
          </a>
        </nav>
      </div>
    </header>
  )
}
