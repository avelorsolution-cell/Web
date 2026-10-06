import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Calendar from '../../components/ui/Calendar'
import TimeSlot, { type SlotState } from '../../components/ui/TimeSlot'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'
import { EmptyState } from '../../components/ui/States'

type Step = 'date' | 'time' | 'confirm'

const ALL_TIMES = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM']
const BOOKED_TIMES = ['12:00 PM']
const UNAVAILABLE_TIMES = ['08:00 AM']

export default function Booking() {
  const navigate = useNavigate()
  const { t, language, formatCurrency } = useLanguage()
  const { booking, setBookingDate, setBookingTime } = useAppState()
  const [step, setStep] = useState<Step>('date')

  const steps: { id: Step; label: string }[] = [
    { id: 'date', label: t.booking.steps.date },
    { id: 'time', label: t.booking.steps.time },
    { id: 'confirm', label: t.booking.steps.confirm },
  ]

  const timeStates = useMemo<Record<string, SlotState>>(() => {
    const map: Record<string, SlotState> = {}
    ALL_TIMES.forEach((time) => {
      if (booking.time === time) map[time] = 'selected'
      else if (UNAVAILABLE_TIMES.includes(time)) map[time] = 'unavailable'
      else if (BOOKED_TIMES.includes(time)) map[time] = 'booked'
      else map[time] = 'available'
    })
    return map
  }, [booking.time])

  if (!booking.trainer || !booking.pkg) {
    return (
      <PhoneFrame>
        <TopBar title={t.booking.summaryTitle} />
        <EmptyState
          title={t.discovery.empty}
          body="Choose a trainer and package first."
          action={<Button onClick={() => navigate('/subscriber/trainers')}>{t.discovery.title}</Button>}
        />
      </PhoneFrame>
    )
  }

  const trainerName = language === 'ar' ? booking.trainer.nameAr : booking.trainer.name
  const location = language === 'ar' ? booking.trainer.locationAr : booking.trainer.location

  return (
    <PhoneFrame
      footer={
        step === 'date' ? (
          <Button fullWidth disabled={!booking.date} onClick={() => setStep('time')}>
            {t.common.next}
          </Button>
        ) : step === 'time' ? (
          <Button fullWidth disabled={!booking.time} onClick={() => setStep('confirm')}>
            {t.common.next}
          </Button>
        ) : (
          <Button fullWidth onClick={() => navigate('/subscriber/payment')}>
            {t.booking.continueToPayment}
          </Button>
        )
      }
    >
      <TopBar
        title={t.booking.summaryTitle}
        onBack={() => {
          if (step === 'time') setStep('date')
          else if (step === 'confirm') setStep('time')
          else navigate(`/subscriber/trainers/${booking.trainer!.id}/packages`)
        }}
      />

      <div className="px-5 pb-8 pt-3">
        <div className="mb-5 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center gap-2">
              <div
                className={[
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold',
                  step === s.id || steps.findIndex((x) => x.id === step) > i
                    ? 'bg-teal text-white'
                    : 'bg-border text-muted',
                ].join(' ')}
              >
                {i + 1}
              </div>
              <span className="text-xs font-medium text-muted">{s.label}</span>
              {i < steps.length - 1 && <div className="h-px flex-1 bg-border" />}
            </div>
          ))}
        </div>

        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-border bg-white p-3">
          <img src={booking.trainer.photo} className="h-12 w-12 rounded-xl object-cover" alt="" />
          <div>
            <p className="text-sm font-bold text-navy">{trainerName}</p>
            <p className="text-xs text-muted">
              {booking.pkg.sessions} {t.packages.sessions} · {formatCurrency(booking.pkg.price)}
            </p>
          </div>
        </div>

        {step === 'date' && (
          <div>
            <h2 className="mb-3 text-sm font-bold text-navy">{t.booking.selectDate}</h2>
            <Calendar selected={booking.date} onSelect={setBookingDate} unavailableWeekdays={[5]} />
          </div>
        )}

        {step === 'time' && (
          <div>
            <h2 className="mb-3 text-sm font-bold text-navy">{t.booking.selectTime}</h2>
            <div className="grid grid-cols-3 gap-2">
              {ALL_TIMES.map((time) => (
                <TimeSlot key={time} time={time} state={timeStates[time]} onClick={() => setBookingTime(time)} />
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-xs text-muted">
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-warning/20" /> {t.booking.booked}
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded bg-black/10" /> {t.booking.unavailable}
              </span>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-navy">{t.booking.summaryTitle}</h2>
            {[
              { label: t.booking.trainer, value: trainerName },
              { label: t.booking.package, value: `${booking.pkg.sessions} ${t.packages.sessions}` },
              { label: t.booking.trainingType, value: booking.pkg.trainingType },
              { label: t.booking.date, value: booking.date },
              { label: t.booking.time, value: booking.time },
              { label: t.booking.location, value: location },
              { label: t.booking.numberOfSessions, value: booking.pkg.sessions },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b border-border pb-2 text-sm">
                <span className="text-muted">{row.label}</span>
                <span className="font-semibold text-navy">{row.value}</span>
              </div>
            ))}
            <button
              onClick={() => navigate('/subscriber/coming-soon?feature=Cancellation Policy')}
              className="text-sm font-semibold text-teal-dark"
            >
              {t.booking.cancellationPolicyLink}
            </button>
            <div>
              <Badge tone="warning" label="NEEDS CUSTOMER CONFIRMATION" />
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  )
}
