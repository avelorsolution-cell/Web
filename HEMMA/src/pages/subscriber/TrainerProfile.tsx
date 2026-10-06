import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { getTrainerById } from '../../data/mockData'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'
import { ErrorState } from '../../components/ui/States'

export default function TrainerProfile() {
  const { trainerId } = useParams()
  const navigate = useNavigate()
  const { t, language, formatCurrency } = useLanguage()
  const { setBookingTrainer, compareList, toggleCompare } = useAppState()
  const [favorite, setFavorite] = useState(false)
  const trainer = getTrainerById(trainerId || '')

  if (!trainer) {
    return (
      <PhoneFrame>
        <TopBar title="" backTo="/subscriber/trainers" />
        <ErrorState title="Trainer not found" action={<Button onClick={() => navigate('/subscriber/trainers')}>{t.discovery.title}</Button>} />
      </PhoneFrame>
    )
  }

  const name = language === 'ar' ? trainer.nameAr : trainer.name
  const location = language === 'ar' ? trainer.locationAr : trainer.location
  const bio = language === 'ar' ? trainer.bioAr : trainer.bio

  const handleBook = () => {
    setBookingTrainer(trainer)
    navigate(`/subscriber/trainers/${trainer.id}/packages`)
  }

  return (
    <PhoneFrame
      footer={
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFavorite((f) => !f)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-border text-xl"
            aria-label="favorite"
          >
            {favorite ? '❤️' : '🤍'}
          </button>
          <button
            onClick={() => toggleCompare(trainer.id)}
            className={[
              'flex h-12 w-12 items-center justify-center rounded-xl border text-xs font-bold',
              compareList.includes(trainer.id) ? 'border-teal bg-teal-light text-teal-dark' : 'border-border text-navy',
            ].join(' ')}
            aria-label={t.discovery.compare}
          >
            ⇄
          </button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(`/subscriber/coming-soon?feature=${encodeURIComponent(t.profile.message)}`)}
          >
            {t.profile.message}
          </Button>
          <Button className="flex-1" onClick={handleBook}>
            {t.profile.bookNow}
          </Button>
        </div>
      }
    >
      <TopBar transparent title="" backTo="/subscriber/trainers" />
      <div className="-mt-14">
        <img src={trainer.photo} alt={name} className="h-64 w-full object-cover" />
        <div className="rounded-t-3xl bg-white px-5 pb-6 pt-5 -mt-6 relative">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-navy">{name}</h1>
              {trainer.verified && <Badge tone="info" icon="✓" label={t.discovery.verified} />}
            </div>
            <div className="text-end">
              <p className="text-sm font-semibold text-navy">⭐ {trainer.rating}</p>
              <p className="text-xs text-muted">
                {trainer.reviewCount} {t.discovery.reviews}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            <span>
              🏆 {trainer.experienceYears} {t.discovery.years}
            </span>
            <span>📍 {location}</span>
            <span>🗣 {trainer.languages.join(', ')}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {trainer.trainingTypes.map((type) => (
              <Badge key={type} tone="neutral" label={type} />
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-teal-light px-3 py-2.5 text-xs">
            <span className="text-navy">
              {t.discovery.nextAvailable}: <span className="font-semibold">{trainer.nextAvailable}</span>
            </span>
            <span className="font-bold text-teal-dark">
              {t.discovery.from} {formatCurrency(trainer.startingPrice)}
            </span>
          </div>

          <section className="mt-5">
            <h2 className="text-sm font-bold text-navy">{t.profile.about}</h2>
            <p className="mt-1.5 text-sm text-muted">{bio}</p>
          </section>

          <section className="mt-5">
            <h2 className="text-sm font-bold text-navy">{t.profile.specialties}</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {trainer.specialties.map((s) => (
                <Badge key={s} tone="info" label={s} />
              ))}
            </div>
          </section>

          <section className="mt-5">
            <h2 className="text-sm font-bold text-navy">{t.profile.certifications}</h2>
            <div className="mt-2 space-y-2">
              {trainer.certifications.map((c) => (
                <div key={c.name} className="flex items-center justify-between rounded-xl border border-border p-3">
                  <span className="text-sm text-navy">{c.name}</span>
                  {c.verified && <Badge tone="success" icon="✓" label={t.profile.verifiedCertificate} />}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-5">
            <h2 className="text-sm font-bold text-navy">{t.profile.achievements}</h2>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {trainer.achievements.map((a) => (
                <li key={a}>🏅 {a}</li>
              ))}
            </ul>
          </section>

          <section className="mt-5">
            <h2 className="mb-2 text-sm font-bold text-navy">{t.profile.photos}</h2>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/${trainer.id}-${i}/200/200`}
                  className="aspect-square w-full rounded-xl object-cover"
                  alt=""
                />
              ))}
            </div>
          </section>

          <section className="mt-5 flex items-center justify-between rounded-xl border border-border p-3">
            <span className="text-sm font-semibold text-navy">🎥 {t.profile.videos}</span>
            <span className="text-xs text-muted">2 videos</span>
          </section>

          <section className="mt-5 flex items-center justify-between rounded-xl border border-border p-3">
            <span className="text-sm font-semibold text-navy">🗓 {t.profile.availability}</span>
            <span className="text-xs text-teal-dark">{trainer.nextAvailable}</span>
          </section>

          <section className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-bold text-navy">{t.profile.reviews}</h2>
              <span className="text-xs text-muted">{trainer.reviewCount}</span>
            </div>
            {trainer.reviews.length === 0 ? (
              <p className="text-sm text-muted">—</p>
            ) : (
              <div className="space-y-3">
                {trainer.reviews.map((r) => (
                  <div key={r.id} className="rounded-xl border border-border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-navy">{r.reviewerName}</span>
                      <span className="text-xs">{'⭐'.repeat(r.rating)}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{r.comment}</p>
                    {r.verified && <Badge tone="info" label="VERIFIED REVIEW" />}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mt-5 mb-2">
            <h2 className="text-sm font-bold text-navy">{t.profile.packages}</h2>
            <button
              onClick={() => navigate(`/subscriber/trainers/${trainer.id}/packages`)}
              className="mt-2 w-full rounded-xl border border-teal bg-teal-light p-3 text-start text-sm font-semibold text-teal-dark"
            >
              {t.packages.title} ({trainer.packages.length}) →
            </button>
          </section>
        </div>
      </div>
    </PhoneFrame>
  )
}
