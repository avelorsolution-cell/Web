import { useLanguage } from '../../i18n/LanguageContext'

interface CalendarProps {
  selected: string | null
  onSelect: (isoDate: string) => void
  unavailableWeekdays?: number[]
  days?: number
}

export default function Calendar({ selected, onSelect, unavailableWeekdays = [], days = 14 }: CalendarProps) {
  const { language } = useLanguage()
  const locale = language === 'ar' ? 'ar-QA' : 'en-QA'
  const today = new Date()

  const dates = Array.from({ length: days }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return d
  })

  return (
    <div className="hemma-scroll flex gap-2 overflow-x-auto pb-2">
      {dates.map((d) => {
        const iso = d.toISOString().slice(0, 10)
        const isUnavailable = unavailableWeekdays.includes(d.getDay())
        const isSelected = selected === iso
        return (
          <button
            key={iso}
            type="button"
            disabled={isUnavailable}
            onClick={() => onSelect(iso)}
            className={[
              'flex w-16 shrink-0 flex-col items-center rounded-xl border py-3 text-sm transition-colors',
              isSelected
                ? 'border-teal bg-teal text-white'
                : isUnavailable
                  ? 'cursor-not-allowed border-border bg-black/5 text-muted/50'
                  : 'border-border bg-white text-navy hover:border-teal/60',
            ].join(' ')}
          >
            <span className="text-xs opacity-80">{d.toLocaleDateString(locale, { weekday: 'short' })}</span>
            <span className="text-lg font-bold">{d.toLocaleDateString(locale, { day: 'numeric' })}</span>
            <span className="text-[10px] opacity-70">{d.toLocaleDateString(locale, { month: 'short' })}</span>
          </button>
        )
      })}
    </div>
  )
}
