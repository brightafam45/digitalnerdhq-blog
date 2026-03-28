'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Post, Tag } from '@/types'
import CategoryFilter from '@/components/CategoryFilter'
import PostCard from '@/components/PostCard'

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
}

interface HomepageClientProps {
  initialPosts: Post[]
  allPosts: Post[]
  tags: Tag[]
}

export default function HomepageClient({ initialPosts, allPosts, tags }: HomepageClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(6)
  const [loading, setLoading] = useState(false)

  const filteredPosts = activeTag
    ? allPosts.filter((p) => p.tags.some((t) => t.slug === activeTag))
    : allPosts

  const displayedPosts = filteredPosts.slice(0, visibleCount)
  const hasMore = visibleCount < filteredPosts.length

  const handleCategoryChange = useCallback((slug: string | null) => {
    setActiveTag(slug)
    setVisibleCount(6)
  }, [])

  const loadMore = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    setVisibleCount((prev) => prev + 6)
    setLoading(false)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category Filter */}
      {tags.length > 0 && (
        <div className="mb-8">
          <CategoryFilter
            tags={tags}
            activeSlug={activeTag}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      )}

      {/* Post Grid */}
      {displayedPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            No articles found in this category.
          </p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTag ?? 'all'}-${visibleCount}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={gridVariants}
            initial="hidden"
            animate="show"
          >
            {displayedPosts.map((post) => (
              <motion.div key={post.id} variants={cardVariants}>
                <PostCard post={post} variant="default" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 active:scale-[0.98]"
            style={{
              backgroundColor: '#180f41',
              color: 'white',
              willChange: 'transform',
            }}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading...
              </>
            ) : (
              <>
                Load More Articles
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
          <p className="mt-3 text-xs" style={{ color: 'var(--text-muted)' }}>
            Showing {displayedPosts.length} of {filteredPosts.length} articles
          </p>
        </div>
      )}
    </section>
  )
}
