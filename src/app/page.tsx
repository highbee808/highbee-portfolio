import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { Projects } from '@/components/sections/projects'
import { Testimonials } from '@/components/sections/testimonials'
import { Blog } from '@/components/sections/blog'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'
import { getFeaturedPosts } from '@/lib/blog-store'

// Force dynamic rendering (requires Supabase at runtime)
export const dynamic = 'force-dynamic'

export default async function Home() {
  const blogPosts = await getFeaturedPosts()

  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <Blog posts={blogPosts} />
      <Contact />
      <Footer />
    </main>
  )
}
