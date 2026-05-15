import type { Metadata } from 'next'
import type { ComponentType } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  HelpCircle,
  Layers,
  MapPin,
  Sparkles,
} from 'lucide-react'
import {
  getRelatedServices,
  getServicePage,
  servicePages,
  serviceUrl,
} from '@/lib/service-pages'
import { absoluteUrl, jsonLd, PERSON_NAME, SITE_NAME } from '@/lib/seo'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServicePage(slug)

  if (!service) {
    return {
      title: 'Service Not Found',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: service.metaTitle,
    description: service.description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.metaTitle} | ${SITE_NAME}`,
      description: service.description,
      url: `/services/${service.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.metaTitle} | ${SITE_NAME}`,
      description: service.description,
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = getServicePage(slug)

  if (!service) {
    notFound()
  }

  const relatedServices = getRelatedServices(service)
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.description,
      url: serviceUrl(service),
      provider: {
        '@type': 'Person',
        name: PERSON_NAME,
        url: absoluteUrl('/'),
      },
      areaServed: service.slug.includes('nigeria') ? 'Nigeria' : 'Worldwide',
      serviceType: service.title,
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          description: service.price,
        },
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: absoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: absoluteUrl('/services'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.title,
          item: serviceUrl(service),
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />

      <section className="relative overflow-hidden px-6 pb-16 pt-28">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="absolute right-[-12%] top-[-15%] h-[560px] w-[560px] rounded-full bg-red-600/[0.09] blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-15%] h-[460px] w-[460px] rounded-full bg-zinc-500/[0.07] blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap items-center gap-3 text-sm text-white/45">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="transition-colors hover:text-white">
              Services
            </Link>
            <span>/</span>
            <span className="text-white/70">{service.shortTitle}</span>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-red-500">
                {service.eyebrow}
              </p>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
                {service.hero}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">
                {service.intro}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-white/80 transition-colors hover:border-white/20 hover:text-white"
                >
                  View work
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="space-y-5">
                <ServiceFact
                  icon={DollarSign}
                  label="Pricing"
                  value={service.price}
                />
                <ServiceFact icon={Clock} label="Timeline" value={service.timeline} />
                <ServiceFact icon={MapPin} label="Fit" value={service.audience} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
          {service.proof.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-3xl font-bold text-white">{item.metric}</p>
              <p className="mt-2 text-sm text-white/50">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-500">
              Outcomes
            </p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              What you get from this service
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {service.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-400" />
                <p className="leading-7 text-white/65">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-500">
              Process
            </p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              A clear path from idea to shipped
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {service.process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-red-600/20 text-sm font-bold text-red-400">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-500">
              FAQs
            </p>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Questions clients usually ask
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <summary className="flex cursor-pointer list-none items-start gap-4 text-lg font-semibold text-white">
                  <HelpCircle className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" />
                  <span>{faq.question}</span>
                </summary>
                <p className="mt-4 pl-9 leading-7 text-white/60">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-gradient-to-br from-red-600/[0.12] to-white/[0.03] p-8 md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <Sparkles className="mb-5 h-10 w-10 text-red-500" />
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Want this built for your product?
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-white/60">
                Send me the product, workflow, or idea you are trying to ship. I will
                help narrow the scope and recommend the fastest practical build path.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 font-semibold text-white/75 transition-colors hover:text-white"
              >
                Compare services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <Layers className="h-5 w-5 text-red-500" />
            <h2 className="text-2xl font-bold text-white">Related services</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={`/services/${related.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-red-500/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-white">{related.title}</h3>
                  <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-red-500 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-3 text-sm leading-6 text-white/50">
                  {related.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function ServiceFact({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-white/[0.05]">
        <Icon className="h-5 w-5 text-red-500" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/35">
          {label}
        </p>
        <p className="mt-1 text-sm leading-6 text-white/70">{value}</p>
      </div>
    </div>
  )
}
