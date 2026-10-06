import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import BottomNav from '../../components/layout/BottomNav'
import Button from '../../components/ui/Button'
import FilterChip from '../../components/ui/FilterChip'
import LineChart from '../../components/ui/LineChart'
import Badge from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/States'
import { StaggerGroup, StaggerItem } from '../../components/motion/Stagger'
import { useLanguage } from '../../i18n/LanguageContext'
import { useBi } from '../../i18n/useBi'
import { useBodyAssessments } from '../../context/BodyAssessmentContext'

type Filter = '1m' | '3m' | '6m' | '1y' | 'all'
const FILTER_DAYS: Record<Filter, number | null> = { '1m': 30, '3m': 90, '6m': 180, '1y': 365, all: null }

export default function Progress() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const bi = useBi()
  const { assessments, latest, earliest } = useBodyAssessments()
  const [filter, setFilter] = useState<Filter>('all')
  const [photos, setPhotos] = useState<Record<'front' | 'side' | 'back', string | null>>({
    front: null,
    side: null,
    back: null,
  })
  const fileInputs = { front: useRef<HTMLInputElement>(null), side: useRef<HTMLInputElement>(null), back: useRef<HTMLInputElement>(null) }

  const chronological = useMemo(() => [...assessments].reverse(), [assessments])

  const filtered = useMemo(() => {
    const days = FILTER_DAYS[filter]
    if (!days) return chronological
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
    return chronological.filter((a) => new Date(a.assessmentDate).getTime() >= cutoff)
  }, [chronological, filter])

  const formatShort = (d: string) =>
    new Date(d).toLocaleDateString(language === 'ar' ? 'ar-QA' : 'en-QA', { day: 'numeric', month: 'short' })

  const buildSeries = (key: 'weightKg' | 'bodyFatPercent' | 'skeletalMuscleMassKg' | 'waistCm') =>
    filtered.filter((a) => a[key] !== undefined).map((a) => ({ label: formatShort(a.assessmentDate), value: a[key] as number }))

  const handlePhoto = (slot: 'front' | 'side' | 'back', file?: File) => {
    if (!file) return
    setPhotos((prev) => ({ ...prev, [slot]: URL.createObjectURL(file) }))
  }

  return (
    <PhoneFrame footer={<BottomNav active="progress" />}>
      <TopBar title={t.progressPage.title} showBack={false} />
      <div className="px-5 pb-10 pt-3">
        {earliest && latest && earliest.id !== latest.id && (
          <div className="mb-5 rounded-2xl border-2 border-teal bg-teal-light p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-teal-dark">{bi('Your Transformation', 'تحوّلك')}</h2>
              <span className="text-xs font-semibold text-navy">
                {formatShort(earliest.assessmentDate)} → {formatShort(latest.assessmentDate)}
              </span>
            </div>
            <StaggerGroup className="mt-3 grid grid-cols-2 gap-3">
              {(
                [
                  { key: 'weightKg' as const, label: t.bodyAssessment.snapshot.weight, unit: 'kg' },
                  { key: 'bodyFatPercent' as const, label: t.bodyAssessment.snapshot.bodyFat, unit: '%' },
                  { key: 'skeletalMuscleMassKg' as const, label: t.bodyAssessment.snapshot.muscleMass, unit: 'kg' },
                  { key: 'waistCm' as const, label: t.bodyAssessment.fields.waist, unit: 'cm' },
                ] as const
              ).map((m) => {
                const start = earliest[m.key]
                const current = latest[m.key]
                if (start === undefined || current === undefined) return null
                const delta = Math.round((current - start) * 10) / 10
                const arrow = delta > 0 ? '↑' : delta < 0 ? '↓' : '→'
                return (
                  <StaggerItem key={m.key} className="rounded-xl bg-white p-3">
                    <p className="text-[11px] text-muted">{m.label}</p>
                    <p className="mt-0.5 text-sm font-bold text-navy">
                      {start} → {current} {m.unit}
                    </p>
                    <p className="text-xs font-semibold text-teal-dark">
                      {arrow} {delta > 0 ? '+' : ''}
                      {delta} {m.unit}
                    </p>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-border bg-white p-3 text-center">
            <p className="text-xs text-muted">{t.progressPage.currentWeight}</p>
            <p className="mt-1 text-lg font-extrabold text-navy">{latest?.weightKg ?? '—'} kg</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-3 text-center">
            <p className="text-xs text-muted">{t.progressPage.sessionsCompleted}</p>
            <p className="mt-1 text-lg font-extrabold text-navy">3/8</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-3 text-center">
            <p className="text-xs text-muted">{t.progressPage.workoutCompliance}</p>
            <p className="mt-1 text-lg font-extrabold text-navy">82%</p>
          </div>
        </div>

        {assessments.length === 0 ? (
          <div className="mt-5">
            <EmptyState
              icon="📈"
              title={t.progressPage.noAssessmentsYet}
              action={<Button onClick={() => navigate('/subscriber/body-assessment')}>{t.progressPage.addAssessment}</Button>}
            />
          </div>
        ) : (
          <>
            <div className="mt-5 hemma-scroll flex gap-2 overflow-x-auto pb-1">
              {(Object.keys(FILTER_DAYS) as Filter[]).map((key) => (
                <FilterChip key={key} label={t.progressPage.filters[key]} active={filter === key} onClick={() => setFilter(key)} />
              ))}
            </div>

            {[
              { key: 'weightKg' as const, title: t.progressPage.weightProgress, unit: ' kg', color: '#19B8AA' },
              { key: 'bodyFatPercent' as const, title: t.progressPage.bodyFatProgress, unit: '%', color: '#F0A23A' },
              { key: 'skeletalMuscleMassKg' as const, title: t.progressPage.muscleMassProgress, unit: ' kg', color: '#22A47D' },
              { key: 'waistCm' as const, title: t.progressPage.waistProgress, unit: ' cm', color: '#172033' },
            ].map((chart) => {
              const series = buildSeries(chart.key)
              if (series.length === 0) return null
              return (
                <div key={chart.key} className="mt-4 rounded-2xl border border-border bg-white p-4">
                  <p className="mb-2 text-sm font-bold text-navy">{chart.title}</p>
                  <LineChart data={series} color={chart.color} unit={chart.unit} />
                </div>
              )
            })}
          </>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-bold text-navy">{t.progressPage.photosTitle}</p>
          <Badge tone="neutral" icon="🔒" label={t.progressPage.private} />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {(['front', 'side', 'back'] as const).map((slot) => (
            <button
              key={slot}
              onClick={() => fileInputs[slot].current?.click()}
              className="flex aspect-[3/4] flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-white text-xs text-muted"
              style={photos[slot] ? { backgroundImage: `url(${photos[slot]})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            >
              {!photos[slot] && (
                <>
                  <span className="text-lg">📷</span>
                  <span>{t.progressPage[slot === 'front' ? 'photosFront' : slot === 'side' ? 'photosSide' : 'photosBack']}</span>
                  <span className="font-semibold text-teal-dark">{t.progressPage.addPhoto}</span>
                </>
              )}
              <input
                ref={fileInputs[slot]}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhoto(slot, e.target.files?.[0])}
              />
            </button>
          ))}
        </div>
        {Object.values(photos).some(Boolean) && (
          <p className="mt-2 text-center text-xs text-muted">
            {new Date().toLocaleDateString(language === 'ar' ? 'ar-QA' : 'en-QA', { day: 'numeric', month: 'short', year: 'numeric' })} ·{' '}
            {t.progressPage.beforeCurrent}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-white p-4">
          <div>
            <p className="text-sm font-bold text-navy">{t.trainerClient.latestCheckIn}</p>
            <p className="text-xs text-muted">{bi('Energy 7/10 · Motivation 8/10', 'الطاقة 7/10 · الحافز 8/10')}</p>
          </div>
          <Button variant="outline" className="!text-xs" onClick={() => navigate('/subscriber/check-in')}>
            {bi('View', 'عرض')}
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" className="!text-xs" onClick={() => navigate('/subscriber/body-assessment')}>
            {t.progressPage.addAssessment}
          </Button>
          <Button variant="outline" className="!text-xs" onClick={() => navigate('/subscriber/body-assessment/compare')}>
            {bi('Compare Assessments', 'مقارنة التقييمات')}
          </Button>
          <Button
            variant="outline"
            className="col-span-2 !text-xs"
            onClick={() => navigate('/subscriber/coming-soon?feature=' + encodeURIComponent(bi('Share with Trainer', 'مشاركة مع المدرب')))}
          >
            {bi('Share with Trainer', 'مشاركة مع المدرب')}
          </Button>
        </div>
      </div>
    </PhoneFrame>
  )
}
