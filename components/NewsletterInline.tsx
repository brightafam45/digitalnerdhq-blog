'use client'

import { useState } from 'react'

interface NewsletterInlineProps {
  compact?: boolean
}

export default function NewsletterInline({ compact = false }: NewsletterInlineProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    // TODO: Integrate with email service (e.g., Mailchimp, ConvertKit, Resend, Loops)
    // Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
    await new Promise((resolve) => setTimeout(resolve, 800))
    setLoading(false)
    setSubmitted(true)
  }

  if (compact) {
    return (
      <div className="text-center">
        {!submitted ? (
          <>
            <p className="font-heading font-bold text-xl text-white mb-1">
              Don&apos;t miss a post
            </p>
            <p className="text-white/60 font-ui text-sm mb-4">
              Subscribe for the latest articles straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <label htmlFor="compact-email" className="sr-only">Email address</label>
              <input
                id="compact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 font-ui text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex-shrink-0 bg-accent hover:bg-accent/90 disabled:bg-accent/60 text-white font-ui font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/30 active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-ui font-medium text-sm">You&apos;re subscribed! Thanks for joining.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <section className="bg-primary rounded-3xl p-8 md:p-12 text-center">
      {!submitted ? (
        <>
          <div className="w-12 h-1 rounded-full bg-accent mx-auto mb-6" />
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">
            Don&apos;t Miss a Post
          </h2>
          <p className="text-white/60 font-ui text-base mb-8 max-w-md mx-auto leading-relaxed">
            Join the DigitalNerdHQ community. Get the latest tech articles, tutorials, and insights delivered straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <label htmlFor="inline-email" className="sr-only">Email address</label>
            <input
              id="inline-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 font-ui text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex-shrink-0 bg-accent hover:bg-accent/90 disabled:bg-accent/60 text-white font-ui font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/30 active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap"
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
                'Subscribe Free →'
              )}
            </button>
          </form>
          <p className="mt-4 text-xs text-white/30 font-ui">No spam. Unsubscribe anytime.</p>
        </>
      ) : (
        <div className="py-6">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-heading font-bold text-xl text-white mb-2">You&apos;re Subscribed!</h3>
          <p className="text-white/60 font-ui text-sm">
            Welcome to the DigitalNerdHQ community. Check your inbox for a confirmation email.
          </p>
        </div>
      )}
    </section>
  )
}
