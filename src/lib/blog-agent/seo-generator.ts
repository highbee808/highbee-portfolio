import { generateBlogPost, GenerateOptions } from './generator'
import { checkAndFixFormatting } from './format-checker'
import { analyzeTopicsSEO, SEOScore, calculateTimingBonus } from './seo-analyzer'
import {
  checkContentQuality,
  quickLocalQualityChecks,
  QualityCheckResult,
  QUALITY_THRESHOLD
} from './quality-checker'
import {
  getUnusedTopics,
  markTopicUsed,
  PredefinedTopic
} from './topics'
import { Tone, Category } from './prompts'
import { updatePost } from '../blog-store'

export interface SEOGenerationReport {
  success: boolean
  timestamp: string

  // Topic selection phase
  topicSelection: {
    totalCandidates: number
    analyzedTopics: number
    selectedTopic: SEOScore | null
    selectionReason: string
  }

  // Generation phase
  generation: {
    topic: string
    tone: Tone
    category: Category
    generatedTitle: string
    wordCount: number
  } | null

  // Format check phase
  formatCheck: {
    wasModified: boolean
    issuesFixed: string[]
  } | null

  // Quality check phase
  qualityCheck: {
    passed: boolean
    score: number
    breakdown: QualityCheckResult['breakdown'] | null
    issues: string[]
  } | null

  // Final result
  result: {
    postId: string
    slug: string
    title: string
    published: boolean
  } | null

  // Errors if any
  errors: string[]

  // API usage tracking
  apiCalls: {
    seoAnalysis: number
    generation: number
    formatCheck: number
    qualityCheck: number
    total: number
  }
}

export interface SEOGenerateOptions {
  /** Override topic selection with a specific topic */
  forceTopic?: string
  /** Override category filter */
  category?: Category
  /** Override tone */
  tone?: Tone
  /** Publish immediately if quality passes */
  autoPublish?: boolean
  /** Skip quality check (faster, less cost) */
  skipQualityCheck?: boolean
  /** Minimum SEO score to consider a topic */
  minSeoScore?: number
}

/**
 * Main SEO-enhanced blog generation pipeline
 */
