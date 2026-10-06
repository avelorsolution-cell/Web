import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../../components/layout/PhoneFrame'
import TopBar from '../../../components/layout/TopBar'
import Button from '../../../components/ui/Button'
import { EmptyState } from '../../../components/ui/States'
import { useLanguage } from '../../../i18n/LanguageContext'
import { useBodyAssessments } from '../../../context/BodyAssessmentContext'
import type { BodyAssessment } from '../../../data/types'

const METRICS: { key: keyof BodyAssessment; labelKey: 'weight' | 'bodyFat' | 'muscleMass'; unit: string; decimals: number }[] = [
  { key: 'weightKg', labelKey: 'weight', unit: 'kg', decimals: 1 },
  { key: 'bodyFatPercent', labelKey: 'bodyFat', unit: '%', decimals: 1 },
  { key: 'skeletalMuscleMassKg', labelKey: 'muscleMass', unit: 'kg', decimals: 1 },
]

export default function BodyAssessmentCompare() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { earliest, latest, assessments } = useBodyAssessments()

  if (assessments.length < 2 || !earliest || !latest) {
    return (
      <PhoneFrame>
        <TopBar title={t.bodyAssessment.compareScreen.title} backTo="/subscriber/body-assessment/history" />
        <EmptyState
          icon="📊"
          title={t.bodyAssessment.compareScreen.needTwo}
          action={<Button onClick={() => navigate('/subscriber/body-assessment')}>{t.bodyAssessment.doItNow}</Button>}
        />
      </PhoneFrame>
    )
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(language === 'ar' ? 'ar-QA' : 'en-QA', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <PhoneFrame>
      <TopBar title={t.bodyAssessment.compareScreen.title} backTo="/subscriber/body-assessment/history" />
      <div className="px-5 pb-8 pt-3">
        <p className="text-sm text-muted">{t.bodyAssessment.compareScreen.subtitle}</p>

        <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-white p-4">
          <div>
            <p className="text-xs text-muted">{t.bodyAssessment.compareScreen.starting}</p>
            <p className="text-sm font-bold text-navy">{formatDate(earliest.assessmentDate)}</p>
          </div>
          <span className="text-muted">→</span>
          <div className="text-end">
            <p className="text-xs text-muted">{t.bodyAssessment.compareScreen.current}</p>
            <p className="text-sm font-bold text-navy">{formatDate(latest.assessmentDate)}</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {METRICS.map((metric) => {
            const start = earliest[metric.key] as number | undefined
            const current = latest[metric.key] as number | undefined
            if (start === undefined || current === undefined) return null
            const delta = Math.round((current - start) * 10 ** metric.decimals) / 10 ** metric.decimals
            const arrow = delta > 0 ? '↑' : delta < 0 ? '↓' : '→'
            return (
              <div key={metric.key} className="rounded-2xl border border-border bg-white p-4">
                <p className="text-sm font-bold text-navy">{t.bodyAssessment.snapshot[metric.labelKey]}</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs text-muted">{t.bodyAssessment.compareScreen.starting}</p>
                    <p className="font-semibold text-navy">
                      {start} {metric.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">{t.bodyAssessment.compareScreen.current}</p>
                    <p className="font-semibold text-navy">
                      {current} {metric.unit}
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-muted">{t.bodyAssessment.compareScreen.change}</p>
                    <p className="font-bold text-teal-dark">
                      {arrow} {delta > 0 ? '+' : ''}
                      {delta} {metric.unit}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          {(() => {
            const start = earliest.waistCm
            const current = latest.waistCm
            if (start === undefined || current === undefined) return null
            const delta = current - start
            const arrow = delta > 0 ? '↑' : delta < 0 ? '↓' : '→'
            return (
              <div className="rounded-2xl border border-border bg-white p-4">
                <p className="text-sm font-bold text-navy">{t.bodyAssessment.fields.waist}</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs text-muted">{t.bodyAssessment.compareScreen.starting}</p>
                    <p className="font-semibold text-navy">{start} cm</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted">{t.bodyAssessment.compareScreen.current}</p>
                    <p className="font-semibold text-navy">{current} cm</p>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-muted">{t.bodyAssessment.compareScreen.change}</p>
                    <p className="font-bold text-teal-dark">
                      {arrow} {delta > 0 ? '+' : ''}
                      {delta} cm
                    </p>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </div>
    </PhoneFrame>
  )
}
