import { useLocation, useNavigate } from 'react-router-dom'
import PhoneFrame from '../../../components/layout/PhoneFrame'
import TopBar from '../../../components/layout/TopBar'
import Button from '../../../components/ui/Button'
import { useLanguage } from '../../../i18n/LanguageContext'
import { useBodyAssessments } from '../../../context/BodyAssessmentContext'

interface LocationState {
  onboarding?: boolean
  assessmentId?: string
}

export default function BodyAssessmentSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null
  const { t } = useLanguage()
  const { getById, latest, assessments } = useBodyAssessments()

  const assessment = (state?.assessmentId && getById(state.assessmentId)) || latest

  return (
    <PhoneFrame
      footer={
        <div className="space-y-2">
          <Button fullWidth onClick={() => navigate('/subscriber/progress')}>
            {t.bodyAssessment.success.viewProgress}
          </Button>
          <div className="flex gap-2">
            {assessments.length > 1 && (
              <Button variant="outline" className="flex-1" onClick={() => navigate('/subscriber/body-assessment/compare')}>
                {t.bodyAssessment.success.compare}
              </Button>
            )}
            <Button variant="ghost" className="flex-1" onClick={() => navigate('/subscriber/home')}>
              {t.bodyAssessment.success.backHome}
            </Button>
          </div>
        </div>
      }
    >
      <TopBar showBack={false} title="" />
      <div className="flex flex-col items-center px-8 pb-8 pt-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-4xl">✅</div>
        <h1 className="mt-4 text-2xl font-extrabold text-navy">{t.bodyAssessment.success.title}</h1>
        <p className="mt-2 text-sm text-muted">{t.bodyAssessment.success.body}</p>

        {assessment && (
          <div className="mt-6 grid w-full grid-cols-2 gap-3">
            {assessment.weightKg !== undefined && (
              <div className="rounded-2xl border border-border bg-white p-4">
                <p className="text-xs text-muted">{t.bodyAssessment.fields.weight}</p>
                <p className="mt-1 text-lg font-extrabold text-navy">{assessment.weightKg} kg</p>
              </div>
            )}
            {assessment.bmi !== undefined && (
              <div className="rounded-2xl border border-border bg-white p-4">
                <p className="text-xs text-muted">{t.bodyAssessment.fields.bmi}</p>
                <p className="mt-1 text-lg font-extrabold text-navy">{assessment.bmi}</p>
              </div>
            )}
            {assessment.bodyFatPercent !== undefined && (
              <div className="rounded-2xl border border-border bg-white p-4">
                <p className="text-xs text-muted">{t.bodyAssessment.fields.bodyFatPercent}</p>
                <p className="mt-1 text-lg font-extrabold text-navy">{assessment.bodyFatPercent}%</p>
              </div>
            )}
            {assessment.skeletalMuscleMassKg !== undefined && (
              <div className="rounded-2xl border border-border bg-white p-4">
                <p className="text-xs text-muted">{t.bodyAssessment.fields.skeletalMuscleMass}</p>
                <p className="mt-1 text-lg font-extrabold text-navy">{assessment.skeletalMuscleMassKg} kg</p>
              </div>
            )}
          </div>
        )}
      </div>
    </PhoneFrame>
  )
}
