import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { Trainer } from '../../data/types'
import { useLanguage } from '../../i18n/LanguageContext'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

interface TrainerCardProps {
  trainer: Trainer
  onView: () => void
  onFavorite?: () => void
  onCompareToggle?: () => void
  isFavorite?: boolean
  isComparing?: boolean
  showCompare?: boolean
}

export default function TrainerCard({
  trainer,
  onView,
  onFavorite,
  onCompareToggle,
  isFavorite,
  isComparing,
  showCompare = true,
}: TrainerCardProps) {
  const { t, language, formatCurrency } = useLanguage()
  const name = language === 'ar' ? trainer.nameAr : trainer.name
  const location = language === 'ar' ? trainer.locationAr : trainer.location

  return (
    <div className="hemma-animate-in overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:border-teal/30 hover:shadow-lg active:scale-[0.99]">
      <button type="button" onClick={onView} className="flex w-full gap-3 p-4 text-start">
        <img src={trainer.photo} alt={name} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-bold text-navy">{name}</h3>
            {onFavorite && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation()
                  onFavorite()
                }}
                className="ms-auto shrink-0 text-lg"
                aria-label="favorite"
              >
                {isFavorite ? '❤️' : '🤍'}
              </span>
            )}
          </div>
          {trainer.verified && <Badge tone="info" icon="✓" label={t.discovery.verified} />}
          <p className="mt-1 truncate text-sm text-muted">{trainer.specialties[0]}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted">
            <span>⭐ {trainer.rating}</span>
            <span>·</span>
            <span>
              {trainer.reviewCount} {t.discovery.reviews}
            </span>
            <span>·</span>
            <span>
              {trainer.experienceYears} {t.discovery.years}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted">📍 {location}</p>
          <p className="mt-0.5 text-xs text-muted">
            {t.discovery.nextAvailable}: <span className="text-navy">{trainer.nextAvailable}</span>
          </p>
          <p className="mt-1 text-sm font-semibold text-teal-dark">
            {t.discovery.from} {formatCurrency(trainer.startingPrice)} {t.discovery.perSession}
          </p>
        </div>
      </button>
      <div className="flex gap-2 border-t border-border px-4 py-3">
        <Button variant="outline" className="flex-1 !py-2 !text-xs" onClick={onView}>
          {t.discovery.viewProfile}
        </Button>
        {showCompare && onCompareToggle && (
          <Button
            variant={isComparing ? 'primary' : 'ghost'}
            className="flex-1 !py-2 !text-xs"
            onClick={onCompareToggle}
          >
            <AnimatePresence initial={false}>
              {isComparing && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="inline-flex"
                >
                  <Check size={14} strokeWidth={3} />
                </motion.span>
              )}
            </AnimatePresence>
            {t.discovery.compare}
          </Button>
        )}
      </div>
    </div>
  )
}
