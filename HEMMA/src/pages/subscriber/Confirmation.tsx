import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import SuccessCheck from '../../components/motion/SuccessCheck'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'

export default function Confirmation() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { booking, lastBookingId } = useAppState()

  if (!booking.trainer || !booking.pkg) {
    return (
      <PhoneFrame>
        <TopBar title={t.confirmation.title} backTo="/subscriber/home" />
        <div className="flex h-full items-center justify-center px-8 text-center text-sm text-muted">
          No recent booking found. Start a new booking from Trainer Discovery.
        </div>
      </PhoneFrame>
    )
  }

  const trainerName = language === 'ar' ? booking.trainer.nameAr : booking.trainer.name
  const location = language === 'ar' ? booking.trainer.locationAr : booking.trainer.location

  const rows = [
    { label: t.confirmation.trainer, value: trainerName },
    { label: t.confirmation.package, value: `${booking.pkg.sessions} ${t.packages.sessions}` },
    { label: t.confirmation.date, value: booking.date },
    { label: t.confirmation.time, value: booking.time },
    { label: t.confirmation.location, value: location },
  ]

  return (
    <PhoneFrame
      footer={
        <Button fullWidth onClick={() => navigate('/subscriber/training')}>
          {t.confirmation.goToTraining}
        </Button>
      }
    >
      <TopBar showBack={false} title="" />
      <div className="flex flex-col items-center px-6 pb-8 pt-6 text-center">
        <SuccessCheck size={88} />
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="mt-4 text-2xl font-extrabold text-navy"
        >
          {t.confirmation.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="mt-1 text-sm text-muted"
        >
          {t.confirmation.bookingId}: <span className="font-mono text-navy">{lastBookingId}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.3 }}
          className="mt-6 w-full space-y-3 rounded-2xl border border-border bg-white p-4 text-start">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between border-b border-border pb-2 text-sm last:border-0 last:pb-0">
              <span className="text-muted">{row.label}</span>
              <span className="font-semibold text-navy">{row.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-1 text-sm">
            <span className="text-muted">{t.confirmation.paymentStatus}</span>
            <Badge tone="success" label="Paid" />
          </div>
        </motion.div>

        <div className="mt-5 grid w-full grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => navigate('/subscriber/coming-soon?feature=Calendar Sync')}>
            {t.confirmation.addToCalendar}
          </Button>
          <Button variant="outline" onClick={() => navigate('/subscriber/coming-soon?feature=My Bookings')}>
            {t.confirmation.viewBooking}
          </Button>
          <Button
            variant="outline"
            className="col-span-2"
            onClick={() => navigate(`/subscriber/coming-soon?feature=${encodeURIComponent(t.profile.message)}`)}
          >
            {t.confirmation.messageTrainer}
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted">{t.confirmation.receiptNote}</p>
      </div>
    </PhoneFrame>
  )
}
