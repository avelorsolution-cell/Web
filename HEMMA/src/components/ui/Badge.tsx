type BadgeTone = 'success' | 'warning' | 'error' | 'info' | 'neutral'

interface BadgeProps {
  label: string
  tone?: BadgeTone
  icon?: string
}

const toneStyles: Record<BadgeTone, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  error: 'bg-error/10 text-error',
  info: 'bg-teal-light text-teal-dark',
  neutral: 'bg-black/5 text-muted',
}

export default function Badge({ label, tone = 'neutral', icon }: BadgeProps) {
  return (
    <span className={['inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', toneStyles[tone]].join(' ')}>
      {icon && <span>{icon}</span>}
      {label}
    </span>
  )
}
