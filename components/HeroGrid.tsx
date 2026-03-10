import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import type { Post } from '@/types'

interface HeroGridProps {
  featured: Post
  recent: Post[]
}

function FeaturedCard({ post }: { post: Post }) {
  const formattedDate = format(new Date(post.publishedAt), 'MMM d, yyyy')
  const firstTag = post.tags[0]

  return (
    <article
      className="group relative rounded-2xl overflow-hidden flex flex-col justify-end h-full min-h-[420px] lg:min-h-[520px] hover:shadow-2xl transition-all duration-500 cursor-pointer"
      style={{ willChange: 'transform' }}
    >
      {/* Background image with gradient */}
      {post.coverImage?.url ? (
        <div className="absolute inset-0">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #180f41 0%, #2d1a6e 50%, #ef4d5040 100%)',
          }}
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(13,11,30,0.97) 0%, rgba(13,11,30,0.7) 40%, rgba(13,11,30,0.1) 70%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {/* FEATURED badge */}
        <div className="mb-4">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ backgroundColor: '#ef4d50', color: 'white' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            Featured
          </span>
        </div>

        {firstTag && (
          <span
            className="inline-block text-xs font-semibold uppercase tracking-wide mb-3 px-2.5 py-1 rounded-full"
            style={{ color: '#ef4d50', backgroundColor: 'rgba(239,77,80,0.15)', border: '1px solid rgba(239,77,80,0.3)' }}
          >
            {firstTag.name}
          </span>
        )}

        <h2
          className="font-black text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-3 group-hover:text-white/90 transition-colors line-clamp-3"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800 }}
        >
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>

        {post.brief && (
          <p className="text-white/70 text-sm md:text-base leading-relaxed line-clamp-2 mb-5">
            {post.brief}
          </p>
        )}

        {/* Author + meta */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            {post.author.profilePicture && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/20 flex-shrink-0">
                <Image
                  src={post.author.profilePicture}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            )}
            <div>
              <p className="text-white text-xs font-semibold">{post.author.name}</p>
              <div className="flex items-center gap-1.5 text-white/50 text-xs">
                <time dateTime={post.publishedAt}>{formattedDate}</time>
                <span>·</span>
                <span>{post.readTimeInMinutes} min read</span>
              </div>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="relative z-20 flex items-center gap-1.5 text-sm font-semibold text-white px-4 py-2 rounded-lg transition-all duration-200 hover:gap-2.5"
            style={{ backgroundColor: '#ef4d50' }}
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

function SmallCard({ post }: { post: Post }) {
  const formattedDate = format(new Date(post.publishedAt), 'MMM d, yyyy')
  const firstTag = post.tags[0]

  return (
    <article
      className="group relative rounded-xl overflow-hidden flex-1 min-h-[180px] flex flex-col justify-end hover:shadow-xl transition-all duration-300 cursor-pointer"
      style={{ willChange: 'transform' }}
    >
      {post.coverImage?.url ? (
        <div className="absolute inset-0">
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #180f41 0%, #2d1a6e 100%)',
          }}
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(13,11,30,0.95) 0%, rgba(13,11,30,0.4) 60%, transparent 100%)',
        }}
      />

      <div className="relative z-10 p-4">
        {firstTag && (
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-widest mb-2 px-2 py-0.5 rounded-full"
            style={{ backgroundColor: 'rgba(239,77,80,0.8)', color: 'white' }}
          >
            {firstTag.name}
          </span>
        )}
        <h3
          className="font-bold text-sm md:text-base text-white leading-snug line-clamp-2 group-hover:text-white/85 transition-colors"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
        >
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-white/50 text-xs">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          <span>·</span>
          <span>{post.readTimeInMinutes} min read</span>
        </div>
      </div>
    </article>
  )
}

export default function HeroGrid({ featured, recent }: HeroGridProps) {
  const sideCards = recent.slice(0, 2)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Left: Featured (60%) */}
        <div className="lg:w-[60%]">
          <FeaturedCard post={featured} />
        </div>

        {/* Right: 2 stacked cards (40%) */}
        {sideCards.length > 0 && (
          <div className="lg:w-[40%] flex flex-row lg:flex-col gap-4">
            {sideCards.map((post) => (
              <SmallCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
