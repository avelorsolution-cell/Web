import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import ProgressBar from '../../components/ui/ProgressBar'
import Badge from '../../components/ui/Badge'
import { week3Days } from '../../data/trainingData'
import { useLanguage } from '../../i18n/LanguageContext'

const WEEKS = Array.from({ length: 8 }, (_, i) => i + 1)

export default function TrainingProgram() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const [week, setWeek] = useState(3)

  const habits = [
    { key: 'water' as const, icon: '💧', value: '6/8' },
    { key: 'steps' as const, icon: '🚶', value: '8,200' },
    { key: 'sleep' as const, icon: '😴', value: '7h' },
    { key: 'protein' as const, icon: '🍗', value: '120g' },
  ]

  return (
    <PhoneFrame>
      <TopBar title={t.program.title} backTo="/subscriber/training" />
      <div className="px-5 pb-8 pt-3">
        <p className="text-sm text-muted">{t.program.subtitle}</p>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-muted">
            {t.program.goalLabel}: <span className="font-semibold text-navy">Strength & Body Composition</span>
          </span>
        </div>
        <p className="mt-1 text-xs text-muted">
          {t.program.trainerLabel}: <span className="font-semibold text-navy">Sarah Ahmed</span>
        </p>

        <div className="mt-3 rounded-xl bg-teal-light p-3">
          <div className="flex items-center justify-between text-xs font-semibold text-teal-dark">
            <span>{t.program.progressLabel}</span>
            <span>42%</span>
          </div>
          <div className="mt-2">
            <ProgressBar value={42} />
          </div>
        </div>

        <div className="hemma-scroll mt-4 flex gap-2 overflow-x-auto pb-1">
          {WEEKS.map((w) => (
            <button
              key={w}
              onClick={() => setWeek(w)}
              className={[
                'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold',
                w === week ? 'border-teal bg-teal text-white' : 'border-border bg-white text-navy',
              ].join(' ')}
            >
              {t.program.week} {w}
            </button>
          ))}
        </div>

        {week === 3 ? (
          <div className="mt-4 space-y-3">
            {week3Days.map((day) => (
              <div
                key={day.day}
                className={[
                  'flex items-center justify-between rounded-xl border p-3',
                  day.status === 'rest' ? 'border-dashed border-border bg-black/5' : 'border-border bg-white',
                ].join(' ')}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">
                    {language === 'ar' ? day.dayAr : day.day}
                  </p>
                  <p className="text-sm font-semibold text-navy">{language === 'ar' ? day.workoutAr : day.workout}</p>
                </div>
                {day.status === 'completed' && <Badge tone="success" icon="✓" label={t.program.dayStatus.completed} />}
                {day.status === 'upcoming' && (
                  <button
                    onClick={() => navigate('/subscriber/training/workout')}
                    className="text-xs font-semibold text-teal-dark"
                  >
                    {t.program.dayStatus.upcoming} →
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
            {t.common.comingSoon}
          </div>
        )}

        <section className="mt-6">
          <h2 className="mb-3 text-sm font-bold text-navy">{t.program.habitGoalsTitle}</h2>
          <div className="grid grid-cols-4 gap-2">
            {habits.map((h) => (
              <div key={h.key} className="rounded-xl border border-border bg-white p-2 text-center">
                <p className="text-lg">{h.icon}</p>
                <p className="mt-1 text-[10px] text-muted">{t.program.habits[h.key]}</p>
                <p className="text-xs font-bold text-navy">{h.value}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PhoneFrame>
  )
}
