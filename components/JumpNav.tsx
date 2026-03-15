'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface JumpNavProps {
  contentHtml: string
  defaultOpen?: boolean
  closeOnClick?: boolean
}

function extractHeadings(html: string): Heading[] {
  const parser = typeof window !== 'undefined' ? new DOMParser() : null
  if (!parser) return []

  const doc = parser.parseFromString(html, 'text/html')
  const elements = doc.querySelectorAll('h2, h3')
  const headings: Heading[] = []
  const seen = new Map<string, number>()

  elements.forEach((el) => {
    const text = el.textContent?.trim() ?? ''
    if (!text) return

    const base = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 60)

    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count}`

    headings.push({ id, text, level: parseInt(el.tagName[1], 10) })
  })

  return headings
}

export default function JumpNav({
  contentHtml,
  defaultOpen = true,
  closeOnClick = false,
}: JumpNavProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [open, setOpen] = useState(defaultOpen)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    setHeadings(extractHeadings(contentHtml))
  }, [contentHtml])

  const handleScroll = useCallback(() => {
    if (headings.length === 0) return
    const scrollY = window.scrollY + 120

    let current = headings[0]?.id ?? ''
    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el && el.offsetTop <= scrollY) {
        current = heading.id
      }
    }
    setActiveId(current)
  }, [headings])

  useEffect(() => {
    if (headings.length === 0) return
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observerRef.current?.disconnect()
    }
  }, [headings, handleScroll])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
    if (closeOnClick) setOpen(false)
  }

  if (headings.length === 0) return null

  const activeHeading = headings.find((h) => h.id === activeId)

  return (
    <nav aria-label="In this article">
      {/* Toggle header */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 group"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 min-w-0">
          <h3
            className="text-xs font-bold tracking-wide flex-shrink-0"
            style={{ color: 'var(--text-muted)' }}
          >
            In this article
          </h3>
          {/* Show active heading name when collapsed */}
          {!open && activeHeading && (
            <span
              className="text-xs font-medium truncate"
              style={{ color: '#ef4d50' }}
            >
              · {activeHeading.text}
            </span>
          )}
        </div>
        <svg
          className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
          style={{
            color: 'var(--text-muted)',
            transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible list */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? '60vh' : '0px',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.2s ease',
          overflowY: open ? 'auto' : 'hidden',
        }}
      >
        <ol className="space-y-0.5 pt-3">
          {headings.map((heading, index) => {
            const isActive = activeId === heading.id
            return (
              <li key={heading.id}>
                <button
                  onClick={() => handleClick(heading.id)}
                  className="w-full text-left flex items-start gap-2.5 py-1.5 px-2 rounded-lg transition-all duration-200 group"
                  style={
                    isActive
                      ? { backgroundColor: 'rgba(239,77,80,0.08)', color: '#ef4d50' }
                      : { color: 'var(--text-muted)' }
                  }
                >
                  <span
                    className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                    style={
                      isActive
                        ? { backgroundColor: '#ef4d50', color: 'white' }
                        : { backgroundColor: 'var(--border)', color: 'var(--text-muted)' }
                    }
                  >
                    {index + 1}
                  </span>
                  <span
                    className="text-sm leading-snug group-hover:text-[#ef4d50] transition-colors"
                    style={{ paddingLeft: heading.level === 3 ? '0.75rem' : '0' }}
                  >
                    {heading.text}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
