import { GraphQLClient, gql } from 'graphql-request'
import type { Post, Publication, Tag, Comment } from '@/types'

export const HASHNODE_HOST = process.env.HASHNODE_HOST ?? 'digitalnerdhq.hashnode.dev'

const HASHNODE_API_KEY = process.env.HASHNODE_API_KEY ?? ''
const HASHNODE_GQL_ENDPOINT = 'https://gql.hashnode.com'

export const hashnodeClient = new GraphQLClient(HASHNODE_GQL_ENDPOINT, {
  headers: {
    Authorization: HASHNODE_API_KEY,
  },
})

// ─── GraphQL Fragments ─────────────────────────────────────────────────────────

const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    slug
    brief
    publishedAt
    updatedAt
    featured
    coverImage {
      url
    }
    tags {
      id
      name
      slug
    }
    author {
      name
      username
      profilePicture
      bio {
        html
      }
    }
    readTimeInMinutes
    views
  }
`

// ─── Queries ───────────────────────────────────────────────────────────────────

export const GET_POSTS = gql`
  ${POST_FIELDS}
  query GetPosts($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      id
      title
      posts(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  }
`

export const GET_POST = gql`
  query GetPost($host: String!, $slug: String!) {
    publication(host: $host) {
      id
      title
      post(slug: $slug) {
        id
        title
        slug
        brief
        publishedAt
        updatedAt
        featured
        coverImage {
          url
        }
        tags {
          id
          name
          slug
        }
        author {
          name
          username
          profilePicture
          bio {
            html
          }
          socialMediaLinks {
            twitter
            linkedin
            github
            website
          }
        }
        readTimeInMinutes
        views
        content {
          html
        }
        seo {
          title
          description
        }
      }
    }
  }
`

export const GET_POSTS_BY_TAG = gql`
  ${POST_FIELDS}
  query GetPostsByTag($host: String!, $tagSlug: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      id
      title
      posts(first: $first, after: $after, filter: { tagSlugs: [$tagSlug] }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  }
`

export const GET_FEATURED_POST = gql`
  ${POST_FIELDS}
  query GetFeaturedPost($host: String!) {
    publication(host: $host) {
      id
      posts(first: 10) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  }
`

export const GET_ALL_TAGS = gql`
  query GetAllTags($host: String!) {
    publication(host: $host) {
      id
      posts(first: 50) {
        edges {
          node {
            tags {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`

export const GET_COMMENTS = gql`
  query GetComments($postId: ID!) {
    post(id: $postId) {
      id
      comments(first: 20) {
        edges {
          node {
            id
            content {
              html
              text
            }
            author {
              name
              profilePicture
            }
            dateAdded
            replies(first: 5) {
              edges {
                node {
                  id
                  content {
                    html
                    text
                  }
                  author {
                    name
                    profilePicture
                  }
                  dateAdded
                }
              }
            }
          }
        }
      }
    }
  }
`

// ─── Response Types ────────────────────────────────────────────────────────────

interface GetPostsResponse {
  publication: Publication
}

interface GetPostResponse {
  publication: {
    id: string
    title: string
    post: Post | null
  }
}

interface GetAllTagsResponse {
  publication: {
    id: string
    posts: {
      edges: {
        node: {
          tags: Tag[]
        }
      }[]
    }
  }
}

interface RawCommentNode {
  id: string
  content: { html: string; text?: string }
  author: { name: string; profilePicture?: string }
  dateAdded: string
  replies?: {
    edges: {
      node: {
        id: string
        content: { html: string; text?: string }
        author: { name: string; profilePicture?: string }
        dateAdded: string
      }
    }[]
  }
}

interface GetCommentsResponse {
  post: {
    id: string
    comments: {
      edges: {
        node: RawCommentNode
      }[]
    }
  } | null
}

// ─── Functions ─────────────────────────────────────────────────────────────────

export async function getPosts(
  first: number = 10,
  after?: string
): Promise<Publication | null> {
  try {
    const data = await hashnodeClient.request<GetPostsResponse>(GET_POSTS, {
      host: HASHNODE_HOST,
      first,
      after: after ?? null,
    })
    return data.publication
  } catch (error) {
    console.error('Error fetching posts:', error)
    return null
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const data = await hashnodeClient.request<GetPostResponse>(GET_POST, {
      host: HASHNODE_HOST,
      slug,
    })
    return data.publication.post
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error)
    return null
  }
}

export async function getPostsByTag(
  tagSlug: string,
  first: number = 10,
  after?: string
): Promise<Publication | null> {
  try {
    const data = await hashnodeClient.request<GetPostsResponse>(GET_POSTS_BY_TAG, {
      host: HASHNODE_HOST,
      tagSlug,
      first,
      after: after ?? null,
    })
    return data.publication
  } catch (error) {
    console.error(`Error fetching posts for tag "${tagSlug}":`, error)
    return null
  }
}

export async function getFeaturedPost(): Promise<Post | null> {
  try {
    const data = await hashnodeClient.request<GetPostsResponse>(GET_FEATURED_POST, {
      host: HASHNODE_HOST,
    })
    const posts = data.publication?.posts?.edges?.map((e) => e.node) ?? []
    // Try to find a featured post, fall back to most recent
    const featured = posts.find((p) => p.featured === true) ?? posts[0] ?? null
    return featured
  } catch (error) {
    console.error('Error fetching featured post:', error)
    return null
  }
}

export async function getAuthorPosts(
  username: string,
  first: number = 20
): Promise<Post[]> {
  try {
    // Hashnode v2 API: filter by author username
    const query = gql`
      query GetAuthorPosts($host: String!, $first: Int!) {
        publication(host: $host) {
          posts(first: $first) {
            edges {
              node {
                id
                title
                slug
                brief
                publishedAt
                updatedAt
                coverImage { url }
                tags { id name slug }
                author { name username profilePicture bio { html } }
                readTimeInMinutes
                views
                featured
              }
            }
          }
        }
      }
    `
    const data = await hashnodeClient.request<GetPostsResponse>(query, {
      host: HASHNODE_HOST,
      first,
    })
    const posts = data.publication?.posts?.edges?.map((e) => e.node) ?? []
    // Filter client-side by username
    return posts.filter(
      (p) => p.author.username?.toLowerCase() === username.toLowerCase()
    )
  } catch (error) {
    console.error(`Error fetching posts for author "${username}":`, error)
    return []
  }
}

export async function searchPosts(query: string): Promise<Post[]> {
  try {
    // Fetch posts and filter client-side (Hashnode v2 doesn't have full text search in pub API)
    const publication = await getPosts(50)
    const posts = publication?.posts?.edges?.map((e) => e.node) ?? []
    const lower = query.toLowerCase()
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.brief.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.name.toLowerCase().includes(lower))
    )
  } catch (error) {
    console.error(`Error searching posts for "${query}":`, error)
    return []
  }
}

export async function getAllTags(): Promise<Tag[]> {
  try {
    const data = await hashnodeClient.request<GetAllTagsResponse>(GET_ALL_TAGS, {
      host: HASHNODE_HOST,
    })
    const tagMap = new Map<string, Tag & { postsCount: number }>()
    data.publication.posts.edges.forEach(({ node }) => {
      node.tags.forEach((tag) => {
        const existing = tagMap.get(tag.slug)
        if (existing) {
          existing.postsCount = (existing.postsCount ?? 0) + 1
        } else {
          tagMap.set(tag.slug, { ...tag, postsCount: 1 })
        }
      })
    })
    return Array.from(tagMap.values()).sort(
      (a, b) => (b.postsCount ?? 0) - (a.postsCount ?? 0)
    )
  } catch (error) {
    console.error('Error fetching all tags:', error)
    return []
  }
}

export async function getRelatedPosts(
  tags: { slug: string }[],
  currentSlug: string,
  limit: number = 3
): Promise<Post[]> {
  try {
    const publication = await getPosts(30)
    const posts = publication?.posts?.edges?.map((e) => e.node) ?? []
    const tagSlugs = new Set(tags.map((t) => t.slug))
    return posts
      .filter(
        (p) =>
          p.slug !== currentSlug &&
          p.tags.some((t) => tagSlugs.has(t.slug))
      )
      .slice(0, limit)
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

export async function getComments(postId: string): Promise<Comment[]> {
  try {
    const data = await hashnodeClient.request<GetCommentsResponse>(GET_COMMENTS, {
      postId,
    })
    return (
      data.post?.comments?.edges?.map((e) => ({
        ...e.node,
        replies: e.node.replies?.edges?.map((r) => r.node) ?? [],
      })) ?? []
    )
  } catch (error) {
    console.error(`Error fetching comments for post "${postId}":`, error)
    return []
  }
}
