import { LayoutDashboard, CalendarDays, Users, MessageCircle, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'

export type TrainerTab = 'dashboard' | 'calendar' | 'clients' | 'messages' | 'profile'

const tabs: { id: TrainerTab; icon: typeof LayoutDashboard; path: string }[] = [
  { id: 'dashboard', icon: LayoutDashboard, path: '/trainer/dashboard' },
  { id: 'calendar', icon: CalendarDays, path: '/trainer/calendar' },
  { id: 'clients', icon: Users, path: '/trainer/clients' },
  { id: 'messages', icon: MessageCircle, path: '/trainer/messages' },
  { id: 'profile', icon: User, path: '/trainer/profile' },
]

export default function TrainerBottomNav({ active }: { active: TrainerTab }) {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <nav className="flex items-stretch justify-around border-t border-border bg-white px-1" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 4px)' }}>
      {tabs.map((tab) => {
        const isActive = tab.id === active
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className="flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium"
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-navy' : 'text-muted'} />
            <span className={isActive ? 'font-bold text-navy' : 'text-muted'}>{t.trainerNav[tab.id]}</span>
          </button>
        )
      })}
    </nav>
  )
}
