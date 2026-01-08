import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface FormatCheckResult {
  fixedContent: string
  issuesFound: string[]
  wasModified: boolean
}

const FORMAT_CHECK_PROMPT = `You are a markdown formatting expert. Analyze and fix the following blog post content for formatting issues.

## Issues to Check and Fix:

### 1. Syntax Errors
- Unclosed code blocks (\`\`\` without closing \`\`\`)
- Malformed links [text](url) - ensure proper brackets and parentheses
- Unmatched bold (**) or italic (*) markers

### 2. Heading Structure
- Ensure heading hierarchy: H2 (##) should come before H3 (###)
- No H1 (#) in content (title is handled separately)
- Add blank line before and after headings

### 3. Code Block Issues
- Add language tag if missing (e.g., \`\`\` → \`\`\`typescript or \`\`\`javascript)
- Infer language from code content when possible
- Fix broken indentation inside code blocks

### 4. Spacing Issues
- Remove more than 2 consecutive blank lines
- Ensure paragraphs are separated by blank lines
- Add proper spacing around lists and blockquotes

### 5. List Formatting
- Ensure consistent list markers (all - or all *)
- Fix broken numbered lists (1. 2. 3. not 1. 1. 1.)
- Proper indentation for nested lists

## Response Format:
Return a JSON object with:
{
  "fixedContent": "the corrected markdown content",
  "issuesFound": ["issue 1 description", "issue 2 description", ...]
}

If no issues found, return the original content unchanged and an empty issues array.

## Content to Check:
`

export async function checkAndFixFormatting(content: string): Promise<FormatCheckResult> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [
        {
          role: 'user',
          content: FORMAT_CHECK_PROMPT + '\n```markdown\n' + content + '\n```'
        }
      ]
    })

    // Extract text content from response
    const textContent = response.content.find(c => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in response')
    }

    // Parse JSON from response
    let result: { fixedContent: string; issuesFound: string[] }

    const responseText = textContent.text

    // Try to extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      try {
        result = JSON.parse(jsonMatch[0])
      } catch {
        // If JSON parsing fails, try to extract from code block
        const codeBlockMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/)
        if (codeBlockMatch) {
          result = JSON.parse(codeBlockMatch[1])
        } else {
          throw new Error('Could not parse response JSON')
        }
      }
    } else {
      throw new Error('No JSON found in response')
    }

    return {
      fixedContent: result.fixedContent,
      issuesFound: result.issuesFound || [],
      wasModified: result.issuesFound && result.issuesFound.length > 0
    }
  } catch (error) {
    console.error('Format check error:', error)
    // Return original content on error
    return {
      fixedContent: content,
      issuesFound: [],
      wasModified: false
    }
  }
}
