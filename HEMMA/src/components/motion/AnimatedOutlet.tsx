import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'

interface AnimatedOutletProps {
  /** 'fade' is the global default (opacity + 8px rise). 'slide' is for mobile drill-down stacks. 'plain' skips motion entirely (e.g. admin, which should feel stable). */
  variant?: 'fade' | 'slide' | 'plain'
}

/**
 * Drop-in replacement for react-router's <Outlet /> that gives every route
 * a subtle, consistent entry transition without each of the ~50 screens
 * needing its own animation code. Respects prefers-reduced-motion.
 */
export default function AnimatedOutlet({ variant = 'fade' }: AnimatedOutletProps) {
  const location = useLocation()
  const outlet = useOutlet()
  const reduceMotion = useReducedMotion()

  if (variant === 'plain' || reduceMotion) return <>{outlet}</>

  const initial = variant === 'slide' ? { opacity: 0, x: 14 } : { opacity: 0, y: 8 }

  return (
    // Deliberately NOT mode="wait": that gates mounting the new page on the
    // old page's exit animation finishing, which is driven by
    // requestAnimationFrame — if the tab is backgrounded or otherwise has
    // rAF throttled/paused mid-transition, the exit never resolves and the
    // new page never appears, i.e. the app looks stuck on the old route
    // even though the URL already changed. Default (both mount together)
    // means the new page is always visible immediately; the only cost is
    // a brief, cosmetic, self-resolving overlap with the exiting page on
    // tall non-fixed-height containers (admin), which is far preferable to
    // a route transition that can hang.
    <AnimatePresence initial={false}>
      <motion.div
        key={location.pathname}
        initial={initial}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  )
}
