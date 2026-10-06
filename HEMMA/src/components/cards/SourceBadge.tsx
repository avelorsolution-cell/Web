import Badge from '../ui/Badge'
import { useLanguage } from '../../i18n/LanguageContext'
import type { AssessmentSource } from '../../data/types'

const icons: Record<AssessmentSource, string> = {
  manual: '✍️',
  uploaded_report: '📄',
  trainer: '🧑‍🏫',
  future_device: '📶',
}

export default function SourceBadge({ source }: { source: AssessmentSource }) {
  const { t } = useLanguage()
  return <Badge tone="info" icon={icons[source]} label={t.bodyAssessment.source[source]} />
}
