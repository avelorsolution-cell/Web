import { useState } from 'react'
import AdminTable from '../../components/admin/AdminTable'
import Badge from '../../components/ui/Badge'
import { adminBookingsList } from '../../data/adminData'
import { useLanguage } from '../../i18n/LanguageContext'

const statusTone: Record<string, 'success' | 'warning' | 'error' | 'neutral'> = {
  Confirmed: 'success',
  Completed: 'success',
  Pending: 'warning',
  Cancelled: 'error',
}

export default function AdminBookings() {
  const { t, formatCurrency } = useLanguage()
  const [selected, setSelected] = useState<(typeof adminBookingsList)[number] | null>(null)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-extrabold text-navy">{t.adminBookingsPage.title}</h1>

      <AdminTable
        onRowClick={setSelected}
        columns={[
          { key: 'id', label: t.adminBookingsPage.bookingId, render: (r) => <span className="font-mono text-xs">{r.id}</span> },
          { key: 'subscriber', label: t.adminBookingsPage.subscriber, render: (r) => r.subscriber },
          { key: 'trainer', label: t.adminBookingsPage.trainer, render: (r) => r.trainer },
          { key: 'pkg', label: t.adminBookingsPage.packageLabel, render: (r) => r.pkg },
          { key: 'date', label: t.adminBookingsPage.date, render: (r) => r.date },
          { key: 'amount', label: t.adminBookingsPage.amount, render: (r) => formatCurrency(r.amount) },
          { key: 'payment', label: t.adminBookingsPage.payment, render: (r) => r.payment },
          { key: 'status', label: t.adminBookingsPage.status, render: (r) => <Badge tone={statusTone[r.status]} label={r.status} /> },
        ]}
        rows={adminBookingsList}
      />

      {selected && (
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-navy">Booking {selected.id}</h2>
            <button onClick={() => setSelected(null)} className="text-sm text-muted">
              Close
            </button>
          </div>
          <div className="space-y-2 text-sm">
            {[
              ['Timeline', `Booked → Paid → ${selected.status}`],
              ['Subscriber', selected.subscriber],
              ['Trainer', selected.trainer],
              ['Package', selected.pkg],
              ['Payment', selected.payment],
              ['Amount', formatCurrency(selected.amount)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-border pb-2 last:border-0">
                <span className="text-muted">{label}</span>
                <span className="font-semibold text-navy">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
