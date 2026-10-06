import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Toggle from '../../components/ui/Toggle'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'

export default function ProgressConsent() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { progressConsent, setProgressConsent, selectedSports } = useAppState()
  const hasKids = selectedSports.includes('kids')

  return (
    <PhoneFrame
      footer={
        <Button
          fullWidth
          disabled={!progressConsent}
          onClick={() => navigate('/subscriber/body-assessment', { state: { onboarding: true } })}
        >
          {t.common.continue}
        </Button>
      }
    >
      <TopBar title="" backTo="/subscriber/sport-select" />
      <div className="px-6 pb-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-light text-2xl">🔒</div>
        <h1 className="mt-4 text-2xl font-extrabold text-navy">{t.goal.consentTitle}</h1>
        <p className="mt-2 text-sm text-muted">{t.goal.consentBody}</p>
        <button className="mt-2 text-sm font-semibold text-teal-dark">{t.goal.consentLearnMore}</button>

        <label className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
          <input
            type="checkbox"
            checked={progressConsent}
            onChange={(e) => setProgressConsent(e.target.checked)}
            className="mt-0.5 h-5 w-5 accent-teal"
          />
          <span className="text-sm text-navy">{t.goal.consentCheckbox}</span>
        </label>

        <div className="mt-4 flex items-center justify-between rounded-2xl border border-border bg-white p-4">
          <div>
            <p className="text-sm font-semibold text-navy">{t.goal.consentPhotos}</p>
            <p className="text-xs text-muted">{t.goal.consentPhotosOptional}</p>
          </div>
          <Toggle checked={false} onChange={() => {}} />
        </div>

        {hasKids && (
          <div className="mt-4 rounded-2xl border border-warning/30 bg-warning/10 p-4">
            <p className="text-sm font-bold text-warning">⚠ {t.goal.kidsNotice}</p>
            <p className="mt-1 text-xs text-navy/70">{t.goal.kidsNoticeBody}</p>
          </div>
        )}
      </div>
    </PhoneFrame>
  )
}
