import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bot, Code2, Rocket, Sparkles } from 'lucide-react'
import { servicePages } from '@/lib/service-pages'
import { jsonLd, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'AI integration, Claude AI integration, Next.js development, and MVP development services by Ibrahim Lawal at Highbee.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Highbee Services',
    description:
      'Practical AI integration, Next.js development, and MVP development services for founders and small teams.',
    url: '/services',
    type: 'website',
  },
}

const icons = [Bot, Sparkles, Code2, Rocket]

export default function ServicesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Highbee services',
    itemListElement: servicePages.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.title,
      url: `${SITE_URL}/services/${service.slug}`,
    })),
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />

      <section className="relative overflow-hidden px-6 pb-20 pt-28">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="absolute left-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-red-600/[0.08] blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[460px] w-[460px] rounded-full bg-zinc-500/[0.07] blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back home
          </Link>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-red-500">
              Services
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              AI and full-stack development for focused product teams.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/60">
              Pick the service that matches your current bottleneck: adding AI to an
              existing product, building with Claude, hiring a Next.js developer, or
              launching a useful MVP.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
            {servicePages.map((service, index) => {
              const Icon = icons[index] || Sparkles

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-red-500/40 hover:bg-white/[0.05]"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-800">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-semibold text-white">
                      {service.title}
                    </h2>
                    <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-red-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {service.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/45">
                    <span className="rounded-full border border-white/10 px-3 py-1">
                      {service.price}
                    </span>
                    <span className="rounded-full border border-white/10 px-3 py-1">
                      {service.timeline}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
