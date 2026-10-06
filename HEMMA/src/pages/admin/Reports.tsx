import { useState } from 'react'
import FilterChip from '../../components/ui/FilterChip'
import LineChart from '../../components/ui/LineChart'
import BarList from '../../components/ui/BarList'
import Button from '../../components/ui/Button'
import { revenueTrend, bookingTrend, topSportsAdmin, topLocationsAdmin, adminMetrics } from '../../data/adminData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function AdminReports() {
  const { t } = useLanguage()
  const [range, setRange] = useState('6m')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-navy">{t.adminReportsPage.title}</h1>
        <Button variant="outline" className="!text-xs">
          {t.adminReportsPage.exportConcept}
        </Button>
      </div>

      <div className="flex gap-2">
        {['1m', '3m', '6m', '1y'].map((r) => (
          <FilterChip key={r} label={r.toUpperCase()} active={range === r} onClick={() => setRange(r)} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-white p-4">
          <p className="mb-2 text-sm font-bold text-navy">{t.adminReportsPage.revenue}</p>
          <LineChart data={revenueTrend} color="#19B8AA" unit=" QAR" />
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <p className="mb-2 text-sm font-bold text-navy">{t.adminReportsPage.bookings}</p>
          <LineChart data={bookingTrend} color="#172033" />
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <p className="mb-3 text-sm font-bold text-navy">{t.adminReportsPage.topSports}</p>
          <BarList data={topSportsAdmin} suffix="%" />
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <p className="mb-3 text-sm font-bold text-navy">{t.adminReportsPage.topLocations}</p>
          <BarList data={topLocationsAdmin} color="#F0A23A" suffix="%" />
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <p className="mb-1 text-sm font-bold text-navy">{t.adminReportsPage.assessmentAdoption}</p>
          <p className="text-2xl font-extrabold text-navy">{adminMetrics.assessmentAdoptionPercent}%</p>
          <p className="text-xs text-muted">of active subscribers have logged at least one body assessment.</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-4">
          <p className="mb-1 text-sm font-bold text-navy">{t.adminReportsPage.workoutEngagement}</p>
          <p className="text-2xl font-extrabold text-navy">68%</p>
          <p className="text-xs text-muted">of scheduled workouts logged as completed this month.</p>
        </div>
      </div>
    </div>
  )
}
