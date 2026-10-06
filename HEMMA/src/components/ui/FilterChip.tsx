interface FilterChipProps {
  label: string
  active?: boolean
  onClick?: () => void
  icon?: string
}

export default function FilterChip({ label, active, onClick, icon }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        active
          ? 'border-teal bg-teal-light text-teal-dark'
          : 'border-border bg-white text-navy hover:border-teal/50',
      ].join(' ')}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  )
}
