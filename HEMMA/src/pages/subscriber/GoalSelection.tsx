import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'

const goalKeys = ['loseWeight', 'buildMuscle', 'improveFitness', 'learnSport', 'mobility', 'wellness'] as const
const icons: Record<(typeof goalKeys)[number], string> = {
  loseWeight: '⚖️',
  buildMuscle: '💪',
  improveFitness: '🏃',
  learnSport: '🥋',
  mobility: '🤸',
  wellness: '🧘',
}

export default function GoalSelection() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { goal, setGoal } = useAppState()

  return (
    <PhoneFrame
      footer={
        <Button fullWidth disabled={!goal} onClick={() => navigate('/subscriber/training-preference')}>
          {t.common.continue}
        </Button>
      }
    >
      <TopBar title="" backTo="/subscriber/user-type" />
      <div className="px-6 pb-8">
        <h1 className="text-2xl font-extrabold text-navy">{t.goal.title}</h1>
        <p className="mt-1 text-sm text-muted">{t.goal.subtitle}</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {goalKeys.map((key) => (
            <button
              key={key}
              onClick={() => setGoal(key)}
              className={[
                'rounded-2xl border-2 p-4 text-start transition-colors',
                goal === key ? 'border-teal bg-teal-light' : 'border-border bg-white',
              ].join(' ')}
            >
              <span className="text-2xl">{icons[key]}</span>
              <p className="mt-2 text-sm font-semibold text-navy">{t.goal.options[key]}</p>
            </button>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
