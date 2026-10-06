import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'

/** Tasteful animated success indicator — a scaling circle with a check that pops in a beat later. No confetti. */
export default function SuccessCheck({ size = 80 }: { size?: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto flex items-center justify-center rounded-full bg-success/15"
      style={{ width: size, height: size }}
    >
      <motion.div
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.15, ease: 'backOut' }}
      >
        <Check size={size * 0.5} strokeWidth={3} className="text-success" />
      </motion.div>
    </motion.div>
  )
}
