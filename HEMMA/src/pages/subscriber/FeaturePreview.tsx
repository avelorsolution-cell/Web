import { useNavigate, useSearchParams } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import { useLanguage } from '../../i18n/LanguageContext'

export default function FeaturePreview() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { t } = useLanguage()
  const feature = params.get('feature') || 'This screen'

  return (
    <PhoneFrame>
      <TopBar title={feature} />
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-light text-3xl">🚧</div>
        <span className="mt-4 inline-block rounded-full bg-warning/10 px-4 py-1 text-sm font-semibold text-warning">
          {t.common.comingSoon}
        </span>
        <p className="mt-4 text-sm text-muted">{t.common.comingSoonBody}</p>
        <Button className="mt-8" variant="outline" onClick={() => navigate(-1)}>
          {t.common.back}
        </Button>
      </div>
    </PhoneFrame>
  )
}
