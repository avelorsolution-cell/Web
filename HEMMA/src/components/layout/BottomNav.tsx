import { Home, Compass, Dumbbell, TrendingUp, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'

export type SubscriberTab = 'home' | 'discover' | 'training' | 'progress' | 'profile'

const tabs: { id: SubscriberTab; icon: typeof Home; path: string }[] = [
  { id: 'home', icon: Home, path: '/subscriber/home' },
  { id: 'discover', icon: Compass, path: '/subscriber/trainers' },
  { id: 'training', icon: Dumbbell, path: '/subscriber/training' },
  { id: 'progress', icon: TrendingUp, path: '/subscriber/progress' },
  { id: 'profile', icon: User, path: '/subscriber/profile' },
]

export default function BottomNav({ active }: { active: SubscriberTab }) {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <nav
      className="flex items-stretch justify-around border-t border-border bg-white px-1 pb-[env(safe-area-inset-bottom,0px)]"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 4px)' }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium"
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-teal' : 'text-muted'} />
            <span className={isActive ? 'font-bold text-teal' : 'text-muted'}>{t.nav[tab.id]}</span>
          </button>
        )
      })}
    </nav>
  )
}
