import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  users: 'Users',
  verification: 'Trainer Verification',
  bookings: 'Bookings',
  finance: 'Payments',
  complaints: 'Complaints',
  reports: 'Reports',
  sports: 'Sports',
  challenges: 'Challenges',
  marketplace: 'Marketplace',
  promotions: 'Promotions',
  cms: 'CMS',
  roles: 'Roles',
  'audit-log': 'Audit Log',
  settings: 'Settings',
}

interface AdminBreadcrumbsProps {
  /** Override labels for dynamic segments in order, e.g. a trainer's name for /admin/verification/:trainerId. */
  trail?: string[]
}

/** Dashboard > Trainers > Sarah Ahmed — derived from the current route so no per-page wiring is needed. */
export default function AdminBreadcrumbs({ trail }: AdminBreadcrumbsProps) {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean).filter((s) => s !== 'admin')

  const crumbs: { label: string; to: string }[] = [{ label: 'Dashboard', to: '/admin/dashboard' }]
  let acc = '/admin'
  let dynamicIndex = 0
  segments.forEach((seg, i) => {
    acc += `/${seg}`
    if (seg === 'dashboard' && i === 0) return
    const known = LABELS[seg]
    const label = known ?? trail?.[dynamicIndex++] ?? seg
    crumbs.push({ label, to: acc })
  })

  return (
    <nav className="flex min-w-0 items-center gap-1.5 text-sm text-muted">
      {crumbs.map((c, i) => (
        <span key={c.to} className="flex min-w-0 items-center gap-1.5">
          {i > 0 && <ChevronRight size={14} className="shrink-0 text-border" />}
          {i === crumbs.length - 1 ? (
            <span className="truncate font-semibold text-navy">{c.label}</span>
          ) : (
            <Link to={c.to} className="truncate hover:text-navy">
              {c.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  )
}
