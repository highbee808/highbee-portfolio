import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Services } from '@/components/sections/services'
import { Projects } from '@/components/sections/projects'
import { Testimonials } from '@/components/sections/testimonials'
import { Blog } from '@/components/sections/blog'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'
import { getFeaturedPosts } from '@/lib/blog-store'
import { SITE_URL, jsonLd } from '@/lib/seo'

// Force dynamic rendering (requires Supabase at runtime)
export const dynamic = 'force-dynamic'

export default async function Home() {
  const blogPosts = await getFeaturedPosts()
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Ibrahim Lawal',
      alternateName: 'Highbee',
      url: SITE_URL,
      image: `${SITE_URL}/images/profile-cartoon.png`,
      jobTitle: 'Full-Stack Developer and AI Integration Specialist',
      knowsAbout: [
        'AI integration',
        'Next.js',
        'TypeScript',
        'Supabase',
        'Claude AI',
        'Full-stack web development',
      ],
      sameAs: [
        'https://github.com/highbee808',
        'https://linkedin.com/in/highbee',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Highbee',
      url: SITE_URL,
      founder: {
        '@type': 'Person',
        name: 'Ibrahim Lawal',
      },
      areaServed: 'Worldwide',
      serviceType: [
        'AI Integration',
        'Full-Stack Development',
        'Rapid Prototyping',
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NG',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Highbee',
      url: SITE_URL,
      description:
        'Portfolio and services site for Ibrahim Lawal, a full-stack developer and AI integration specialist.',
    },
  ]

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
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
