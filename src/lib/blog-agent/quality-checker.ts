import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export interface QualityCheckResult {
  passed: boolean
  overallScore: number // 0-100
  breakdown: {
    readability: number       // 0-25
    structure: number         // 0-25
    valueProvided: number     // 0-25
    brandAlignment: number    // 0-25
  }
  issues: QualityIssue[]
  suggestions: string[]
}

export interface QualityIssue {
  severity: 'low' | 'medium' | 'high'
  category: 'readability' | 'structure' | 'value' | 'brand'
  description: string
  location?: string
}

const QUALITY_CHECK_PROMPT = `You are a content quality reviewer for a developer portfolio blog.

## Brand Voice (Highbee / Ibrahim Lawal)
- Authentically human writing - like explaining to a smart colleague
- Uses contractions naturally (don't, isn't, we're)
- First-person experiences ("I've found...", "In my projects...")
- Opinionated but nuanced - acknowledges trade-offs
- Practical and shipping-focused
- NEVER uses AI clichés: "dive deep", "game-changer", "leverage", "seamlessly"

## Quality Criteria (each 0-25 points):

### 1. Readability (0-25)
- Clear, scannable content
- Appropriate sentence length variation
- Technical terms explained when needed
- Good use of code examples

### 2. Structure (0-25)
- Logical flow with clear sections
- Proper heading hierarchy (H2 → H3)
- Good use of lists, code blocks, emphasis
- Strong opening hook and closing thought

### 3. Value Provided (0-25)
- Actionable insights or takeaways
- Specific examples (not generic advice)
- Unique perspective or experience
- Reader learns something useful

### 4. Brand Alignment (0-25)
- Matches Highbee's voice and style
- No AI clichés or robotic phrases
- Feels authentically written by a developer
- Consistent with portfolio positioning

## Passing Threshold: 70/100 overall

## Content to Review:
Title: {TITLE}
Category: {CATEGORY}

Content:
{CONTENT}

## Response Format (JSON only):
{
  "passed": true,
  "overallScore": 85,
  "breakdown": {
    "readability": 22,
    "structure": 21,
    "valueProvided": 23,
    "brandAlignment": 19
  },
  "issues": [
    {
      "severity": "low",
      "category": "brand",
      "description": "Uses 'dive deep' in paragraph 3",
      "location": "## Getting Started section"
    }
  ],
  "suggestions": [
    "Add a personal anecdote in the introduction",
    "Include more specific code examples"
  ]
}`

export async function checkContentQuality(
  title: string,
  content: string,
  category: string
): Promise<QualityCheckResult> {
  const prompt = QUALITY_CHECK_PROMPT
    .replace('{TITLE}', title)
    .replace('{CATEGORY}', category)
    .replace('{CONTENT}', content)

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  })

  const textContent = response.content.find(block => block.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from quality check')
  }

  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('No JSON found in quality check response')
  }

  return JSON.parse(jsonMatch[0]) as QualityCheckResult
}

/**
 * Quick local checks that don't require API calls
 */
export function quickLocalQualityChecks(content: string): QualityIssue[] {
  const issues: QualityIssue[] = []

  // Check for AI clichés
  const aiCliches = [
    'dive deep', 'deep dive', 'game-changer', 'revolutionary',
    'unlock the power', 'without further ado', 'in this article we will',
    'seamlessly', 'leverage', 'cutting-edge', 'robust solution',
    'in today\'s rapidly', 'let\'s dive in'
  ]

  for (const cliche of aiCliches) {
    if (content.toLowerCase().includes(cliche)) {
      issues.push({
        severity: 'high',
        category: 'brand',
        description: `Contains AI cliché: "${cliche}"`,
      })
    }
  }

  // Check minimum word count
  const wordCount = content.split(/\s+/).length
  if (wordCount < 600) {
    issues.push({
      severity: 'medium',
      category: 'value',
      description: `Content too short (${wordCount} words, minimum 600)`,
    })
  }

  // Check for code blocks (technical content should have some)
  const codeBlockCount = (content.match(/```/g) || []).length / 2
  if (codeBlockCount < 1) {
    issues.push({
      severity: 'low',
      category: 'value',
      description: 'No code examples found - consider adding practical code',
    })
  }

  // Check heading structure
  if (!content.includes('## ')) {
    issues.push({
      severity: 'high',
      category: 'structure',
      description: 'No H2 headings found - content needs section structure',
    })
  }

  return issues
}

export const QUALITY_THRESHOLD = 70
