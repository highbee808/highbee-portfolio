'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Clipboard,
  Clock,
  CreditCard,
  Download,
  FileText,
  Globe2,
  Megaphone,
  Package,
  Printer,
  RotateCcw,
  Send,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
} from 'lucide-react'

type Question = {
  id: string
  label: string
  placeholder: string
  multiline?: boolean
}

type QuestionGroup = {
  id: string
  title: string
  summary: string
  icon: typeof Printer
  questions: Question[]
}

const questionGroups: QuestionGroup[] = [
  {
    id: 'brand',
    title: 'Brand Basics',
    summary: 'Help us understand who the business is before we shape the website.',
    icon: ShieldCheck,
    questions: [
      {
        id: 'business-name-location',
        label: 'What is the business name, location, and current service area?',
        placeholder: 'Example: Brand name, city, office/shop address, areas served',
      },
      {
        id: 'brand-story',
        label: 'How would you describe the business in a few sentences?',
        placeholder: 'What you do, who you serve, and why customers choose you',
        multiline: true,
      },
      {
        id: 'brand-assets',
        label: 'Do you already have a logo, colors, brand guide, photos, or sample designs?',
        placeholder: 'Mention what exists and what still needs to be created',
        multiline: true,
      },
      {
        id: 'brand-tone',
        label: 'What tone should the brand have online?',
        placeholder: 'Professional, friendly, premium, affordable, bold, corporate, etc.',
      },
    ],
  },
  {
    id: 'products',
    title: 'Products & Services',
    summary: 'Define what customers should be able to browse, request, and order.',
    icon: Package,
    questions: [
      {
        id: 'service-list',
        label: 'What print, branding, and design services do you offer?',
        placeholder: 'Business cards, flyers, banners, mugs, shirts, stickers, packaging, etc.',
        multiline: true,
      },
      {
        id: 'best-sellers',
        label: 'Which products sell fastest or should appear first on the website?',
        placeholder: 'List 5-10 priority products if possible',
        multiline: true,
      },
      {
        id: 'product-options',
        label: 'What options matter for each product?',
        placeholder: 'Sizes, materials, finishing, colors, print sides, lamination, quantity ranges',
        multiline: true,
      },
      {
        id: 'minimums-design',
        label: 'Do you have minimum order quantities or paid design assistance?',
        placeholder: 'Example: minimum 100 pieces, design fee, free template, custom quote',
      },
    ],
  },
  {
    id: 'customers',
    title: 'Customers',
    summary: 'Clarify the audience so the content and social posts speak to the right people.',
    icon: Users,
    questions: [
      {
        id: 'target-customers',
        label: 'Who are your main customers?',
        placeholder: 'Small businesses, schools, churches, event planners, fashion brands, etc.',
        multiline: true,
      },
      {
        id: 'customer-problems',
        label: 'What problems do customers usually need you to solve?',
        placeholder: 'Urgent delivery, clean design, affordable bulk print, packaging help, etc.',
        multiline: true,
      },
      {
        id: 'competitors',
        label: 'Which local competitors or online print brands should we be aware of?',
        placeholder: 'Names, links, or what customers compare you against',
        multiline: true,
      },
      {
        id: 'trust-proof',
        label: 'What proof can we show that customers can trust the business?',
        placeholder: 'Reviews, years in business, major clients, photos, videos, press, guarantees',
        multiline: true,
      },
    ],
  },
  {
    id: 'ordering',
    title: 'Ordering Flow',
    summary: 'Choose the simplest online path that matches how the business already works.',
    icon: ShoppingCart,
    questions: [
      {
        id: 'preferred-flow',
        label: 'How should customers start an order online?',
        placeholder: 'Buy directly, request a quote, WhatsApp first, upload design, or book a call',
        multiline: true,
      },
      {
        id: 'upload-design',
        label: 'Should customers upload their own design files?',
        placeholder: 'Yes/no, accepted formats, file size concerns, approval process',
        multiline: true,
      },
      {
        id: 'request-design',
        label: 'Should customers be able to request design help from your team?',
        placeholder: 'Design request details, fee, turnaround, review/approval steps',
        multiline: true,
      },
      {
        id: 'order-tracking',
        label: 'Do customers need order status updates or tracking?',
        placeholder: 'Manual WhatsApp updates, email/SMS updates, account dashboard, order number',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Payments',
    summary: 'Set expectations for quotes, checkout, deposits, taxes, and refunds.',
    icon: CreditCard,
    questions: [
      {
        id: 'pricing-model',
        label: 'Do products have fixed prices, quote-based prices, or both?',
        placeholder: 'Mention products that can show prices and products that need custom quotes',
        multiline: true,
      },
      {
        id: 'payment-methods',
        label: 'What payment methods should customers use?',
        placeholder: 'Bank transfer, card, Paystack, Flutterwave, cash, POS, payment on pickup',
      },
      {
        id: 'deposits',
        label: 'Do customers pay full price upfront or a deposit?',
        placeholder: 'Example: 70% deposit before production, balance before delivery',
      },
      {
        id: 'tax-refunds',
        label: 'Are VAT, delivery fees, refunds, or cancellation rules already defined?',
        placeholder: 'Share what applies today or what needs to be decided',
        multiline: true,
      },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery & Support',
    summary: 'Make the fulfilment promise clear before customers place orders.',
    icon: Truck,
    questions: [
      {
        id: 'delivery-areas',
        label: 'Where do you deliver, and where can customers pick up orders?',
        placeholder: 'Local pickup, citywide delivery, interstate delivery, courier partners',
        multiline: true,
      },
      {
        id: 'turnaround',
        label: 'What is the usual turnaround time for common products?',
        placeholder: 'Example: 24 hours, 3-5 working days, depends on quantity',
        multiline: true,
      },
      {
        id: 'support-channels',
        label: 'Which support channels should appear on the website?',
        placeholder: 'Phone, WhatsApp, email, Instagram DM, physical office address, office hours',
        multiline: true,
      },
      {
        id: 'complaints',
        label: 'How do you handle damaged, delayed, or incorrect orders?',
        placeholder: 'Replacement, refund, reprint, escalation contact, proof needed',
        multiline: true,
      },
    ],
  },
  {
    id: 'website',
    title: 'Website Content',
    summary: 'Decide the pages and content needed for a confident first launch.',
    icon: Globe2,
    questions: [
      {
        id: 'required-pages',
        label: 'Which pages should the website include?',
        placeholder: 'Home, products, product details, about, contact, FAQs, gallery, policies',
        multiline: true,
      },
      {
        id: 'product-categories',
        label: 'How should products be grouped?',
        placeholder: 'Cards, flyers, banners, clothing, packaging, corporate gifts, event prints',
        multiline: true,
      },
      {
        id: 'gallery',
        label: 'Do you have photos or videos of finished work we can use?',
        placeholder: 'Product shots, shop photos, client deliveries, before/after design work',
        multiline: true,
      },
      {
        id: 'legal-pages',
        label: 'Do you already have policies for privacy, terms, delivery, returns, or artwork files?',
        placeholder: 'Mention existing documents or what needs to be written',
        multiline: true,
      },
    ],
  },
  {
    id: 'social',
    title: 'Social Media',
    summary: 'Plan the management work so content supports the website launch.',
    icon: Megaphone,
    questions: [
      {
        id: 'handles',
        label: 'What social media accounts exist today?',
        placeholder: 'Instagram, Facebook, TikTok, LinkedIn, X, WhatsApp catalog links',
        multiline: true,
      },
      {
        id: 'platforms',
        label: 'Which platforms should we manage or prioritize?',
        placeholder: 'Mention primary and secondary platforms',
      },
      {
        id: 'content-style',
        label: 'What kind of content should the brand post?',
        placeholder: 'Product showcases, customer work, promos, educational posts, reels, stories',
        multiline: true,
      },
      {
        id: 'content-process',
        label: 'How should content approvals, posting frequency, and ad budget work?',
        placeholder: 'Who approves, weekly/monthly cadence, paid ads budget, reporting needs',
        multiline: true,
      },
    ],
  },
  {
    id: 'operations',
    title: 'Operations',
    summary: 'Identify who will own updates, enquiries, approvals, and admin access.',
    icon: FileText,
    questions: [
      {
        id: 'product-owner',
        label: 'Who will update products, prices, and availability?',
        placeholder: 'Owner, manager, sales team, designer, or Highbee support',
      },
      {
        id: 'enquiries-owner',
        label: 'Who should receive website enquiries and order notifications?',
        placeholder: 'Names, roles, email addresses, WhatsApp numbers',
        multiline: true,
      },
      {
        id: 'admin-users',
        label: 'Who needs admin access to the website?',
        placeholder: 'Owner, sales, social media manager, designer, accountant',
        multiline: true,
      },
      {
        id: 'integrations',
        label: 'What tools should the website connect with?',
        placeholder: 'WhatsApp, payment gateway, email, Google Analytics, Meta Pixel, CRM',
        multiline: true,
      },
    ],
  },
  {
    id: 'timeline',
    title: 'Timeline',
    summary: 'Keep the first launch focused, realistic, and useful.',
    icon: Clock,
    questions: [
      {
        id: 'launch-date',
        label: 'Is there a target launch date or important event deadline?',
        placeholder: 'Date, event, campaign, or reason for urgency',
      },
      {
        id: 'priority-features',
        label: 'What must be ready for version 1?',
        placeholder: 'Product catalog, quote form, WhatsApp ordering, payments, social setup',
        multiline: true,
      },
      {
        id: 'budget-range',
        label: 'Is there a budget range or preferred payment schedule?',
        placeholder: 'A rough range helps us recommend the right phased approach',
      },
      {
        id: 'decision-makers',
        label: 'Who needs to review and approve the project?',
        placeholder: 'Names, roles, and how decisions are made',
        multiline: true,
      },
    ],
  },
]

const phaseCards = [
  {
    title: 'Launch Foundation',
    description:
      'Brand story, product catalogue, enquiry/order paths, contact channels, and clear delivery expectations.',
  },
  {
    title: 'Online Ordering',
    description:
      'File uploads, quote requests, product options, payment readiness, order status, and customer support flow.',
  },
  {
    title: 'Growth Support',
    description:
      'Social media structure, content calendar, launch campaign, testimonials, analytics, and future marketplace ideas.',
  },
]

const benchmarkItems = [
  'Product categories with clear starting points',
  'Product details for materials, sizes, finishing, and quantity',
  'Quote/order paths that match how the team already works',
  'Delivery, payment, support, and refund expectations',
  'Social proof, gallery work, testimonials, and launch content',
]

const initialAnswers = questionGroups.reduce<Record<string, string>>((answers, group) => {
  group.questions.forEach((question) => {
    answers[question.id] = ''
  })

  return answers
}, {})

function buildAnswersText(answers: Record<string, string>) {
  const lines = [
    'Print & Branding Website Discovery Brief',
    'Prepared for Highbee',
    '',
    'Please review the answers below and send them back when ready.',
    '',
  ]

  questionGroups.forEach((group) => {
    lines.push(group.title)
    lines.push('-'.repeat(group.title.length))

    group.questions.forEach((question) => {
      const answer = answers[question.id]?.trim() || '[Not answered yet]'
      lines.push(`${question.label}`)
      lines.push(answer)
      lines.push('')
    })
  })

  return lines.join('\n')
}

export function PrintServicesDiscoveryClient() {
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers)
  const [status, setStatus] = useState('')

  const answeredCount = useMemo(
    () => Object.values(answers).filter((answer) => answer.trim().length > 0).length,
    [answers]
  )

  const totalCount = Object.keys(initialAnswers).length
  const progress = Math.round((answeredCount / totalCount) * 100)

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [id]: value,
    }))
    setStatus('')
  }

  const handleCopyAnswers = async () => {
    const text = buildAnswersText(answers)

    try {
      await navigator.clipboard.writeText(text)
      setStatus('Answers copied. You can paste and send them to Highbee.')
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setStatus('Answers copied. You can paste and send them to Highbee.')
    }
  }

  const handleDownloadAnswers = () => {
    const blob = new Blob([buildAnswersText(answers)], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'print-branding-website-discovery-answers.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setStatus('Answers downloaded as a text file.')
  }

  const handleReset = () => {
    setAnswers(initialAnswers)
    setStatus('Answers cleared.')
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <section className="relative overflow-hidden px-5 pb-12 pt-24 sm:px-6 lg:pb-16 lg:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_28%),#0a0a0f]" />
        <div className="absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back home
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Image
                  src="/images/profile-favicon.png"
                  alt="Highbee"
                  width={44}
                  height={44}
                  className="rounded-full border border-white/15"
                />
                <div>
                  <p className="text-sm font-semibold text-red-500">Highbee</p>
                  <p className="text-xs text-white/45">Website and social media discovery</p>
                </div>
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Print & Branding Website Discovery Brief
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
                These questions help us understand the brand, products, ordering flow,
                delivery process, payment needs, and social media direction before we
                plan the website properly.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Progress</p>
                  <p className="mt-1 text-sm leading-6 text-white/50">
                    Fill what you know now. Blank answers are fine.
                  </p>
                </div>
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-200">
                  {progress}%
                </div>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-700 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <Metric value={answeredCount.toString()} label="Answered" />
                <Metric value={totalCount.toString()} label="Questions" />
                <Metric value="V1" label="Scope" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {phaseCards.map((phase, index) => (
            <article
              key={phase.title}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600/15 text-red-300">
                <span className="text-sm font-bold">{index + 1}</span>
              </div>
              <h2 className="text-xl font-semibold text-white">{phase.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/55">{phase.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white">
              <Printer className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold text-white">What “Printivo-like” means here</h2>
            <p className="mt-4 text-sm leading-7 text-white/55">
              We are not copying another brand. We are using the benchmark to understand
              the level of clarity customers expect from a serious print business online.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {benchmarkItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                <p className="text-sm leading-6 text-white/60">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 border-y border-white/10 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">Discovery Questions</h2>
              <p className="mt-2 text-sm leading-6 text-white/50">
                Answer directly on this page, then copy or download the responses.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ActionButton icon={Clipboard} label="Copy answers" onClick={handleCopyAnswers} />
              <ActionButton
                icon={Download}
                label="Download answers"
                onClick={handleDownloadAnswers}
              />
              <ActionButton icon={RotateCcw} label="Reset" onClick={handleReset} subtle />
            </div>
          </div>

          {status && (
            <div className="mb-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              {status}
            </div>
          )}

          <div className="grid gap-5">
            {questionGroups.map((group, groupIndex) => {
              const Icon = group.icon

              return (
                <section
                  key={group.id}
                  id={group.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
                >
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-red-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                          Section {groupIndex + 1}
                        </p>
                        <h3 className="mt-1 text-2xl font-semibold text-white">
                          {group.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
                          {group.summary}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`#${group.id}`}
                      className="text-sm font-medium text-white/35 transition-colors hover:text-white"
                    >
                      #{group.id}
                    </a>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {group.questions.map((question) => (
                      <QuestionField
                        key={question.id}
                        question={question}
                        value={answers[question.id]}
                        onChange={handleAnswerChange}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-8 sm:px-6 lg:pb-28">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-red-500/20 bg-gradient-to-br from-red-600/20 via-white/[0.04] to-white/[0.02] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Send these answers back to Highbee when ready.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
                Once we have this context, we can shape a practical website and social
                media plan that fits the business instead of guessing from the outside.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyAnswers}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0a0a0f] transition hover:bg-red-50"
            >
              <Send className="h-4 w-4" />
              Copy answers
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-4">
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-white/40">{label}</p>
    </div>
  )
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
  subtle = false,
}: {
  icon: typeof Clipboard
  label: string
  onClick: () => void
  subtle?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
        subtle
          ? 'border border-white/10 bg-white/[0.03] text-white/65 hover:border-white/20 hover:text-white'
          : 'bg-red-600 text-white hover:bg-red-700'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}

function QuestionField({
  question,
  value,
  onChange,
}: {
  question: Question
  value: string
  onChange: (id: string, value: string) => void
}) {
  const fieldClassName =
    'mt-3 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-red-500/60 focus:bg-black/35'

  return (
    <label className="block rounded-2xl border border-white/10 bg-black/15 p-4">
      <span className="text-sm font-medium leading-6 text-white/80">{question.label}</span>
      {question.multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(question.id, event.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className={`${fieldClassName} min-h-32 resize-y`}
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(question.id, event.target.value)}
          placeholder={question.placeholder}
          className={fieldClassName}
        />
      )}
    </label>
  )
}
