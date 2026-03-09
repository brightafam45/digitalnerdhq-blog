import { getPosts } from '@/lib/hashnode'
import type { Post, Tag } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Browse all tech articles, tutorials, and deep-dives from DigitalNerdHQ.',
}

interface BlogPageProps {
  searchParams: { tag?: string; after?: string }
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-5">
        <svg className="w-8 h-8 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>
      <h2 className="font-heading font-bold text-xl text-primary mb-2">No articles yet</h2>
      <p className="text-gray-500 font-ui text-sm max-w-sm leading-relaxed">
        Articles will appear here once published on Hashnode. Check back soon!
      </p>
    </div>
  )
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const publication = await getPosts(24)
  const allPosts: Post[] = publication?.posts?.edges?.map((e) => e.node) ?? []

  // Extract unique tags
  const tagMap = new Map<string, Tag>()
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagMap.set(tag.slug, tag))
  })
  const allTags = Array.from(tagMap.values())

  // Filter posts by active tag
  const activeTag = searchParams.tag
  const filteredPosts = activeTag
    ? allPosts.filter((post) => post.tags.some((t) => t.slug === activeTag))
    : allPosts

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="font-heading font-black text-3xl md:text-4xl text-primary mb-3">
          All Articles
        </h1>
        <p className="text-gray-500 font-ui text-base">
          {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          {activeTag && allTags.find((t) => t.slug === activeTag)
            ? ` tagged #${allTags.find((t) => t.slug === activeTag)?.name}`
            : ''}
        </p>
      </div>

      {/* Tag filter pills */}
      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`px-3 py-1.5 rounded-full text-xs font-ui font-medium transition-all duration-200 ${
              !activeTag
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            All
          </Link>
          {allTags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/blog?tag=${tag.slug}`}
              className={`px-3 py-1.5 rounded-full text-xs font-ui font-medium transition-all duration-200 ${
                activeTag === tag.slug
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      )}

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} variant="default" />
          ))}
        </div>
      )}

      {/* Load More / Pagination hint */}
      {publication?.posts?.pageInfo?.hasNextPage && (
        <div className="mt-12 text-center">
          <p className="text-gray-400 font-ui text-sm mb-4">
            Showing {filteredPosts.length} of many articles
          </p>
          <a
            href="https://digitalnerdhq.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-primary text-primary font-ui font-medium text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-sm"
          >
            View all on Hashnode ↗
          </a>
        </div>
      )}
    </div>
  )
}
