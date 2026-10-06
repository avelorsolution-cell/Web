import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'

export default function SignUp() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { setUserName } = useAppState()
  const [name, setName] = useState('')

  const handleSubmit = () => {
    if (name.trim()) setUserName(name.trim().split(' ')[0])
    navigate('/subscriber/otp')
  }

  return (
    <PhoneFrame>
      <TopBar title="" backTo="/subscriber/login" />
      <div className="px-6 pb-8">
        <h1 className="text-2xl font-extrabold text-navy">{t.auth.createAccount}</h1>
        <p className="mt-1 text-sm text-muted">{t.auth.signupSubtitle}</p>

        <div className="mt-6 space-y-4">
          <Input label={t.auth.fullName} placeholder="Maha Al-Kuwari" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label={t.auth.mobile} placeholder="+974 5X XX XXXX" />
          <Input label={t.auth.email} type="email" placeholder="you@email.com" />
          <Input label={t.auth.password} type="password" placeholder="••••••••" />
        </div>

        <Button fullWidth className="mt-6" onClick={handleSubmit}>
          {t.auth.signup}
        </Button>

        <p className="mt-8 text-center text-sm text-muted">
          {t.auth.haveAccount}{' '}
          <button className="font-semibold text-teal-dark" onClick={() => navigate('/subscriber/login')}>
            {t.auth.loginLink}
          </button>
        </p>
      </div>
    </PhoneFrame>
  )
}
