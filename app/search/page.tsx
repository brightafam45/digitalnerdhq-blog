'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { Post } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

function highlightText(text: string, query: string): string {
  if (!query.trim()) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return text.replace(
    new RegExp(`(${escaped})`, 'gi'),
    '<mark style="background:rgba(239,77,80,0.2);color:#ef4d50;border-radius:2px;padding:0 2px;">$1</mark>'
  )
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Post[]>([])
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const debouncedQuery = useDebounce(query, 300)

  // Update URL param
  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedQuery) params.set('q', debouncedQuery)
    router.replace(`/search${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false })
  }, [debouncedQuery, router])

  // Fetch all posts once
  useEffect(() => {
    const fetchAll = async () => {
      const { getPosts } = await import('@/lib/hashnode')
      const publication = await getPosts(50)
      const posts = publication?.posts?.edges?.map((e: { node: Post }) => e.node) ?? []
      setAllPosts(posts)
    }
    fetchAll()
  }, [])

  // Filter results
  const doSearch = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([])
        setSearched(false)
        return
      }
      setLoading(true)
      const lower = q.toLowerCase()
      const filtered = allPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.brief.toLowerCase().includes(lower) ||
          p.tags.some((t) => t.name.toLowerCase().includes(lower))
      )
      setResults(filtered)
      setSearched(true)
      setLoading(false)
    },
    [allPosts]
  )

  useEffect(() => {
    doSearch(debouncedQuery)
  }, [debouncedQuery, doSearch])

  const suggestions = ['digital marketing', 'freelancing', 'LinkedIn', 'automation', 'online business']

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="font-black text-3xl md:text-4xl mb-2"
          style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif', fontWeight: 900 }}
        >
          Search Articles
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Find articles on digital marketing, tech, entrepreneurship, and more.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-8">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, topic, or keyword..."
          autoFocus
          className="w-full pl-12 pr-12 py-4 rounded-2xl text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ef4d50]/30"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '2px solid var(--border)',
            color: 'var(--text)',
            fontSize: '1rem',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions (when no query) */}
      {!query && !searched && (
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
            Popular searches
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 hover:border-[#ef4d50] hover:text-[#ef4d50]"
                style={{
                  border: '1.5px solid var(--border)',
                  color: 'var(--text-muted)',
                  willChange: 'transform',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <svg className="w-6 h-6 animate-spin" style={{ color: '#ef4d50' }} viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}

      {/* Results */}
      {!loading && searched && (
        <>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            {results.length === 0
              ? `No results for "${query}"`
              : `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
          </p>

          {results.length === 0 ? (
            <div
              className="text-center py-16 rounded-2xl"
              style={{ border: '1px dashed var(--border)' }}
            >
              <svg
                className="w-12 h-12 mx-auto mb-4 opacity-30"
                style={{ color: 'var(--text)' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="font-semibold mb-2" style={{ color: 'var(--text)' }}>No results found</p>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                Try a different keyword or browse by topic.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.slice(0, 3).map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                    style={{ color: '#ef4d50', backgroundColor: 'rgba(239,77,80,0.1)' }}
                  >
                    Try: {s}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/blog"
                  className="text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: 'var(--text-muted)' }}
                >
                  ← Browse all articles
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((post) => {
                const highlight = highlightText(post.brief, query)
                return (
                  <div key={post.id} className="flex flex-col">
                    <PostCard post={post} variant="default" />
                    {query && (
                      <div
                        className="mt-2 px-3 py-2 rounded-lg text-xs leading-relaxed"
                        style={{
                          backgroundColor: 'rgba(239,77,80,0.04)',
                          border: '1px solid rgba(239,77,80,0.1)',
                          color: 'var(--text-muted)',
                        }}
                        dangerouslySetInnerHTML={{ __html: `...${highlight.slice(0, 120)}...` }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
