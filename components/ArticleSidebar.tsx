'use client'

import { useState } from 'react'
import type { Post } from '@/types'
import JumpNav from '@/components/JumpNav'
import PostCard from '@/components/PostCard'
import NewsletterInline from '@/components/NewsletterInline'

interface ArticleSidebarProps {
  contentHtml: string
  relatedPosts: Post[]
  articleUrl: string
  articleTitle: string
}

function ShareButtons({ url, title }: { url: string; title: string }) {
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-2">
      <h3
        className="text-xs font-bold uppercase tracking-widest mb-1"
        style={{ color: 'var(--text-muted)' }}
      >
        Share
      </h3>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
          willChange: 'transform',
        }}
      >
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share on X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
          willChange: 'transform',
        }}
      >
        <svg className="w-4 h-4 flex-shrink-0 text-[#0077b5]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        Share on LinkedIn
      </a>
      <button
        onClick={copyLink}
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02] text-left"
        style={{
          backgroundColor: copied ? 'rgba(239,77,80,0.08)' : 'var(--bg-secondary)',
          border: `1px solid ${copied ? '#ef4d50' : 'var(--border)'}`,
          color: copied ? '#ef4d50' : 'var(--text)',
          willChange: 'transform',
        }}
      >
        {copied ? (
          <>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Link
          </>
        )}
      </button>
    </div>
  )
}

export default function ArticleSidebar({
  contentHtml,
  relatedPosts,
  articleUrl,
  articleTitle,
}: ArticleSidebarProps) {
  return (
    <aside className="hidden lg:block w-[340px] flex-shrink-0">
      <div className="sticky top-24 space-y-8 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
        {/* Jump Nav */}
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)',
          }}
        >
          <JumpNav contentHtml={contentHtml} />
        </div>

        {/* Newsletter CTA */}
        <div
          className="p-5 rounded-xl"
          style={{ backgroundColor: '#180f41' }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
            Newsletter
          </p>
          <h4 className="text-white font-bold text-base mb-2 leading-snug">
            Get articles in your inbox
          </h4>
          <p className="text-white/60 text-xs leading-relaxed mb-4">
            Join our newsletter. No spam, just quality content on digital marketing and tech.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2"
          >
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ef4d50]/50"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: '#ef4d50' }}
            >
              Subscribe Free
            </button>
          </form>
        </div>

        {/* Share */}
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)',
          }}
        >
          <ShareButtons url={articleUrl} title={articleTitle} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              Related Articles
            </h3>
            <div className="space-y-1">
              {relatedPosts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} variant="compact" />
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
