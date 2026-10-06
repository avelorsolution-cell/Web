import { useNavigate } from 'react-router-dom'
import AdminTable from '../../components/admin/AdminTable'
import Badge from '../../components/ui/Badge'
import { verificationQueue } from '../../data/adminData'
import { useLanguage } from '../../i18n/LanguageContext'

const statusTone: Record<string, 'success' | 'warning' | 'error' | 'neutral' | 'info'> = {
  approved: 'success',
  under_review: 'info',
  action_required: 'warning',
  pending: 'neutral',
  rejected: 'error',
}

export default function AdminVerification() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-extrabold text-navy">{t.adminVerificationPage.title}</h1>
        <p className="text-sm text-muted">Review and approve trainer applications before they go live.</p>
      </div>

      <AdminTable
        onRowClick={(row) => navigate(`/admin/verification/${row.id}`)}
        columns={[
          { key: 'trainer', label: t.adminVerificationPage.trainer, render: (r) => <span className="font-semibold">{r.name}</span> },
          { key: 'sport', label: t.adminVerificationPage.sport, render: (r) => r.sport },
          { key: 'experience', label: t.adminVerificationPage.experience, render: (r) => `${r.experience} yrs` },
          { key: 'location', label: t.adminVerificationPage.location, render: (r) => r.location },
          { key: 'submitted', label: t.adminVerificationPage.submitted, render: (r) => r.submitted },
          {
            key: 'status',
            label: t.adminVerificationPage.status,
            render: (r) => <Badge tone={statusTone[r.status]} label={r.status.replace('_', ' ')} />,
          },
          { key: 'reviewer', label: t.adminVerificationPage.reviewer, render: (r) => r.reviewer },
          {
            key: 'action',
            label: t.adminVerificationPage.action,
            render: (r) => (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/admin/verification/${r.id}`)
                }}
                className="text-xs font-semibold text-teal-dark"
              >
                Review →
              </button>
            ),
          },
        ]}
        rows={verificationQueue}
      />
    </div>
  )
}
