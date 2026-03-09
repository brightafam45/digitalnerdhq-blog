import { GraphQLClient, gql } from 'graphql-request'
import type { Post, Publication } from '@/types'

export const HASHNODE_HOST = process.env.HASHNODE_HOST ?? 'digitalnerdhq.hashnode.dev'

const HASHNODE_API_KEY = process.env.HASHNODE_API_KEY ?? ''
const HASHNODE_GQL_ENDPOINT = 'https://gql.hashnode.com'

export const hashnodeClient = new GraphQLClient(HASHNODE_GQL_ENDPOINT, {
  headers: {
    Authorization: HASHNODE_API_KEY,
  },
})

export const GET_POSTS = gql`
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
            id
            title
            slug
            brief
            publishedAt
            updatedAt
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
              profilePicture
            }
            readTimeInMinutes
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
          profilePicture
          bio {
            html
          }
        }
        readTimeInMinutes
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
            id
            title
            slug
            brief
            publishedAt
            updatedAt
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
              profilePicture
            }
            readTimeInMinutes
          }
        }
      }
    }
  }
`

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
