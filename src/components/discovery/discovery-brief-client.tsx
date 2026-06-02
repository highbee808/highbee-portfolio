'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clipboard,
  Clock,
  CreditCard,
  Download,
  FileText,
  Globe2,
  HeartHandshake,
  Megaphone,
  Package,
  Printer,
  RotateCcw,
  Route,
  Send,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { DiscoveryBrief, DiscoveryIcon, DiscoveryQuestion } from '@/lib/discovery-briefs'

const iconMap: Record<DiscoveryIcon, LucideIcon> = {
  calendar: CalendarDays,
  clock: Clock,
  'credit-card': CreditCard,
  'file-text': FileText,
  globe: Globe2,
  'heart-handshake': HeartHandshake,
  megaphone: Megaphone,
  package: Package,
  printer: Printer,
  route: Route,
  shield: ShieldCheck,
  'shopping-cart': ShoppingCart,
  truck: Truck,
  users: Users,
}

function getInitialAnswers(brief: DiscoveryBrief) {
  return brief.questionGroups.reduce<Record<string, string>>((answers, group) => {
    group.questions.forEach((question) => {
      answers[question.id] = ''
    })

    return answers
  }, {})
}

function buildAnswersText(brief: DiscoveryBrief, answers: Record<string, string>) {
  const lines = [
    brief.title,
    `Prepared for ${brief.preparedFor}`,
    '',
    'Please review the answers below and send them back when ready.',
    '',
  ]

  brief.questionGroups.forEach((group) => {
    lines.push(group.title)
    lines.push('-'.repeat(group.title.length))

    group.questions.forEach((question) => {
      const answer = answers[question.id]?.trim() || '[Not answered yet]'
      lines.push(question.label)
      lines.push(answer)
      lines.push('')
    })
  })

  return lines.join('\n')
}

export function DiscoveryBriefClient({ brief }: { brief: DiscoveryBrief }) {
  const initialAnswers = useMemo(() => getInitialAnswers(brief), [brief])
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers)
  const [status, setStatus] = useState('')

  const answeredCount = useMemo(
    () => Object.values(answers).filter((answer) => answer.trim().length > 0).length,
    [answers]
  )

  const totalCount = Object.keys(initialAnswers).length
  const progress = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0
  const BenchmarkIcon = iconMap[brief.benchmarkIcon]

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [id]: value,
    }))
    setStatus('')
  }

  const handleCopyAnswers = async () => {
    const text = buildAnswersText(brief, answers)

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
    const blob = new Blob([buildAnswersText(brief, answers)], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = brief.downloadFileName
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
                  <p className="text-sm font-semibold text-red-500">{brief.brandLabel}</p>
                  <p className="text-xs text-white/45">{brief.brandSubtext}</p>
                </div>
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {brief.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
                {brief.intro}
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
          {brief.phaseCards.map((phase, index) => (
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
              <BenchmarkIcon className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold text-white">{brief.benchmarkTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-white/55">{brief.benchmarkDescription}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {brief.benchmarkItems.map((item) => (
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
          <div className="mb-8 flex flex-col gap-4 border-y border-white/10 px-4 py-5 sm:px-0 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white">Discovery Questions</h2>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  Answer directly on this page, then copy or download the responses.
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                aria-label="Reset answers"
                title="Reset answers"
                className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/65 transition hover:border-white/20 hover:text-white lg:hidden"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <ActionButton icon={Clipboard} label="Copy answers" onClick={handleCopyAnswers} />
              <ActionButton
                icon={Download}
                label="Download answers"
                onClick={handleDownloadAnswers}
              />
              <div className="hidden lg:block">
                <ActionButton icon={RotateCcw} label="Reset" onClick={handleReset} subtle />
              </div>
            </div>
          </div>

          {status && (
            <div
              data-discovery-status
              className="mb-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"
            >
              {status}
            </div>
          )}

          <div className="grid gap-5">
            {brief.questionGroups.map((group, groupIndex) => {
              const Icon = iconMap[group.icon]

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
              <h2 className="text-3xl font-bold text-white">{brief.handoffTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
                {brief.handoffDescription}
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
  icon: LucideIcon
  label: string
  onClick: () => void
  subtle?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold transition sm:px-4 ${
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
  question: DiscoveryQuestion
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
