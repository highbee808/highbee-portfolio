import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { checkAndFixFormatting } from '@/lib/blog-agent/format-checker'

export async function POST(request: NextRequest) {
  // Check authentication
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('admin_session')

  if (!sessionCookie?.value) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { content } = await request.json()

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    const result = await checkAndFixFormatting(content)

    return NextResponse.json({
      success: true,
      fixedContent: result.fixedContent,
      issuesFound: result.issuesFound,
      wasModified: result.wasModified
    })
  } catch (error) {
    console.error('Format API error:', error)
    return NextResponse.json(
      { error: 'Failed to check formatting' },
      { status: 500 }
    )
  }
}
