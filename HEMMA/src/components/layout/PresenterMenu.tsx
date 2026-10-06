import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'
import { useBodyAssessments } from '../../context/BodyAssessmentContext'

const categories: { label: string; links: { label: string; path: string }[] }[] = [
  {
    label: 'SUBSCRIBER',
    links: [
      { label: 'Home', path: '/subscriber/home' },
      { label: 'Discovery', path: '/subscriber/trainers' },
      { label: 'Compare', path: '/subscriber/trainers/compare' },
      { label: 'Trainer Profile', path: '/subscriber/trainers/trn-sarah-ahmed' },
      { label: 'Booking', path: '/subscriber/booking' },
      { label: 'Payment', path: '/subscriber/payment' },
      { label: 'Confirmation', path: '/subscriber/confirmation' },
      { label: 'My Training', path: '/subscriber/training' },
      { label: 'Program', path: '/subscriber/training/program' },
      { label: 'Workout', path: '/subscriber/training/workout' },
      { label: 'Training Calendar', path: '/subscriber/training/calendar' },
      { label: 'Body Assessment', path: '/subscriber/body-assessment' },
      { label: 'Upload Report', path: '/subscriber/body-assessment/upload' },
      { label: 'Manual Assessment', path: '/subscriber/body-assessment/manual' },
      { label: 'Assessment Compare', path: '/subscriber/body-assessment/compare' },
      { label: 'Progress', path: '/subscriber/progress' },
      { label: 'Check-In', path: '/subscriber/check-in' },
      { label: 'Chat', path: '/subscriber/messages' },
      { label: 'Review', path: '/subscriber/review' },
    ],
  },
  {
    label: 'TRAINER',
    links: [
      { label: 'Dashboard', path: '/trainer/dashboard' },
      { label: 'Calendar', path: '/trainer/calendar' },
      { label: 'Clients', path: '/trainer/clients' },
      { label: 'Maha Profile', path: '/trainer/clients/sub-maha' },
      { label: 'Maha Progress', path: '/trainer/clients/sub-maha' },
      { label: 'Program Builder', path: '/trainer/program-builder' },
      { label: 'Check-Ins', path: '/trainer/check-ins' },
      { label: 'Packages', path: '/trainer/packages' },
      { label: 'Earnings', path: '/trainer/earnings' },
      { label: 'Verification', path: '/trainer/verification' },
    ],
  },
  {
    label: 'ADMIN',
    links: [
      { label: 'Dashboard', path: '/admin/dashboard' },
      { label: 'Trainer Verification', path: '/admin/verification' },
      { label: 'Users', path: '/admin/users' },
      { label: 'Bookings', path: '/admin/bookings' },
      { label: 'Finance', path: '/admin/finance' },
      { label: 'Complaints', path: '/admin/complaints' },
      { label: 'Reports', path: '/admin/reports' },
      { label: 'Settings', path: '/admin/settings' },
    ],
  },
  {
    label: 'MEETING',
    links: [
      { label: 'Business Decisions', path: '/business-decisions' },
      { label: 'Edge Cases', path: '/edge-cases' },
      { label: 'Future Ecosystem', path: '/future-roadmap' },
    ],
  },
]

export default function PresenterMenu() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState(0)
  const navigate = useNavigate()
  const { t, setLanguage, language } = useLanguage()
  const { resetPrototype } = useAppState()
  const { resetAssessments } = useBodyAssessments()

  return (
    <div className="fixed bottom-5 end-5 z-[100]">
      {open && (
        <div className="hemma-animate-in mb-3 w-72 rounded-2xl border border-border bg-white p-3 shadow-popover">
          <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-muted">Presenter Navigator</p>
          <div className="mb-2 flex gap-1 overflow-x-auto">
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setTab(i)}
                className={[
                  'shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold',
                  tab === i ? 'bg-teal text-white' : 'bg-black/5 text-navy',
                ].join(' ')}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex max-h-72 flex-col gap-0.5 overflow-y-auto">
            {categories[tab].links.map((l) => (
              <button
                key={l.path}
                onClick={() => {
                  navigate(l.path)
                  setOpen(false)
                }}
                className="rounded-lg px-3 py-1.5 text-start text-sm text-navy hover:bg-teal-light"
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="mt-2 border-t border-border pt-2">
            <button
              onClick={() => {
                setLanguage(language === 'en' ? 'ar' : 'en')
                setOpen(false)
              }}
              className="w-full rounded-lg px-3 py-2 text-start text-sm text-navy hover:bg-teal-light"
            >
              {t.experiences.arabic} Demo ({language === 'en' ? 'EN → AR' : 'AR → EN'})
            </button>
            <button
              onClick={() => {
                navigate('/')
                setOpen(false)
              }}
              className="w-full rounded-lg px-3 py-2 text-start text-sm text-navy hover:bg-teal-light"
            >
              {t.common.backToPresentation}
            </button>
            <button
              onClick={() => {
                resetPrototype()
                resetAssessments()
                navigate('/')
                setOpen(false)
              }}
              className="w-full rounded-lg px-3 py-2 text-start text-sm text-error hover:bg-error/10"
            >
              {t.common.resetDemo}
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-lg text-white shadow-popover"
        aria-label="Presenter"
        title="Presenter"
      >
        🎛️
      </button>
    </div>
  )
}
