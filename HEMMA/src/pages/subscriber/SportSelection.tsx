import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import { sports } from '../../data/mockData'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'

export default function SportSelection() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { selectedSports, setSelectedSports } = useAppState()

  const toggle = (id: string) => {
    setSelectedSports(selectedSports.includes(id) ? selectedSports.filter((s) => s !== id) : [...selectedSports, id])
  }

  return (
    <PhoneFrame
      footer={
        <Button fullWidth disabled={selectedSports.length === 0} onClick={() => navigate('/subscriber/consent')}>
          {t.common.continue}
        </Button>
      }
    >
      <TopBar title="" backTo="/subscriber/training-preference" />
      <div className="px-6 pb-8">
        <h1 className="text-2xl font-extrabold text-navy">{t.goal.sportTitle}</h1>
        <p className="mt-1 text-sm text-muted">{t.goal.sportSubtitle}</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {sports.map((sport) => {
            const active = selectedSports.includes(sport.id)
            return (
              <button
                key={sport.id}
                onClick={() => toggle(sport.id)}
                className={[
                  'flex items-center gap-2 rounded-2xl border-2 p-3 text-start transition-colors',
                  active ? 'border-teal bg-teal-light' : 'border-border bg-white',
                ].join(' ')}
              >
                <span className="text-xl">{sport.icon}</span>
                <span className="text-sm font-semibold text-navy">{t.sports[sport.labelKey]}</span>
              </button>
            )
          })}
        </div>
      </div>
    </PhoneFrame>
  )
}
