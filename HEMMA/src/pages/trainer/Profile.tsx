import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import TrainerBottomNav from '../../components/layout/TrainerBottomNav'
import LanguageToggle from '../../components/layout/LanguageToggle'
import Badge from '../../components/ui/Badge'
import { trainers } from '../../data/mockData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function TrainerProfile() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const trainer = trainers[0]

  const links = [
    { icon: '💳', label: t.trainerPackagesPage.title, path: '/trainer/packages' },
    { icon: '💰', label: t.trainerEarningsPage.title, path: '/trainer/earnings' },
    { icon: '🗓', label: 'Availability', path: '/trainer/calendar' },
    { icon: '✅', label: t.trainerVerificationPage.title, path: '/trainer/verification' },
    { icon: '❓', label: t.profilePage.help, path: '/subscriber/coming-soon?feature=Help & Support' },
  ]

  return (
    <PhoneFrame footer={<TrainerBottomNav active="profile" />}>
      <TopBar title={t.profilePage.title} showBack={false} />
      <div className="px-5 pb-8 pt-3">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-card">
          <img src={trainer.photo} className="h-14 w-14 rounded-full object-cover" alt="" />
          <div className="flex-1">
            <p className="font-bold text-navy">{language === 'ar' ? trainer.nameAr : trainer.name}</p>
            <p className="text-xs text-muted">
              ⭐ {trainer.rating} · {trainer.reviewCount} {t.discovery.reviews}
            </p>
          </div>
          <LanguageToggle compact />
        </div>
        <div className="mt-2">
          <Badge tone="success" icon="✓" label={t.trainerVerificationPage.statuses.approved} />
        </div>

        <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
          {links.map((l) => (
            <button key={l.label} onClick={() => navigate(l.path)} className="flex w-full items-center gap-3 px-4 py-3.5 text-start">
              <span className="text-lg">{l.icon}</span>
              <span className="flex-1 text-sm font-medium text-navy">{l.label}</span>
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
