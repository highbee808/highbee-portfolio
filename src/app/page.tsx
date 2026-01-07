import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { Projects } from '@/components/sections/projects'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
