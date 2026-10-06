import { useLanguage } from '../../i18n/LanguageContext'

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
}

export default function Toggle({ checked, onChange, label }: ToggleProps) {
  const { dir } = useLanguage()
  const offset = checked ? (dir === 'rtl' ? -20 : 20) : dir === 'rtl' ? -2 : 2

  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      {label && <span className="text-sm text-navy">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          'relative h-7 w-12 shrink-0 rounded-full transition-colors',
          checked ? 'bg-teal' : 'bg-border',
        ].join(' ')}
      >
        <span
          className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform"
          style={{ transform: `translateX(${offset}px)` }}
        />
      </button>
    </label>
  )
}
