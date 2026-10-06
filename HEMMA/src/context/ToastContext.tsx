import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface ToastItem {
  id: number
  message: string
}

interface ToastContextValue {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

function ToastStack({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="pointer-events-none flex flex-col items-center gap-2">
      <AnimatePresence>
        {toasts.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-xs font-semibold text-white shadow-popover"
          >
            <CheckCircle2 size={15} className="shrink-0 text-teal-light" />
            {item.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/**
 * Toasts never block the screen and stay for ~2.6s. They render into
 * #hemma-toast-root (a slot PhoneFrame provides) when a mobile mockup is on
 * screen, so they sit correctly inside the device frame instead of the dark
 * backdrop — and fall back to a fixed viewport position for Admin/root.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((message: string) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2600)
  }, [])

  const phoneRoot = typeof document !== 'undefined' ? document.getElementById('hemma-toast-root') : null

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {phoneRoot ? (
        createPortal(<ToastStack toasts={toasts} />, phoneRoot)
      ) : (
        <div className="pointer-events-none fixed inset-x-0 bottom-8 z-[300] flex flex-col items-center gap-2 px-4">
          <ToastStack toasts={toasts} />
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
