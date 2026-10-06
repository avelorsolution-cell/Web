interface ProgressBarProps {
  value: number
  max?: number
  color?: string
}

export default function ProgressBar({ value, max = 100, color = '#19B8AA' }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-border">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  )
}
