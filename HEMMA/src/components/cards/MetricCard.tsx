import type { ReactNode } from 'react'

interface MetricCardProps {
  label: string
  value: string
  sublabel?: string
  icon?: string
  tone?: 'default' | 'highlight'
  action?: ReactNode
}

export default function MetricCard({ label, value, sublabel, icon, tone = 'default', action }: MetricCardProps) {
  return (
    <div
      className={[
        'flex w-36 shrink-0 flex-col gap-1 rounded-2xl border p-4 shadow-card',
        tone === 'highlight' ? 'border-teal bg-teal-light' : 'border-border bg-white',
      ].join(' ')}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted">{label}</span>
        {icon && <span className="text-base">{icon}</span>}
      </div>
      <span className="text-xl font-extrabold text-navy">{value}</span>
      {sublabel && <span className="text-[11px] text-muted">{sublabel}</span>}
      {action}
    </div>
  )
}
