export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://highbee.dev'

export const SITE_NAME = 'Highbee'
export const PERSON_NAME = 'Ibrahim Lawal'
export const DEFAULT_OG_IMAGE = '/images/profile-cartoon.png'

export function absoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
