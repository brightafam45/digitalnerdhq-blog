'use client'

import { useState, useCallback } from 'react'
import type { Post, Tag } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'

const PAGE_SIZE = 12

interface BlogPageClientProps {
  allPosts: Post[]
  allTags: Tag[]
}

export default function BlogPageClient({ allPosts, allTags }: BlogPageClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = allPosts.filter((post) => {
    const matchesTag = !activeTag || post.tags.some((t) => t.slug === activeTag)
    const lower = searchQuery.toLowerCase()
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(lower) ||
      post.brief.toLowerCase().includes(lower)
    return matchesTag && matchesSearch
  })

  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE)
  const paginatedPosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleCategoryChange = useCallback((slug: string | null) => {
    setActiveTag(slug)
    setPage(1)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  return (
    <>
      {/* Search + Filter Row */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: 'var(--text-muted)' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ef4444]/30"
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
          />
        </div>

        {/* Article count */}
        <div className="flex items-center text-sm" style={{ color: 'var(--text-muted)' }}>
          {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          {activeTag && allTags.find((t) => t.slug === activeTag)
            ? ` tagged #${allTags.find((t) => t.slug === activeTag)?.name}`
            : ''}
        </div>
      </div>

      {/* Category Filter */}
      {allTags.length > 0 && (
        <div className="mb-8">
          <CategoryFilter
            tags={allTags}
            activeSlug={activeTag}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      )}

      {/* Posts Grid */}
      {paginatedPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-semibold text-lg mb-2" style={{ color: 'var(--text)' }}>
            No articles found
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Try adjusting your search or filter.
          </p>
          <button
            onClick={() => {
              setActiveTag(null)
              setSearchQuery('')
              setPage(1)
            }}
            className="mt-4 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ color: '#ef4444' }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <PostCard key={post.id} post={post} variant="default" />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-40"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text)',
              backgroundColor: 'var(--card-bg)',
            }}
          >
            ← Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .map((p, idx, arr) => {
              const showEllipsis = idx > 0 && p - arr[idx - 1] > 1
              return (
                <span key={p} className="flex items-center gap-2">
                  {showEllipsis && (
                    <span style={{ color: 'var(--text-muted)' }}>...</span>
                  )}
                  <button
                    onClick={() => setPage(p)}
                    className="w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200"
                    style={
                      p === page
                        ? { backgroundColor: '#ef4444', color: 'white' }
                        : {
                            border: '1px solid var(--border)',
                            color: 'var(--text)',
                            backgroundColor: 'var(--card-bg)',
                          }
                    }
                  >
                    {p}
                  </button>
                </span>
              )
            })}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-40"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text)',
              backgroundColor: 'var(--card-bg)',
            }}
          >
            Next →
          </button>
        </div>
      )}
    </>
  )
}
