import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
  variant?: 'default' | 'large' | 'compact' | 'horizontal'
}

function PlaceholderImage({ title }: { title: string }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #180f41 0%, #2d2460 50%, #ef4d5020 100%)',
      }}
    >
      <span
        className="text-white/20 font-bold select-none"
        style={{ fontSize: '3rem', fontFamily: 'Inter, sans-serif' }}
      >
        {title.charAt(0).toUpperCase()}
      </span>
    </div>
  )
}

export default function PostCard({ post, variant = 'default' }: PostCardProps) {
  const formattedDate = format(new Date(post.publishedAt), 'MMM d, yyyy')
  const firstTag = post.tags[0]

  // ── Compact variant ─────────────────────────────────────────────────────────
  if (variant === 'compact') {
    return (
      <article className="group py-3 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <Link href={`/blog/${post.slug}`} className="flex-shrink-0">
            <div
              className="relative w-14 h-14 rounded-lg overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              {post.coverImage?.url ? (
                <Image
                  src={post.coverImage.url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="56px"
                />
              ) : (
                <PlaceholderImage title={post.title} />
              )}
            </div>
          </Link>
          <div className="flex-1 min-w-0">
            {firstTag && (
              <span
                className="inline-block text-[10px] font-semibold uppercase tracking-wide mb-1 px-1.5 py-0.5 rounded"
                style={{ color: '#ef4d50', backgroundColor: 'rgba(239,77,80,0.08)' }}
              >
                {firstTag.name}
              </span>
            )}
            <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#ef4d50] transition-colors duration-200" style={{ color: 'var(--text)' }}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              <span>·</span>
              <span>{post.readTimeInMinutes} min</span>
            </div>
          </div>
        </div>
      </article>
    )
  }

  // ── Horizontal variant ──────────────────────────────────────────────────────
  if (variant === 'horizontal') {
    return (
      <article
        className="group rounded-2xl overflow-hidden flex hover:shadow-xl transition-all duration-300"
        style={{
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border)',
          willChange: 'transform',
        }}
      >
        <Link href={`/blog/${post.slug}`} className="flex-shrink-0 w-2/5">
          <div className="relative h-full min-h-[160px] overflow-hidden">
            {post.coverImage?.url ? (
              <Image
                src={post.coverImage.url}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 40vw, 20vw"
              />
            ) : (
              <PlaceholderImage title={post.title} />
            )}
          </div>
        </Link>
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            {firstTag && (
              <span
                className="inline-block text-xs font-semibold uppercase tracking-wide mb-2 px-2 py-0.5 rounded"
                style={{ color: '#ef4d50', backgroundColor: 'rgba(239,77,80,0.08)' }}
              >
                {firstTag.name}
              </span>
            )}
            <h3
              className="font-bold text-base leading-snug line-clamp-2 group-hover:text-[#ef4d50] transition-colors duration-200 mb-2"
              style={{ color: 'var(--text)' }}
            >
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>
              {post.brief}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            {post.author.profilePicture && (
              <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={post.author.profilePicture}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="20px"
                />
              </div>
            )}
            <span style={{ color: 'var(--text)' }} className="font-medium">{post.author.name}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>{formattedDate}</time>
            <span>·</span>
            <span>{post.readTimeInMinutes} min</span>
          </div>
        </div>
      </article>
    )
  }

  // ── Large variant ───────────────────────────────────────────────────────────
  if (variant === 'large') {
    return (
      <article
        className="group rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col md:flex-row"
        style={{
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border)',
          willChange: 'transform',
        }}
      >
        <Link href={`/blog/${post.slug}`} className="flex-shrink-0 md:w-2/5">
          <div className="relative w-full h-56 md:h-full min-h-[220px] overflow-hidden">
            {post.coverImage?.url ? (
              <Image
                src={post.coverImage.url}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            ) : (
              <PlaceholderImage title={post.title} />
            )}
          </div>
        </Link>
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div>
            {firstTag && (
              <span
                className="inline-block text-xs font-semibold uppercase tracking-wide mb-3 px-2.5 py-1 rounded-full"
                style={{ color: '#ef4d50', backgroundColor: 'rgba(239,77,80,0.08)' }}
              >
                {firstTag.name}
              </span>
            )}
            <h2
              className="font-bold text-xl md:text-2xl leading-tight group-hover:text-[#ef4d50] transition-colors duration-200 mb-3"
              style={{ color: 'var(--text)' }}
            >
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm md:text-base leading-relaxed line-clamp-3" style={{ color: 'var(--text-muted)' }}>
              {post.brief}
            </p>
          </div>
          <div className="mt-5 flex items-center gap-3">
            {post.author.profilePicture && (
              <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2">
                <Image
                  src={post.author.profilePicture}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
            )}
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              <span className="font-semibold" style={{ color: 'var(--text)' }}>{post.author.name}</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <time dateTime={post.publishedAt}>{formattedDate}</time>
                <span>·</span>
                <span>{post.readTimeInMinutes} min read</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }

  // ── Default variant ─────────────────────────────────────────────────────────
  return (
    <article
      className="group rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border)',
        willChange: 'transform',
      }}
    >
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative w-full h-48 overflow-hidden">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <PlaceholderImage title={post.title} />
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        {firstTag && (
          <span
            className="inline-block self-start text-xs font-semibold uppercase tracking-wide mb-3 px-2.5 py-1 rounded-full"
            style={{ color: '#ef4d50', backgroundColor: 'rgba(239,77,80,0.08)' }}
          >
            {firstTag.name}
          </span>
        )}
        <h2
          className="font-bold text-lg leading-snug group-hover:text-[#ef4d50] transition-colors duration-200 mb-2 line-clamp-2"
          style={{ color: 'var(--text)' }}
        >
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-sm leading-relaxed line-clamp-3 flex-1" style={{ color: 'var(--text-muted)' }}>
          {post.brief}
        </p>

        <div className="mt-4 pt-4 flex items-center gap-3" style={{ borderTop: '1px solid var(--border)' }}>
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
          <div className="text-xs min-w-0" style={{ color: 'var(--text-muted)' }}>
            <span className="font-semibold truncate block" style={{ color: 'var(--text)' }}>
              {post.author.name}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <time dateTime={post.publishedAt}>{formattedDate}</time>
              <span>·</span>
              <span>{post.readTimeInMinutes} min read</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