export async function generateWithSEO(
  options: SEOGenerateOptions = {}
): Promise<SEOGenerationReport> {
  const {
    forceTopic,
    category,
    tone,
    autoPublish = false,
    skipQualityCheck = false,
    minSeoScore = 50,
  } = options

  const report: SEOGenerationReport = {
    success: false,
    timestamp: new Date().toISOString(),
    topicSelection: {
      totalCandidates: 0,
      analyzedTopics: 0,
      selectedTopic: null,
      selectionReason: '',
    },
    generation: null,
    formatCheck: null,
    qualityCheck: null,
    result: null,
    errors: [],
    apiCalls: {
      seoAnalysis: 0,
      generation: 0,
      formatCheck: 0,
      qualityCheck: 0,
      total: 0,
    },
  }

  try {
    // ============================================
    // PHASE 1: Topic Selection with SEO Analysis
    // ============================================
    let selectedTopic: PredefinedTopic | null = null
    let selectedScore: SEOScore | null = null

    if (forceTopic) {
      // Manual topic override
      report.topicSelection.selectionReason = 'Manual topic override'
      selectedTopic = {
        id: 'manual',
        title: forceTopic,
        category: category || 'general',
        suggestedTone: tone || 'conversational',
        keywords: [],
        used: false,
        usedAt: null,
      }
    } else {
      // Get all unused topics
      let unusedTopics = await getUnusedTopics()
      report.topicSelection.totalCandidates = unusedTopics.length

      // Filter by category if specified
      if (category) {
        unusedTopics = unusedTopics.filter(t => t.category === category)
      }

      if (unusedTopics.length === 0) {
        report.topicSelection.selectionReason = 'No unused topics available'
        report.errors.push('No unused topics available for generation')
        return report
      }

      // Analyze all topics for SEO potential (single API call)
      console.log(`[SEO] Analyzing ${unusedTopics.length} topics for SEO potential...`)
      const seoAnalysis = await analyzeTopicsSEO(unusedTopics)
      report.apiCalls.seoAnalysis = 1
      report.topicSelection.analyzedTopics = seoAnalysis.totalTopicsAnalyzed

      // Apply timing bonuses and filter by minimum score
      const scoredTopics = seoAnalysis.scores
        .map(score => {
          const topic = unusedTopics.find(t => t.id === score.topicId)
          if (!topic) return null

          const adjustedScore = calculateTimingBonus(topic, score.overallScore)
          return { ...score, overallScore: adjustedScore, topic }
        })
        .filter((s): s is NonNullable<typeof s> => s !== null && s.overallScore >= minSeoScore)
        .sort((a, b) => b.overallScore - a.overallScore)

      if (scoredTopics.length === 0) {
        report.topicSelection.selectionReason = `No topics met minimum SEO score (${minSeoScore})`
        report.errors.push(`All topics scored below ${minSeoScore}`)
        return report
      }

      // Select the best topic
      const best = scoredTopics[0]
      selectedTopic = best.topic
      selectedScore = best
      report.topicSelection.selectedTopic = best
      report.topicSelection.selectionReason =
        `Selected highest SEO score: ${best.overallScore}/100 (Search Intent: ${best.breakdown.searchIntent}, Keywords: ${best.breakdown.keywordPotential}, Content Gap: ${best.breakdown.contentGap}, Audience: ${best.breakdown.audienceRelevance})`

      console.log(`[SEO] Selected topic: "${selectedTopic.title}" (score: ${best.overallScore})`)
    }

    // ============================================
    // PHASE 2: Content Generation
    // ============================================
    const generateOptions: GenerateOptions = {
      topic: selectedTopic.title,
      tone: tone || selectedTopic.suggestedTone || 'conversational',
      category: category || selectedTopic.category,
      publishImmediately: false, // We'll publish after quality check
    }

    console.log(`[SEO] Generating content for: "${selectedTopic.title}"`)
    const generationResult = await generateBlogPost(generateOptions)
    report.apiCalls.generation = 1

    report.generation = {
      topic: selectedTopic.title,
      tone: generateOptions.tone,
      category: generateOptions.category,
      generatedTitle: generationResult.post.title,
      wordCount: generationResult.generated.content.split(/\s+/).length,
    }

    // Mark topic as used (if it was a predefined topic)
    if (selectedTopic.id !== 'manual') {
      await markTopicUsed(selectedTopic.id)
    }

    // ============================================
    // PHASE 3: Format Check and Auto-Fix
    // ============================================
    console.log(`[SEO] Running format check...`)
    const formatResult = await checkAndFixFormatting(generationResult.generated.content)
    report.apiCalls.formatCheck = 1

    report.formatCheck = {
      wasModified: formatResult.wasModified,
      issuesFixed: formatResult.issuesFound,
    }

    // Update post with fixed content if modified
    let finalContent = generationResult.generated.content
    if (formatResult.wasModified) {
      finalContent = formatResult.fixedContent
      await updatePost(generationResult.post.id, { content: finalContent })
      console.log(`[SEO] Fixed ${formatResult.issuesFound.length} formatting issues`)
    }

    // ============================================
    // PHASE 4: Quality Assurance
    // ============================================
    let qualityPassed = true

    if (!skipQualityCheck) {
      // First, run quick local checks (free)
      const localIssues = quickLocalQualityChecks(finalContent)

      // Then run AI quality check
      console.log(`[SEO] Running quality check...`)
      const qualityResult = await checkContentQuality(
        generationResult.post.title,
        finalContent,
        generationResult.post.category
      )
      report.apiCalls.qualityCheck = 1

      // Combine issues
      const allIssues = [
        ...localIssues.map(i => i.description),
        ...qualityResult.issues.map(i => i.description),
      ]

      qualityPassed = qualityResult.passed && localIssues.filter(i => i.severity === 'high').length === 0

      report.qualityCheck = {
        passed: qualityPassed,
        score: qualityResult.overallScore,
        breakdown: qualityResult.breakdown,
        issues: allIssues,
      }

      // Auto-publish if quality passed and autoPublish is enabled
      if (qualityPassed && autoPublish) {
        await updatePost(generationResult.post.id, { published: true })
        console.log(`[SEO] Quality check passed (${qualityResult.overallScore}/100), published automatically`)
      } else if (!qualityPassed) {
        console.log(`[SEO] Quality check failed (${qualityResult.overallScore}/100), post saved as draft`)
      }
    } else {
      // Skip quality check - publish if autoPublish is true
      if (autoPublish) {
        await updatePost(generationResult.post.id, { published: true })
      }
    }

    // ============================================
    // PHASE 5: Final Report
    // ============================================
    report.success = true
    report.result = {
      postId: generationResult.post.id,
      slug: generationResult.post.slug,
      title: generationResult.post.title,
      published: autoPublish && qualityPassed,
    }

    report.apiCalls.total =
      report.apiCalls.seoAnalysis +
      report.apiCalls.generation +
      report.apiCalls.formatCheck +
      report.apiCalls.qualityCheck

    console.log(`[SEO] Generation complete! Total API calls: ${report.apiCalls.total}`)

  } catch (error) {
    report.errors.push(error instanceof Error ? error.message : 'Unknown error')
    console.error('[SEO] Generation failed:', error)
  }

  return report
}

/**
 * Quick generation without SEO analysis (for manual topic selection)
 * Useful when you already know what topic you want
 */
export async function generateQuick(
  topic: string,
  options: Omit<SEOGenerateOptions, 'forceTopic'> = {}
): Promise<SEOGenerationReport> {
  return generateWithSEO({ ...options, forceTopic: topic })
}
