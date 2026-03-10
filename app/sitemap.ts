import type { MetadataRoute } from 'next'
import { getPosts, getAllTags } from '@/lib/hashnode'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digitalnerdhq-blog.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [publication, tags] = await Promise.all([
    getPosts(100),
    getAllTags(),
  ])

  const posts = publication?.posts?.edges?.map((e) => e.node) ?? []

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/authors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Blog post pages
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Tag pages
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${siteUrl}/tags/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Author pages
  const authorMap = new Map<string, string>()
  posts.forEach((post) => {
    if (post.author.username) {
      authorMap.set(post.author.username, post.author.username)
    }
  })
  const authorPages: MetadataRoute.Sitemap = Array.from(authorMap.values()).map((username) => ({
    url: `${siteUrl}/authors/${username}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...postPages, ...tagPages, ...authorPages]
}
