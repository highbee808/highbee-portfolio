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

type EnhancedDiscoveryQuestion = DiscoveryQuestion & {
  helper?: string
  suggestedAnswer?: string
  options?: string[]
  choiceMode?: 'single' | 'multiple'
}

function getInitialAnswers(brief: DiscoveryBrief) {
  return brief.questionGroups.reduce<Record<string, string>>((answers, group) => {
    group.questions.forEach((question) => {
      answers[question.id] = ''
    })

    return answers
  }, {})
}

const followUpAnswerPattern = /\b(all|not yet|tbd|to be decided|none|n\/a)\b/i

function getAnswer(answers: Record<string, string>, id: string) {
  return answers[id]?.trim() || ''
}

function getFirstAnswer(answers: Record<string, string>, ids: string[]) {
  return ids.map((id) => getAnswer(answers, id)).find(Boolean) || ''
}

function formatAnswer(answer: string) {
  return answer || '[Not answered yet]'
}

function getMarkdownFileName(fileName: string) {
  return fileName.replace(/\.[^.]+$/, '.md') || 'discovery-handoff.md'
}

function getJsonFileName(fileName: string) {
  return fileName.replace(/\.[^.]+$/, '.json') || 'discovery-handoff.json'
}

function pushField(lines: string[], label: string, value: string) {
  if (value) {
    lines.push(`- **${label}:** ${value}`)
  }
}

function pushQuestionGroups(
  lines: string[],
  brief: DiscoveryBrief,
  answers: Record<string, string>
) {
  brief.questionGroups.forEach((group) => {
    lines.push(`### ${group.title}`)
    lines.push('')

    group.questions.forEach((question) => {
      lines.push(`**${question.label}**`)
      lines.push('')
      lines.push(formatAnswer(getAnswer(answers, question.id)))
      lines.push('')
    })
  })
}

function buildAnswersMarkdown(brief: DiscoveryBrief, answers: Record<string, string>) {
  const followUpItems = brief.questionGroups.flatMap((group) =>
    group.questions
      .map((question) => {
        const answer = getAnswer(answers, question.id)

        if (!answer) {
          return `- ${group.title}: ${question.label}`
        }

        if (followUpAnswerPattern.test(answer)) {
          return `- ${group.title}: Confirm "${answer}" for "${question.label}"`
        }

        return ''
      })
      .filter(Boolean)
  )

  const lines = [
    `# ${brief.title}`,
    '',
    `Prepared for ${brief.preparedFor}`,
    '',
    'This Markdown handoff is structured so it can be uploaded or pasted into another Codex chat for planning.',
    '',
  ]

  lines.push('## Business Context')
  pushField(lines, 'Business / project', getFirstAnswer(answers, ['business-name-location']))
  pushField(lines, 'Overview', getFirstAnswer(answers, ['brand-story', 'business-summary']))
  pushField(lines, 'Target customers', getFirstAnswer(answers, ['target-customers']))
  pushField(lines, 'Products or services', getFirstAnswer(answers, ['service-list']))
  pushField(lines, 'Launch priority', getFirstAnswer(answers, ['priority-features', 'must-haves']))
  pushField(lines, 'Target date', getFirstAnswer(answers, ['launch-date']))
  lines.push('')

  lines.push('## Cleaned Client Answers')
  lines.push('')
  pushQuestionGroups(lines, brief, answers)

  lines.push('## Known Requirements')
  lines.push('')
  brief.questionGroups.forEach((group) => {
    const answeredQuestions = group.questions.filter((question) => getAnswer(answers, question.id))

    if (answeredQuestions.length === 0) {
      return
    }

    lines.push(`### ${group.title}`)
    answeredQuestions.forEach((question) => {
      lines.push(`- **${question.label}:** ${getAnswer(answers, question.id)}`)
    })
    lines.push('')
  })

  lines.push('## Missing Decisions')
  lines.push('')
  if (followUpItems.length > 0) {
    lines.push(...followUpItems)
  } else {
    lines.push(
      '- No obvious blank or placeholder answers were detected. Still review policies, scope, and operational commitments before implementation.'
    )
  }
  lines.push('')

  lines.push('## Recommended Next-Chat Prompt')
  lines.push('')
  lines.push('```markdown')
  lines.push('Use the `local-business-discovery` skill first.')
  lines.push('')
  lines.push('This chat is for interactive planning, not immediate implementation.')
  lines.push('')
  lines.push('Context:')
  lines.push(
    'We are working from the Highbee project, but the final build will later live in a separate project/repo named after the client business.'
  )
  lines.push('')
  lines.push('Your role:')
  lines.push(
    'Help us think through the business from the ground up. Ask smart questions, identify gaps, organize decisions, and turn the discovery answers into a strong website + social media execution strategy.'
  )
  lines.push('')
  lines.push('First steps:')
  lines.push(
    '1. Check the available skill library for relevant skills that can help with this business planning process.'
  )
  lines.push('2. Use `local-business-discovery` as the main skill.')
  lines.push(
    '3. Suggest other useful skills or plugins for later phases, such as web app planning, social media/content planning, design systems, ecommerce/payment flow, Canva/Figma assets, deployment, or business research.'
  )
  lines.push('4. Review the uploaded discovery handoff.')
  lines.push(
    '5. Start by summarizing what we know, what is unclear, and what decisions we need to make first.'
  )
  lines.push('')
  lines.push('Planning style:')
  lines.push(
    'Make this interactive. Ask before locking major decisions. Prioritize quality, clarity, and operational realism.'
  )
  lines.push('```')
  lines.push('')

  lines.push('## Raw Answers Appendix')
  lines.push('')
  pushQuestionGroups(lines, brief, answers)

  return lines.join('\n')
}

