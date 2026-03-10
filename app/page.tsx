import { getPosts, getAllTags } from '@/lib/hashnode'
import type { Post, Tag } from '@/types'
import HeroGrid from '@/components/HeroGrid'
import PostCard from '@/components/PostCard'
import NewsletterInline from '@/components/NewsletterInline'
import Link from 'next/link'
import HomepageClient from '@/components/HomepageClient'

export const revalidate = 60

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
        style={{ backgroundColor: 'rgba(24,15,65,0.06)' }}
      >
        <svg className="w-10 h-10" style={{ color: 'rgba(24,15,65,0.3)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h2 className="font-bold text-2xl mb-3" style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif' }}>
        Articles Coming Soon
      </h2>
      <p className="text-base max-w-md leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
        We&apos;re crafting something great. Follow along on Hashnode and check back soon for in-depth articles.
      </p>
      <a
        href="https://digitalnerdhq.hashnode.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:opacity-90"
        style={{ backgroundColor: '#180f41' }}
      >
        Visit Hashnode Profile ↗
      </a>
    </div>
  )
}

export default async function HomePage() {
  const [publication, tags] = await Promise.all([
    getPosts(20),
    getAllTags(),
  ])

  const posts: Post[] = publication?.posts?.edges?.map((e) => e.node) ?? []

  if (posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState />
        <section className="pb-16">
          <NewsletterInline />
        </section>
      </div>
    )
  }

  const featured = posts[0]
  const recentTwo = posts.slice(1, 3)
  const gridPosts = posts.slice(3, 9)

  return (
    <>
      {/* Hero Grid */}
      <HeroGrid featured={featured} recent={recentTwo} />

      {/* Category Filter + Post Grid + Load More — client component */}
      <HomepageClient
        initialPosts={gridPosts}
        allPosts={posts.slice(3)}
        tags={tags}
      />

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <NewsletterInline />
      </section>

      {/* Explore Topics */}
      {tags.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="text-center mb-8">
            <h2
              className="font-bold text-2xl md:text-3xl mb-2"
              style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif' }}
            >
              Explore Topics
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Browse articles by topic
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {tags.slice(0, 20).map((tag: Tag) => (
              <Link
                key={tag.slug}
                href={`/tags/${tag.slug}`}
                className="px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  border: '1.5px solid var(--border)',
                  color: 'var(--text)',
                  backgroundColor: 'var(--card-bg)',
                  willChange: 'transform',
                }}
              >
                #{tag.name}
                {tag.postsCount !== undefined && (
                  <span className="ml-1.5 text-xs opacity-50">{tag.postsCount}</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
