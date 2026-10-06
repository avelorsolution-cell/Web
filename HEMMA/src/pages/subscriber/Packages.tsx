import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import PackageCard from '../../components/cards/PackageCard'
import { getTrainerById } from '../../data/mockData'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'

export default function Packages() {
  const { trainerId } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { booking, setBookingPackage, setBookingTrainer } = useAppState()
  const trainer = getTrainerById(trainerId || '')

  useEffect(() => {
    if (trainer && (!booking.trainer || booking.trainer.id !== trainer.id)) {
      setBookingTrainer(trainer)
    }
  }, [trainer, booking.trainer, setBookingTrainer])

  if (!trainer) return null

  return (
    <PhoneFrame>
      <TopBar title={t.packages.title} backTo={`/subscriber/trainers/${trainerId}`} />
      <div className="space-y-4 px-5 pb-8 pt-3">
        <p className="text-sm text-muted">{t.packages.cancellationSummary}</p>
        {trainer.packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            selected={booking.pkg?.id === pkg.id}
            onChoose={() => {
              setBookingPackage(pkg)
              navigate('/subscriber/booking')
            }}
          />
        ))}
      </div>
    </PhoneFrame>
  )
}
