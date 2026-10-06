import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  CalendarCheck,
  CreditCard,
  MessageSquareWarning,
  Dumbbell,
  Trophy,
  ShoppingBag,
  Megaphone,
  FileText,
  BarChart3,
  UserCog,
  ScrollText,
  Settings,
  Gavel,
  LayoutGrid,
} from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

const items = [
  { to: '/admin/dashboard', icon: LayoutDashboard, labelKey: 'overview' as const },
  { to: '/admin/users', icon: Users, labelKey: 'users' as const },
  { to: '/admin/verification', icon: ShieldCheck, labelKey: 'trainerVerification' as const },
  { to: '/admin/bookings', icon: CalendarCheck, labelKey: 'bookings' as const },
  { to: '/admin/finance', icon: CreditCard, labelKey: 'payments' as const },
  { to: '/admin/complaints', icon: MessageSquareWarning, labelKey: 'complaints' as const },
  { to: '/admin/sports', icon: Dumbbell, labelKey: 'sports' as const },
  { to: '/admin/challenges', icon: Trophy, labelKey: 'challenges' as const },
  { to: '/admin/marketplace', icon: ShoppingBag, labelKey: 'marketplace' as const },
  { to: '/admin/promotions', icon: Megaphone, labelKey: 'promotions' as const },
  { to: '/admin/cms', icon: FileText, labelKey: 'cms' as const },
  { to: '/admin/reports', icon: BarChart3, labelKey: 'reports' as const },
  { to: '/admin/roles', icon: UserCog, labelKey: 'roles' as const },
  { to: '/admin/audit-log', icon: ScrollText, labelKey: 'auditLog' as const },
  { to: '/admin/settings', icon: Settings, labelKey: 'settings' as const },
  { to: '/business-decisions', icon: Gavel, labelKey: 'businessDecisions' as const },
]

export default function AdminSidebar() {
  const { t } = useLanguage()
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-e border-border bg-navy text-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal text-lg font-black text-navy">H</div>
        <div>
          <p className="text-sm font-extrabold leading-none">HEMMA</p>
          <p className="text-[10px] text-white/50">Admin Portal</p>
        </div>
      </div>
      <nav className="hemma-scroll flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive ? 'bg-teal text-navy font-bold' : 'text-white/70 hover:bg-white/10 hover:text-white',
              ].join(' ')
            }
          >
            <item.icon size={16} />
            {t.adminNav[item.labelKey]}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 px-3 py-3">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LayoutGrid size={16} />
          {t.common.prototypeHome}
        </NavLink>
      </div>
    </aside>
  )
}
