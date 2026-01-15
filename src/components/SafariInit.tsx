/**
 * ============================================
 * SAFARI INIT COMPONENT - STARTER KIT
 * ============================================
 * 
 * Copy this file to: components/SafariInit.tsx
 * 
 * Usage in app/layout.tsx:
 * 
 * import { SafariInit } from '@/components/SafariInit';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en">
 *       <body>
 *         <SafariInit />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * 
 * Author: Highbee's Starter Kit
 * ============================================
 */

'use client';

import { useEffect } from 'react';
import { initSafari } from '@/lib/safari';

export function SafariInit() {
  useEffect(() => {
    initSafari();
  }, []);

  return null;
}

export default SafariInit;
