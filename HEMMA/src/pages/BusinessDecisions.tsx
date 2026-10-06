import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import FilterChip from '../components/ui/FilterChip'
import LanguageToggle from '../components/layout/LanguageToggle'
import { decisionItems, type DecisionStatus } from '../data/businessDecisionsData'
import { useLanguage } from '../i18n/LanguageContext'

const GROUP_LABELS: Record<string, { en: string; ar: string }> = {
  booking: { en: 'Booking', ar: 'الحجز' },
  finance: { en: 'Finance', ar: 'المالية' },
  training: { en: 'Training', ar: 'التدريب' },
  bodyAssessment: { en: 'Body Assessment', ar: 'تقييم الجسم' },
  kids: { en: 'Kids', ar: 'الأطفال' },
  future: { en: 'Future', ar: 'مستقبلي' },
}

const statusTone: Record<DecisionStatus, 'success' | 'warning' | 'info' | 'neutral'> = {
  approved: 'success',
  proposed: 'info',
  needsDecision: 'warning',
  future: 'neutral',
}

export default function BusinessDecisions() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const [filter, setFilter] = useState<DecisionStatus | 'all'>('all')

  const groups = Object.keys(GROUP_LABELS) as (keyof typeof GROUP_LABELS)[]
  const filtered = filter === 'all' ? decisionItems : decisionItems.filter((d) => d.status === filter)

  return (
    <div className="min-h-screen bg-bg px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-sm font-semibold text-muted hover:text-navy">
            ← {t.businessDecisions.backToPresentation}
          </button>
          <LanguageToggle compact />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-navy">{t.businessDecisions.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">{t.businessDecisions.subtitle}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <FilterChip label={language === 'ar' ? 'الكل' : 'All'} active={filter === 'all'} onClick={() => setFilter('all')} />
          {(['needsDecision', 'proposed', 'future', 'approved'] as DecisionStatus[]).map((s) => (
            <FilterChip key={s} label={t.businessDecisions.status[s]} active={filter === s} onClick={() => setFilter(s)} />
          ))}
        </div>

        <div className="mt-8 space-y-8">
          {groups.map((group) => {
            const items = filtered.filter((d) => d.group === group)
            if (items.length === 0) return null
            return (
              <section key={group}>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-teal-dark">
                  {language === 'ar' ? GROUP_LABELS[group].ar : GROUP_LABELS[group].en}
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {items.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-border bg-white p-4 shadow-card">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-navy">{language === 'ar' ? item.decisionAr : item.decision}</h3>
                        <Badge tone={statusTone[item.status]} label={t.businessDecisions.status[item.status]} />
                      </div>
                      <p className="mt-2 text-xs text-muted">
                        {language === 'ar' ? item.assumptionAr : item.assumption}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {(language === 'ar' ? item.optionsAr : item.options).map((opt) => (
                          <span key={opt} className="rounded-full bg-black/5 px-2.5 py-1 text-[11px] text-navy">
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
