import Link from 'next/link'
import Image from 'next/image'
import type { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div
      className="rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start gap-5 mt-10"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Avatar */}
      {author.profilePicture ? (
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-4">
          <Image
            src={author.profilePicture}
            alt={author.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      ) : (
        <div
          className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold"
          style={{ backgroundColor: '#180f41' }}
        >
          {author.name.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Info */}
      <div className="flex-1">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-1"
          style={{ color: 'var(--text-muted)' }}
        >
          Written by
        </p>
        <h3
          className="font-bold text-xl mb-2"
          style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif' }}
        >
          {author.name}
        </h3>

        {author.bio?.html ? (
          <div
            className="text-sm leading-relaxed mb-3"
            style={{ color: 'var(--text-muted)' }}
            dangerouslySetInnerHTML={{ __html: author.bio.html }}
          />
        ) : (
          <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
            Author at DigitalNerdHQ Blog
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {author.username && (
            <Link
              href={`/authors/${author.username}`}
              className="text-sm font-semibold transition-colors duration-200 hover:opacity-80"
              style={{ color: '#ef4444' }}
            >
              View all posts →
            </Link>
          )}

          {/* Social links */}
          {author.socialMediaLinks?.twitter && (
            <a
              href={author.socialMediaLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 hover:scale-105"
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
              className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 hover:scale-105"
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
              className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                willChange: 'transform',
              }}
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
