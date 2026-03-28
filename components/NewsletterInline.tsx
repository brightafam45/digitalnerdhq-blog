interface NewsletterInlineProps {
  compact?: boolean
}

export default function NewsletterInline({ compact = false }: NewsletterInlineProps) {
  if (compact) {
    return (
      <div className="text-center">
        <p className="font-bold text-xl text-white mb-1">Don&apos;t miss a post</p>
        <p className="text-white/60 text-sm mb-5">
          Subscribe for the latest articles straight to your inbox.
        </p>
        <iframe
          src="https://digitalnerdhq.substack.com/embed"
          width="100%"
          height="150"
          style={{ border: 'none', background: 'transparent', maxWidth: 480, display: 'block', margin: '0 auto' }}
          frameBorder="0"
          scrolling="no"
        />
      </div>
    )
  }

  return (
    <section
      className="relative overflow-hidden rounded-3xl"
      style={{ backgroundColor: '#060312', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(239,68,68,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 px-8 md:px-12 pt-10 pb-8 text-center">
        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5"
          style={{ backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)' }}
        >
          <svg className="w-5 h-5" style={{ color: '#ef4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>

        <h2 className="font-bold text-2xl md:text-3xl text-white mb-3">
          Don&apos;t Miss a Post
        </h2>
        <p className="text-white/55 text-base max-w-md mx-auto leading-relaxed mb-8">
          Join the DigitalNerdHQ community. Get the latest articles, insights and updates straight to your inbox.
        </p>

        {/* Iframe card */}
        <div
          className="mx-auto rounded-2xl overflow-hidden"
          style={{
            maxWidth: 480,
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <iframe
            src="https://digitalnerdhq.substack.com/embed"
            width="100%"
            height="150"
            style={{ border: 'none', background: 'transparent', display: 'block' }}
            frameBorder="0"
            scrolling="no"
          />
        </div>

        <p className="mt-5 text-xs text-white/25">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
