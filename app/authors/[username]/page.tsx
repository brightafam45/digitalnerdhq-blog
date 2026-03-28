import { getAuthorPosts } from '@/lib/hashnode'
import type { Metadata } from 'next'
import type { Post } from '@/types'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'

export const revalidate = 60

interface AuthorPageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { username } = await params
  const posts = await getAuthorPosts(username, 1)
  if (posts.length === 0) return { title: 'Author Not Found' }
  const author = posts[0].author
  return {
    title: `${author.name} — Articles`,
    description: `Read all articles by ${author.name} on DigitalNerdHQ Blog.`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { username } = await params
  const posts: Post[] = await getAuthorPosts(username, 50)

  if (posts.length === 0) {
    notFound()
  }

  const author = posts[0].author

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Author header */}
      <div
        className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 rounded-2xl mb-12"
        style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)' }}
      >
        {/* Large avatar */}
        {author.profilePicture ? (
          <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0" style={{ boxShadow: '0 0 0 4px #4a90e2' }}>
            <Image
              src={author.profilePicture}
              alt={author.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        ) : (
          <div
            className="w-24 h-24 rounded-full flex-shrink-0 flex items-center justify-center text-white text-3xl font-bold"
            style={{ backgroundColor: '#180f41' }}
          >
            {author.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex-1">
          <h1
            className="font-black text-2xl md:text-3xl mb-1"
            style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif', fontWeight: 900 }}
          >
            {author.name}
          </h1>
          <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
            {posts.length} article{posts.length !== 1 ? 's' : ''} published
          </p>

          {author.bio?.html && (
            <div
              className="text-sm leading-relaxed mb-4"
              style={{ color: 'var(--text-muted)' }}
              dangerouslySetInnerHTML={{ __html: author.bio.html }}
            />
          )}

          {/* Social links */}
          <div className="flex flex-wrap gap-2">
            {author.socialMediaLinks?.twitter && (
              <a
                href={author.socialMediaLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  willChange: 'transform',
                }}
              >
                Twitter/X
              </a>
            )}
            {author.socialMediaLinks?.linkedin && (
              <a
                href={author.socialMediaLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  willChange: 'transform',
                }}
              >
                LinkedIn
              </a>
            )}
            {author.socialMediaLinks?.github && (
              <a
                href={author.socialMediaLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  willChange: 'transform',
                }}
              >
                GitHub
              </a>
            )}
            {author.socialMediaLinks?.website && (
              <a
                href={author.socialMediaLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  willChange: 'transform',
                }}
              >
                Website
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <h2
        className="font-bold text-xl mb-6"
        style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif' }}
      >
        Articles by {author.name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} variant="default" />
        ))}
      </div>
    </div>
  )
}
