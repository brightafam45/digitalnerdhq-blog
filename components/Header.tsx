'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/Logo'
import DarkModeToggle from '@/components/DarkModeToggle'
import SearchBar from '@/components/SearchBar'

const NAV_LINKS = [
  { href: '/', label: 'Blog', external: false },
  { href: 'https://www.digitalnerdhq.com', label: 'Main Site', external: true },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isBlogActive = pathname === '/' || pathname.startsWith('/blog')

  return (
    <header
      className={`sticky top-0 z-50 bg-[#060312] transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md shadow-xl shadow-black/30 border-b border-white/10' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" aria-label="DigitalNerdHQ Blog Home" className="flex-shrink-0">
            <Logo size="md" showTagline={false} darkBg />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = !link.external && (
                link.href === '/' ? isBlogActive : pathname.startsWith(link.href)
              )

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-[#ef4444] transition-colors duration-200"
                  >
                    {link.label} ↗
                  </a>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative ${
                    isActive
                      ? 'text-[#ef4444]'
                      : 'text-white/80 hover:text-[#ef4444]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#ef4444] rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <SearchBar />
            <DarkModeToggle />
            <a
              href="https://www.digitalnerdhq.com/contact"
              className="ml-1 px-4 py-2 rounded-lg text-sm font-semibold text-white border border-white/30 hover:bg-white hover:text-[#060312] transition-all duration-200 hover:border-white"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-2">
            <SearchBar />
            <DarkModeToggle />
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
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

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          className="px-4 pt-3 pb-6 border-t border-white/10 flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = !link.external && (
              link.href === '/' ? isBlogActive : pathname.startsWith(link.href)
            )

            if (link.external) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-3 rounded-lg text-sm font-medium text-white/80 hover:text-[#ef4444] hover:bg-white/5 transition-all duration-200 flex items-center justify-between"
                >
                  {link.label}
                  <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#ef4444] bg-white/5'
                    : 'text-white/80 hover:text-[#ef4444] hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            )
          })}

          <div className="mt-3 pt-3 border-t border-white/10">
            <a
              href="https://www.digitalnerdhq.com/contact"
              className="flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold text-white border border-white/30 hover:bg-white hover:text-[#060312] transition-all duration-200"
            >
              Contact Us
            </a>

          </div>
        </nav>
      </div>
    </header>
  )
}
