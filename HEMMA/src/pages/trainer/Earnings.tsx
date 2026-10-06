import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import TrainerBottomNav from '../../components/layout/TrainerBottomNav'
import LineChart from '../../components/ui/LineChart'
import Badge from '../../components/ui/Badge'
import { trainerEarningsSummary, trainerTransactions } from '../../data/trainerAppData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function TrainerEarnings() {
  const { t, formatCurrency } = useLanguage()
  const { grossQar, commissionRate, refundsQar } = trainerEarningsSummary
  const commission = Math.round(grossQar * commissionRate)
  const net = grossQar - commission - refundsQar

  const monthly = [
    { label: 'Jun', value: 7800 },
    { label: 'Jul', value: 8600 },
    { label: 'Aug', value: 9400 },
    { label: 'Sep', value: net },
  ]

  return (
    <PhoneFrame footer={<TrainerBottomNav active="dashboard" />}>
      <TopBar title={t.trainerEarningsPage.title} showBack={false} />
      <div className="px-5 pb-8 pt-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-white p-3">
            <p className="text-xs text-muted">{t.trainerEarningsPage.gross}</p>
            <p className="mt-1 text-lg font-extrabold text-navy">{formatCurrency(grossQar)}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-3">
            <p className="text-xs text-muted">{t.trainerEarningsPage.commission}</p>
            <p className="mt-1 text-lg font-extrabold text-navy">{formatCurrency(commission)}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-3">
            <p className="text-xs text-muted">{t.trainerEarningsPage.refunds}</p>
            <p className="mt-1 text-lg font-extrabold text-navy">{formatCurrency(refundsQar)}</p>
          </div>
          <div className="rounded-2xl border border-teal bg-teal-light p-3">
            <p className="text-xs text-teal-dark">{t.trainerEarningsPage.trainerEarnings}</p>
            <p className="mt-1 text-lg font-extrabold text-navy">{formatCurrency(net)}</p>
          </div>
        </div>

        <div className="mt-3 flex justify-center">
          <Badge tone="warning" label={t.trainerEarningsPage.commercialModel} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-xl border border-border bg-white p-2">
            <p className="text-muted">{t.trainerEarningsPage.pending}</p>
            <p className="font-bold text-navy">{formatCurrency(520)}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-2">
            <p className="text-muted">{t.trainerEarningsPage.available}</p>
            <p className="font-bold text-navy">{formatCurrency(3480)}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-2">
            <p className="text-muted">{t.trainerEarningsPage.paid}</p>
            <p className="font-bold text-navy">{formatCurrency(4200)}</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-white p-4">
          <p className="mb-2 text-sm font-bold text-navy">Monthly Trend</p>
          <LineChart data={monthly} color="#172033" unit=" QAR" />
        </div>

        <section className="mt-5">
          <h2 className="mb-2 text-sm font-bold text-navy">{t.trainerEarningsPage.transactions}</h2>
          <div className="space-y-2">
            {trainerTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-xl border border-border bg-white p-3 text-sm">
                <div>
                  <p className="font-semibold text-navy">{tx.customer}</p>
                  <p className="text-xs text-muted">{tx.bookingId}</p>
                </div>
                <div className="text-end">
                  <p className="font-semibold text-navy">{formatCurrency(tx.gross)}</p>
                  <Badge tone={tx.status === 'Paid' ? 'success' : 'warning'} label={tx.status} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PhoneFrame>
  )
}
