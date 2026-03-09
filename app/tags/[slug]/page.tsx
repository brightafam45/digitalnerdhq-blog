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
  // Fetch a few posts to find the tag name
  const publication = await getPostsByTag(params.slug, 1)
  const firstPost = publication?.posts?.edges?.[0]?.node
  const tag = firstPost?.tags.find((t) => t.slug === params.slug)
  const tagName = tag?.name ?? params.slug

  return {
    title: `#${tagName} Articles`,
    description: `Browse all DigitalNerdHQ articles tagged with #${tagName}.`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const publication = await getPostsByTag(params.slug, 24)
  const posts: Post[] = publication?.posts?.edges?.map((e) => e.node) ?? []

  if (!publication) notFound()

  // Determine tag name from posts
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
          className="inline-flex items-center gap-2 text-sm font-ui text-gray-500 hover:text-primary transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          All Topics
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-full mb-4">
          <span className="text-primary/40 font-heading font-bold text-sm">#</span>
          <span className="text-sm font-ui font-medium text-primary/70">{tagName}</span>
        </div>
        <h1 className="font-heading font-black text-3xl md:text-4xl text-primary mb-3">
          Posts tagged:{' '}
          <span className="text-accent">#{tagName}</span>
        </h1>
        <p className="text-gray-500 font-ui text-base">
          {posts.length} article{posts.length !== 1 ? 's' : ''} on this topic
        </p>
      </div>

      {/* Posts grid */}
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 font-ui text-base mb-4">
            No articles found for <strong className="text-gray-600">#{tagName}</strong> yet.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary text-white font-ui font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-200"
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
            className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-primary text-primary font-ui font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-sm"
          >
            View all #{tagName} posts on Hashnode ↗
          </a>
        </div>
      )}
    </div>
  )
}
