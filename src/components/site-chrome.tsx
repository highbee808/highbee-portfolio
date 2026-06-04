'use client'

import { usePathname } from 'next/navigation'
import { ChatWidget } from '@/components/chat/chat-widget'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { StickyHeader } from '@/components/ui/sticky-header'

export function SiteChrome() {
  const pathname = usePathname()
  const isDiscoveryRoute = pathname.startsWith('/discovery')

  if (isDiscoveryRoute) {
    return null
  }

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <StickyHeader />
      <ChatWidget />
    </>
  )
}
