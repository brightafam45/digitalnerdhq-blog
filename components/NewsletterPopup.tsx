'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="newsletter-popup-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsVisible(false)}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className="relative rounded-3xl shadow-2xl w-full max-w-md p-8"
            style={{
              backgroundColor: '#060312',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Subtle radial glow */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(239,68,68,0.1) 0%, transparent 70%)',
              }}
            />

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-white/20"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
              aria-label="Close newsletter popup"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div
              className="relative inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5"
              style={{ backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)' }}
            >
              <svg className="w-5 h-5" style={{ color: '#ef4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>

            <h2
              id="newsletter-popup-title"
              className="relative font-bold text-2xl text-white mb-2"
            >
              Stay in the Loop
            </h2>
            <p className="relative text-white/50 text-sm mb-6 leading-relaxed">
              Get the latest articles from DigitalNerdHQ straight to your inbox. No spam.
            </p>

            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <iframe
                src="https://digitalnerdhq.substack.com/embed"
                width="100%"
                height="150"
                style={{ border: 'none', background: 'transparent' }}
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
