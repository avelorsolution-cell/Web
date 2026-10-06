import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import FilterChip from '../../components/ui/FilterChip'
import { trainers } from '../../data/mockData'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'

const TAGS = ['professional', 'motivating', 'knowledgeable', 'punctual', 'greatCommunication'] as const

export default function ReviewSubmit() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { lastBookingId } = useAppState()
  const [rating, setRating] = useState(5)
  const [tags, setTags] = useState<string[]>([])
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const trainer = trainers[0]

  const toggleTag = (tag: string) => setTags((prev) => (prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]))

  if (!lastBookingId) {
    return (
      <PhoneFrame>
        <TopBar title={t.reviewFlow.title} onBack={() => navigate('/subscriber/home')} />
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/5 text-3xl">🔒</div>
          <h1 className="mt-4 text-xl font-extrabold text-navy">{t.reviewFlow.lockedTitle}</h1>
          <p className="mt-2 text-sm text-muted">{t.reviewFlow.lockedBody}</p>
        </div>
      </PhoneFrame>
    )
  }

  if (submitted) {
    return (
      <PhoneFrame>
        <TopBar showBack={false} title="" />
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl">🎉</div>
          <h1 className="mt-4 text-xl font-extrabold text-navy">{t.reviewFlow.thankYou}</h1>
          <div className="mt-3">
            <Badge tone="info" label={t.reviewFlow.verifiedBadge} />
          </div>
          <Button className="mt-6" onClick={() => navigate('/subscriber/home')}>
            {t.common.backToPresentation}
          </Button>
        </div>
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame footer={<Button fullWidth onClick={() => setSubmitted(true)}>{t.reviewFlow.submit}</Button>}>
      <TopBar title={t.reviewFlow.title} />
      <div className="px-5 pb-8 pt-3">
        <div className="flex items-center gap-3">
          <img src={trainer.photo} className="h-14 w-14 rounded-xl object-cover" alt="" />
          <p className="text-base font-semibold text-navy">
            {t.reviewFlow.question} {language === 'ar' ? trainer.nameAr : trainer.name}?
          </p>
        </div>

        <div className="mt-5 flex justify-center gap-2 text-3xl" dir="ltr">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)}>
              {star <= rating ? '⭐' : '☆'}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <FilterChip key={tag} label={t.reviewFlow.tags[tag]} active={tags.includes(tag)} onClick={() => toggleTag(tag)} />
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t.reviewFlow.commentPlaceholder}
          rows={4}
          className="mt-5 w-full rounded-xl border border-border bg-white p-3 text-sm outline-none focus:border-teal"
        />
      </div>
    </PhoneFrame>
  )
}
