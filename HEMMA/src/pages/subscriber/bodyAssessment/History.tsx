import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../../components/layout/PhoneFrame'
import TopBar from '../../../components/layout/TopBar'
import Button from '../../../components/ui/Button'
import SourceBadge from '../../../components/cards/SourceBadge'
import { EmptyState } from '../../../components/ui/States'
import { useLanguage } from '../../../i18n/LanguageContext'
import { useBodyAssessments } from '../../../context/BodyAssessmentContext'

export default function BodyAssessmentHistory() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { assessments } = useBodyAssessments()

  return (
    <PhoneFrame
      footer={
        assessments.length > 0 ? (
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => navigate('/subscriber/body-assessment')}>
              {t.bodyAssessment.history.addNew}
            </Button>
            {assessments.length > 1 && (
              <Button className="flex-1" onClick={() => navigate('/subscriber/body-assessment/compare')}>
                {t.bodyAssessment.history.compareCta}
              </Button>
            )}
          </div>
        ) : undefined
      }
    >
      <TopBar title={t.bodyAssessment.history.title} backTo="/subscriber/body-assessment" />
      <div className="px-5 pb-8 pt-3">
        {assessments.length === 0 && (
          <EmptyState
            icon="📋"
            title={t.bodyAssessment.history.empty}
            action={<Button onClick={() => navigate('/subscriber/body-assessment')}>{t.bodyAssessment.doItNow}</Button>}
          />
        )}

        <div className="relative space-y-4 ps-4">
          {assessments.length > 0 && <div className="absolute bottom-2 top-2 start-[7px] w-px bg-border" />}
          {assessments.map((a) => (
            <button
              key={a.id}
              onClick={() => navigate(`/subscriber/body-assessment/${a.id}`)}
              className="relative block w-full rounded-2xl border border-border bg-white p-4 text-start shadow-card"
            >
              <div className="absolute -start-4 top-5 h-3.5 w-3.5 rounded-full border-2 border-white bg-teal" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-navy">
                  {new Date(a.assessmentDate).toLocaleDateString(language === 'ar' ? 'ar-QA' : 'en-QA', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <SourceBadge source={a.source} />
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                {a.weightKg !== undefined && (
                  <span>
                    {t.bodyAssessment.fields.weight} <span className="font-semibold text-navy">{a.weightKg} kg</span>
                  </span>
                )}
                {a.bmi !== undefined && (
                  <span>
                    {t.bodyAssessment.fields.bmi} <span className="font-semibold text-navy">{a.bmi}</span>
                  </span>
                )}
                {a.bodyFatPercent !== undefined && (
                  <span>
                    {t.bodyAssessment.fields.bodyFatPercent}{' '}
                    <span className="font-semibold text-navy">{a.bodyFatPercent}%</span>
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
