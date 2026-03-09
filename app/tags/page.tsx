import { getPosts } from '@/lib/hashnode'
import type { Tag } from '@/types'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Browse all topics and categories on DigitalNerdHQ Blog.',
}

export default async function TagsIndexPage() {
  const publication = await getPosts(50)
  const allPosts = publication?.posts?.edges?.map((e) => e.node) ?? []

  // Collect all tags with post counts
  const tagMap = new Map<string, { tag: Tag; count: number }>()
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      const existing = tagMap.get(tag.slug)
      if (existing) {
        existing.count++
      } else {
        tagMap.set(tag.slug, { tag, count: 1 })
      }
    })
  })

  const tags = Array.from(tagMap.values()).sort((a, b) => b.count - a.count)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="font-heading font-black text-3xl md:text-4xl text-primary mb-3">Topics</h1>
        <p className="text-gray-500 font-ui text-base">
          Browse articles by topic. {tags.length} topic{tags.length !== 1 ? 's' : ''} so far.
        </p>
      </div>

      {tags.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 font-ui">No topics yet. Check back after articles are published.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag.slug}
              href={`/tags/${tag.slug}`}
              className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="inline-block w-8 h-8 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-200 flex items-center justify-center">
                  <span className="text-primary/40 font-heading font-bold text-sm">#</span>
                </span>
                <span className="text-xs font-ui text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                  {count} post{count !== 1 ? 's' : ''}
                </span>
              </div>
              <h2 className="font-heading font-bold text-base text-primary group-hover:text-accent transition-colors duration-200">
                {tag.name}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
