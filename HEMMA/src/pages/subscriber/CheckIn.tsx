import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import { useLanguage } from '../../i18n/LanguageContext'

const SCALE_FIELDS = ['trainingSatisfaction', 'energy', 'motivation', 'soreness', 'sleepQuality', 'stress'] as const
type ScaleField = (typeof SCALE_FIELDS)[number]

export default function CheckIn() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [scores, setScores] = useState<Record<ScaleField, number>>({
    trainingSatisfaction: 8,
    energy: 7,
    motivation: 8,
    soreness: 4,
    sleepQuality: 7,
    stress: 4,
  })
  const [needsAdjustment, setNeedsAdjustment] = useState<'yes' | 'no' | null>(null)

  if (submitted) {
    return (
      <PhoneFrame
        footer={
          <Button fullWidth onClick={() => navigate('/subscriber/home')}>
            {t.checkIn.backHome}
          </Button>
        }
      >
        <TopBar showBack={false} title="" />
        <div className="flex flex-col items-center px-8 pb-8 pt-10 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-4xl">✅</div>
          <h1 className="mt-4 text-2xl font-extrabold text-navy">{t.checkIn.sentTitle}</h1>
          <p className="mt-2 text-sm text-muted">Sarah {t.checkIn.sentBody}</p>
        </div>
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame
      footer={
        <Button fullWidth onClick={() => setSubmitted(true)}>
          {t.checkIn.submit}
        </Button>
      }
    >
      <TopBar title={t.checkIn.title} />
      <div className="px-5 pb-8 pt-3">
        <p className="text-sm text-muted">
          {t.checkIn.week} 3 · {t.checkIn.trainerLabel}: Sarah Ahmed
        </p>

        <div className="mt-4 space-y-4">
          {SCALE_FIELDS.map((field) => (
            <div key={field}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-navy">{t.checkIn.fields[field]}</span>
                <span className="font-bold text-teal-dark">{scores[field]}</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={scores[field]}
                onChange={(e) => setScores((prev) => ({ ...prev, [field]: Number(e.target.value) }))}
                className="mt-1 w-full accent-teal"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-navy">{t.checkIn.questions.wentWell}</span>
            <textarea rows={2} className="w-full rounded-xl border border-border bg-white p-3 text-sm outline-none focus:border-teal" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-navy">{t.checkIn.questions.difficult}</span>
            <textarea rows={2} className="w-full rounded-xl border border-border bg-white p-3 text-sm outline-none focus:border-teal" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-navy">{t.checkIn.questions.painDiscomfort}</span>
            <textarea rows={2} className="w-full rounded-xl border border-border bg-white p-3 text-sm outline-none focus:border-teal" />
          </label>

          <div>
            <span className="mb-2 block text-sm font-medium text-navy">{t.checkIn.questions.needAdjustment}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setNeedsAdjustment('yes')}
                className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-semibold ${
                  needsAdjustment === 'yes' ? 'border-teal bg-teal-light text-teal-dark' : 'border-border bg-white text-navy'
                }`}
              >
                {t.checkIn.yes}
              </button>
              <button
                onClick={() => setNeedsAdjustment('no')}
                className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-semibold ${
                  needsAdjustment === 'no' ? 'border-teal bg-teal-light text-teal-dark' : 'border-border bg-white text-navy'
                }`}
              >
                {t.checkIn.no}
              </button>
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-navy">{t.checkIn.questions.anythingElse}</span>
            <textarea rows={2} className="w-full rounded-xl border border-border bg-white p-3 text-sm outline-none focus:border-teal" />
          </label>
        </div>
      </div>
    </PhoneFrame>
  )
}
