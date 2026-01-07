'use client'

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
  Clock,
  CheckCircle,
  FileEdit,
} from 'lucide-react'
import type { BlogPost } from '@/lib/blog-store'

interface DashboardProps {
  stats: {
    totalPosts: number
    publishedPosts: number
    draftPosts: number
  }
  recentPosts: BlogPost[]
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FileText, label: 'Blog Posts', href: '/admin/blog' },
  { icon: PlusCircle, label: 'New Post', href: '/admin/blog/new' },
]

export function AdminDashboard({ stats, recentPosts }: DashboardProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-red-600/5 blur-[80px]" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-zinc-600/[0.04] blur-[80px]" />
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
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
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
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
              <p className="text-white/50">Welcome back! Here&apos;s an overview of your site.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                whileHover={{ y: -2 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <FileText className="w-8 h-8 text-red-500" />
                  <span className="text-3xl font-bold text-white">{stats.totalPosts}</span>
                </div>
                <p className="text-white/50 text-sm">Total Posts</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                  <span className="text-3xl font-bold text-white">{stats.publishedPosts}</span>
                </div>
                <p className="text-white/50 text-sm">Published</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <FileEdit className="w-8 h-8 text-amber-500" />
                  <span className="text-3xl font-bold text-white">{stats.draftPosts}</span>
                </div>
                <p className="text-white/50 text-sm">Drafts</p>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Link href="/admin/blog/new">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="glass rounded-2xl p-6 cursor-pointer hover:border-red-500/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                      <PlusCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Create New Post</h3>
                      <p className="text-sm text-white/50">Write a new blog article</p>
                    </div>
                  </div>
                </motion.div>
              </Link>

              <Link href="/admin/blog">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="glass rounded-2xl p-6 cursor-pointer hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Manage Posts</h3>
                      <p className="text-sm text-white/50">Edit or delete existing posts</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>

            {/* Recent Posts */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Posts</h3>
                <Link href="/admin/blog" className="text-sm text-red-500 hover:text-red-400">
                  View all →
                </Link>
              </div>

              {recentPosts.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50">No posts yet</p>
                  <Link href="/admin/blog/new" className="text-red-500 hover:text-red-400 text-sm">
                    Create your first post →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                    >
                      <div className="flex-grow">
                        <h4 className="font-medium text-white mb-1">{post.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full ${
                            post.published
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
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
