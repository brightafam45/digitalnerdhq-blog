'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function NavButtons() {
  const router = useRouter()
  const pathname = usePathname()
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)

  useEffect(() => {
    // Check history state on mount and route change
    setCanGoBack(window.history.length > 1)
    setCanGoForward(false) // forward is unknown until user goes back
  }, [pathname])

  const handleBack = () => {
    setCanGoForward(true)
    router.back()
  }

  const handleForward = () => {
    router.forward()
  }

  // Only render on article/blog pages
  const isArticlePage = pathname.startsWith('/blog/') || pathname.startsWith('/tags/') || pathname.startsWith('/authors/')
  if (!isArticlePage) return null

  return (
    <>
      {/* Mobile / Tablet: fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div
          className="flex items-center justify-between px-4 py-3 border-t"
          style={{
            backgroundColor: 'var(--bg)',
            borderColor: 'var(--border)',
          }}
        >
          <button
            onClick={handleBack}
            disabled={!canGoBack}
            aria-label="Go back"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            style={{
              backgroundColor: canGoBack ? '#060312' : 'var(--border)',
              color: canGoBack ? '#fff' : 'var(--text-muted)',
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="h-1 w-1 rounded-full" style={{ backgroundColor: 'var(--border)' }} />

          <button
            onClick={handleForward}
            disabled={!canGoForward}
            aria-label="Go forward"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            style={{
              backgroundColor: canGoForward ? '#060312' : 'var(--border)',
              color: canGoForward ? '#fff' : 'var(--text-muted)',
            }}
          >
            Forward
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop: floating buttons on left */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        <button
          onClick={handleBack}
          disabled={!canGoBack}
          aria-label="Go back"
          className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 hover:shadow-xl active:scale-95"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
          title="Go back"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleForward}
          disabled={!canGoForward}
          aria-label="Go forward"
          className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 hover:shadow-xl active:scale-95"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
          title="Go forward"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  )
}
