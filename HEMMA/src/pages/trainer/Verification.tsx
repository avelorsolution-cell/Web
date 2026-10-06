import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { useLanguage } from '../../i18n/LanguageContext'

type Stage = 'underReview' | 'actionRequired' | 'approved'

export default function TrainerVerification() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [stage, setStage] = useState<Stage>('underReview')

  const timeline = [
    { key: t.trainerVerificationPage.timeline.profile, done: true },
    { key: t.trainerVerificationPage.timeline.cv, done: true },
    { key: t.trainerVerificationPage.timeline.certifications, done: stage !== 'underReview' || false, active: stage === 'underReview' },
    { key: t.trainerVerificationPage.timeline.finalReview, done: stage === 'approved', active: stage === 'actionRequired' },
  ]

  return (
    <PhoneFrame>
      <TopBar title={t.trainerVerificationPage.title} onBack={() => navigate('/')} />
      <div className="px-5 pb-8 pt-3">
        <div className="flex justify-center">
          <Badge
            tone={stage === 'approved' ? 'success' : stage === 'actionRequired' ? 'warning' : 'info'}
            label={t.trainerVerificationPage.statuses[stage === 'underReview' ? 'underReview' : stage === 'actionRequired' ? 'actionRequired' : 'approved']}
          />
        </div>

        <div className="mt-6 space-y-4">
          {timeline.map((item, i) => (
            <div key={item.key} className="flex items-start gap-3">
              <span
                className={[
                  'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                  item.done ? 'bg-success text-white' : item.active ? 'bg-warning text-white' : 'bg-black/5 text-muted',
                ].join(' ')}
              >
                {item.done ? '✓' : i + 1}
              </span>
              <p className="text-sm font-medium text-navy">{item.key}</p>
            </div>
          ))}
        </div>

        {stage === 'actionRequired' && (
          <div className="mt-6 rounded-2xl border border-warning/30 bg-warning/10 p-4">
            <p className="text-sm font-bold text-warning">⚠ {t.trainerVerificationPage.actionRequiredExample}</p>
            <Button variant="outline" className="mt-3 w-full !text-xs" onClick={() => setStage('underReview')}>
              {t.trainerVerificationPage.replaceDocument}
            </Button>
          </div>
        )}

        {stage === 'approved' && (
          <div className="mt-6 rounded-2xl border border-success/30 bg-success/10 p-4 text-center">
            <p className="text-sm font-bold text-success">🎉 {t.trainerVerificationPage.statuses.approved}</p>
            <Button className="mt-3 w-full !text-xs" onClick={() => navigate('/trainer/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        )}

        <div className="mt-6 rounded-xl border border-dashed border-border p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Presenter: simulate stage</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="!text-xs" onClick={() => setStage('underReview')}>
              Under Review
            </Button>
            <Button variant="outline" className="!text-xs" onClick={() => setStage('actionRequired')}>
              Action Required
            </Button>
            <Button variant="outline" className="!text-xs" onClick={() => setStage('approved')}>
              Approved
            </Button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}
