'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface JumpNavProps {
  contentHtml: string
}

function extractHeadings(html: string): Heading[] {
  const parser = typeof window !== 'undefined' ? new DOMParser() : null
  if (!parser) return []

  const doc = parser.parseFromString(html, 'text/html')
  const elements = doc.querySelectorAll('h2, h3')
  const headings: Heading[] = []

  elements.forEach((el, index) => {
    const text = el.textContent?.trim() ?? ''
    if (!text) return

    // Generate ID if not present
    const id =
      el.id ||
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 60) +
        (index > 0 ? `-${index}` : '')

    headings.push({
      id,
      text,
      level: parseInt(el.tagName[1], 10),
    })
  })

  return headings
}

export default function JumpNav({ contentHtml }: JumpNavProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
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
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (headings.length === 0) return null

  return (
    <nav aria-label="In this article">
      <h3
        className="text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color: 'var(--text-muted)' }}
      >
        In this article
      </h3>
      <ol className="space-y-1">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id
          return (
            <li key={heading.id}>
              <button
                onClick={() => handleClick(heading.id)}
                className="w-full text-left flex items-start gap-2.5 py-1.5 px-2 rounded-lg transition-all duration-200 group"
                style={
                  isActive
                    ? {
                        backgroundColor: 'rgba(239,77,80,0.08)',
                        color: '#ef4d50',
                      }
                    : {
                        color: 'var(--text-muted)',
                      }
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
    </nav>
  )
}
