/**
 * ============================================
 * SAFARI-SAFE FRAMER MOTION - STARTER KIT
 * ============================================
 *
 * Copy this file to: lib/motion.tsx
 *
 * Usage:
 *
 * // Option 1: Pre-built components
 * import { FadeIn, FadeInUp, ScaleIn } from '@/lib/motion';
 * <FadeInUp>Content</FadeInUp>
 * <FadeInUp delay={0.2}>Delayed content</FadeInUp>
 *
 * // Option 2: Hook for custom animations
 * import { useSafeMotion } from '@/lib/motion';
 * const { style, transition } = useSafeMotion();
 *
 * // Option 3: Accordion helper
 * import { Collapse } from '@/lib/motion';
 * <Collapse open={isOpen}><p>Content</p></Collapse>
 *
 * Author: Highbee's Starter Kit
 * ============================================
 */

'use client';

import { ReactNode, useEffect, useState, useRef } from 'react';
import { motion, Variants, Transition, MotionProps, TargetAndTransition, VariantLabels } from 'framer-motion';

// ===========================================
// DETECTION (inline to keep this file standalone)
// ===========================================

function isSafari(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/Chrome/.test(ua);
}

function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export function useIsIOS(): boolean {
  const [ios, setIos] = useState(false);
  useEffect(() => { setIos(isIOS()); }, []);
  return ios;
}

// ===========================================
// VARIANTS (GPU-optimized with z: 0)
// ===========================================

export const variants = {
  fadeIn: {
    hidden: { opacity: 0, z: 0 },
    visible: { opacity: 1, z: 0 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20, z: 0 },
    visible: { opacity: 1, y: 0, z: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20, z: 0 },
    visible: { opacity: 1, y: 0, z: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20, z: 0 },
    visible: { opacity: 1, x: 0, z: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 20, z: 0 },
    visible: { opacity: 1, x: 0, z: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95, z: 0 },
    visible: { opacity: 1, scale: 1, z: 0 },
  },
} as const;

// ===========================================
// HOOK: useSafeMotion
// ===========================================

interface UseSafeMotionOptions {
  duration?: number;
  delay?: number;
}

/**
 * Hook that returns Safari-safe motion props
 *
 * Usage:
 * const { style, transition } = useSafeMotion({ duration: 0.5 });
 */
export function useSafeMotion(options: UseSafeMotionOptions = {}) {
  const { duration = 0.4, delay = 0 } = options;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const needsFix = mounted && (isSafari() || isIOS());

  // GPU-boost styles
  const style: React.CSSProperties = needsFix ? {
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  } : {};

  // Slightly faster on Safari
  const transition: Transition = {
    duration: needsFix ? duration * 0.85 : duration,
    delay,
    ease: [0.25, 0.1, 0.25, 1],
  };

  return { style, transition, isSafari: needsFix };
}

// ===========================================
// COMPONENT PROPS
// ===========================================

interface AnimatedProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

// ===========================================
// PRE-BUILT COMPONENTS
// ===========================================

/** Simple fade in */
export function FadeIn({ children, delay = 0, duration = 0.4, once = true, className }: AnimatedProps) {
  const { style, transition } = useSafeMotion({ duration, delay });
  const ios = useIsIOS();

  return (
    <motion.div
      variants={variants.fadeIn}
      initial="hidden"
      {...(ios
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once, margin: '0px' } }
      )}
      transition={transition}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Fade in from bottom (most common) */
export function FadeInUp({ children, delay = 0, duration = 0.4, once = true, className }: AnimatedProps) {
  const { style, transition } = useSafeMotion({ duration, delay });
  const ios = useIsIOS();

  return (
    <motion.div
      variants={variants.fadeInUp}
      initial="hidden"
      {...(ios
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once, margin: '0px' } }
      )}
      transition={transition}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Fade in from top */
export function FadeInDown({ children, delay = 0, duration = 0.4, once = true, className }: AnimatedProps) {
  const { style, transition } = useSafeMotion({ duration, delay });
  const ios = useIsIOS();

  return (
    <motion.div
      variants={variants.fadeInDown}
      initial="hidden"
      {...(ios
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once, margin: '0px' } }
      )}
      transition={transition}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Fade in from left */
export function FadeInLeft({ children, delay = 0, duration = 0.4, once = true, className }: AnimatedProps) {
  const { style, transition } = useSafeMotion({ duration, delay });
  const ios = useIsIOS();

  return (
    <motion.div
      variants={variants.fadeInLeft}
      initial="hidden"
      {...(ios
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once, margin: '0px' } }
      )}
      transition={transition}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Fade in from right */
