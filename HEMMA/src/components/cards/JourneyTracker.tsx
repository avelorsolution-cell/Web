import { Check } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

interface JourneyStep {
  key: 'goal' | 'sport' | 'assessment' | 'trainer' | 'training'
  done: boolean
  onClick: () => void
}

export default function JourneyTracker({ steps }: { steps: JourneyStep[] }) {
  const { t } = useLanguage()
  const completed = steps.filter((s) => s.done).length

  return (
    <section className="rounded-2xl border border-border bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-navy">{t.journey.title}</h2>
        <span className="text-xs font-semibold text-teal-dark">
          {completed} {t.journey.of} {steps.length} {t.journey.completed}
        </span>
      </div>
      <div className="hemma-scroll flex gap-3 overflow-x-auto pb-1">
        {steps.map((step, i) => (
          <button key={step.key} onClick={step.onClick} className="flex w-16 shrink-0 flex-col items-center gap-1.5">
            <div
              className={[
                'flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold',
                step.done ? 'border-teal bg-teal text-white' : 'border-border bg-white text-muted',
              ].join(' ')}
            >
              {step.done ? <Check size={18} /> : i + 1}
            </div>
            <span className="text-center text-[10px] font-medium leading-tight text-navy">{t.journey.steps[step.key]}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
