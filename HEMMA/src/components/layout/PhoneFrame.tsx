import type { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../../i18n/LanguageContext'

interface PhoneFrameProps {
  children: ReactNode
  footer?: ReactNode
  bgClassName?: string
}

/**
 * On a desktop browser (customer demo) this renders a decorative phone
 * mockup centered on a dark backdrop. Below the `sm` breakpoint (640px —
 * comfortably above every real phone width, including the Android app's
 * WebView) it drops the mockup chrome entirely and fills the real viewport
 * edge-to-edge, respecting safe-area insets for notches/home indicators.
 * Without this, the Android APK would render a tiny fixed-size phone
 * bezel floating inside the device's OWN bezel.
 */
export default function PhoneFrame({ children, footer, bgClassName = 'bg-bg' }: PhoneFrameProps) {
  const { dir } = useLanguage()
  const reduceMotion = useReducedMotion()

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-navy/95 py-6 max-sm:min-h-[100dvh] max-sm:bg-white max-sm:py-0">
      <div
        dir={dir}
        className="relative flex h-[844px] w-[390px] max-w-full flex-col overflow-hidden rounded-[2.5rem] border-[10px] border-navy bg-white shadow-2xl max-sm:h-[100dvh] max-sm:w-full max-sm:rounded-none max-sm:border-0 max-sm:shadow-none"
      >
        <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-navy max-sm:hidden" />
        <div
          className={`hemma-scroll relative flex-1 overflow-y-auto ${bgClassName}`}
          style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        >
          {children}
        </div>
        {/* Keyed on presence only (not content) so a footer that appears/disappears — e.g. the
            Trainer Discovery "Compare N Trainers" bar — animates in/out, while a footer whose
            content merely changes (e.g. Booking's per-step CTA) doesn't re-animate on every step. */}
        <AnimatePresence>
          {footer && (
            <motion.div
              key="footer"
              initial={reduceMotion ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative z-10 border-t border-border bg-white p-4"
              style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' }}
            >
              {footer}
            </motion.div>
          )}
        </AnimatePresence>
        <div
          id="hemma-toast-root"
          className="pointer-events-none absolute inset-x-0 z-[300] flex flex-col items-center gap-2 px-4"
          style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))' }}
        />
      </div>
    </div>
  )
}
