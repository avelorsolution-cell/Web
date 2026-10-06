import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import OtpField from '../../components/ui/OtpField'
import { useLanguage } from '../../i18n/LanguageContext'

export default function Otp() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <PhoneFrame>
      <TopBar title="" backTo="/subscriber/signup" />
      <div className="px-6 pb-8 text-center">
        <h1 className="text-2xl font-extrabold text-navy">{t.auth.otpTitle}</h1>
        <p className="mt-1 text-sm text-muted">
          {t.auth.otpSubtitle} <span className="text-navy">+974 5X XX XX32</span>
        </p>

        <div className="mt-8">
          <OtpField onComplete={() => navigate('/subscriber/user-type')} />
        </div>

        <button className="mt-6 text-sm font-semibold text-teal-dark" onClick={() => navigate('/subscriber/user-type')}>
          {t.auth.otpResend}
        </button>
      </div>
    </PhoneFrame>
  )
}
