import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import BottomNav from '../../components/layout/BottomNav'
import Button from '../../components/ui/Button'
import ProgressBar from '../../components/ui/ProgressBar'
import Badge from '../../components/ui/Badge'
import { trainers } from '../../data/mockData'
import { recentActivity } from '../../data/trainingData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function MyTraining() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const trainer = trainers[0]

  return (
    <PhoneFrame footer={<BottomNav active="training" />}>
      <TopBar title={t.trainingHub.title} showBack={false} />
      <div className="px-5 pb-8 pt-3">
        <section className="rounded-2xl border border-border bg-white p-4 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy">{t.trainingHub.activeTraining}</h2>
            <Badge tone="success" label="Active" />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <img src={trainer.photo} className="h-14 w-14 rounded-xl object-cover" alt="" />
            <div>
              <p className="font-bold text-navy">{language === 'ar' ? trainer.nameAr : trainer.name}</p>
              <p className="text-xs text-muted">Standard Strength Package · 8 Sessions</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>3 {t.myTraining.sessionsCompleted}</span>
              <span>5 {t.myTraining.sessionsRemaining}</span>
            </div>
            <div className="mt-1.5">
              <ProgressBar value={3} max={8} />
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-teal-light p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-teal-dark">{t.trainingHub.program}: Strength Transformation</p>
              <span className="text-xs font-bold text-teal-dark">42%</span>
            </div>
            <div className="mt-2">
              <ProgressBar value={42} />
            </div>
          </div>

          <p className="mt-3 text-xs text-muted">
            {t.trainingHub.nextAppointment}: <span className="font-semibold text-navy">16 Sep, 3:00 PM</span>
          </p>
          <p className="text-xs text-muted">
            {t.trainingHub.todaysWorkout}: <span className="font-semibold text-navy">Upper Body Strength</span>
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button className="!text-xs" onClick={() => navigate('/subscriber/training/workout')}>
              {t.trainingHub.continueWorkout}
            </Button>
            <Button variant="outline" className="!text-xs" onClick={() => navigate('/subscriber/training/program')}>
              {t.trainingHub.viewProgram}
            </Button>
            <Button variant="outline" className="!text-xs" onClick={() => navigate('/subscriber/training/calendar')}>
              {t.trainingHub.calendar}
            </Button>
            <Button
              variant="outline"
              className="!text-xs"
              onClick={() => navigate(`/subscriber/coming-soon?feature=${encodeURIComponent(t.profile.message)}`)}
            >
              {t.myTraining.message}
            </Button>
            <Button variant="outline" className="col-span-2 !text-xs" onClick={() => navigate('/subscriber/progress')}>
              {t.myTraining.progress}
            </Button>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="mb-3 text-sm font-bold text-navy">{t.trainingHub.recentActivity}</h2>
          <div className="space-y-2">
            {recentActivity.map((a) => (
              <div key={a.key} className="flex items-center justify-between rounded-xl border border-border bg-white p-3 text-sm">
                <span className="text-navy">{t.trainingHub.activity[a.key]}</span>
                <span className="text-xs text-muted">{language === 'ar' ? a.dateAr : a.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PhoneFrame>
  )
}
