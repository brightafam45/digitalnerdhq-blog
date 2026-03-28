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
      className="rounded-3xl p-8 md:p-12 text-center"
      style={{ backgroundColor: '#060312', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="w-12 h-1 rounded-full mx-auto mb-6" style={{ backgroundColor: '#ef4444' }} />
      <h2 className="font-bold text-2xl md:text-3xl text-white mb-3">
        Don&apos;t Miss a Post
      </h2>
      <p className="text-white/60 text-base mb-8 max-w-md mx-auto leading-relaxed">
        Join the DigitalNerdHQ community. Get the latest articles, insights and updates straight to your inbox.
      </p>
      <iframe
        src="https://digitalnerdhq.substack.com/embed"
        width="100%"
        height="150"
        style={{ border: 'none', background: 'transparent', maxWidth: 520, display: 'block', margin: '0 auto' }}
        frameBorder="0"
        scrolling="no"
      />
      <p className="mt-4 text-xs text-white/30">No spam. Unsubscribe anytime.</p>
    </section>
  )
}
