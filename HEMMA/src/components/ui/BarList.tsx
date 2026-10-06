interface BarListProps {
  data: { label: string; value: number }[]
  color?: string
  suffix?: string
}

export default function BarList({ data, color = '#19B8AA', suffix = '' }: BarListProps) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="space-y-2.5">
      {data.map((d) => (
        <div key={d.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="text-navy">{d.label}</span>
            <span className="font-semibold text-navy">
              {d.value}
              {suffix}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full" style={{ width: `${(d.value / max) * 100}%`, backgroundColor: color }} />
          </div>
        </div>
      ))}
    </div>
  )
}
