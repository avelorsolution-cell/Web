import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import TrainerBottomNav from '../../components/layout/TrainerBottomNav'
import SearchBar from '../../components/ui/SearchBar'
import Badge from '../../components/ui/Badge'
import ProgressBar from '../../components/ui/ProgressBar'
import { EmptyState } from '../../components/ui/States'
import { StaggerGroup, StaggerItem } from '../../components/motion/Stagger'
import { trainerClients } from '../../data/trainerAppData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function TrainerClients() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const [query, setQuery] = useState('')

  const filtered = trainerClients.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <PhoneFrame footer={<TrainerBottomNav active="clients" />}>
      <TopBar title={t.trainerClientsPage.title} showBack={false} />
      <div className="px-5 pb-8 pt-3">
        <SearchBar placeholder={t.trainerClientsPage.searchPlaceholder} value={query} onChange={setQuery} />

        {filtered.length === 0 && <EmptyState icon="🧑‍🤝‍🧑" title="No Clients" body="No clients match your search." />}

        <StaggerGroup className="mt-4 space-y-3">
          {filtered.map((c) => (
            <StaggerItem key={c.id}>
            <button
              onClick={() => navigate(`/trainer/clients/${c.id}`)}
              className="w-full rounded-2xl border border-border bg-white p-4 text-start shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:border-teal/30 hover:shadow-lg active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <img src={c.photo} className="h-12 w-12 rounded-full object-cover" alt="" />
                <div className="flex-1">
                  <p className="font-bold text-navy">{language === 'ar' ? c.nameAr : c.name}</p>
                  <p className="text-xs text-muted">
                    {t.trainerClientsPage.goal}: {language === 'ar' ? c.goalAr : c.goal}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted">
                <span>
                  {t.trainerClientsPage.sessions}: {c.sessionsUsed}/{c.sessionsTotal}
                </span>
                <span>
                  {t.trainerClientsPage.compliance}: {c.compliance}%
                </span>
              </div>
              <div className="mt-1.5">
                <ProgressBar value={c.sessionsUsed} max={c.sessionsTotal} />
              </div>
              <p className="mt-2 text-xs text-muted">
                {t.trainerClientsPage.nextSession}: <span className="font-semibold text-navy">{c.nextSession}</span>
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {c.tags.map((tag) => (
                  <Badge
                    key={tag}
                    tone={tag === 'needsFollowUp' ? 'warning' : tag === 'packageExpiring' ? 'warning' : 'info'}
                    label={t.trainerClientsPage.tags[tag]}
                  />
                ))}
              </div>
            </button>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </PhoneFrame>
  )
}
