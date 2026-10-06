import { useNavigate } from 'react-router-dom'
import StatCard from '../../components/admin/StatCard'
import BarList from '../../components/ui/BarList'
import LineChart from '../../components/ui/LineChart'
import Badge from '../../components/ui/Badge'
import { adminMetrics, revenueTrend, bookingTrend, topSportsAdmin, topLocationsAdmin } from '../../data/adminData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { t, formatCurrency } = useLanguage()
  const m = adminMetrics

  const activity = [
    { text: 'Ahmed Admin approved trainer Sarah Ahmed', time: '10 min ago' },
    { text: 'Refund of QAR 300 processed for Noura Ahmed', time: '1h ago' },
    { text: 'New complaint CMP-1042 opened', time: '3h ago' },
    { text: 'Trainer Sara Ali submitted verification documents', time: '5h ago' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-navy">{t.adminDashboard.title}</h1>
        <p className="text-sm text-muted">Executive summary across the HEMMA platform.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label={t.adminDashboard.totalSubscribers} value={m.totalSubscribers.toLocaleString()} onClick={() => navigate('/admin/users')} />
        <StatCard label={t.adminDashboard.totalTrainers} value={m.totalTrainers.toString()} onClick={() => navigate('/admin/users')} />
        <StatCard label={t.adminDashboard.verifiedTrainers} value={m.verifiedTrainers.toString()} onClick={() => navigate('/admin/verification')} />
        <StatCard label={t.adminDashboard.pendingVerification} value={m.pendingVerification.toString()} onClick={() => navigate('/admin/verification')} />
        <StatCard label={t.adminDashboard.bookingsToday} value={m.bookingsToday.toString()} onClick={() => navigate('/admin/bookings')} />
        <StatCard label={t.adminDashboard.bookingsThisMonth} value={m.bookingsThisMonth.toLocaleString()} onClick={() => navigate('/admin/bookings')} />
        <StatCard label={t.adminDashboard.grossBookingValue} value={formatCurrency(m.grossBookingValue)} onClick={() => navigate('/admin/finance')} />
        <StatCard label={t.adminDashboard.commission} value={formatCurrency(m.commission)} onClick={() => navigate('/admin/finance')} />
        <StatCard label={t.adminDashboard.trainerEarnings} value={formatCurrency(m.trainerEarnings)} onClick={() => navigate('/admin/finance')} />
        <StatCard label={t.adminDashboard.refunds} value={formatCurrency(m.refunds)} onClick={() => navigate('/admin/finance')} />
        <StatCard label={t.adminDashboard.openComplaints} value={m.openComplaints.toString()} onClick={() => navigate('/admin/complaints')} />
        <StatCard label={t.adminDashboard.assessmentAdoption} value={`${m.assessmentAdoptionPercent}%`} onClick={() => navigate('/admin/reports')} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-white p-4">
          <p className="mb-2 text-sm font-bold text-navy">{t.adminDashboard.revenueTrend}</p>
          <LineChart data={revenueTrend} color="#19B8AA" unit=" QAR" />
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <p className="mb-2 text-sm font-bold text-navy">{t.adminDashboard.bookingTrend}</p>
          <LineChart data={bookingTrend} color="#172033" unit="" />
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <p className="mb-3 text-sm font-bold text-navy">{t.adminDashboard.topSports}</p>
          <BarList data={topSportsAdmin} suffix="%" />
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <p className="mb-3 text-sm font-bold text-navy">{t.adminDashboard.topLocations}</p>
          <BarList data={topLocationsAdmin} color="#F0A23A" suffix="%" />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-4">
        <p className="mb-3 text-sm font-bold text-navy">{t.adminDashboard.recentActivity}</p>
        <div className="space-y-2">
          {activity.map((a, i) => (
            <div key={i} className="flex items-center justify-between border-b border-border pb-2 text-sm last:border-0">
              <span className="text-navy">{a.text}</span>
              <Badge tone="neutral" label={a.time} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
