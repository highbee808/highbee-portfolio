import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { BlogGenerator } from '@/components/admin/blog-generator'
import { getPredefinedTopics } from '@/lib/blog-agent/topics'

export default async function GeneratePage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/admin')
  }

  const predefinedTopics = await getPredefinedTopics()

  return <BlogGenerator predefinedTopics={predefinedTopics} />
}
