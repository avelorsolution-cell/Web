import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../../components/layout/PhoneFrame'
import TopBar from '../../../components/layout/TopBar'
import Button from '../../../components/ui/Button'
import SourceBadge from '../../../components/cards/SourceBadge'
import { ErrorState } from '../../../components/ui/States'
import { useLanguage } from '../../../i18n/LanguageContext'
import { useBodyAssessments } from '../../../context/BodyAssessmentContext'
import type { BodyAssessment } from '../../../data/types'
import type { TranslationSchema } from '../../../i18n/translations/en'

const ROWS: { key: keyof BodyAssessment; labelKey: keyof TranslationSchema['bodyAssessment']['fields']; unit: string }[] = [
  { key: 'heightCm', labelKey: 'height', unit: 'cm' },
  { key: 'weightKg', labelKey: 'weight', unit: 'kg' },
  { key: 'bmi', labelKey: 'bmi', unit: '' },
  { key: 'bodyFatPercent', labelKey: 'bodyFatPercent', unit: '%' },
  { key: 'bodyFatMassKg', labelKey: 'bodyFatMass', unit: 'kg' },
  { key: 'skeletalMuscleMassKg', labelKey: 'skeletalMuscleMass', unit: 'kg' },
  { key: 'leanBodyMassKg', labelKey: 'leanBodyMass', unit: 'kg' },
  { key: 'bodyWaterPercent', labelKey: 'bodyWaterPercent', unit: '%' },
  { key: 'visceralFatRating', labelKey: 'visceralFatRating', unit: '' },
  { key: 'bmrKcal', labelKey: 'bmr', unit: 'kcal' },
  { key: 'neckCm', labelKey: 'neck', unit: 'cm' },
  { key: 'chestCm', labelKey: 'chest', unit: 'cm' },
  { key: 'waistCm', labelKey: 'waist', unit: 'cm' },
  { key: 'hipsCm', labelKey: 'hips', unit: 'cm' },
  { key: 'leftArmCm', labelKey: 'leftArm', unit: 'cm' },
  { key: 'rightArmCm', labelKey: 'rightArm', unit: 'cm' },
  { key: 'leftThighCm', labelKey: 'leftThigh', unit: 'cm' },
  { key: 'rightThighCm', labelKey: 'rightThigh', unit: 'cm' },
]

export default function BodyAssessmentDetail() {
  const { assessmentId } = useParams()
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { getById } = useBodyAssessments()
  const assessment = getById(assessmentId || '')

  if (!assessment) {
    return (
      <PhoneFrame>
        <TopBar title={t.bodyAssessment.detail.title} backTo="/subscriber/body-assessment/history" />
        <ErrorState title="Not found" action={<Button onClick={() => navigate('/subscriber/body-assessment/history')}>{t.bodyAssessment.history.title}</Button>} />
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame>
      <TopBar title={t.bodyAssessment.detail.title} backTo="/subscriber/body-assessment/history" />
      <div className="px-5 pb-8 pt-3">
        <div className="flex items-center justify-between rounded-2xl border border-border bg-white p-4">
          <div>
            <p className="text-xs text-muted">{t.bodyAssessment.fields.assessmentDate}</p>
            <p className="text-base font-bold text-navy">
              {new Date(assessment.assessmentDate).toLocaleDateString(language === 'ar' ? 'ar-QA' : 'en-QA', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <SourceBadge source={assessment.source} />
        </div>

        {assessment.reportFileName && (
          <p className="mt-2 text-xs text-muted">📄 {assessment.reportFileName}</p>
        )}

        <div className="mt-4 rounded-2xl border border-border bg-white">
          {ROWS.filter((r) => assessment[r.key] !== undefined).map((r) => (
            <div key={r.key} className="flex items-center justify-between border-b border-border px-4 py-3 last:border-0">
              <span className="text-sm text-muted">{t.bodyAssessment.fields[r.labelKey]}</span>
              <span className="text-sm font-bold text-navy">
                {String(assessment[r.key])} {r.unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
