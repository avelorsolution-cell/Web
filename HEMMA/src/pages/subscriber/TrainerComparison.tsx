import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/States'
import { getTrainerById } from '../../data/mockData'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'

export default function TrainerComparison() {
  const navigate = useNavigate()
  const { t, language, formatCurrency } = useLanguage()
  const { compareList, toggleCompare } = useAppState()
  const compared = compareList.map((id) => getTrainerById(id)).filter(Boolean) as NonNullable<ReturnType<typeof getTrainerById>>[]

  if (compared.length === 0) {
    return (
      <PhoneFrame>
        <TopBar title={t.compare.title} backTo="/subscriber/trainers" />
        <EmptyState
          title={t.compare.addTrainer}
          body={t.discovery.emptyHint}
          action={<Button onClick={() => navigate('/subscriber/trainers')}>{t.discovery.title}</Button>}
        />
      </PhoneFrame>
    )
  }

  const rows: { label: string; render: (tr: (typeof compared)[number]) => ReactNode }[] = [
    { label: t.compare.columns.verification, render: (tr) => (tr.verified ? <Badge tone="success" label="✓" /> : <Badge tone="neutral" label="—" />) },
    { label: t.compare.columns.rating, render: (tr) => `⭐ ${tr.rating}` },
    { label: t.compare.columns.reviews, render: (tr) => tr.reviewCount },
    { label: t.compare.columns.experience, render: (tr) => `${tr.experienceYears} yrs` },
    { label: t.compare.columns.specialty, render: (tr) => tr.specialties[0] },
    { label: t.compare.columns.location, render: (tr) => (language === 'ar' ? tr.locationAr : tr.location) },
    { label: t.compare.columns.trainingType, render: (tr) => tr.trainingTypes.join(', ') },
    { label: t.compare.columns.languages, render: (tr) => tr.languages.join(', ') },
    { label: t.compare.columns.startingPrice, render: (tr) => formatCurrency(tr.startingPrice) },
    { label: t.compare.columns.availability, render: (tr) => tr.nextAvailable },
    { label: t.compare.columns.packages, render: (tr) => tr.packages.length },
  ]

  return (
    <PhoneFrame>
      <TopBar title={t.compare.title} backTo="/subscriber/trainers" />
      <div className="px-4 pb-8 pt-3">
        <p className="mb-3 text-xs text-muted">{t.compare.subtitle}</p>
        <div className="hemma-scroll overflow-x-auto">
          <table className="w-full min-w-[560px] border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr>
                <th className="w-28"></th>
                {compared.map((tr) => (
                  <th key={tr.id} className="px-2 pb-2 text-start">
                    <img src={tr.photo} className="h-14 w-14 rounded-xl object-cover" alt="" />
                    <p className="mt-1 max-w-[120px] truncate font-bold text-navy">{language === 'ar' ? tr.nameAr : tr.name}</p>
                    <button className="text-xs text-error" onClick={() => toggleCompare(tr.id)}>
                      {t.compare.remove}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="align-top">
                  <td className="rounded-s-lg bg-black/5 px-2 py-2 text-xs font-semibold text-muted">{row.label}</td>
                  {compared.map((tr) => (
                    <td key={tr.id} className="bg-black/5 px-2 py-2 text-xs text-navy">
                      {row.render(tr)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td />
                {compared.map((tr) => (
                  <td key={tr.id} className="px-2 pt-2">
                    <Button className="w-full !text-xs" onClick={() => navigate(`/subscriber/trainers/${tr.id}`)}>
                      {t.compare.chooseTrainer}
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PhoneFrame>
  )
}
