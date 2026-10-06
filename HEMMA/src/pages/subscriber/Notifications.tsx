import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import { useLanguage } from '../../i18n/LanguageContext'
import { useBi } from '../../i18n/useBi'

export default function Notifications() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const bi = useBi()

  const items = [
    { icon: '⏰', en: 'Your training session starts in 2 hours.', ar: 'تبدأ حصتك التدريبية خلال ساعتين.', time: '1h ago' },
    { icon: '🏋️', en: 'Sarah updated your workout.', ar: 'قامت سارة بتحديث تمرينك.', time: '3h ago' },
    { icon: '📝', en: 'Your weekly check-in is ready.', ar: 'متابعتك الأسبوعية جاهزة الآن.', time: '1d ago' },
    { icon: '📊', en: 'Your body assessment was saved.', ar: 'تم حفظ تقييم جسمك.', time: '2d ago' },
    { icon: '💳', en: 'Payment confirmed.', ar: 'تم تأكيد الدفع.', time: '4d ago' },
    { icon: '✅', en: 'Booking confirmed.', ar: 'تم تأكيد الحجز.', time: '4d ago' },
    { icon: '💬', en: 'New message from Sarah.', ar: 'رسالة جديدة من سارة.', time: '5d ago' },
    { icon: '🏆', en: 'Challenge starting soon.', ar: 'تحدٍ جديد يبدأ قريبًا.', time: '6d ago' },
  ]

  return (
    <PhoneFrame>
      <TopBar title={t.notificationsPage.title} onBack={() => navigate('/subscriber/home')} />
      <div className="space-y-2 px-5 pb-8 pt-3">
        {items.map((n, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-white p-3 shadow-card">
            <span className="text-xl">{n.icon}</span>
            <div className="flex-1">
              <p className="text-sm text-navy">{bi(n.en, n.ar)}</p>
              <p className="mt-0.5 text-[11px] text-muted">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  )
}
