import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import BottomNav from '../../components/layout/BottomNav'
import LanguageToggle from '../../components/layout/LanguageToggle'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'
import { useBodyAssessments } from '../../context/BodyAssessmentContext'

export default function Profile() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { userName } = useAppState()
  const { latest } = useBodyAssessments()

  const links: { icon: string; label: string; path: string; badge?: string }[] = [
    { icon: '📅', label: t.profilePage.myBookings, path: '/subscriber/coming-soon?feature=My Bookings' },
    { icon: '🏋️', label: t.profilePage.myTraining, path: '/subscriber/training' },
    {
      icon: '📊',
      label: t.profilePage.bodyAssessment,
      path: '/subscriber/body-assessment',
      badge: latest ? `${latest.weightKg} kg` : undefined,
    },
    { icon: '💳', label: t.profilePage.paymentMethods, path: '/subscriber/coming-soon?feature=Payment Methods' },
    { icon: '❤️', label: t.profilePage.favoriteTrainers, path: '/subscriber/coming-soon?feature=Favorite Trainers' },
    { icon: '🔔', label: t.profilePage.notifications, path: '/subscriber/coming-soon?feature=Notifications' },
    { icon: '❓', label: t.profilePage.help, path: '/subscriber/coming-soon?feature=Help & Support' },
    { icon: '📄', label: t.profilePage.terms, path: '/subscriber/coming-soon?feature=Terms' },
    { icon: '🔒', label: t.profilePage.privacy, path: '/subscriber/coming-soon?feature=Privacy' },
  ]

  return (
    <PhoneFrame footer={<BottomNav active="profile" />}>
      <TopBar title={t.profilePage.title} showBack={false} />
      <div className="px-5 pb-8 pt-3">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-card">
          <img src="https://i.pravatar.cc/150?img=47" className="h-14 w-14 rounded-full object-cover" alt="" />
          <div className="flex-1">
            <p className="font-bold text-navy">{userName}</p>
            <p className="text-xs text-muted">Doha, Qatar</p>
          </div>
          <LanguageToggle compact />
        </div>

        <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
          {links.map((l) => (
            <button key={l.label} onClick={() => navigate(l.path)} className="flex w-full items-center gap-3 px-4 py-3.5 text-start">
              <span className="text-lg">{l.icon}</span>
              <span className="flex-1 text-sm font-medium text-navy">{l.label}</span>
              {l.badge && <span className="text-xs font-semibold text-teal-dark">{l.badge}</span>}
              <span className="text-muted">›</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-4 w-full rounded-2xl border border-error/30 bg-error/5 py-3.5 text-sm font-semibold text-error"
        >
          {t.profilePage.logout}
        </button>
      </div>
    </PhoneFrame>
  )
}
