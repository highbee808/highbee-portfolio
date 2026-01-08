import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { Projects } from '@/components/sections/projects'
import { Testimonials } from '@/components/sections/testimonials'
import { Blog } from '@/components/sections/blog'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

// Revalidate every 60 seconds to fetch fresh blog data
export const revalidate = 60

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}
