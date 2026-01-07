import { cookies } from 'next/headers'

const SESSION_NAME = 'admin_session'
const SESSION_DURATION = 60 * 60 * 24 * 7 // 7 days in seconds

export async function verifyPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not set in environment variables')
    return false
  }
  return password === adminPassword
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies()
  const sessionToken = Buffer.from(Date.now().toString() + Math.random().toString()).toString('base64')

  cookieStore.set(SESSION_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  })
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_NAME)
  return !!session?.value
}
