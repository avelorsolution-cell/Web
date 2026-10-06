import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import TrainerBottomNav from '../../components/layout/TrainerBottomNav'
import Tabs from '../../components/ui/Tabs'
import Badge from '../../components/ui/Badge'
import { todaysSchedule } from '../../data/trainerAppData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function TrainerCalendar() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const [view, setView] = useState('day')

  return (
    <PhoneFrame footer={<TrainerBottomNav active="calendar" />}>
      <TopBar title={t.trainerNav.calendar} showBack={false} />
      <div className="px-5 pb-8 pt-3">
        <Tabs
          tabs={[
            { id: 'day', label: 'Day' },
            { id: 'week', label: t.trainingCalendarPage.week },
            { id: 'month', label: t.trainingCalendarPage.month },
          ]}
          active={view}
          onChange={setView}
        />

        <div className="mt-4 space-y-2">
          {todaysSchedule.map((s) => (
            <button
              key={s.time}
              onClick={() => navigate('/trainer/clients/sub-maha')}
              className="flex w-full items-center gap-3 rounded-xl border border-border bg-white p-3 text-start"
            >
              <span className="w-14 text-sm font-bold text-navy">{s.time}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy">{language === 'ar' ? s.clientNameAr : s.clientName}</p>
                <p className="text-xs text-muted">{language === 'ar' ? s.typeAr : s.type}</p>
              </div>
              <Badge tone="success" label="Confirmed" />
            </button>
          ))}
          <button
            onClick={() => navigate('/subscriber/coming-soon?feature=Block Time')}
            className="w-full rounded-xl border border-dashed border-border p-3 text-center text-xs font-semibold text-teal-dark"
          >
            + Block Time / Open Availability
          </button>
        </div>
      </div>
    </PhoneFrame>
  )
}
