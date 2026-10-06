import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import LanguageToggle from '../../components/layout/LanguageToggle'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useLanguage } from '../../i18n/LanguageContext'

export default function Login() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [mobile, setMobile] = useState('')

  return (
    <PhoneFrame>
      <TopBar showBack={false} right={<LanguageToggle compact />} />
      <div className="px-6 pb-8 pt-4">
        <h1 className="text-2xl font-extrabold text-navy">{t.auth.welcomeBack}</h1>
        <p className="mt-1 text-sm text-muted">{t.auth.loginSubtitle}</p>

        <div className="mt-6 space-y-4">
          <Input
            label={t.auth.mobile}
            placeholder="+974 5X XX XXXX"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <Input label={t.auth.password} type="password" placeholder="••••••••" />
          <button
            className="text-sm font-semibold text-teal-dark"
            onClick={() => navigate('/subscriber/otp')}
          >
            {t.auth.forgotPassword}
          </button>
        </div>

        <Button fullWidth className="mt-6" onClick={() => navigate('/subscriber/otp')}>
          {t.auth.login}
        </Button>

        <div className="my-6 flex items-center gap-3 text-xs text-muted">
          <div className="h-px flex-1 bg-border" />
          {t.auth.or}
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-3">
          <Button variant="outline" fullWidth icon="🔵" onClick={() => navigate('/subscriber/otp')}>
            {t.auth.google}
          </Button>
          <Button variant="outline" fullWidth icon="🍎" onClick={() => navigate('/subscriber/otp')}>
            {t.auth.apple}
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          {t.auth.noAccount}{' '}
          <button className="font-semibold text-teal-dark" onClick={() => navigate('/subscriber/signup')}>
            {t.auth.signUpLink}
          </button>
        </p>
      </div>
    </PhoneFrame>
  )
}
