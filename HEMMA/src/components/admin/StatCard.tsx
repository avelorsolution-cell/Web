interface StatCardProps {
  label: string
  value: string
  sublabel?: string
  onClick?: () => void
}

export default function StatCard({ label, value, sublabel, onClick }: StatCardProps) {
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp
      onClick={onClick}
      className={[
        'w-full rounded-2xl border border-border bg-white p-4 text-start shadow-card',
        onClick ? 'transition-all duration-150 hover:-translate-y-0.5 hover:border-teal/30 hover:shadow-lg active:scale-[0.99]' : '',
      ].join(' ')}
    >
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-navy">{value}</p>
      {sublabel && <p className="mt-0.5 text-xs text-teal-dark">{sublabel}</p>}
    </Comp>
  )
}
