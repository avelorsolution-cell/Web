import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import BottomNav from '../../components/layout/BottomNav'
import LanguageToggle from '../../components/layout/LanguageToggle'
import SearchBar from '../../components/ui/SearchBar'
import ProgressBar from '../../components/ui/ProgressBar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import MetricCard from '../../components/cards/MetricCard'
import TrainerCard from '../../components/cards/TrainerCard'
import JourneyTracker from '../../components/cards/JourneyTracker'
import { sports, trainers } from '../../data/mockData'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'
import { useBodyAssessments } from '../../context/BodyAssessmentContext'
import { bmiStatus } from '../../data/bodyAssessmentData'

export default function Home() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { userName, goal, selectedSports, booking, lastBookingId } = useAppState()
  const { latest } = useBodyAssessments()

  const journeySteps = [
    { key: 'goal' as const, done: !!goal, onClick: () => navigate('/subscriber/goal') },
    { key: 'sport' as const, done: selectedSports.length > 0, onClick: () => navigate('/subscriber/sport-select') },
    { key: 'assessment' as const, done: !!latest, onClick: () => navigate('/subscriber/body-assessment') },
    { key: 'trainer' as const, done: !!booking.trainer, onClick: () => navigate('/subscriber/trainers') },
    { key: 'training' as const, done: !!lastBookingId, onClick: () => navigate('/subscriber/trainers') },
  ]

  const status = latest?.bmi ? bmiStatus(latest.bmi) : null
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(language === 'ar' ? 'ar-QA' : 'en-QA', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <PhoneFrame footer={<BottomNav active="home" />}>
      <div className="px-5 pb-6 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted">{t.home.greeting},</p>
            <h1 className="text-lg font-bold text-navy">{userName} 👋</h1>
            <p className="text-xs text-muted">📍 Doha, Qatar</p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle compact />
            <button
              onClick={() => navigate('/subscriber/coming-soon?feature=Notifications')}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5"
            >
              🔔
            </button>
            <button onClick={() => navigate('/subscriber/profile')}>
              <img src="https://i.pravatar.cc/150?img=47" alt="profile" className="h-9 w-9 rounded-full object-cover" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <SearchBar placeholder={t.home.searchPlaceholder} readOnly onClick={() => navigate('/subscriber/trainers')} />
        </div>

        <div className="mt-5">
          <JourneyTracker steps={journeySteps} />
        </div>

        {booking.trainer && booking.date ? (
          <section className="mt-4 rounded-2xl border border-border bg-white p-4 shadow-card">
            <h2 className="mb-2 text-sm font-bold text-navy">{t.upcoming.title}</h2>
            <div className="flex items-center gap-3">
              <img src={booking.trainer.photo} className="h-12 w-12 rounded-xl object-cover" alt="" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy">{language === 'ar' ? booking.trainer.nameAr : booking.trainer.name}</p>
                <p className="text-xs text-muted">
                  {booking.pkg?.trainingType === 'in-person' ? 'Strength Training' : 'Training'} · {booking.date} · {booking.time}
                </p>
                <p className="text-xs text-muted">📍 {language === 'ar' ? booking.trainer.locationAr : booking.trainer.location}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button variant="outline" className="!text-xs" onClick={() => navigate('/subscriber/my-training')}>
                {t.upcoming.viewBooking}
              </Button>
              <Button
                variant="outline"
                className="!text-xs"
                onClick={() => navigate(`/subscriber/coming-soon?feature=${encodeURIComponent(t.profile.message)}`)}
              >
                {t.upcoming.messageTrainer}
              </Button>
            </div>
          </section>
        ) : (
          journeySteps.every((s) => s.done) === false &&
          !journeySteps[3].done && (
            <section className="mt-4 rounded-2xl border border-dashed border-border bg-white p-4 text-center text-sm text-muted">
              {t.upcoming.none}
            </section>
          )
        )}

        {lastBookingId && (
          <section className="mt-4 rounded-2xl border border-border bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-navy">{t.continueTrainingCard.title}</h2>
              <Badge tone="info" label="Strength Transformation" />
            </div>
            <p className="mt-1 text-xs text-muted">
              {t.continueTrainingCard.weekOf} 3 {t.continueTrainingCard.of} 8
            </p>
            <p className="mt-2 text-sm font-semibold text-navy">
              {t.continueTrainingCard.todaysWorkout}: Upper Body Strength
            </p>
            <div className="mt-2">
              <ProgressBar value={42} />
            </div>
            <Button className="mt-3 w-full !text-xs" onClick={() => navigate('/subscriber/training/workout')}>
              {t.continueTrainingCard.continueWorkout}
            </Button>
          </section>
        )}

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy">{t.bodyAssessment.snapshot.title}</h2>
            <button className="text-xs font-semibold text-teal-dark" onClick={() => navigate('/subscriber/progress')}>
              {t.bodyAssessment.snapshot.viewFullProgress}
            </button>
          </div>

          {latest ? (
            <div className="hemma-scroll flex gap-3 overflow-x-auto pb-1">
              {latest.weightKg !== undefined && (
                <MetricCard icon="⚖️" label={t.bodyAssessment.snapshot.weight} value={`${latest.weightKg} kg`} />
              )}
              {latest.bmi !== undefined && (
                <MetricCard
                  icon="📐"
                  label={t.bodyAssessment.snapshot.bmi}
                  value={`${latest.bmi}`}
                  sublabel={status ? t.bodyAssessment.bmiBlock.status[status.key] : undefined}
                  tone="highlight"
                />
              )}
              {latest.bodyFatPercent !== undefined && (
                <MetricCard icon="🔥" label={t.bodyAssessment.snapshot.bodyFat} value={`${latest.bodyFatPercent}%`} />
              )}
              {latest.skeletalMuscleMassKg !== undefined && (
                <MetricCard icon="💪" label={t.bodyAssessment.snapshot.muscleMass} value={`${latest.skeletalMuscleMassKg} kg`} />
              )}
              <MetricCard icon="🗓" label={t.bodyAssessment.snapshot.lastAssessment} value={formatDate(latest.assessmentDate)} />
              <MetricCard icon="🔥" label="Streak" value="7 Days" />
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-teal bg-teal-light p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl">📊</div>
              <h3 className="mt-3 text-sm font-bold text-navy">{t.bodyAssessment.snapshot.emptyTitle}</h3>
              <p className="mt-1 text-xs text-navy/70">{t.bodyAssessment.snapshot.emptyBody}</p>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 !text-xs" onClick={() => navigate('/subscriber/body-assessment/upload')}>
                  {t.bodyAssessment.uploadCard.cta}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 !text-xs"
                  onClick={() => navigate('/subscriber/body-assessment/manual')}
                >
                  {t.bodyAssessment.manualCard.cta}
                </Button>
              </div>
            </div>
          )}
        </section>

        <section className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy">{t.home.recommended}</h2>
            <button className="text-xs font-semibold text-teal-dark" onClick={() => navigate('/subscriber/trainers')}>
              {t.common.seeAll}
            </button>
          </div>
          <div className="hemma-scroll flex gap-3 overflow-x-auto pb-1">
            {trainers.slice(0, 4).map((trainer) => (
              <div key={trainer.id} className="w-72 shrink-0">
                <TrainerCard trainer={trainer} onView={() => navigate(`/subscriber/trainers/${trainer.id}`)} showCompare={false} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="mb-3 text-sm font-bold text-navy">{t.home.sports}</h2>
          <div className="hemma-scroll flex gap-3 overflow-x-auto pb-1">
            {sports.map((sport) => (
              <button
                key={sport.id}
                onClick={() => navigate(`/subscriber/trainers?sport=${sport.id}`)}
                className="flex w-20 shrink-0 flex-col items-center gap-1.5 rounded-2xl border border-border bg-white py-3 text-xs font-semibold text-navy shadow-card"
              >
                <span className="text-2xl">{sport.icon}</span>
                {t.sports[sport.labelKey]}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-7 grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/subscriber/progress')}
            className="rounded-2xl border border-border bg-white p-4 text-start shadow-card"
          >
            <h2 className="text-sm font-bold text-navy">{t.home.myProgress}</h2>
            <p className="mt-2 text-xs text-muted">
              {latest ? `${latest.weightKg} kg · BMI ${latest.bmi}` : t.progressPage.noAssessmentsYet}
            </p>
            <div className="mt-2">
              <ProgressBar value={latest ? 62 : 0} color="#22A47D" />
            </div>
          </button>
          <div className="rounded-2xl border border-border bg-white p-4 shadow-card">
            <h2 className="text-sm font-bold text-navy">{t.activeChallenge.title}</h2>
            <p className="mt-2 text-xs text-muted">30-Day Movement Challenge</p>
            <p className="mt-1 text-sm font-bold text-navy">18 / 30 {t.activeChallenge.daysOf}</p>
            <Badge tone="info" label={t.activeChallenge.future} />
          </div>
        </section>

        <section className="mt-7 rounded-2xl border border-dashed border-border bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy">{t.home.marketplacePreview}</h2>
            <Badge tone="warning" label={t.marketplace.comingFuture} />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 text-center text-[10px] text-muted">
            <div className="rounded-xl bg-black/5 py-3">
              🥗
              <p className="mt-1">{t.marketplace.healthyFood}</p>
            </div>
            <div className="rounded-xl bg-black/5 py-3">
              🏋️
              <p className="mt-1">{t.marketplace.sportsGear}</p>
            </div>
            <div className="rounded-xl bg-black/5 py-3">
              📋
              <p className="mt-1">{t.marketplace.trainerPrograms}</p>
            </div>
            <div className="rounded-xl bg-black/5 py-3">
              🎁
              <p className="mt-1">{t.marketplace.healthyGifts}</p>
            </div>
          </div>
        </section>
      </div>
    </PhoneFrame>
  )
}
