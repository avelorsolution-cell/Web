import { motion, useReducedMotion } from 'framer-motion'
import { FileText } from 'lucide-react'

/** Professional "scanning" concept for body assessment analysis — a document card with a thin teal line sweeping vertically. No AI/futuristic gimmicks. */
export default function ScanningCard({ label }: { label: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="relative h-32 w-24 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        <FileText className="absolute inset-0 m-auto text-border" size={44} strokeWidth={1.5} />
        {!reduceMotion && (
          <motion.div
            className="absolute inset-x-0 h-0.5 bg-teal"
            style={{ boxShadow: '0 0 8px 2px rgba(25,184,170,0.45)' }}
            animate={{ top: ['6%', '92%', '6%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>
      <p className="text-sm font-medium text-navy">{label}</p>
    </div>
  )
}
