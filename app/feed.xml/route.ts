import { getPosts } from '@/lib/hashnode'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.digitalnerdhq.com'

  const publication = await getPosts(50)
  const posts = publication?.posts?.edges?.map((e) => e.node) ?? []

  const lastBuildDate = new Date().toUTCString()

  const items = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`
      const pubDate = new Date(post.publishedAt).toUTCString()
      const categories = post.tags
        .map((tag) => `<category><![CDATA[${tag.name}]]></category>`)
        .join('\n        ')

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.brief ?? ''}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${post.author.name}</author>
      ${categories}
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DigitalNerdHQ Blog</title>
    <description>Where digital minds level up</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
