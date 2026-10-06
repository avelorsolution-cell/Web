import { useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PhoneFrame from '../../../components/layout/PhoneFrame'
import TopBar from '../../../components/layout/TopBar'
import Button from '../../../components/ui/Button'
import Badge from '../../../components/ui/Badge'
import { useLanguage } from '../../../i18n/LanguageContext'
import { useBodyAssessments } from '../../../context/BodyAssessmentContext'
import { calculateBmi, bmiStatus } from '../../../data/bodyAssessmentData'
import type { BodyAssessment } from '../../../data/types'

interface LocationState {
  onboarding?: boolean
}

type FormState = Partial<Record<keyof BodyAssessment, string>>

function NumberField({
  label,
  value,
  onChange,
  unit,
}: {
  label: string
  value: string | undefined
  onChange: (v: string) => void
  unit: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5">
        <input
          type="number"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm font-semibold text-navy outline-none"
        />
        <span className="text-xs text-muted">{unit}</span>
      </div>
    </label>
  )
}

function Section({
  title,
  optional,
  expanded,
  onToggle,
  children,
}: {
  title: string
  optional?: string
  expanded: boolean
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white">
      <button onClick={onToggle} className="flex w-full items-center justify-between px-4 py-3.5 text-start">
        <span className="text-sm font-bold text-navy">
          {title} {optional && <span className="ms-1 text-xs font-normal text-muted">({optional})</span>}
        </span>
        <span className="text-muted">{expanded ? '−' : '+'}</span>
      </button>
      {expanded && <div className="space-y-3 border-t border-border px-4 py-4">{children}</div>}
    </div>
  )
}

export default function BodyAssessmentManual() {
  const navigate = useNavigate()
  const location = useLocation()
  const onboarding = (location.state as LocationState | null)?.onboarding
  const { t } = useLanguage()
  const { addAssessment } = useBodyAssessments()
  const m = t.bodyAssessment.manual
  const f = t.bodyAssessment.fields

  const [expanded, setExpanded] = useState<Record<string, boolean>>({ basic: true })
  const [form, setForm] = useState<FormState>({ assessmentDate: new Date().toISOString().slice(0, 10) })

  const set = (key: keyof BodyAssessment, value: string) => setForm((prev) => ({ ...prev, [key]: value }))
  const toggle = (key: string) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))

  const bmi = useMemo(() => {
    const h = Number(form.heightCm)
    const w = Number(form.weightKg)
    if (h > 0 && w > 0) return calculateBmi(h, w)
    return null
  }, [form.heightCm, form.weightKg])

  const status = bmi ? bmiStatus(bmi) : null

  const handleSave = () => {
    const parsed: Partial<BodyAssessment> = {}
    Object.entries(form).forEach(([key, val]) => {
      if (val === undefined || val === '') return
      if (key === 'assessmentDate') return
      ;(parsed as Record<string, number>)[key] = Number(val)
    })
    const saved = addAssessment({
      assessmentDate: form.assessmentDate || new Date().toISOString().slice(0, 10),
      source: 'manual',
      bmi: bmi ?? undefined,
      ...parsed,
    } as Omit<BodyAssessment, 'id' | 'subscriberId' | 'createdAt'>)
    navigate('/subscriber/body-assessment/success', { state: { onboarding, assessmentId: saved.id } })
  }

  return (
    <PhoneFrame
      footer={
        <div className="flex gap-2">
          <Button variant="ghost" className="flex-1" onClick={() => navigate(-1)}>
            {m.cancel}
          </Button>
          <Button className="flex-1" disabled={!form.weightKg} onClick={handleSave}>
            {m.saveAssessment}
          </Button>
        </div>
      }
    >
      <TopBar title={m.title} backTo="/subscriber/body-assessment" />
      <div className="px-5 pb-8 pt-3">
        <Section title={m.sections.basic} expanded={expanded.basic} onToggle={() => toggle('basic')}>
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">{f.assessmentDate}</span>
            <input
              type="date"
              value={form.assessmentDate}
              onChange={(e) => set('assessmentDate', e.target.value)}
              className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm font-semibold text-navy outline-none focus:border-teal"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label={f.height} value={form.heightCm} onChange={(v) => set('heightCm', v)} unit="cm" />
            <NumberField label={f.weight} value={form.weightKg} onChange={(v) => set('weightKg', v)} unit="kg" />
          </div>

          {bmi && status && (
            <div className="rounded-xl bg-teal-light p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-teal-dark">{f.bmi}</span>
                <span className="text-lg font-extrabold text-navy">{bmi}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted">
                <span>
                  {t.bodyAssessment.bmiBlock.reference}: {status.range}
                </span>
                <Badge tone={status.key === 'within' ? 'success' : 'neutral'} label={t.bodyAssessment.bmiBlock.status[status.key]} />
              </div>
            </div>
          )}
        </Section>

        <Section title={m.sections.composition} optional={m.optional} expanded={!!expanded.composition} onToggle={() => toggle('composition')}>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label={f.bodyFatPercent} value={form.bodyFatPercent} onChange={(v) => set('bodyFatPercent', v)} unit="%" />
            <NumberField label={f.bodyFatMass} value={form.bodyFatMassKg} onChange={(v) => set('bodyFatMassKg', v)} unit="kg" />
            <NumberField
              label={f.skeletalMuscleMass}
              value={form.skeletalMuscleMassKg}
              onChange={(v) => set('skeletalMuscleMassKg', v)}
              unit="kg"
            />
            <NumberField label={f.leanBodyMass} value={form.leanBodyMassKg} onChange={(v) => set('leanBodyMassKg', v)} unit="kg" />
            <NumberField
              label={f.bodyWaterPercent}
              value={form.bodyWaterPercent}
              onChange={(v) => set('bodyWaterPercent', v)}
              unit="%"
            />
            <NumberField
              label={f.visceralFatRating}
              value={form.visceralFatRating}
              onChange={(v) => set('visceralFatRating', v)}
              unit=""
            />
            <NumberField label={f.bmr} value={form.bmrKcal} onChange={(v) => set('bmrKcal', v)} unit="kcal" />
          </div>
        </Section>

        <Section title={m.sections.upper} optional={m.optional} expanded={!!expanded.upper} onToggle={() => toggle('upper')}>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label={f.neck} value={form.neckCm} onChange={(v) => set('neckCm', v)} unit="cm" />
            <NumberField label={f.chest} value={form.chestCm} onChange={(v) => set('chestCm', v)} unit="cm" />
            <NumberField label={f.leftArm} value={form.leftArmCm} onChange={(v) => set('leftArmCm', v)} unit="cm" />
            <NumberField label={f.rightArm} value={form.rightArmCm} onChange={(v) => set('rightArmCm', v)} unit="cm" />
            <NumberField label={f.leftForearm} value={form.leftForearmCm} onChange={(v) => set('leftForearmCm', v)} unit="cm" />
            <NumberField label={f.rightForearm} value={form.rightForearmCm} onChange={(v) => set('rightForearmCm', v)} unit="cm" />
          </div>
        </Section>

        <Section title={m.sections.lower} optional={m.optional} expanded={!!expanded.lower} onToggle={() => toggle('lower')}>
          <p className="rounded-lg bg-black/5 p-2 text-xs text-muted">📏 {m.guideWaist}</p>
          <div className="grid grid-cols-2 gap-3">
            <NumberField label={f.waist} value={form.waistCm} onChange={(v) => set('waistCm', v)} unit="cm" />
            <NumberField label={f.hips} value={form.hipsCm} onChange={(v) => set('hipsCm', v)} unit="cm" />
            <NumberField label={f.leftThigh} value={form.leftThighCm} onChange={(v) => set('leftThighCm', v)} unit="cm" />
            <NumberField label={f.rightThigh} value={form.rightThighCm} onChange={(v) => set('rightThighCm', v)} unit="cm" />
            <NumberField label={f.leftCalf} value={form.leftCalfCm} onChange={(v) => set('leftCalfCm', v)} unit="cm" />
            <NumberField label={f.rightCalf} value={form.rightCalfCm} onChange={(v) => set('rightCalfCm', v)} unit="cm" />
          </div>
        </Section>

        <p className="mt-4 text-xs text-muted">{t.bodyAssessment.bmiBlock.disclaimer}</p>
      </div>
    </PhoneFrame>
  )
}
