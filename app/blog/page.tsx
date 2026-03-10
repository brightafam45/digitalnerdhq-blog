import { getPosts } from '@/lib/hashnode'
import type { Post, Tag } from '@/types'
import type { Metadata } from 'next'
import BlogPageClient from '@/components/BlogPageClient'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'All Articles',
  description:
    'Browse all articles on digital marketing, tech, entrepreneurship, freelancing, and online business from DigitalNerdHQ.',
}

export default async function BlogPage() {
  const publication = await getPosts(50)
  const allPosts: Post[] = publication?.posts?.edges?.map((e) => e.node) ?? []

  // Extract unique tags
  const tagMap = new Map<string, Tag & { postsCount: number }>()
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      const existing = tagMap.get(tag.slug)
      if (existing) {
        existing.postsCount++
      } else {
        tagMap.set(tag.slug, { ...tag, postsCount: 1 })
      }
    })
  })
  const allTags = Array.from(tagMap.values())

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-10">
        <h1
          className="font-black text-3xl md:text-4xl mb-2"
          style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif', fontWeight: 900 }}
        >
          All Articles
        </h1>
        <p className="text-base" style={{ color: 'var(--text-muted)' }}>
          Where digital minds level up — {allPosts.length} articles published
        </p>
      </div>

      <BlogPageClient allPosts={allPosts} allTags={allTags} />
    </div>
  )
}
