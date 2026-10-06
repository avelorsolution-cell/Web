import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'

const prefKeys = ['inPerson', 'online', 'group', 'hybrid'] as const
const icons: Record<(typeof prefKeys)[number], string> = {
  inPerson: '🧑‍🤝‍🧑',
  online: '💻',
  group: '👥',
  hybrid: '🔀',
}

export default function TrainingPreference() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { trainingPreference, setTrainingPreference } = useAppState()

  return (
    <PhoneFrame
      footer={
        <Button fullWidth disabled={!trainingPreference} onClick={() => navigate('/subscriber/sport-select')}>
          {t.common.continue}
        </Button>
      }
    >
      <TopBar title="" backTo="/subscriber/goal" />
      <div className="px-6 pb-8">
        <h1 className="text-2xl font-extrabold text-navy">{t.goal.preferenceTitle}</h1>

        <div className="mt-6 space-y-3">
          {prefKeys.map((key) => (
            <button
              key={key}
              onClick={() => setTrainingPreference(key)}
              className={[
                'flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-start transition-colors',
                trainingPreference === key ? 'border-teal bg-teal-light' : 'border-border bg-white',
              ].join(' ')}
            >
              <span className="text-2xl">{icons[key]}</span>
              <span className="font-semibold text-navy">{t.goal.preference[key]}</span>
            </button>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
