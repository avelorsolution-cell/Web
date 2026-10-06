import { useState } from 'react'
import AdminTable from '../../components/admin/AdminTable'
import StatCard from '../../components/admin/StatCard'
import Badge from '../../components/ui/Badge'
import { adminMetrics } from '../../data/adminData'
import { useLanguage } from '../../i18n/LanguageContext'

const payments = [
  { txId: 'PAY-9001', bookingId: 'HM-482913', customer: 'Maha Al-Kuwari', gross: 1104, commission: 221, trainerShare: 883, method: 'Card', status: 'Paid' },
  { txId: 'PAY-9002', bookingId: 'HM-482811', customer: 'Noura Ahmed', gross: 2160, commission: 432, trainerShare: 1728, method: 'Apple Pay', status: 'Paid' },
  { txId: 'PAY-9003', bookingId: 'HM-482755', customer: 'Khalid Al-Mohannadi', gross: 520, commission: 104, trainerShare: 416, method: 'Card', status: 'Pending' },
]

const refunds = [
  { id: 'RF-501', bookingId: 'HM-482602', customer: 'Maha Al-Kuwari', amount: 980, reason: 'Trainer cancelled', status: 'Approved' },
]

const payouts = [
  { id: 'PO-201', trainer: 'Sarah Ahmed', bookingId: 'HM-482913', net: 883, status: 'Available' },
  { id: 'PO-202', trainer: 'Ahmed Khaled', bookingId: 'HM-482811', net: 1728, status: 'Paid' },
]

export default function AdminFinance() {
  const { t, formatCurrency } = useLanguage()
  const [tab, setTab] = useState<'payments' | 'refunds' | 'payouts'>('payments')

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-extrabold text-navy">{t.adminFinancePage.title}</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label={t.adminDashboard.grossBookingValue} value={formatCurrency(adminMetrics.grossBookingValue)} />
        <StatCard label={t.adminDashboard.commission} value={formatCurrency(adminMetrics.commission)} />
        <StatCard label={t.adminDashboard.trainerEarnings} value={formatCurrency(adminMetrics.trainerEarnings)} />
        <StatCard label={t.adminDashboard.refunds} value={formatCurrency(adminMetrics.refunds)} />
      </div>

      <div className="flex gap-2">
        {(['payments', 'refunds', 'payouts'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${tab === key ? 'bg-navy text-white' : 'border border-border bg-white text-navy'}`}
          >
            {t.adminFinancePage.tabs[key]}
          </button>
        ))}
      </div>

      {tab === 'payments' && (
        <AdminTable
          columns={[
            { key: 'txId', label: 'Transaction', render: (r) => <span className="font-mono text-xs">{r.txId}</span> },
            { key: 'bookingId', label: 'Booking', render: (r) => <span className="font-mono text-xs">{r.bookingId}</span> },
            { key: 'customer', label: 'Customer', render: (r) => r.customer },
            { key: 'gross', label: 'Gross', render: (r) => formatCurrency(r.gross) },
            { key: 'commission', label: 'Commission', render: (r) => formatCurrency(r.commission) },
            { key: 'trainerShare', label: 'Trainer Share', render: (r) => formatCurrency(r.trainerShare) },
            { key: 'method', label: 'Method', render: (r) => r.method },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Paid' ? 'success' : 'warning'} label={r.status} /> },
          ]}
          rows={payments}
        />
      )}

      {tab === 'refunds' && (
        <AdminTable
          columns={[
            { key: 'id', label: 'Refund ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
            { key: 'bookingId', label: 'Booking', render: (r) => <span className="font-mono text-xs">{r.bookingId}</span> },
            { key: 'customer', label: 'Customer', render: (r) => r.customer },
            { key: 'amount', label: 'Amount', render: (r) => formatCurrency(r.amount) },
            { key: 'reason', label: 'Reason', render: (r) => r.reason },
            { key: 'status', label: 'Status', render: (r) => <Badge tone="success" label={r.status} /> },
          ]}
          rows={refunds}
        />
      )}

      {tab === 'payouts' && (
        <AdminTable
          columns={[
            { key: 'id', label: 'Payout ID', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
            { key: 'trainer', label: 'Trainer', render: (r) => r.trainer },
            { key: 'bookingId', label: 'Booking', render: (r) => <span className="font-mono text-xs">{r.bookingId}</span> },
            { key: 'net', label: 'Net Payable', render: (r) => formatCurrency(r.net) },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Paid' ? 'success' : 'info'} label={r.status} /> },
          ]}
          rows={payouts}
        />
      )}
    </div>
  )
}
