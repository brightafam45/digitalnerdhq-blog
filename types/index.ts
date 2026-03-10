export interface Post {
  id: string
  title: string
  slug: string
  brief: string
  publishedAt: string
  updatedAt?: string
  coverImage?: { url: string }
  tags: Tag[]
  author: Author
  readTimeInMinutes: number
  content?: { html: string }
  seo?: { title?: string; description?: string }
  featured?: boolean
  views?: number
}

export interface Tag {
  id: string
  name: string
  slug: string
  postsCount?: number
}

export interface Author {
  id?: string
  name: string
  username?: string
  profilePicture?: string
  bio?: { html: string }
  socialMediaLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
    website?: string
  }
  followersCount?: number
  postCount?: number
}

export interface Comment {
  id: string
  content: { html: string; text?: string }
  author: {
    name: string
    profilePicture?: string
  }
  dateAdded: string
  replies?: CommentReply[]
}

export interface CommentReply {
  id: string
  content: { html: string; text?: string }
  author: {
    name: string
    profilePicture?: string
  }
  dateAdded: string
}

export interface SearchResult {
  post: Post
  highlights: string[]
}

export interface PageInfo {
  hasNextPage: boolean
  endCursor?: string
}

export interface Publication {
  id: string
  title: string
  about?: { html: string }
  posts: {
    pageInfo: PageInfo
    edges: { node: Post }[]
  }
}

export interface FeaturedFlag {
  featured: boolean
}
