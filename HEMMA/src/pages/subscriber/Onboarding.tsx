import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import { useLanguage } from '../../i18n/LanguageContext'
import Button from '../../components/ui/Button'

const icons = ['🔍', '⚖️', '💳', '📈', '🛍️']

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const { t } = useLanguage()
  const slides = t.onboarding.slides
  const isLast = step === slides.length - 1

  const goNext = () => {
    if (isLast) navigate('/subscriber/login')
    else setStep((s) => s + 1)
  }

  return (
    <PhoneFrame
      footer={
        <div className="flex flex-col gap-3">
          <div className="flex justify-center gap-1.5">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-teal' : 'w-1.5 bg-border'}`}
              />
            ))}
          </div>
          <Button fullWidth onClick={goNext}>
            {isLast ? t.onboarding.getStarted : t.common.next}
          </Button>
        </div>
      }
    >
      <div className="flex h-full flex-col px-6 pt-16 text-center">
        <button
          className="self-end text-sm font-semibold text-muted"
          onClick={() => navigate('/subscriber/login')}
        >
          {t.onboarding.skip}
        </button>
        <div className="mt-10 flex flex-1 flex-col items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-teal-light text-5xl">
            {icons[step]}
          </div>
          <h2 className="mt-8 text-2xl font-extrabold text-navy">{slides[step].title}</h2>
          <p className="mt-3 max-w-xs text-sm text-muted">{slides[step].body}</p>
        </div>
      </div>
    </PhoneFrame>
  )
}
