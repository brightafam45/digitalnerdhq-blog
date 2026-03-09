'use client'

import { useState, useEffect, useCallback } from 'react'

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const openPopup = useCallback(() => {
    const alreadyShown = sessionStorage.getItem('newsletter-popup-shown')
    if (!alreadyShown) {
      setIsVisible(true)
      sessionStorage.setItem('newsletter-popup-shown', 'true')
    }
  }, [])

  useEffect(() => {
    // Listen for manual open event from Header Subscribe button
    const handleOpen = () => {
      setIsVisible(true)
      sessionStorage.setItem('newsletter-popup-shown', 'true')
    }
    window.addEventListener('open-newsletter', handleOpen)

    // Auto-show after 8 seconds (only if not already shown this session)
    const timer = setTimeout(() => {
      openPopup()
    }, 8000)

    // Exit intent: mouse leaves through top of page
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        openPopup()
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('open-newsletter', handleOpen)
    }
  }, [openPopup])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    // TODO: Integrate with email service (e.g., Mailchimp, ConvertKit, Resend, Loops)
    // Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
    await new Promise((resolve) => setTimeout(resolve, 800)) // Simulated delay
    setLoading(false)
    setSubmitted(true)
  }

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
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-[fadeSlideUp_0.35s_ease-out_forwards]"
        style={{
          animation: 'fadeSlideUp 0.35s ease-out forwards',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 text-gray-500 hover:text-gray-700"
          aria-label="Close newsletter popup"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Accent bar */}
        <div className="w-12 h-1 rounded-full bg-accent mb-6" />

        {!submitted ? (
          <>
            <h2
              id="newsletter-popup-title"
              className="font-heading font-bold text-2xl text-primary mb-2"
            >
              Stay in the Loop
            </h2>
            <p className="text-gray-500 font-ui text-sm mb-6 leading-relaxed">
              Get the latest tech insights delivered to your inbox. No spam, just quality content.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="popup-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="popup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-primary placeholder-gray-400 font-ui text-sm transition-all duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 disabled:bg-accent/60 text-white font-ui font-semibold text-sm px-4 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/30 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  'Subscribe — It\'s Free'
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-400 font-ui">
              Unsubscribe anytime. We respect your privacy.
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-heading font-bold text-xl text-primary mb-2">You&apos;re in!</h3>
            <p className="text-gray-500 font-ui text-sm leading-relaxed">
              Thanks for subscribing. Watch your inbox for the latest from DigitalNerdHQ.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 font-ui text-sm text-gray-400 hover:text-primary transition-colors duration-200 underline underline-offset-2"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
