'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
  Home,
  Eye,
  Edit,
  Trash2,
  Clock,
  Search,
  Filter,
} from 'lucide-react'
import type { BlogPost } from '@/lib/blog-store'

interface BlogPostsListProps {
  posts: BlogPost[]
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FileText, label: 'Blog Posts', href: '/admin/blog', active: true },
  { icon: PlusCircle, label: 'New Post', href: '/admin/blog/new' },
]

const categoryColors: Record<string, string> = {
  ai: 'bg-red-500/20 text-red-400',
  typescript: 'bg-blue-500/20 text-blue-400',
  design: 'bg-purple-500/20 text-purple-400',
  general: 'bg-zinc-500/20 text-zinc-400',
}

export function BlogPostsList({ posts }: BlogPostsListProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
      if (res.ok) {
        router.refresh()
      }
    } finally {
      setDeleting(null)
    }
  }

  const filteredPosts = posts
    .filter(post => {
      if (filterStatus === 'published' && !post.published) return false
      if (filterStatus === 'draft' && post.published) return false
      return true
    })
    .filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-red-600/5 blur-[80px]" />
      </div>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-64 glass border-r border-white/10 p-6 flex flex-col">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-white/40">Manage your portfolio</p>
          </div>

          <nav className="flex-grow space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active
                    ? 'bg-red-500/20 text-red-400'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/10 pt-4 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">View Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-grow p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Blog Posts</h2>
                <p className="text-white/50">{posts.length} total posts</p>
              </div>
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-medium hover:from-red-500 hover:to-red-600 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                New Post
              </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50"
                />
              </div>

              <div className="flex gap-2">
                {(['all', 'published', 'draft'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      filterStatus === status
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-white/[0.02] text-white/50 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts List */}
            <div className="glass rounded-2xl overflow-hidden">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="w-16 h-16 text-white/10 mx-auto mb-4" />
                  <p className="text-white/50 mb-2">No posts found</p>
                  {posts.length === 0 && (
                    <Link href="/admin/blog/new" className="text-red-500 hover:text-red-400 text-sm">
                      Create your first post →
                    </Link>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-white">{post.title}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${categoryColors[post.categoryColor]}`}>
                            {post.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            post.published
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="text-sm text-white/40 line-clamp-1">{post.excerpt}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-white/30">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deleting === post.id}
                          className="p-2 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
