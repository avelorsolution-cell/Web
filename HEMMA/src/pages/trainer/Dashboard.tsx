import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import LanguageToggle from '../../components/layout/LanguageToggle'
import TrainerBottomNav from '../../components/layout/TrainerBottomNav'
import Badge from '../../components/ui/Badge'
import { todaysSchedule } from '../../data/trainerAppData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function TrainerDashboard() {
  const navigate = useNavigate()
  const { t, language, formatCurrency } = useLanguage()

  const metrics = [
    { label: t.trainerDashboard.activeClients, value: '24', onClick: () => navigate('/trainer/clients') },
    { label: t.trainerDashboard.upcomingSessions, value: '7', onClick: () => navigate('/trainer/calendar') },
    { label: t.trainerDashboard.monthlyRevenue, value: formatCurrency(12400), onClick: () => navigate('/trainer/earnings') },
    { label: t.trainerDashboard.rating, value: '⭐ 4.9', onClick: () => navigate('/trainer/profile') },
    { label: t.trainerDashboard.profileViews, value: '386', onClick: () => navigate('/trainer/profile') },
  ]

  const quickActions = [
    { label: t.trainerDashboard.quickActions.createWorkout, icon: '🏋️', feature: 'Create Workout' },
    { label: t.trainerDashboard.quickActions.createProgram, icon: '📋', path: '/trainer/program-builder' },
    { label: t.trainerDashboard.quickActions.addAvailability, icon: '🗓', feature: 'Add Availability' },
    { label: t.trainerDashboard.quickActions.createPackage, icon: '💳', path: '/trainer/packages' },
    { label: t.trainerDashboard.quickActions.messageClient, icon: '💬', path: '/trainer/messages' },
  ]

  return (
    <PhoneFrame footer={<TrainerBottomNav active="dashboard" />}>
      <div className="px-5 pb-6 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted">{t.trainerDashboard.greeting},</p>
            <h1 className="text-lg font-bold text-navy">Sarah 👋</h1>
          </div>
          <LanguageToggle compact />
        </div>

        <div className="mt-4 rounded-2xl bg-navy p-4 text-white">
          <p className="text-xs text-white/70">{t.trainerDashboard.todaysRevenue}</p>
          <p className="mt-1 text-2xl font-extrabold">{formatCurrency(750)}</p>
          <div className="mt-2 flex gap-4 text-xs text-white/80">
            <span>3 {t.trainerDashboard.sessions}</span>
            <span>2 {t.trainerDashboard.checkIns}</span>
            <span>4 {t.trainerDashboard.messages}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {metrics.map((m) => (
            <button key={m.label} onClick={m.onClick} className="rounded-2xl border border-border bg-white p-3 text-start shadow-card">
              <p className="text-xs text-muted">{m.label}</p>
              <p className="mt-1 text-lg font-extrabold text-navy">{m.value}</p>
            </button>
          ))}
        </div>

        <section className="mt-6">
          <h2 className="mb-3 text-sm font-bold text-navy">{t.trainerDashboard.todaysSchedule}</h2>
          <div className="space-y-2">
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
                <Badge tone="info" label="→" />
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 text-sm font-bold text-navy">{t.trainerDashboard.quickActions.title}</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() =>
                  navigate(a.path || `/subscriber/coming-soon?feature=${encodeURIComponent(a.feature || a.label)}`)
                }
                className="flex items-center gap-2 rounded-xl border border-border bg-white p-3 text-start text-xs font-semibold text-navy"
              >
                <span>{a.icon}</span>
                {a.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </PhoneFrame>
  )
}
