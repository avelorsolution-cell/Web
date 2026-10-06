import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import BottomNav from '../../components/layout/BottomNav'
import FilterChip from '../../components/ui/FilterChip'
import SearchBar from '../../components/ui/SearchBar'
import TrainerCard from '../../components/cards/TrainerCard'
import { StaggerGroup, StaggerItem } from '../../components/motion/Stagger'
import BottomSheet from '../../components/ui/BottomSheet'
import Toggle from '../../components/ui/Toggle'
import Button from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/States'
import { sports, trainers, locations } from '../../data/mockData'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'
import type { TrainingType } from '../../data/types'

export default function TrainerDiscovery() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { t, language } = useLanguage()
  const { compareList, toggleCompare } = useAppState()
  const [favorites, setFavorites] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)

  const activeSport = params.get('sport')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [trainingType, setTrainingType] = useState<TrainingType | null>(null)
  const [location, setLocation] = useState<string | null>(null)

  const activeFilterCount = [verifiedOnly, trainingType, location].filter(Boolean).length

  const results = useMemo(() => {
    return trainers.filter((tr) => {
      if (activeSport && !tr.sportIds.includes(activeSport)) return false
      if (verifiedOnly && !tr.verified) return false
      if (trainingType && !tr.trainingTypes.includes(trainingType)) return false
      if (location && tr.location !== location) return false
      return true
    })
  }, [activeSport, verifiedOnly, trainingType, location])

  const setSport = (id: string | null) => {
    if (id) setParams({ sport: id })
    else setParams({})
  }

  const activeSportLabel = activeSport
    ? t.sports[sports.find((s) => s.id === activeSport)?.labelKey ?? 'fitness']
    : null

  return (
    <PhoneFrame
      footer={
        compareList.length > 0 ? (
          <Button fullWidth onClick={() => navigate('/subscriber/trainers/compare')}>
            {t.discovery.compare} ({compareList.length})
          </Button>
        ) : (
          <BottomNav active="discover" />
        )
      }
    >
      <TopBar title={t.discovery.title} showBack={false} />
      <div className="px-5 pb-6 pt-3">
        <SearchBar placeholder={t.home.searchPlaceholder} readOnly />

        <div className="hemma-scroll mt-4 flex gap-2 overflow-x-auto pb-1">
          <FilterChip label={t.filters.title} icon="⚙️" active={activeFilterCount > 0} onClick={() => setFiltersOpen(true)} />
          <FilterChip label={language === 'ar' ? 'الكل' : 'All'} active={!activeSport} onClick={() => setSport(null)} />
          {sports.map((s) => (
            <FilterChip
              key={s.id}
              label={t.sports[s.labelKey]}
              icon={s.icon}
              active={activeSport === s.id}
              onClick={() => setSport(s.id)}
            />
          ))}
        </div>

        {activeSportLabel && (
          <p className="mt-3 text-xs text-muted">
            {t.discovery.resultsFor} <span className="font-semibold text-navy">{activeSportLabel}</span>
          </p>
        )}

        <StaggerGroup className="mt-4 space-y-3">
          {results.length === 0 && <EmptyState title={t.discovery.empty} body={t.discovery.emptyHint} />}
          {results.map((tr) => (
            <StaggerItem key={tr.id}>
              <TrainerCard
                trainer={tr}
                onView={() => navigate(`/subscriber/trainers/${tr.id}`)}
                onFavorite={() => setFavorites((f) => (f.includes(tr.id) ? f.filter((id) => id !== tr.id) : [...f, tr.id]))}
                isFavorite={favorites.includes(tr.id)}
                isComparing={compareList.includes(tr.id)}
                onCompareToggle={() => toggleCompare(tr.id)}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <BottomSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title={t.filters.title}
        footer={
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setVerifiedOnly(false)
                setTrainingType(null)
                setLocation(null)
              }}
            >
              {t.filters.reset}
            </Button>
            <Button className="flex-1" onClick={() => setFiltersOpen(false)}>
              {t.filters.apply}
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-navy">{t.filters.verifiedOnly}</span>
            <Toggle checked={verifiedOnly} onChange={setVerifiedOnly} />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-navy">{t.filters.trainingType}</p>
            <div className="flex flex-wrap gap-2">
              {(['in-person', 'online', 'group', 'digital'] as TrainingType[]).map((type) => (
                <FilterChip
                  key={type}
                  label={type}
                  active={trainingType === type}
                  onClick={() => setTrainingType(trainingType === type ? null : type)}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-navy">{t.filters.location}</p>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <FilterChip key={loc} label={loc} active={location === loc} onClick={() => setLocation(location === loc ? null : loc)} />
              ))}
            </div>
          </div>
        </div>
      </BottomSheet>
    </PhoneFrame>
  )
}
