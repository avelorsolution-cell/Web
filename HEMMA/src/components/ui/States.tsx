import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface StateProps {
  title: string
  body?: string
  icon?: string
  action?: ReactNode
}

function StateBlock({ title, body, icon, action }: StateProps) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center"
      initial={reduceMotion ? undefined : 'hidden'}
      animate={reduceMotion ? undefined : 'show'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {icon && (
        <motion.div
          className="text-4xl"
          variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { duration: 0.25 } } }}
        >
          {icon}
        </motion.div>
      )}
      <motion.h3
        className="text-base font-semibold text-navy"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.25 } } }}
      >
        {title}
      </motion.h3>
      {body && (
        <motion.p
          className="max-w-xs text-sm text-muted"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.25 } } }}
        >
          {body}
        </motion.p>
      )}
      {action && (
        <motion.div
          className="mt-2"
          variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  )
}

export function EmptyState(props: StateProps) {
  return <StateBlock icon="🔍" {...props} />
}

export function ErrorState(props: StateProps) {
  return <StateBlock icon="⚠️" {...props} />
}

export function LoadingState({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-light border-t-teal" />
      {label && <p className="text-sm text-muted">{label}</p>}
    </div>
  )
}
