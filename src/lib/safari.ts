/**
 * ============================================
 * SAFARI/iOS DETECTION - STARTER KIT
 * ============================================
 * 
 * Copy this file to: lib/safari.ts
 * 
 * Usage:
 * 
 * 1. Create components/SafariInit.tsx:
 *    'use client';
 *    import { useEffect } from 'react';
 *    import { initSafari } from '@/lib/safari';
 *    export function SafariInit() {
 *      useEffect(() => { initSafari(); }, []);
 *      return null;
 *    }
 * 
 * 2. Add to app/layout.tsx:
 *    import { SafariInit } from '@/components/SafariInit';
 *    // Inside your layout: <SafariInit />
 * 
 * Author: Highbee's Starter Kit
 * ============================================
 */

// ===========================================
// DETECTION FUNCTIONS
// ===========================================

/** Check if browser is Safari */
export function isSafari(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome/.test(ua) && !/CriOS/.test(ua);
}

/** Check if device is iOS */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// ===========================================
// AUTO-FIX FUNCTIONS
// ===========================================

/** Apply GPU acceleration to an element */
export function gpuBoost(el: HTMLElement): void {
  el.classList.add('safari-composited');
  el.style.backfaceVisibility = 'hidden';
  el.style.setProperty('-webkit-backface-visibility', 'hidden');
}

/** Fix all blur elements on the page */
function fixBlurElements(): void {
  document.querySelectorAll<HTMLElement>(
    '[class*="backdrop-blur"], [style*="backdrop-filter"]'
  ).forEach(el => {
    el.classList.add('safari-composited');
    el.style.isolation = 'isolate';
  });
}

/** Fix all animated elements */
function fixAnimatedElements(): void {
  document.querySelectorAll<HTMLElement>(
    '.gpu-boost, .gpu-boost-heavy'
  ).forEach(gpuBoost);
}

// ===========================================
// MAIN INIT FUNCTION
// ===========================================

/**
 * Initialize Safari fixes
 * Call this once in your app (useEffect in layout)
 */
export function initSafari(): void {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;

  // Add detection classes to <html>
  if (isSafari()) {
    html.classList.add('is-safari');
  }

  if (isIOS()) {
    html.classList.add('is-ios');
  }

  // Only apply fixes on Safari/iOS
  if (!isSafari() && !isIOS()) return;

  // Fix existing elements
  fixBlurElements();
  
  // Fix elements after short delay (catches dynamically rendered ones)
  setTimeout(fixAnimatedElements, 100);

  // Watch for new elements and fix them
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return;
        
        if (node.matches('[class*="backdrop-blur"], [style*="backdrop-filter"]')) {
          node.classList.add('safari-composited');
          node.style.isolation = 'isolate';
        }

        if (node.matches('.gpu-boost, .gpu-boost-heavy')) {
          gpuBoost(node);
        }

        node.querySelectorAll<HTMLElement>('[class*="backdrop-blur"], [style*="backdrop-filter"]').forEach(el => {
          el.classList.add('safari-composited');
          el.style.isolation = 'isolate';
        });

        node.querySelectorAll<HTMLElement>('.gpu-boost, .gpu-boost-heavy').forEach(gpuBoost);
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// ===========================================
// REACT HOOK (Optional)
// ===========================================

/**
 * Hook to apply GPU boost to a ref
 * 
 * Usage:
 * const ref = useGpuBoost<HTMLDivElement>();
 * return <div ref={ref}>...</div>
 */
export function useGpuBoost<T extends HTMLElement>() {
  return (element: T | null) => {
    if (element && (isSafari() || isIOS())) {
      gpuBoost(element);
    }
  };
}

export default { isSafari, isIOS, initSafari, gpuBoost, useGpuBoost };
