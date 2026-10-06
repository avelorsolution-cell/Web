import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import { useLanguage } from '../../i18n/LanguageContext'

export default function UserType() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  return (
    <PhoneFrame>
      <TopBar title="" backTo="/subscriber/otp" />
      <div className="flex h-full flex-col justify-center px-6 pb-8">
        <h1 className="text-2xl font-extrabold text-navy">{t.auth.userTypeTitle}</h1>
        <p className="mt-1 text-sm text-muted">{t.auth.userTypeSubtitle}</p>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate('/subscriber/goal')}
            className="w-full rounded-2xl border-2 border-teal bg-teal-light p-5 text-start"
          >
            <span className="text-3xl">🏃</span>
            <p className="mt-2 font-bold text-navy">{t.auth.subscriberOption}</p>
            <p className="text-sm text-muted">{t.auth.subscriberOptionDesc}</p>
          </button>

          <button
            onClick={() => navigate('/trainer')}
            className="w-full rounded-2xl border border-border bg-white p-5 text-start"
          >
            <span className="text-3xl">🧑‍🏫</span>
            <p className="mt-2 font-bold text-navy">{t.auth.trainerOption}</p>
            <p className="text-sm text-muted">{t.auth.trainerOptionDesc}</p>
          </button>
        </div>
      </div>
    </PhoneFrame>
  )
}
