import { useState } from 'react'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Tabs from '../../components/ui/Tabs'
import BottomSheet from '../../components/ui/BottomSheet'
import { useLanguage } from '../../i18n/LanguageContext'

interface CalEvent {
  day: number
  type: keyof ReturnType<typeof eventIcons>
  title: string
}

function eventIcons() {
  return {
    workout: '🏋️',
    session: '🧑‍🏫',
    cardio: '🏃',
    assessment: '📊',
    checkIn: '📝',
    photo: '📷',
    habit: '⏰',
    challenge: '🏆',
  }
}

const events: CalEvent[] = [
  { day: 15, type: 'session', title: 'Session with Sarah' },
  { day: 16, type: 'session', title: 'Session with Sarah' },
  { day: 17, type: 'workout', title: 'Upper Body Strength' },
  { day: 18, type: 'cardio', title: 'Cardio' },
  { day: 19, type: 'assessment', title: 'Body Assessment' },
  { day: 20, type: 'checkIn', title: 'Weekly Check-In' },
  { day: 22, type: 'photo', title: 'Progress Photo Reminder' },
  { day: 25, type: 'challenge', title: '30-Day Movement Challenge' },
]

export default function TrainingCalendar() {
  const { t } = useLanguage()
  const [view, setView] = useState('month')
  const [selected, setSelected] = useState<CalEvent | null>(null)
  const icons = eventIcons()

  const daysInMonth = 30
  const startOffset = 1

  return (
    <PhoneFrame>
      <TopBar title={t.trainingCalendarPage.title} backTo="/subscriber/training" />
      <div className="px-5 pb-8 pt-3">
        <Tabs
          tabs={[
            { id: 'week', label: t.trainingCalendarPage.week },
            { id: 'month', label: t.trainingCalendarPage.month },
          ]}
          active={view}
          onChange={setView}
        />

        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {Array.from({ length: startOffset }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const dayEvents = events.filter((e) => e.day === day)
            return (
              <button
                key={day}
                onClick={() => dayEvents[0] && setSelected(dayEvents[0])}
                className="flex aspect-square flex-col items-center justify-center rounded-lg border border-border bg-white text-xs"
              >
                <span className="text-navy">{day}</span>
                {dayEvents.length > 0 && <span className="text-[10px]">{icons[dayEvents[0].type]}</span>}
              </button>
            )
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(Object.keys(icons) as (keyof typeof icons)[]).map((key) => (
            <span key={key} className="flex items-center gap-1 rounded-full bg-black/5 px-3 py-1.5 text-xs text-navy">
              <span>{icons[key]}</span> {t.trainingCalendarPage.eventTypes[key]}
            </span>
          ))}
        </div>
      </div>

      <BottomSheet open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        {selected && (
          <div className="space-y-2 text-sm text-navy">
            <p className="text-muted">{t.trainingCalendarPage.eventTypes[selected.type]}</p>
            <p>September {selected.day}, 2026</p>
          </div>
        )}
      </BottomSheet>
    </PhoneFrame>
  )
}
