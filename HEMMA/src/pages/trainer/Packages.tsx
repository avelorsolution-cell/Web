import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { trainers } from '../../data/mockData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function TrainerPackages() {
  const navigate = useNavigate()
  const { t, formatCurrency } = useLanguage()
  const packages = trainers[0].packages
  const featureKeys = ['trainingPlan', 'progressTracking', 'messaging', 'assessmentReview'] as const

  return (
    <PhoneFrame
      footer={
        <Button fullWidth onClick={() => navigate('/subscriber/coming-soon?feature=Create Package')}>
          {t.trainerPackagesPage.createPackage}
        </Button>
      }
    >
      <TopBar title={t.trainerPackagesPage.title} showBack={false} />
      <div className="space-y-3 px-5 pb-8 pt-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase text-teal-dark">{pkg.tier}</p>
              {pkg.popular && <Badge tone="info" label="Most Popular" />}
            </div>
            <p className="mt-1 text-lg font-extrabold text-navy">
              {pkg.sessions} {t.packages.sessions} · {formatCurrency(pkg.price)}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {featureKeys.map((f) => (
                <Badge key={f} tone="neutral" label={t.trainerPackagesPage.includedFeatures[f]} />
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-3 w-full !text-xs"
              onClick={() => navigate('/subscriber/coming-soon?feature=Edit Package')}
            >
              {t.common.save}
            </Button>
          </div>
        ))}
      </div>
    </PhoneFrame>
  )
}
