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
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Author {
  name: string
  profilePicture?: string
  bio?: { html: string }
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
