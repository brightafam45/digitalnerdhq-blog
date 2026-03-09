import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import type { Post } from '@/types'
import TagBadge from '@/components/TagBadge'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const formattedDate = format(new Date(post.publishedAt), 'MMMM d, yyyy')

  return (
    <article className="relative w-full overflow-hidden rounded-3xl min-h-[480px] md:min-h-[560px] flex items-end group">
      {/* Background image */}
      {post.coverImage?.url ? (
        <Image
          src={post.coverImage.url}
          alt={post.title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/50" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#180f41] via-[#180f41]/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 md:p-12 w-full">
        {/* FEATURED label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-accent text-white text-xs font-ui font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Featured
          </span>
          {post.tags[0] && (
            <span className="text-white/60 text-xs font-ui">
              #{post.tags[0].name}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-heading font-black text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight max-w-3xl mb-4 text-balance">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-accent/90 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h1>

        {/* Brief */}
        <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl mb-6 line-clamp-2">
          {post.brief}
        </p>

        {/* Meta + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            {post.author.profilePicture && (
              <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/30">
                <Image
                  src={post.author.profilePicture}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
            )}
            <div className="text-sm font-ui">
              <p className="text-white font-medium">{post.author.name}</p>
              <p className="text-white/50 text-xs">
                <time dateTime={post.publishedAt}>{formattedDate}</time>
                {' · '}
                {post.readTimeInMinutes} min read
              </p>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-ui font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/30 hover:gap-3 sm:ml-auto active:scale-95"
          >
            Read Article
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
