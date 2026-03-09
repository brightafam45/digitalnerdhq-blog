import { getPost, getPosts } from '@/lib/hashnode'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import TagBadge from '@/components/TagBadge'
import ArticleContent from '@/components/ArticleContent'
import ReadingProgress from '@/components/ReadingProgress'
import ShareButtons from '@/components/ShareButtons'
import PostCard from '@/components/PostCard'
import type { Post } from '@/types'

export const revalidate = 3600

interface ArticlePageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const publication = await getPosts(50)
  const posts = publication?.posts?.edges?.map((e) => e.node) ?? []
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Article Not Found' }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.digitalnerdhq.com'
  const title = post.seo?.title ?? post.title
  const description = post.seo?.description ?? post.brief

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: post.coverImage?.url
        ? [{ url: post.coverImage.url, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.coverImage?.url ? [post.coverImage.url] : [],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const [post, publication] = await Promise.all([
    getPost(params.slug),
    getPosts(20),
  ])

  if (!post) notFound()

  const formattedDate = format(new Date(post.publishedAt), 'MMMM d, yyyy')
  const updatedDate = post.updatedAt ? format(new Date(post.updatedAt), 'MMMM d, yyyy') : null

  // Find related posts (same tag, exclude current)
  const allPosts: Post[] = publication?.posts?.edges?.map((e) => e.node) ?? []
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.tags.some((t) => post.tags.some((pt) => pt.slug === t.slug))
    )
    .slice(0, 3)

  return (
    <>
      <ReadingProgress />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-ui text-gray-500 hover:text-primary transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            All Articles
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} size="sm" />
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-primary leading-tight mb-5 text-balance">
            {post.title}
          </h1>

          {/* Brief */}
          {post.brief && (
            <p className="text-lg text-gray-500 leading-relaxed mb-8 font-body">
              {post.brief}
            </p>
          )}

          {/* Author + Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pb-8 border-b border-gray-200 mb-8">
            <div className="flex items-center gap-3">
              {post.author.profilePicture && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100">
                  <Image
                    src={post.author.profilePicture}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              )}
              <div>
                <p className="font-medium text-sm text-primary font-ui">{post.author.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 font-ui mt-0.5">
                  <time dateTime={post.publishedAt}>{formattedDate}</time>
                  {updatedDate && updatedDate !== formattedDate && (
                    <>
                      <span>·</span>
                      <span>Updated {updatedDate}</span>
                    </>
                  )}
                  <span>·</span>
                  <span>{post.readTimeInMinutes} min read</span>
                </div>
              </div>
            </div>

            <div className="sm:ml-auto">
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </div>

          {/* Cover image */}
          {post.coverImage?.url && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-lg">
              <Image
                src={post.coverImage.url}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Article content */}
          {post.content?.html ? (
            <ArticleContent html={post.content.html} />
          ) : (
            <p className="text-gray-400 font-ui text-center py-12">
              Content not available.
            </p>
          )}

          {/* Bottom share */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm font-ui text-gray-500 mb-3">Enjoyed this article?</p>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

          {/* Tags footer */}
          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} size="md" />
              ))}
            </div>
          )}

          {/* Author bio card */}
          <div className="mt-12 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
              {post.author.profilePicture && (
                <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                  <Image
                    src={post.author.profilePicture}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
              )}
              <div>
                <p className="font-ui text-xs text-gray-400 uppercase tracking-wider mb-0.5">Written by</p>
                <p className="font-heading font-bold text-lg text-primary">{post.author.name}</p>
                {post.author.bio?.html && (
                  <div
                    className="mt-2 text-sm text-gray-500 font-ui leading-relaxed [&_a]:text-blue-500 [&_a:hover]:text-accent [&_p]:mb-0"
                    dangerouslySetInnerHTML={{ __html: post.author.bio.html }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="font-heading font-bold text-2xl text-primary mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <PostCard key={related.id} post={related} variant="default" />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
