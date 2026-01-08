import fs from 'fs'
import path from 'path'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  categoryColor: 'ai' | 'typescript' | 'design' | 'general'
  date: string
  readTime: string
  coverImage?: string
  content: string
  published: boolean
  featuredOnHomepage?: boolean
  createdAt: string
  updatedAt: string
}

const POSTS_FILE = path.join(process.cwd(), 'data', 'blog-posts.json')

function readPosts(): BlogPost[] {
  try {
    const data = fs.readFileSync(POSTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writePosts(posts: BlogPost[]): void {
  const dir = path.dirname(POSTS_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2))
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return readPosts()
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = readPosts()
  return posts.filter(p => p.published).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getPublishedPosts()
  const featured = posts.filter(p => p.featuredOnHomepage)
  return featured.length > 0 ? featured.slice(0, 3) : posts.slice(0, 3)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = readPosts()
  return posts.find(p => p.slug === slug) || null
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = readPosts()
  return posts.find(p => p.id === id) || null
}

export async function createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  const posts = readPosts()
  const now = new Date().toISOString()

  const newPost: BlogPost = {
    ...post,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  }

  posts.push(newPost)
  writePosts(posts)
  return newPost
}

export async function updatePost(id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): Promise<BlogPost | null> {
  const posts = readPosts()
  const index = posts.findIndex(p => p.id === id)

  if (index === -1) return null

  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  writePosts(posts)
  return posts[index]
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = readPosts()
  const filtered = posts.filter(p => p.id !== id)

  if (filtered.length === posts.length) return false

  writePosts(filtered)
  return true
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function estimateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}
