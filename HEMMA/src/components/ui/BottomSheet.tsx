import type { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
}

export default function BottomSheet({ open, onClose, title, children, footer }: BottomSheetProps) {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex items-end justify-center bg-navy/40"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            className="max-h-[85%] w-full overflow-hidden rounded-t-2xl bg-white shadow-popover"
            initial={reduceMotion ? false : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-border" />
            {title && (
              <div className="flex items-center justify-between px-5 pt-3">
                <h3 className="text-lg font-bold text-navy">{title}</h3>
                <button onClick={onClose} className="text-muted hover:text-navy" aria-label="Close">
                  ✕
                </button>
              </div>
            )}
            <div className="hemma-scroll max-h-[60vh] overflow-y-auto px-5 py-4">{children}</div>
            {footer && <div className="border-t border-border p-4">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
