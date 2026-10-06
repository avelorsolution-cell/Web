import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import FilterChip from '../../components/ui/FilterChip'
import { LoadingState } from '../../components/ui/States'
import SuccessCheck from '../../components/motion/SuccessCheck'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'

type Outcome = 'success' | 'failed' | 'cancelled'
type Stage = 'checkout' | 'processing' | Outcome

const PLATFORM_FEE = 10

export default function Payment() {
  const navigate = useNavigate()
  const { t, formatCurrency } = useLanguage()
  const { booking, setLastBookingId } = useAppState()
  const reduceMotion = useReducedMotion()
  const [method, setMethod] = useState<'card' | 'apple' | 'google' | 'saved'>('saved')
  const [stage, setStage] = useState<Stage>('checkout')
  const [outcome, setOutcome] = useState<Outcome>('success')

  useEffect(() => {
    if (stage !== 'processing') return
    const timer = setTimeout(() => setStage(outcome), 1600)
    return () => clearTimeout(timer)
  }, [stage, outcome])

  useEffect(() => {
    if (stage === 'success') {
      const isCanonicalBooking = booking.trainer?.id === 'trn-sarah-ahmed' && booking.pkg?.tier === 'standard'
      const id = isCanonicalBooking ? 'HM-482913' : `HM-${Math.floor(100000 + Math.random() * 900000)}`
      setLastBookingId(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, setLastBookingId])

  if (!booking.pkg || !booking.trainer) {
    navigate('/subscriber/trainers')
    return null
  }

  const subtotal = booking.pkg.price
  const discount = 0
  const total = subtotal - discount + PLATFORM_FEE

  if (stage === 'processing') {
    return (
      <PhoneFrame>
        <TopBar showBack={false} title={t.payment.title} />
        <LoadingState label={t.payment.processing} />
        <p className="px-8 text-center text-xs text-muted">{t.payment.processingHint}</p>
      </PhoneFrame>
    )
  }

  if (stage === 'success') {
    return (
      <PhoneFrame
        footer={
          <Button fullWidth onClick={() => navigate('/subscriber/confirmation')}>
            {t.common.continue}
          </Button>
        }
      >
        <TopBar showBack={false} title="" />
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <SuccessCheck size={88} />
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="mt-5 text-2xl font-extrabold text-navy"
          >
            {t.payment.successTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="mt-2 text-sm text-muted"
          >
            {formatCurrency(total)}
          </motion.p>
        </div>
      </PhoneFrame>
    )
  }

  if (stage === 'failed') {
    return (
      <PhoneFrame
        footer={
          <div className="space-y-2">
            <Button fullWidth onClick={() => setStage('checkout')}>
              {t.payment.tryAgain}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStage('checkout')}>
                {t.payment.chooseAnotherMethod}
              </Button>
              <Button variant="ghost" className="flex-1" onClick={() => navigate('/subscriber/booking')}>
                {t.common.cancel}
              </Button>
            </div>
          </div>
        }
      >
        <TopBar showBack={false} title="" />
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <motion.div
            initial={reduceMotion ? false : { x: 0 }}
            animate={reduceMotion ? undefined : { x: [0, -8, 8, -5, 5, 0] }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-error/10 text-4xl"
          >
            ✕
          </motion.div>
          <h1 className="mt-5 text-2xl font-extrabold text-navy">{t.payment.failedTitle}</h1>
          <p className="mt-2 text-sm text-muted">{t.payment.failedBody}</p>
          <p className="mt-1 text-xs text-muted">Your booking has not been confirmed.</p>
        </div>
      </PhoneFrame>
    )
  }

  if (stage === 'cancelled') {
    return (
      <PhoneFrame
        footer={
          <Button fullWidth onClick={() => setStage('checkout')}>
            {t.payment.chooseAnotherMethod}
          </Button>
        }
      >
        <TopBar showBack={false} title="" />
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warning/10 text-4xl">⏸</div>
          <h1 className="mt-5 text-2xl font-extrabold text-navy">{t.payment.cancelledTitle}</h1>
          <p className="mt-2 text-sm text-muted">{t.payment.cancelledBody}</p>
        </div>
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame
      footer={
        <Button fullWidth onClick={() => setStage('processing')}>
          {t.payment.payAndConfirm}
        </Button>
      }
    >
      <TopBar title={t.payment.title} backTo="/subscriber/booking" />
      <div className="space-y-5 px-5 pb-8 pt-3">
        <div className="flex items-center justify-between rounded-xl bg-warning/10 px-3 py-2.5">
          <span className="text-xs font-bold uppercase tracking-wide text-warning">Demo Payment</span>
          <span className="text-[11px] text-warning">No real transaction will occur</span>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">{t.payment.subtotal}</span>
            <span className="text-navy">{formatCurrency(subtotal)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted">{t.payment.discount}</span>
            <span className="text-navy">{formatCurrency(discount)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted">{t.payment.platformFee}</span>
            <span className="text-navy">{formatCurrency(PLATFORM_FEE)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-base font-bold">
            <span className="text-navy">{t.payment.total}</span>
            <span className="text-teal-dark">{formatCurrency(total)}</span>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-bold text-navy">{t.payment.methods}</h2>
          <div className="space-y-2">
            {(
              [
                { id: 'saved', label: t.payment.savedCard, icon: '💳' },
                { id: 'card', label: t.payment.card, icon: '💳' },
                { id: 'apple', label: t.payment.applePay, icon: '🍎' },
                { id: 'google', label: t.payment.googlePay, icon: '🔵' },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={[
                  'flex w-full items-center gap-3 rounded-xl border-2 p-3 text-start text-sm font-medium',
                  method === m.id ? 'border-teal bg-teal-light' : 'border-border bg-white',
                ].join(' ')}
              >
                <span>{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-warning/10 p-3 text-xs text-warning">{t.payment.demoNotice}</div>

        <div className="rounded-xl border border-dashed border-border p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Presenter: simulate outcome</p>
          <div className="flex gap-2">
            <FilterChip label="Success" active={outcome === 'success'} onClick={() => setOutcome('success')} />
            <FilterChip label="Failed" active={outcome === 'failed'} onClick={() => setOutcome('failed')} />
            <FilterChip label="Cancelled" active={outcome === 'cancelled'} onClick={() => setOutcome('cancelled')} />
          </div>
        </div>

        <Badge tone="info" label={t.common.demoNotice} />
      </div>
    </PhoneFrame>
  )
}
