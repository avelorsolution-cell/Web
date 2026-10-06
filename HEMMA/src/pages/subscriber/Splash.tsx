import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import { useLanguage } from '../../i18n/LanguageContext'
import Button from '../../components/ui/Button'

export default function Splash() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/subscriber/onboarding'), 2200)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col items-center justify-center bg-navy px-8 text-center text-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal text-2xl font-black text-navy">
          H
        </div>
        <h1 className="mt-6 text-3xl font-extrabold">{t.presentation.title}</h1>
        <p className="mt-4 text-lg leading-snug text-white/80">
          {t.splash.line1}
          <br />
          {t.splash.line2}
          <br />
          {t.splash.line3}
        </p>
        <Button className="mt-10" onClick={() => navigate('/subscriber/onboarding')}>
          {t.splash.cta}
        </Button>
      </div>
    </PhoneFrame>
  )
}
