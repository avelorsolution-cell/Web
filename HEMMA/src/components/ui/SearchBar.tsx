interface SearchBarProps {
  placeholder: string
  value?: string
  onChange?: (v: string) => void
  onClick?: () => void
  readOnly?: boolean
}

export default function SearchBar({ placeholder, value, onChange, onClick, readOnly }: SearchBarProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 text-start text-sm text-muted shadow-card"
      type="button"
    >
      <span aria-hidden className="text-lg">
        🔍
      </span>
      {readOnly ? (
        <span className="text-muted">{value || placeholder}</span>
      ) : (
        <input
          className="w-full bg-transparent text-navy outline-none placeholder:text-muted"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
    </button>
  )
}
