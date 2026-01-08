import Anthropic from '@anthropic-ai/sdk'
import { PredefinedTopic } from './topics'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export interface SEOScore {
  topicId: string
  title: string
  overallScore: number // 0-100
  breakdown: {
    searchIntent: number      // 0-25 - How well does it match search queries?
    keywordPotential: number  // 0-25 - Strength of target keywords
    contentGap: number        // 0-25 - Opportunity in existing content
    audienceRelevance: number // 0-25 - Relevance to target audience
  }
  recommendations: string[]
  timeliness: 'evergreen' | 'trending' | 'seasonal'
  estimatedSearchVolume: 'low' | 'medium' | 'high'
  competitionLevel: 'low' | 'medium' | 'high'
}

export interface SEOAnalysisResult {
  scores: SEOScore[]
  bestTopic: SEOScore | null
  analysisTimestamp: string
  totalTopicsAnalyzed: number
}

// Main SEO scoring prompt - designed for cost efficiency (batch analysis)
const SEO_ANALYSIS_PROMPT = `You are an SEO expert analyzing blog topics for a developer portfolio site.

## Context
- Site owner: Highbee (Ibrahim Lawal), full-stack developer and AI specialist
- Target audience: Developers, tech leaders, potential clients
- Expertise areas: React, Next.js, TypeScript, AI integration, Supabase
- Content style: Practical, opinionated, shipping-focused

## Current Date Context
Today is: {CURRENT_DATE}
Consider what's trending or relevant in the tech industry RIGHT NOW.

## Scoring Criteria (each 0-25 points, total 0-100):

### 1. Search Intent (0-25)
- Does this topic match what developers actively search for?
- Is the search intent clear (informational, tutorial, comparison)?
- Would this rank for real developer queries?

### 2. Keyword Potential (0-25)
- Quality of primary and secondary keywords
- Long-tail keyword opportunities
- Keywords relevance to developer audience

### 3. Content Gap Opportunity (0-25)
- Is existing content on this topic sparse or outdated?
- Can we provide unique value (personal experience, fresh angle)?
- Opportunity to be the definitive resource

### 4. Audience Relevance (0-25)
- Alignment with target developer audience
- Relevance to the author's expertise (authenticity)
- Potential for engagement and sharing

## Additional Factors to Assess:
- Timeliness: Is this evergreen, trending, or seasonal?
- Estimated search volume: low/medium/high
- Competition: low/medium/high

## Topics to Analyze:
{TOPICS_JSON}

## Response Format (JSON only, no markdown):
{
  "scores": [
    {
      "topicId": "topic-id",
      "title": "Topic Title",
      "overallScore": 85,
      "breakdown": {
        "searchIntent": 22,
        "keywordPotential": 20,
        "contentGap": 23,
        "audienceRelevance": 20
      },
      "recommendations": ["improvement 1", "improvement 2"],
      "timeliness": "trending",
      "estimatedSearchVolume": "high",
      "competitionLevel": "medium"
    }
  ]
}

Analyze ALL topics and return scores for each.`

/**
 * Analyze multiple topics for SEO potential in a single API call
 * Cost-effective: Batches all topics into one request
 */
export async function analyzeTopicsSEO(
  topics: PredefinedTopic[]
): Promise<SEOAnalysisResult> {
  if (topics.length === 0) {
    return {
      scores: [],
      bestTopic: null,
      analysisTimestamp: new Date().toISOString(),
      totalTopicsAnalyzed: 0,
    }
  }

  const topicsForAnalysis = topics.map(t => ({
    id: t.id,
    title: t.title,
    category: t.category,
    keywords: t.keywords,
  }))

  const prompt = SEO_ANALYSIS_PROMPT
    .replace('{CURRENT_DATE}', new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }))
    .replace('{TOPICS_JSON}', JSON.stringify(topicsForAnalysis, null, 2))

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  })

  const textContent = response.content.find(block => block.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from SEO analysis')
  }

  // Parse response
  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('No JSON found in SEO analysis response')
  }

  const parsed = JSON.parse(jsonMatch[0])
  const scores: SEOScore[] = parsed.scores || []

  // Find best topic
  const bestTopic = scores.reduce((best, current) =>
    !best || current.overallScore > best.overallScore ? current : best,
    null as SEOScore | null
  )

  return {
    scores,
    bestTopic,
    analysisTimestamp: new Date().toISOString(),
    totalTopicsAnalyzed: topics.length,
  }
}

/**
 * Get trending factor based on current date/time
 * Boosts topics that are relevant to current events/seasons
 */
export function calculateTimingBonus(
  topic: PredefinedTopic,
  baseScore: number
): number {
  const now = new Date()
  const month = now.getMonth()
  const dayOfWeek = now.getDay()

  let bonus = 0

  // Monday posting - professional topics get a boost
  if (dayOfWeek === 1) {
    if (topic.category === 'typescript' || topic.suggestedTone === 'professional') {
      bonus += 5
    }
  }

  // Q1 (Jan-Mar): Career and productivity topics
  if (month <= 2) {
    if (topic.keywords.some(k =>
      ['career', 'productivity', 'freelance', 'portfolio'].includes(k.toLowerCase())
    )) {
      bonus += 5
    }
  }

  // AI topics get consistent boost given current market interest
  if (topic.category === 'ai') {
    bonus += 3
  }

  return Math.min(baseScore + bonus, 100)
}
