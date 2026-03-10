import { getPosts } from '@/lib/hashnode'
import type { Metadata } from 'next'
import type { Author, Post } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Authors',
  description: 'Meet the authors behind DigitalNerdHQ Blog — experts in digital marketing, tech, and online business.',
}

interface AuthorWithStats extends Author {
  postCount: number
  latestPost?: Post
}

export default async function AuthorsPage() {
  const publication = await getPosts(50)
  const posts: Post[] = publication?.posts?.edges?.map((e) => e.node) ?? []

  // Aggregate unique authors
  const authorMap = new Map<string, AuthorWithStats>()
  posts.forEach((post) => {
    const key = post.author.username ?? post.author.name
    const existing = authorMap.get(key)
    if (existing) {
      existing.postCount++
      if (!existing.latestPost) existing.latestPost = post
    } else {
      authorMap.set(key, {
        ...post.author,
        postCount: 1,
        latestPost: post,
      })
    }
  })

  const authors = Array.from(authorMap.values()).sort(
    (a, b) => b.postCount - a.postCount
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="font-black text-3xl md:text-4xl mb-2"
          style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif', fontWeight: 900 }}
        >
          Authors
        </h1>
        <p className="text-base" style={{ color: 'var(--text-muted)' }}>
          Meet the minds behind DigitalNerdHQ Blog
        </p>
      </div>

      {authors.length === 0 ? (
        <div className="text-center py-20">
          <p style={{ color: 'var(--text-muted)' }}>No authors found yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div
              key={author.username ?? author.name}
              className="group rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border)',
                willChange: 'transform',
              }}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                {author.profilePicture ? (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-4">
                    <Image
                      src={author.profilePicture}
                      alt={author.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                ) : (
                  <div
                    className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xl font-bold"
                    style={{ backgroundColor: '#180f41' }}
                  >
                    {author.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h2
                    className="font-bold text-lg"
                    style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif' }}
                  >
                    {author.name}
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {author.postCount} article{author.postCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Bio excerpt */}
              {author.bio?.html && (
                <div
                  className="text-sm leading-relaxed line-clamp-2 mb-4"
                  style={{ color: 'var(--text-muted)' }}
                  dangerouslySetInnerHTML={{ __html: author.bio.html }}
                />
              )}

              {/* View posts link */}
              {author.username && (
                <Link
                  href={`/authors/${author.username}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: '#ef4d50' }}
                >
                  View posts
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
