import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { week3Days } from '../../data/trainingData'
import { useLanguage } from '../../i18n/LanguageContext'
import { useToast } from '../../context/ToastContext'

const ADD_ITEMS = ['addWorkout', 'addCardio', 'addHabit', 'addCheckIn', 'addAssessmentReminder', 'addPhotoReminder', 'addMessage'] as const

export default function TrainerProgramBuilder() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { showToast } = useToast()
  const [items, setItems] = useState(week3Days)
  const [published, setPublished] = useState(false)

  return (
    <PhoneFrame
      footer={
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => navigate('/trainer/dashboard')}>
            {t.trainerProgramBuilder.saveDraft}
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              setPublished(true)
              showToast(t.toast.programAssigned)
            }}
          >
            {t.trainerProgramBuilder.publish}
          </Button>
        </div>
      }
    >
      <TopBar title={t.trainerProgramBuilder.title} backTo="/trainer/dashboard" />
      <div className="px-5 pb-8 pt-3">
        <p className="text-lg font-extrabold text-navy">Strength Transformation</p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-black/5 p-2">
            <p className="text-muted">{t.trainerProgramBuilder.goal}</p>
            <p className="font-semibold text-navy">Strength & Body Composition</p>
          </div>
          <div className="rounded-lg bg-black/5 p-2">
            <p className="text-muted">{t.trainerProgramBuilder.duration}</p>
            <p className="font-semibold text-navy">8 Weeks</p>
          </div>
        </div>

        {published && (
          <div className="mt-3">
            <Badge tone="success" icon="✓" label="Published to Maha" />
          </div>
        )}

        <div className="mt-4 space-y-2">
          {items.map((day) => (
            <div key={day.day} className="flex items-center justify-between rounded-xl border border-border bg-white p-3 text-sm">
              <div>
                <p className="text-xs font-bold uppercase text-muted">{language === 'ar' ? day.dayAr : day.day}</p>
                <p className="font-semibold text-navy">{language === 'ar' ? day.workoutAr : day.workout}</p>
              </div>
              <button
                onClick={() => setItems((prev) => prev.filter((d) => d.day !== day.day))}
                className="text-xs text-error"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {ADD_ITEMS.map((key) => (
            <button
              key={key}
              onClick={() => navigate(`/subscriber/coming-soon?feature=${encodeURIComponent(t.trainerProgramBuilder[key])}`)}
              className="rounded-xl border border-dashed border-border p-2.5 text-xs font-semibold text-teal-dark"
            >
              + {t.trainerProgramBuilder[key]}
            </button>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          <Button
            variant="outline"
            className="flex-1 !text-xs"
            onClick={() => navigate('/subscriber/coming-soon?feature=Assign Client')}
          >
            {t.trainerProgramBuilder.assignClient}
          </Button>
          <Button
            variant="outline"
            className="flex-1 !text-xs"
            onClick={() => navigate('/subscriber/coming-soon?feature=Duplicate Template')}
          >
            {t.trainerProgramBuilder.duplicateTemplate}
          </Button>
        </div>
      </div>
    </PhoneFrame>
  )
}
