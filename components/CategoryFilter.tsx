'use client'

import { useRef } from 'react'
import type { Tag } from '@/types'

interface CategoryFilterProps {
  tags: Tag[]
  activeSlug: string | null
  onCategoryChange: (slug: string | null) => void
}

export default function CategoryFilter({ tags, activeSlug, onCategoryChange }: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative">
      {/* Fade mask on right */}
      <div
        className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to left, var(--bg), transparent)',
        }}
      />

      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* "All" pill */}
        <button
          onClick={() => onCategoryChange(null)}
          className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={
            activeSlug === null
              ? {
                  backgroundColor: '#ef4d50',
                  color: 'white',
                  boxShadow: '0 2px 12px rgba(239,77,80,0.35)',
                }
              : {
                  border: '1.5px solid var(--border)',
                  color: 'var(--text-muted)',
                  backgroundColor: 'transparent',
                }
          }
        >
          All
        </button>

        {tags.map((tag) => {
          const isActive = activeSlug === tag.slug
          return (
            <button
              key={tag.slug}
              onClick={() => onCategoryChange(tag.slug)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap"
              style={
                isActive
                  ? {
                      backgroundColor: '#ef4d50',
                      color: 'white',
                      boxShadow: '0 2px 12px rgba(239,77,80,0.35)',
                    }
                  : {
                      border: '1.5px solid var(--border)',
                      color: 'var(--text-muted)',
                      backgroundColor: 'transparent',
                    }
              }
            >
              {tag.name}
              {tag.postsCount !== undefined && (
                <span
                  className="ml-1.5 text-xs opacity-60"
                >
                  {tag.postsCount}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
