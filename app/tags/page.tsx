import { getAllTags } from '@/lib/hashnode'
import type { Tag } from '@/types'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Topics',
  description:
    'Browse all topics on DigitalNerdHQ Blog — digital marketing, freelancing, tech, entrepreneurship, and more.',
}

export default async function TagsIndexPage() {
  const tags: Tag[] = await getAllTags()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1
          className="font-black text-3xl md:text-4xl mb-2"
          style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif', fontWeight: 900 }}
        >
          Topics
        </h1>
        <p className="text-base" style={{ color: 'var(--text-muted)' }}>
          Browse {tags.length} topic{tags.length !== 1 ? 's' : ''} across all articles
        </p>
      </div>

      {tags.length === 0 ? (
        <div className="text-center py-16">
          <p style={{ color: 'var(--text-muted)' }}>
            No topics yet. Check back after articles are published.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/tags/${tag.slug}`}
              className="group p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border)',
                willChange: 'transform',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className="inline-flex w-9 h-9 rounded-xl items-center justify-center font-bold text-sm transition-colors duration-200"
                  style={{ backgroundColor: 'rgba(239,77,80,0.1)', color: '#ef4d50' }}
                >
                  #
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg)' }}
                >
                  {tag.postsCount ?? 0} post{(tag.postsCount ?? 0) !== 1 ? 's' : ''}
                </span>
              </div>
              <h2
                className="font-bold text-base group-hover:text-[#ef4d50] transition-colors duration-200"
                style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif' }}
              >
                {tag.name}
              </h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
