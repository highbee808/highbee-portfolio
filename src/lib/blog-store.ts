import { getSupabase, isSupabaseConfigured } from './supabase'

// Database schema (snake_case)
interface BlogPostDB {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  category_color: 'ai' | 'typescript' | 'design' | 'general'
  date: string
  read_time: string
  cover_image?: string
  content: string
  published: boolean
  featured_on_homepage?: boolean
  created_at: string
  updated_at: string
}

// Main interface used throughout the app (camelCase)
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

// Convert snake_case DB fields to camelCase for frontend
function toCamelCase(post: BlogPostDB): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    categoryColor: post.category_color,
    date: post.date,
    readTime: post.read_time,
    coverImage: post.cover_image,
    content: post.content,
    published: post.published,
    featuredOnHomepage: post.featured_on_homepage,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, returning empty posts')
    return []
  }

  const { data, error } = await getSupabase()
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return (data || []).map(toCamelCase)
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, returning empty posts')
    return []
  }

  const { data, error } = await getSupabase()
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching published posts:', error)
    return []
  }

  return (data || []).map(toCamelCase)
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, returning empty posts')
    return []
  }

  // First try to get featured posts
  const { data: featured, error: featuredError } = await getSupabase()
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .eq('featured_on_homepage', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (!featuredError && featured && featured.length > 0) {
    return featured.map(toCamelCase)
  }

  // Fall back to latest published posts
  const { data, error } = await getSupabase()
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3)

  if (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }

  return (data || []).map(toCamelCase)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured')
    return null
  }

  const { data, error } = await getSupabase()
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }

  return data ? toCamelCase(data) : null
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured')
    return null
  }

  const { data, error } = await getSupabase()
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching post by id:', error)
    return null
  }

  return data ? toCamelCase(data) : null
}

interface CreatePostInput {
  title: string
  slug: string
  excerpt?: string
  category?: string
  categoryColor?: 'ai' | 'typescript' | 'design' | 'general'
  date?: string
  readTime?: string
  coverImage?: string
  content?: string
  published?: boolean
  featuredOnHomepage?: boolean
}

export async function createPost(post: CreatePostInput): Promise<BlogPost> {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase not configured. Cannot create posts.')
  }

  const now = new Date().toISOString()

  const { data, error } = await getSupabase()
    .from('blog_posts')
    .insert({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      category: post.category || 'General',
      category_color: post.categoryColor || 'general',
      date: post.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      read_time: post.readTime || '1 min read',
      cover_image: post.coverImage,
      content: post.content || '',
      published: post.published || false,
      featured_on_homepage: post.featuredOnHomepage || false,
      created_at: now,
      updated_at: now,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating post:', error)
    throw new Error('Failed to create post')
  }

  return toCamelCase(data)
}

interface UpdatePostInput {
  title?: string
  slug?: string
  excerpt?: string
  category?: string
  categoryColor?: 'ai' | 'typescript' | 'design' | 'general'
  date?: string
  readTime?: string
  coverImage?: string
  content?: string
  published?: boolean
  featuredOnHomepage?: boolean
}

export async function updatePost(id: string, updates: UpdatePostInput): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) {
    console.error('Supabase not configured. Cannot update posts.')
    return null
  }

  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (updates.title !== undefined) updateData.title = updates.title
  if (updates.slug !== undefined) updateData.slug = updates.slug
  if (updates.excerpt !== undefined) updateData.excerpt = updates.excerpt
  if (updates.category !== undefined) updateData.category = updates.category
  if (updates.categoryColor !== undefined) updateData.category_color = updates.categoryColor
  if (updates.date !== undefined) updateData.date = updates.date
  if (updates.readTime !== undefined) updateData.read_time = updates.readTime
  if (updates.coverImage !== undefined) updateData.cover_image = updates.coverImage
  if (updates.content !== undefined) updateData.content = updates.content
  if (updates.published !== undefined) updateData.published = updates.published
  if (updates.featuredOnHomepage !== undefined) updateData.featured_on_homepage = updates.featuredOnHomepage

  const { data, error } = await getSupabase()
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating post:', error)
    return null
  }

  return data ? toCamelCase(data) : null
}

export async function deletePost(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    console.error('Supabase not configured. Cannot delete posts.')
    return false
  }

  const { error } = await getSupabase()
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting post:', error)
    return false
  }

  return true
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
