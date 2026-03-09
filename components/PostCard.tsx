import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import type { Post } from '@/types'
import TagBadge from '@/components/TagBadge'

interface PostCardProps {
  post: Post
  variant?: 'default' | 'large' | 'compact'
}

export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  const formattedDate = format(new Date(post.publishedAt), 'MMM d, yyyy')
  const firstTag = post.tags[0]

  if (variant === 'compact') {
    return (
      <article className="group py-4 border-b border-gray-200 last:border-0">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            {firstTag && (
              <div className="mb-1">
                <TagBadge tag={firstTag} size="sm" />
              </div>
            )}
            <h3 className="font-heading font-700 text-base leading-snug text-primary group-hover:text-accent transition-colors duration-200">
              <Link href={`/blog/${post.slug}`} className="hover:underline underline-offset-2">
                {post.title}
              </Link>
            </h3>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-gray-500 font-ui">
              <span>{post.author.name}</span>
              <span className="text-gray-300">·</span>
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              <span className="text-gray-300">·</span>
              <span>{post.readTimeInMinutes} min read</span>
            </div>
          </div>
          {post.coverImage?.url && (
            <Link href={`/blog/${post.slug}`} className="flex-shrink-0">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={post.coverImage.url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="64px"
                />
              </div>
            </Link>
          )}
        </div>
      </article>
    )
  }

  if (variant === 'large') {
    return (
      <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
        <div className="flex flex-col md:flex-row">
          {post.coverImage?.url && (
            <Link href={`/blog/${post.slug}`} className="flex-shrink-0 md:w-2/5">
              <div className="relative w-full h-52 md:h-full min-h-[220px] overflow-hidden">
                <Image
                  src={post.coverImage.url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </Link>
          )}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
              {firstTag && (
                <div className="mb-3">
                  <TagBadge tag={firstTag} size="sm" variant="accent" />
                </div>
              )}
              <h2 className="font-heading font-bold text-xl md:text-2xl leading-tight text-primary group-hover:text-accent transition-colors duration-200 mb-3">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
                {post.brief}
              </p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              {post.author.profilePicture && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={post.author.profilePicture}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
              )}
              <div className="text-xs text-gray-500 font-ui">
                <span className="font-medium text-primary">{post.author.name}</span>
                <span className="mx-1.5 text-gray-300">·</span>
                <time dateTime={post.publishedAt}>{formattedDate}</time>
                <span className="mx-1.5 text-gray-300">·</span>
                <span>{post.readTimeInMinutes} min read</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }

  // Default variant
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-gray-100 flex flex-col">
      {post.coverImage?.url ? (
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </Link>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-primary via-primary/80 to-accent/60 flex items-center justify-center">
          <span className="text-white/30 text-5xl font-heading font-bold select-none">
            {post.title.charAt(0)}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {firstTag && (
          <div className="mb-3">
            <TagBadge tag={firstTag} size="sm" />
          </div>
        )}
        <h2 className="font-heading font-bold text-lg leading-snug text-primary group-hover:text-accent transition-colors duration-200 mb-2 line-clamp-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
          {post.brief}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
          {post.author.profilePicture && (
            <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={post.author.profilePicture}
                alt={post.author.name}
                fill
                className="object-cover"
                sizes="28px"
              />
            </div>
          )}
          <div className="text-xs text-gray-500 font-ui min-w-0">
            <span className="font-medium text-primary truncate">{post.author.name}</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              <span className="text-gray-300">·</span>
              <span>{post.readTimeInMinutes} min read</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
