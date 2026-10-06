import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import { useLanguage } from '../../i18n/LanguageContext'

const STEPS = ['personal', 'professional', 'sports', 'experience', 'documents', 'trainingTypes', 'packages', 'availability', 'review'] as const

export default function TrainerRegistration() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState<string[]>([])

  const allDone = done.length === STEPS.length

  if (!started) {
    return (
      <PhoneFrame footer={<Button fullWidth onClick={() => setStarted(true)}>{t.trainerRegistrationPage.startApplication}</Button>}>
        <TopBar title="" onBack={() => navigate('/')} />
        <div className="flex flex-col items-center px-8 pb-8 pt-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-light text-3xl">🧑‍🏫</div>
          <h1 className="mt-4 text-2xl font-extrabold text-navy">{t.trainerRegistrationPage.welcomeTitle}</h1>
          <p className="mt-2 text-sm text-muted">{t.trainerRegistrationPage.welcomeBody}</p>
        </div>
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame
      footer={
        <Button fullWidth disabled={!allDone} onClick={() => navigate('/trainer/verification')}>
          {t.trainerRegistrationPage.submit}
        </Button>
      }
    >
      <TopBar title={t.trainerRegistrationPage.welcomeTitle} />
      <div className="px-5 pb-8 pt-3">
        <p className="mb-3 text-sm text-muted">Tap each section to mark it complete for this demo.</p>
        <div className="space-y-2">
          {STEPS.map((step, i) => {
            const isDone = done.includes(step)
            return (
              <button
                key={step}
                onClick={() => setDone((prev) => (isDone ? prev.filter((s) => s !== step) : [...prev, step]))}
                className={[
                  'flex w-full items-center gap-3 rounded-xl border p-3 text-start',
                  isDone ? 'border-teal bg-teal-light' : 'border-border bg-white',
                ].join(' ')}
              >
                <span
                  className={[
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                    isDone ? 'bg-teal text-white' : 'bg-black/5 text-muted',
                  ].join(' ')}
                >
                  {isDone ? '✓' : i + 1}
                </span>
                <span className="text-sm font-medium text-navy">{t.trainerRegistrationPage.steps[step]}</span>
              </button>
            )
          })}
        </div>
      </div>
    </PhoneFrame>
  )
}
