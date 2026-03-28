'use client'

import { useState, useEffect, useCallback } from 'react'

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false)

  const openPopup = useCallback(() => {
    const alreadyShown = sessionStorage.getItem('newsletter-popup-shown')
    if (!alreadyShown) {
      setIsVisible(true)
      sessionStorage.setItem('newsletter-popup-shown', 'true')
    }
  }, [])

  useEffect(() => {
    const handleOpen = () => {
      setIsVisible(true)
      sessionStorage.setItem('newsletter-popup-shown', 'true')
    }
    window.addEventListener('open-newsletter', handleOpen)

    const timer = setTimeout(() => { openPopup() }, 12000)

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) openPopup()
    }
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('open-newsletter', handleOpen)
    }
  }, [openPopup])

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsVisible(false)}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative rounded-3xl shadow-2xl w-full max-w-md p-8"
        style={{
          backgroundColor: '#060312',
          border: '1px solid rgba(255,255,255,0.1)',
          animation: 'fadeSlideUp 0.35s ease-out forwards',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
          aria-label="Close newsletter popup"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Accent bar */}
        <div className="w-12 h-1 rounded-full mb-6" style={{ backgroundColor: '#ef4444' }} />

        <h2
          id="newsletter-popup-title"
          className="font-bold text-2xl text-white mb-2"
        >
          Stay in the Loop
        </h2>
        <p className="text-white/50 text-sm mb-6 leading-relaxed">
          Get the latest articles from DigitalNerdHQ straight to your inbox. No spam.
        </p>

        <iframe
          src="https://digitalnerdhq.substack.com/embed"
          width="100%"
          height="150"
          style={{ border: 'none', background: 'transparent' }}
          frameBorder="0"
          scrolling="no"
        />
      </div>
    </div>
  )
}
