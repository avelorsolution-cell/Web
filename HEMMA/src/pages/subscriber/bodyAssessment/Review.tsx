import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PhoneFrame from '../../../components/layout/PhoneFrame'
import TopBar from '../../../components/layout/TopBar'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import { StaggerGroup, StaggerItem } from '../../../components/motion/Stagger'
import { useLanguage } from '../../../i18n/LanguageContext'
import { useBodyAssessments } from '../../../context/BodyAssessmentContext'
import { useToast } from '../../../context/ToastContext'
import type { BodyAssessment } from '../../../data/types'
import type { TranslationSchema } from '../../../i18n/translations/en'

interface LocationState {
  onboarding?: boolean
}

const CORE_FIELDS: { key: keyof BodyAssessment; unit: string }[] = [
  { key: 'weightKg', unit: 'kg' },
  { key: 'bmi', unit: '' },
  { key: 'bodyFatPercent', unit: '%' },
  { key: 'skeletalMuscleMassKg', unit: 'kg' },
]

const MORE_FIELDS: { key: keyof BodyAssessment; unit: string }[] = [
  { key: 'heightCm', unit: 'cm' },
  { key: 'bodyFatMassKg', unit: 'kg' },
  { key: 'leanBodyMassKg', unit: 'kg' },
  { key: 'bodyWaterPercent', unit: '%' },
  { key: 'visceralFatRating', unit: '' },
  { key: 'bmrKcal', unit: 'kcal' },
  { key: 'waistCm', unit: 'cm' },
  { key: 'chestCm', unit: 'cm' },
  { key: 'hipsCm', unit: 'cm' },
  { key: 'leftArmCm', unit: 'cm' },
  { key: 'rightArmCm', unit: 'cm' },
]

const fieldLabelKey: Record<string, keyof TranslationSchema['bodyAssessment']['fields']> = {
  weightKg: 'weight',
  bmi: 'bmi',
  bodyFatPercent: 'bodyFatPercent',
  skeletalMuscleMassKg: 'skeletalMuscleMass',
  heightCm: 'height',
  bodyFatMassKg: 'bodyFatMass',
  leanBodyMassKg: 'leanBodyMass',
  bodyWaterPercent: 'bodyWaterPercent',
  visceralFatRating: 'visceralFatRating',
  bmrKcal: 'bmr',
  waistCm: 'waist',
  chestCm: 'chest',
  hipsCm: 'hips',
  leftArmCm: 'leftArm',
  rightArmCm: 'rightArm',
}

export default function BodyAssessmentReview() {
  const navigate = useNavigate()
  const location = useLocation()
  const onboarding = (location.state as LocationState | null)?.onboarding
  const { t } = useLanguage()
  const { draft, addAssessment } = useBodyAssessments()
  const { showToast } = useToast()
  const [values, setValues] = useState<Partial<BodyAssessment>>(draft || {})
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    if (!draft) navigate('/subscriber/body-assessment', { replace: true })
  }, [draft, navigate])

  if (!draft) return null

  const update = (key: keyof BodyAssessment, raw: string) => {
    setValues((prev) => ({ ...prev, [key]: raw === '' ? undefined : Number(raw) }))
  }

  const renderField = (key: keyof BodyAssessment, unit: string) => {
    if (values[key] === undefined) return null
    return (
      <div key={key} className="flex items-center justify-between border-b border-border py-3">
        <span className="text-sm text-muted">{t.bodyAssessment.fields[fieldLabelKey[key]]}</span>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            value={values[key] as number}
            onChange={(e) => update(key, e.target.value)}
            className="w-20 rounded-lg border border-border bg-white px-2 py-1 text-end text-sm font-semibold text-navy focus:border-teal focus:outline-none"
          />
          {unit && <span className="text-xs text-muted">{unit}</span>}
        </div>
      </div>
    )
  }

  const handleSave = () => {
    const saved = addAssessment({
      assessmentDate: values.assessmentDate || draft.assessmentDate || new Date().toISOString().slice(0, 10),
      source: 'uploaded_report',
      reportFileName: draft.reportFileName,
      ...values,
    } as Omit<BodyAssessment, 'id' | 'subscriberId' | 'createdAt'>)
    showToast(t.toast.assessmentSaved)
    navigate('/subscriber/body-assessment/success', { state: { onboarding, assessmentId: saved.id } })
  }

  return (
    <PhoneFrame
      footer={
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => navigate('/subscriber/body-assessment/upload', { state: { onboarding } })}>
            {t.bodyAssessment.review.uploadDifferent}
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            {t.bodyAssessment.review.save}
          </Button>
        </div>
      }
    >
      <TopBar title={t.bodyAssessment.review.title} onBack={() => navigate('/subscriber/body-assessment/upload', { state: { onboarding } })} />
      <div className="px-5 pb-8 pt-3">
        <Badge tone="info" icon="📄" label={t.bodyAssessment.review.tag} />
        <p className="mt-3 text-sm text-muted">{t.bodyAssessment.review.subtitle}</p>

        <div className="mt-4 flex items-center justify-between border-b border-border py-3">
          <span className="text-sm text-muted">{t.bodyAssessment.fields.assessmentDate}</span>
          <input
            type="date"
            value={values.assessmentDate}
            onChange={(e) => setValues((prev) => ({ ...prev, assessmentDate: e.target.value }))}
            className="rounded-lg border border-border bg-white px-2 py-1 text-sm font-semibold text-navy focus:border-teal focus:outline-none"
          />
        </div>

        <StaggerGroup>{CORE_FIELDS.map((f) => <StaggerItem key={f.key}>{renderField(f.key, f.unit)}</StaggerItem>)}</StaggerGroup>

        <button className="mt-4 text-sm font-semibold text-teal-dark" onClick={() => setShowMore((v) => !v)}>
          {showMore ? '−' : '+'} {showMore ? 'Hide' : 'Show'} additional measurements
        </button>

        {showMore && (
          <StaggerGroup className="mt-2">
            {MORE_FIELDS.map((f) => (
              <StaggerItem key={f.key}>{renderField(f.key, f.unit)}</StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </PhoneFrame>
  )
}
