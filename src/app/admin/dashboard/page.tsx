import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { getAllPosts } from '@/lib/blog-store'
import { AdminDashboard } from '@/components/admin/dashboard'

export default async function DashboardPage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/admin')
  }

  const posts = await getAllPosts()
  const publishedCount = posts.filter(p => p.published).length
  const draftCount = posts.filter(p => !p.published).length

  return (
    <AdminDashboard
      stats={{
        totalPosts: posts.length,
        publishedPosts: publishedCount,
        draftPosts: draftCount,
      }}
      recentPosts={posts.slice(0, 5)}
    />
  )
}