function buildAnswersJson(brief: DiscoveryBrief, answers: Record<string, string>) {
  return JSON.stringify(
    {
      title: brief.title,
      preparedFor: brief.preparedFor,
      slug: brief.slug,
      answers: brief.questionGroups.map((group) => ({
        id: group.id,
        title: group.title,
        questions: group.questions.map((question) => ({
          id: question.id,
          label: question.label,
          answer: getAnswer(answers, question.id),
          suggestedAnswer: (question as EnhancedDiscoveryQuestion).suggestedAnswer || '',
        })),
      })),
    },
    null,
    2
  )
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
    const text = buildAnswersMarkdown(brief, answers)

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
    const blob = new Blob([buildAnswersMarkdown(brief, answers)], {
      type: 'text/markdown;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = getMarkdownFileName(brief.downloadFileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setStatus('Answers downloaded as a Markdown handoff.')
  }

  const handleDownloadJson = () => {
    const blob = new Blob([buildAnswersJson(brief, answers)], {
      type: 'application/json;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = getJsonFileName(brief.downloadFileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setStatus('Answers downloaded as structured JSON.')
  }

  const handlePrint = () => {
    window.print()
    setStatus('Print dialog opened. Choose Save as PDF if you want a PDF copy.')
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
            <div className="flex items-start">
              <div>
                <h2 className="text-3xl font-bold text-white">Discovery Questions</h2>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  Answer directly on this page, then copy or download the responses.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 lg:justify-end">
              <ActionButton
                icon={Clipboard}
                label="Copy answers"
                onClick={handleCopyAnswers}
                className="w-full sm:w-auto"
              />
              <ActionButton
                icon={Download}
                label="Markdown"
                onClick={handleDownloadAnswers}
                className="w-full sm:w-auto"
              />
              <ActionButton
                icon={FileText}
                label="JSON"
                onClick={handleDownloadJson}
                className="w-full sm:w-auto"
              />
              <ActionButton
                icon={Printer}
                label="Print / PDF"
                onClick={handlePrint}
                className="w-full sm:w-auto"
              />
              <ActionButton
                icon={RotateCcw}
                label="Reset"
                onClick={handleReset}
                subtle
                className="w-full sm:w-auto"
              />
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
  className = '',
}: {
  icon: LucideIcon
  label: string
  onClick: () => void
  subtle?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl px-2.5 py-2 text-[13px] font-semibold transition sm:gap-2 sm:px-4 sm:text-sm ${
        subtle
          ? 'border border-white/10 bg-white/[0.03] text-white/65 hover:border-white/20 hover:text-white'
          : 'bg-red-600 text-white hover:bg-red-700'
      } ${className}`}
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
  question: EnhancedDiscoveryQuestion
  value: string
  onChange: (id: string, value: string) => void
}) {
  const fieldClassName =
    'mt-3 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-red-500/60 focus:bg-black/35'

  const selectedOptions = value
    .split('\n')
    .map((option) => option.trim())
    .filter(Boolean)

  const toggleOption = (option: string) => {
    if (question.choiceMode === 'multiple') {
      const nextOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((selectedOption) => selectedOption !== option)
        : [...selectedOptions, option]

      onChange(question.id, nextOptions.join('\n'))
      return
    }

    onChange(question.id, option)
  }

  return (
    <div className="block rounded-2xl border border-white/10 bg-black/15 p-4">
      <label htmlFor={`question-${question.id}`} className="text-sm font-medium leading-6 text-white/80">
        {question.label}
      </label>
      {question.helper && (
        <span className="mt-2 block text-xs leading-5 text-white/42">{question.helper}</span>
      )}
      {question.suggestedAnswer && (
        <button
          type="button"
          onClick={() => onChange(question.id, question.suggestedAnswer || '')}
          className="mt-3 inline-flex rounded-full border border-red-400/25 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-100 transition hover:border-red-300/50 hover:bg-red-500/20"
        >
          Use suggested answer
        </button>
      )}
      {question.options && question.options.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {question.options.map((option) => {
            const selected =
              question.choiceMode === 'multiple'
                ? selectedOptions.includes(option)
                : value.trim() === option

            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleOption(option)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  selected
                    ? 'border-red-300 bg-red-500 text-white'
                    : 'border-white/10 bg-white/[0.04] text-white/55 hover:border-white/25 hover:text-white'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
      )}
      {question.multiline ? (
        <textarea
          id={`question-${question.id}`}
          value={value}
          onChange={(event) => onChange(question.id, event.target.value)}
          placeholder={question.placeholder}
          rows={4}
          className={`${fieldClassName} min-h-32 resize-y`}
        />
      ) : (
        <input
          id={`question-${question.id}`}
          value={value}
          onChange={(event) => onChange(question.id, event.target.value)}
          placeholder={question.placeholder}
          className={fieldClassName}
        />
      )}
    </div>
  )
}
