import type { TrainerPackage } from '../../data/types'
import { useLanguage } from '../../i18n/LanguageContext'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

interface PackageCardProps {
  pkg: TrainerPackage
  onChoose: () => void
  selected?: boolean
}

const tierLabel: Record<TrainerPackage['tier'], string> = {
  basic: 'BASIC',
  standard: 'STANDARD',
  premium: 'PREMIUM',
}

export default function PackageCard({ pkg, onChoose, selected }: PackageCardProps) {
  const { t, formatCurrency } = useLanguage()
  return (
    <div
      className={[
        'hemma-animate-in relative rounded-2xl border-2 bg-white p-5 shadow-card',
        selected ? 'border-teal' : 'border-border',
      ].join(' ')}
    >
      {pkg.popular && (
        <div className="absolute -top-3 start-5">
          <Badge tone="info" label={t.packages.mostPopular} />
        </div>
      )}
      <p className="text-xs font-bold tracking-wide text-teal-dark">{tierLabel[pkg.tier]}</p>
      <p className="mt-1 text-2xl font-extrabold text-navy">
        {pkg.sessions} {t.packages.sessions}
      </p>
      <p className="mt-1 text-xl font-bold text-navy">{formatCurrency(pkg.price)}</p>
      <ul className="mt-3 space-y-1.5 text-sm text-muted">
        <li>
          {t.packages.sessionDuration}: {pkg.sessionDurationMins} min
        </li>
        <li>
          {t.packages.validity}: {pkg.validityDays} days
        </li>
        {pkg.includedServices.map((s) => (
          <li key={s}>✓ {s}</li>
        ))}
      </ul>
      <Button variant={selected ? 'primary' : 'outline'} fullWidth className="mt-4" onClick={onChoose}>
        {t.packages.choosePackage}
      </Button>
    </div>
  )
}