export function FadeInRight({ children, delay = 0, duration = 0.4, once = true, className }: AnimatedProps) {
  const { style, transition } = useSafeMotion({ duration, delay });
  const ios = useIsIOS();

  return (
    <motion.div
      variants={variants.fadeInRight}
      initial="hidden"
      {...(ios
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once, margin: '0px' } }
      )}
      transition={transition}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Scale in (zoom effect) */
export function ScaleIn({ children, delay = 0, duration = 0.4, once = true, className }: AnimatedProps) {
  const { style, transition } = useSafeMotion({ duration, delay });
  const ios = useIsIOS();

  return (
    <motion.div
      variants={variants.scaleIn}
      initial="hidden"
      {...(ios
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once, margin: '0px' } }
      )}
      transition={transition}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================================
// STAGGER CONTAINER
// ===========================================

interface StaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

/**
 * Wrap children to stagger their animations
 *
 * Usage:
 * <Stagger staggerDelay={0.1}>
 *   <FadeInUp>Item 1</FadeInUp>
 *   <FadeInUp>Item 2</FadeInUp>
 * </Stagger>
 */
export function Stagger({ children, staggerDelay = 0.1, className }: StaggerProps) {
  const { isSafari: needsFix } = useSafeMotion();
  const ios = useIsIOS();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: needsFix ? staggerDelay * 0.7 : staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      {...(ios ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true } })}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================================
// SAFE MOTION DIV (for sections using variants + whileInView)
// ===========================================

interface SafeMotionDivProps {
  variants: Variants;
  initial?: string;
  viewport?: { once?: boolean; margin?: string };
  className?: string;
  children: ReactNode;
}

/**
 * iOS-safe wrapper that bypasses whileInView on iOS (where IntersectionObserver
 * callbacks are paused during momentum scroll, causing blank sections).
 * On iOS: always visible. On other platforms: scroll-triggered as normal.
 */
export function SafeMotionDiv({
  variants,
  initial = 'hidden',
  viewport = { once: true, margin: '0px' },
  className,
  children,
}: SafeMotionDivProps) {
  const ios = useIsIOS();
  return (
    <motion.div
      variants={variants}
      initial={initial}
      {...(ios ? { animate: 'visible' } : { whileInView: 'visible', viewport })}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================================
// SAFE IN VIEW (for inline whileInView objects)
// ===========================================

interface SafeInViewProps {
  initial?: MotionProps['initial'];
  animate?: TargetAndTransition | VariantLabels;
  viewport?: { once?: boolean; margin?: string };
  transition?: MotionProps['transition'];
  whileHover?: MotionProps['whileHover'];
  whileTap?: MotionProps['whileTap'];
  className?: string;
  children: ReactNode;
}

/**
 * iOS-safe replacement for motion.div with inline whileInView.
 *
 * Usage:
 * // Before:
 * <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
 *
 * // After:
 * <SafeInView initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
 */
export function SafeInView({
  initial,
  animate,
  viewport,
  transition,
  whileHover,
  whileTap,
  className,
  children,
}: SafeInViewProps) {
  const ios = useIsIOS();
  return (
    <motion.div
      initial={initial}
      {...(ios
        ? { animate }
        : { whileInView: animate, viewport: viewport ?? { once: true, margin: '0px' } }
      )}
      transition={transition}
      whileHover={whileHover}
      whileTap={whileTap}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===========================================
// COLLAPSE (For Accordions/FAQs)
// ===========================================

interface CollapseProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Safari-safe collapse animation
 *
 * Usage:
 * const [isOpen, setIsOpen] = useState(false);
 * <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
 * <Collapse open={isOpen}>
 *   <p>Collapsible content here</p>
 * </Collapse>
 */
export function Collapse({ open, children, className }: CollapseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isSafari: needsFix } = useSafeMotion();

  const safariStyles: React.CSSProperties = needsFix ? {
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    willChange: 'height, opacity',
  } : {};

  return (
    <motion.div
      initial={false}
      animate={{
        height: open ? 'auto' : 0,
        opacity: open ? 1 : 0,
      }}
      transition={{
        height: { duration: needsFix ? 0.25 : 0.3, ease: [0.25, 0.1, 0.25, 1] },
        opacity: { duration: needsFix ? 0.2 : 0.25 },
      }}
      style={{ overflow: 'hidden', ...safariStyles }}
      className={className}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}

// ===========================================
// EXPORTS
// ===========================================

export default {
  // Components
  FadeIn,
  FadeInUp,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  ScaleIn,
  Stagger,
  Collapse,
  SafeMotionDiv,
  SafeInView,
  // Hook
  useSafeMotion,
  useIsIOS,
  // Variants (for custom use)
  variants,
};
