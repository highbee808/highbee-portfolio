import Anthropic from '@anthropic-ai/sdk'
import { HIGHBEE_SYSTEM_PROMPT } from '@/lib/chat-context'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        { message: "I'm not configured yet. Please contact Highbee directly at hello@highbee.dev!" },
        { status: 200 }
      )
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 300,
      system: HIGHBEE_SYSTEM_PROMPT,
      messages: messages.slice(-10).map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    })

    const textContent = response.content.find((block) => block.type === 'text')
    const message = textContent && 'text' in textContent ? textContent.text : ''

    return Response.json({ message })
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json(
      { message: "Sorry, I'm having trouble right now. Please try the contact form or email hello@highbee.dev!" },
      { status: 200 }
    )
  }
}
