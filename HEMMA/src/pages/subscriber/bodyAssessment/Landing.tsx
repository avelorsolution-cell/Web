import { useLocation, useNavigate } from 'react-router-dom'
import PhoneFrame from '../../../components/layout/PhoneFrame'
import TopBar from '../../../components/layout/TopBar'
import Button from '../../../components/ui/Button'
import { useLanguage } from '../../../i18n/LanguageContext'

interface LocationState {
  onboarding?: boolean
}

export default function BodyAssessmentLanding() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useLanguage()
  const onboarding = (location.state as LocationState | null)?.onboarding

  return (
    <PhoneFrame>
      <TopBar title={t.bodyAssessment.title} showBack={!onboarding} onBack={() => navigate('/subscriber/home')} />
      <div className="px-5 pb-8 pt-3">
        <p className="text-sm text-muted">{t.bodyAssessment.landingSubtitle}</p>

        <button
          onClick={() => navigate('/subscriber/body-assessment/upload', { state: { onboarding } })}
          className="mt-5 block w-full rounded-2xl border-2 border-border bg-white p-5 text-start transition-colors hover:border-teal"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-light text-2xl">📄</div>
          <h2 className="mt-3 font-bold text-navy">{t.bodyAssessment.uploadCard.title}</h2>
          <p className="mt-1 text-sm text-muted">{t.bodyAssessment.uploadCard.desc}</p>
          <p className="mt-2 text-xs text-muted">{t.bodyAssessment.uploadCard.formats}</p>
          <div className="mt-4">
            <Button fullWidth>{t.bodyAssessment.uploadCard.cta}</Button>
          </div>
        </button>

        <button
          onClick={() => navigate('/subscriber/body-assessment/manual', { state: { onboarding } })}
          className="mt-4 block w-full rounded-2xl border-2 border-border bg-white p-5 text-start transition-colors hover:border-teal"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-light text-2xl">📏</div>
          <h2 className="mt-3 font-bold text-navy">{t.bodyAssessment.manualCard.title}</h2>
          <p className="mt-1 text-sm text-muted">{t.bodyAssessment.manualCard.desc}</p>
          <div className="mt-4">
            <Button variant="outline" fullWidth>
              {t.bodyAssessment.manualCard.cta}
            </Button>
          </div>
        </button>

        <p className="mt-6 text-center text-xs text-muted">🔒 {t.bodyAssessment.privacyNote}</p>
        <p className="mt-2 text-center text-xs text-muted">{t.bodyAssessment.disclaimerNote}</p>

        {onboarding && (
          <button
            className="mt-6 w-full text-center text-sm font-semibold text-muted underline"
            onClick={() => navigate('/subscriber/home')}
          >
            {t.bodyAssessment.skipForNow}
          </button>
        )}
      </div>
    </PhoneFrame>
  )
}
