import { getPostsByTag, getPosts } from '@/lib/hashnode'
import type { Post, Tag } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 60

interface TagPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const publication = await getPosts(50)
  const allPosts = publication?.posts?.edges?.map((e) => e.node) ?? []
  const tagSlugs = new Set<string>()
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagSlugs.add(tag.slug))
  })
  return Array.from(tagSlugs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const publication = await getPostsByTag(params.slug, 1)
  const firstPost = publication?.posts?.edges?.[0]?.node
  const tag = firstPost?.tags.find((t: Tag) => t.slug === params.slug)
  const tagName = tag?.name ?? params.slug

  return {
    title: `#${tagName} Articles`,
    description: `Browse all DigitalNerdHQ articles tagged with #${tagName}. Digital marketing, tech, entrepreneurship, and more.`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const publication = await getPostsByTag(params.slug, 24)
  const posts: Post[] = publication?.posts?.edges?.map((e) => e.node) ?? []

  if (!publication) notFound()

  const tagInfo: Tag | undefined = posts
    .flatMap((p) => p.tags)
    .find((t) => t.slug === params.slug)

  const tagName = tagInfo?.name ?? params.slug

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/tags"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 hover:text-[#ef4d50]"
          style={{ color: 'var(--text-muted)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          All Topics
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
          style={{ color: '#ef4d50', backgroundColor: 'rgba(239,77,80,0.1)' }}
        >
          # {tagName}
        </span>
        <h1
          className="font-black text-3xl md:text-4xl mb-3"
          style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif', fontWeight: 900 }}
        >
          Articles tagged:{' '}
          <span style={{ color: '#ef4d50' }}>#{tagName}</span>
        </h1>
        <p className="text-base" style={{ color: 'var(--text-muted)' }}>
          {posts.length} article{posts.length !== 1 ? 's' : ''} on this topic
        </p>
      </div>

      {/* Posts grid */}
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="mb-4 text-base" style={{ color: 'var(--text-muted)' }}>
            No articles found for <strong style={{ color: 'var(--text)' }}>#{tagName}</strong> yet.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: '#180f41' }}
          >
            Browse all articles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} variant="default" />
          ))}
        </div>
      )}

      {/* Load more */}
      {publication.posts?.pageInfo?.hasNextPage && (
        <div className="mt-12 text-center">
          <a
            href="https://digitalnerdhq.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-md"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--text)',
              backgroundColor: 'var(--card-bg)',
            }}
          >
            View all #{tagName} posts on Hashnode ↗
          </a>
        </div>
      )}
    </div>
  )
}
