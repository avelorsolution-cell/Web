import { useState } from 'react'
import AdminTable from '../../components/admin/AdminTable'
import Badge from '../../components/ui/Badge'
import { trainers, currentUser } from '../../data/mockData'
import { useLanguage } from '../../i18n/LanguageContext'

const subscriberRows = [
  { name: currentUser.name, email: 'maha@example.com', status: 'active' },
  { name: 'Khalid Al-Mohannadi', email: 'khalid@example.com', status: 'active' },
  { name: 'Noura Ahmed', email: 'noura@example.com', status: 'suspended' },
]

export default function AdminUsers() {
  const { t } = useLanguage()
  const [tab, setTab] = useState<'subscribers' | 'trainers'>('subscribers')

  const statusTone: Record<string, 'success' | 'error' | 'warning' | 'neutral'> = {
    active: 'success',
    suspended: 'error',
    pending: 'warning',
    blocked: 'neutral',
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-extrabold text-navy">{t.adminUsersPage.title}</h1>

      <div className="flex gap-2">
        <button
          onClick={() => setTab('subscribers')}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold ${tab === 'subscribers' ? 'bg-navy text-white' : 'bg-white text-navy border border-border'}`}
        >
          {t.adminUsersPage.subscribers}
        </button>
        <button
          onClick={() => setTab('trainers')}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold ${tab === 'trainers' ? 'bg-navy text-white' : 'bg-white text-navy border border-border'}`}
        >
          {t.adminUsersPage.trainers}
        </button>
      </div>

      {tab === 'subscribers' ? (
        <AdminTable
          columns={[
            { key: 'name', label: 'Name', render: (r) => <span className="font-semibold">{r.name}</span> },
            { key: 'email', label: 'Email', render: (r) => r.email },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={statusTone[r.status]} label={t.adminUsersPage.status[r.status as keyof typeof t.adminUsersPage.status]} /> },
          ]}
          rows={subscriberRows}
        />
      ) : (
        <AdminTable
          columns={[
            { key: 'name', label: 'Name', render: (r) => <span className="font-semibold">{r.name}</span> },
            { key: 'specialty', label: 'Specialty', render: (r) => r.specialties[0] },
            { key: 'location', label: 'Location', render: (r) => r.location },
            { key: 'rating', label: 'Rating', render: (r) => `⭐ ${r.rating}` },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={r.verified ? 'success' : 'warning'} label={r.verified ? 'Verified' : 'Pending'} /> },
          ]}
          rows={trainers}
        />
      )}
    </div>
  )
}
