import { getPosts } from '@/lib/hashnode'
import type { Post } from '@/types'
import FeaturedPost from '@/components/FeaturedPost'
import PostCard from '@/components/PostCard'
import NewsletterInline from '@/components/NewsletterInline'
import Link from 'next/link'

export const revalidate = 60

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h2 className="font-heading font-bold text-2xl text-primary mb-3">
        Articles Coming Soon
      </h2>
      <p className="text-gray-500 font-ui text-base max-w-md leading-relaxed mb-6">
        We&apos;re crafting something great. Follow along on Hashnode and check back soon for in-depth tech articles from DigitalNerdHQ.
      </p>
      <a
        href="https://digitalnerdhq.hashnode.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-primary text-white font-ui font-medium text-sm px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all duration-200"
      >
        Visit Hashnode Profile ↗
      </a>
    </div>
  )
}

export default async function HomePage() {
  const publication = await getPosts(10)
  const posts: Post[] = publication?.posts?.edges?.map((e) => e.node) ?? []

  const featuredPost = posts[0] ?? null
  const latestPosts = posts.slice(1, 4)
  const morePosts = posts.slice(4)

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        {featuredPost ? (
          <FeaturedPost post={featuredPost} />
        ) : (
          <div className="bg-gradient-to-br from-primary via-primary/90 to-accent/40 rounded-3xl min-h-[400px] flex items-center justify-center">
            <div className="text-center p-8">
              <span className="inline-flex items-center gap-1.5 bg-accent/20 text-accent text-xs font-ui font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Coming Soon
              </span>
              <h1 className="font-heading font-black text-white text-3xl sm:text-4xl md:text-5xl mb-4 max-w-2xl">
                Tech Insights for the Modern Digital Nerd
              </h1>
              <p className="text-white/60 text-base max-w-lg mx-auto leading-relaxed">
                In-depth articles on web development, AI, software engineering, and the digital frontier.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Latest Articles */}
      {latestPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary">
                Latest Articles
              </h2>
              <p className="text-gray-500 font-ui text-sm mt-1">Fresh from the DigitalNerdHQ lab</p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 font-ui text-sm font-medium text-primary/60 hover:text-accent transition-colors duration-200"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} variant="default" />
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-ui text-sm font-medium text-primary/60 hover:text-accent transition-colors duration-200"
            >
              View all articles →
            </Link>
          </div>
        </section>
      )}

      {/* More Articles - Compact list */}
      {morePosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-heading font-bold text-xl text-primary mb-6 flex items-center gap-3">
                More Articles
                <span className="flex-1 h-px bg-gray-200" />
              </h2>
              <div>
                {morePosts.map((post) => (
                  <PostCard key={post.id} post={post} variant="compact" />
                ))}
              </div>
            </div>

            {/* Sidebar: Tags from latest posts */}
            <aside className="lg:col-span-1">
              <h3 className="font-heading font-bold text-lg text-primary mb-4">Popular Topics</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(
                  new Map(
                    posts
                      .flatMap((p) => p.tags)
                      .map((t) => [t.slug, t])
                  ).values()
                )
                  .slice(0, 12)
                  .map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/tags/${tag.slug}`}
                      className="px-3 py-1.5 rounded-full text-xs font-ui font-medium bg-white border border-gray-200 text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
                    >
                      #{tag.name}
                    </Link>
                  ))}
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* Empty state if no posts at all */}
      {posts.length === 0 && <EmptyState />}

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <NewsletterInline />
      </section>
    </>
  )
}
