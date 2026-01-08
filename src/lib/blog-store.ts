import fs from 'fs/promises'
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
  content: string // Markdown content
  published: boolean
  featuredOnHomepage?: boolean // Show on portfolio homepage
  createdAt: string
  updatedAt: string
}

const DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json')

async function ensureDataDir() {
  const dir = path.dirname(DATA_FILE)
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

async function readPosts(): Promise<BlogPost[]> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writePosts(posts: BlogPost[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2))
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return readPosts()
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await readPosts()
  return posts.filter(p => p.published).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getPublishedPosts()
  const featured = posts.filter(p => p.featuredOnHomepage)
  // Return featured posts, or top 3 published if none are marked as featured
  return featured.length > 0 ? featured.slice(0, 3) : posts.slice(0, 3)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await readPosts()
  return posts.find(p => p.slug === slug) || null
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await readPosts()
  return posts.find(p => p.id === id) || null
}

export async function createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  const posts = await readPosts()
  const now = new Date().toISOString()

  const newPost: BlogPost = {
    ...post,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  }

  posts.push(newPost)
  await writePosts(posts)
  return newPost
}

export async function updatePost(id: string, updates: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): Promise<BlogPost | null> {
  const posts = await readPosts()
  const index = posts.findIndex(p => p.id === id)

  if (index === -1) return null

  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  await writePosts(posts)
  return posts[index]
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await readPosts()
  const filtered = posts.filter(p => p.id !== id)

  if (filtered.length === posts.length) return false

  await writePosts(filtered)
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
