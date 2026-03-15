import { getPost, getPosts, getRelatedPosts } from '@/lib/hashnode'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import ArticleContent from '@/components/ArticleContent'
import ReadingProgress from '@/components/ReadingProgress'
import AISummarizer from '@/components/AISummarizer'
import ArticleSidebar from '@/components/ArticleSidebar'
import AuthorCard from '@/components/AuthorCard'
import Comments from '@/components/Comments'
import JumpNav from '@/components/JumpNav'
import Breadcrumb from '@/components/Breadcrumb'

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digitalnerdhq-blog.vercel.app'
  const title = post.seo?.title ?? post.title
  const description = post.seo?.description ?? post.brief
  const articleUrl = `${siteUrl}/blog/${post.slug}`

  return {
    title,
    description,
    alternates: { canonical: articleUrl },
    openGraph: {
      title,
      description,
      type: 'article',
      url: articleUrl,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags.map((t) => t.name),
      images: post.coverImage?.url
        ? [{ url: post.coverImage.url, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.coverImage?.url ? [post.coverImage.url] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const relatedPosts = await getRelatedPosts(post.tags, post.slug, 3)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digitalnerdhq-blog.vercel.app'
  const articleUrl = `${siteUrl}/blog/${post.slug}`
  const formattedDate = format(new Date(post.publishedAt), 'MMMM d, yyyy')
  const updatedDate = post.updatedAt
    ? format(new Date(post.updatedAt), 'MMMM d, yyyy')
    : null

  // JSON-LD schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.brief,
    image: post.coverImage?.url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      image: post.author.profilePicture,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DigitalNerdHQ',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    keywords: post.tags.map((t) => t.name).join(', '),
    url: articleUrl,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
    ],
  }

  return (
    <>
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article>
        {/* Cover Image — full width */}
        {post.coverImage?.url && (
          <div
            className="w-full overflow-hidden"
            style={{ maxHeight: '500px' }}
          >
            <Image
              src={post.coverImage.url}
              alt={post.title}
              width={1920}
              height={500}
              priority
              className="w-full object-cover"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
              sizes="100vw"
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]} />

          {/* Article header */}
          <div className="max-w-3xl mb-8">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/tags/${tag.slug}`}
                    className="inline-block text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full transition-colors duration-200 hover:opacity-80"
                    style={{ color: '#ef4d50', backgroundColor: 'rgba(239,77,80,0.1)' }}
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight mb-5 text-balance"
              style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif', fontWeight: 800 }}
            >
              {post.title}
            </h1>

            {/* Meta row */}
            <div
              className="flex flex-wrap items-center gap-4 pb-6"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2.5">
                {post.author.profilePicture && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2">
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
                  <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                    {post.author.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <time dateTime={post.publishedAt}>{formattedDate}</time>
                    {updatedDate && updatedDate !== formattedDate && (
                      <>
                        <span>·</span>
                        <span>Updated {updatedDate}</span>
                      </>
                    )}
                    <span>·</span>
                    <span>{post.readTimeInMinutes} min read</span>
                    {post.views && (
                      <>
                        <span>·</span>
                        <span>{post.views.toLocaleString()} views</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Summarizer */}
          <div className="max-w-3xl">
            <AISummarizer url={articleUrl} />
          </div>

          {/* Mobile: Jump Nav inline */}
          {post.content?.html && (
            <div
              className="lg:hidden max-w-3xl mb-8 p-4 rounded-xl"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)' }}
            >
              <JumpNav contentHtml={post.content.html} />
            </div>
          )}

          {/* Two-column layout: content + sidebar */}
          <div className="flex gap-10">
            {/* Main content (65%) */}
            <div className="flex-1 min-w-0">
              {post.content?.html ? (
                <ArticleContent html={post.content.html} />
              ) : (
                <p className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
                  Content not available.
                </p>
              )}

              {/* Author Card */}
              <AuthorCard author={post.author} />

              {/* Comments */}
              <Comments postId={post.id} />
            </div>

            {/* Sidebar (35%) */}
            {post.content?.html && (
              <ArticleSidebar
                contentHtml={post.content.html}
                relatedPosts={relatedPosts}
                articleUrl={articleUrl}
                articleTitle={post.title}
              />
            )}
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section
              className="mt-16 pt-12"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <h2
                className="font-bold text-2xl mb-8"
                style={{ color: 'var(--text)', fontFamily: 'Inter, sans-serif' }}
              >
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <div key={related.id}>
                    {/* PostCard imported in ArticleSidebar server-side */}
                    <a
                      href={`/blog/${related.slug}`}
                      className="block group"
                    >
                      <article
                        className="rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        style={{
                          backgroundColor: 'var(--card-bg)',
                          border: '1px solid var(--border)',
                          willChange: 'transform',
                        }}
                      >
                        {related.coverImage?.url && (
                          <div className="relative w-full h-44 overflow-hidden">
                            <Image
                              src={related.coverImage.url}
                              alt={related.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, 33vw"
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <h3
                            className="font-bold text-base leading-snug line-clamp-2 group-hover:text-[#ef4d50] transition-colors"
                            style={{ color: 'var(--text)' }}
                          >
                            {related.title}
                          </h3>
                          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                            {related.readTimeInMinutes} min read
                          </p>
                        </div>
                      </article>
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  )
}
