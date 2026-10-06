import { useState } from 'react'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/States'
import { trainerCheckIns } from '../../data/trainerAppData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function TrainerCheckIns() {
  const { t, language } = useLanguage()
  const [selectedId, setSelectedId] = useState(trainerCheckIns[0]?.id)
  const [reviewed, setReviewed] = useState<string[]>(trainerCheckIns.filter((c) => c.status === 'reviewed').map((c) => c.id))
  const selected = trainerCheckIns.find((c) => c.id === selectedId)

  return (
    <PhoneFrame>
      <TopBar title={t.trainerCheckInsPage.title} backTo="/trainer/dashboard" />
      <div className="px-5 pb-8 pt-3">
        {trainerCheckIns.length === 0 ? (
          <EmptyState icon="📝" title="No check-ins submitted yet." />
        ) : (
          <>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {trainerCheckIns.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={[
                    'flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold',
                    selectedId === c.id ? 'border-teal bg-teal-light text-teal-dark' : 'border-border bg-white text-navy',
                  ].join(' ')}
                >
                  {language === 'ar' ? c.clientNameAr : c.clientName}
                  <Badge
                    tone={reviewed.includes(c.id) ? 'neutral' : 'warning'}
                    label={reviewed.includes(c.id) ? t.trainerCheckInsPage.reviewed : t.trainerCheckInsPage.new}
                  />
                </button>
              ))}
            </div>

            {selected && (
              <div className="mt-4 rounded-2xl border border-border bg-white p-4">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <p className="text-muted">{t.checkIn.fields.energy}</p>
                    <p className="text-lg font-bold text-navy">{selected.energy}</p>
                  </div>
                  <div>
                    <p className="text-muted">{t.checkIn.fields.motivation}</p>
                    <p className="text-lg font-bold text-navy">{selected.motivation}</p>
                  </div>
                  <div>
                    <p className="text-muted">{t.checkIn.fields.soreness}</p>
                    <p className="text-lg font-bold text-navy">{selected.soreness}</p>
                  </div>
                  <div>
                    <p className="text-muted">{t.checkIn.fields.sleepQuality}</p>
                    <p className="text-lg font-bold text-navy">{selected.sleep}</p>
                  </div>
                  <div>
                    <p className="text-muted">{t.checkIn.fields.stress}</p>
                    <p className="text-lg font-bold text-navy">{selected.stress}</p>
                  </div>
                </div>
                <p className="mt-3 rounded-lg bg-black/5 p-2.5 text-sm text-navy">
                  {language === 'ar' ? selected.commentAr : selected.comment}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button variant="outline" className="!text-xs">
                    {t.trainerCheckInsPage.reply}
                  </Button>
                  <Button variant="outline" className="!text-xs">
                    {t.trainerCheckInsPage.adjustProgram}
                  </Button>
                  <Button
                    variant={reviewed.includes(selected.id) ? 'primary' : 'outline'}
                    className="col-span-2 !text-xs"
                    onClick={() => setReviewed((prev) => (prev.includes(selected.id) ? prev : [...prev, selected.id]))}
                  >
                    {t.trainerCheckInsPage.markReviewed}
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </PhoneFrame>
  )
}
