import Badge from '../../components/ui/Badge'
import { sports } from '../../data/mockData'
import { useLanguage } from '../../i18n/LanguageContext'

type Section = 'sports' | 'challenges' | 'marketplace' | 'promotions' | 'cms' | 'roles' | 'auditLog' | 'settings'

export default function AdminSimple({ section }: { section: Section }) {
  const { t } = useLanguage()

  if (section === 'sports') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-extrabold text-navy">{t.adminNav.sports}</h1>
        <div className="grid grid-cols-4 gap-3">
          {sports.map((s) => (
            <div key={s.id} className="rounded-xl border border-border bg-white p-3 text-center">
              <p className="text-2xl">{s.icon}</p>
              <p className="mt-1 text-sm font-semibold text-navy">{t.sports[s.labelKey]}</p>
              <Badge tone="success" label="Active" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (section === 'challenges') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-extrabold text-navy">{t.adminNav.challenges}</h1>
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="font-bold text-navy">30-Day Movement Challenge</p>
            <Badge tone="info" label="Phase 2" />
          </div>
          <p className="mt-1 text-sm text-muted">Leaderboard enabled · 842 participants</p>
        </div>
      </div>
    )
  }

  if (section === 'marketplace') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-extrabold text-navy">{t.adminNav.marketplace}</h1>
        <div className="rounded-2xl border border-dashed border-border bg-white p-6 text-center text-sm text-muted">
          Marketplace, Trainer Store, Healthy Food and Gifting are planned for a future phase.
          <div className="mt-2">
            <Badge tone="warning" label={t.futureRoadmap.badge} />
          </div>
        </div>
      </div>
    )
  }

  if (section === 'promotions') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-extrabold text-navy">{t.adminNav.promotions}</h1>
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="font-mono font-bold text-navy">HEMMA20</p>
            <Badge tone="success" label="Active" />
          </div>
          <p className="mt-1 text-sm text-muted">20% off, valid for new subscribers, expires 31 Dec 2026.</p>
        </div>
      </div>
    )
  }

  if (section === 'cms') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-extrabold text-navy">{t.adminNav.cms}</h1>
        <div className="space-y-2">
          {['Onboarding Content', 'Home Banners', 'FAQs', 'Terms', 'Privacy', 'Cancellation Policy'].map((c) => (
            <div key={c} className="flex items-center justify-between rounded-xl border border-border bg-white p-3 text-sm">
              <span className="text-navy">{c}</span>
              <Badge tone="success" label="Published" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (section === 'roles') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-extrabold text-navy">{t.adminNav.roles}</h1>
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-black/5 text-xs uppercase text-muted">
              <tr>
                <th className="p-3 text-start">Role</th>
                <th className="p-3 text-start">View Users</th>
                <th className="p-3 text-start">Approve Trainers</th>
                <th className="p-3 text-start">Issue Refund</th>
                <th className="p-3 text-start">Manage Admins</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Super Admin', true, true, true, true],
                ['Operations', true, true, false, false],
                ['Finance', true, false, true, false],
                ['Support', true, false, false, false],
              ].map((row) => (
                <tr key={row[0] as string} className="border-t border-border">
                  <td className="p-3 font-semibold text-navy">{row[0] as string}</td>
                  {(row.slice(1) as boolean[]).map((v, i) => (
                    <td key={i} className="p-3">
                      {v ? '✓' : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (section === 'auditLog') {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-extrabold text-navy">{t.adminNav.auditLog}</h1>
        <div className="space-y-2">
          {[
            'Ahmed Admin approved Trainer TRN-1042 (Under Review → Approved)',
            'Finance Admin approved Refund QAR 300 for booking HM-482602',
            'Ahmed Admin suspended subscriber Noura Ahmed',
          ].map((entry, i) => (
            <div key={i} className="rounded-xl border border-border bg-white p-3 text-sm text-navy">
              {entry}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-extrabold text-navy">{t.adminNav.settings}</h1>
      <div className="grid grid-cols-2 gap-4">
        {[
          ['Platform Name', 'HEMMA'],
          ['Currency', 'QAR'],
          ['Languages', 'Arabic, English'],
          ['Commission', '20%'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-border bg-white p-3">
            <p className="text-xs text-muted">{label}</p>
            <p className="font-semibold text-navy">{value}</p>
          </div>
        ))}
      </div>
      <Badge tone="warning" label="Subject to final business approval" />
    </div>
  )
}
