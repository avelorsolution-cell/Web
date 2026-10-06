import { useNavigate } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import LanguageToggle from '../components/layout/LanguageToggle'
import { useLanguage } from '../i18n/LanguageContext'
import { useBi } from '../i18n/useBi'

const phases = [
  {
    title: 'Phase 1 / MVP',
    titleAr: 'المرحلة 1 / الإطلاق الأولي',
    tone: 'success' as const,
    items: ['Trainer Discovery', 'Comparison', 'Booking', 'Payment', 'Training', 'Progress', 'Body Assessment', 'Chat', 'Reviews', 'Trainer Management', 'Admin Operations'],
    itemsAr: ['اكتشاف المدربين', 'المقارنة', 'الحجز', 'الدفع', 'التدريب', 'التقدم', 'تقييم الجسم', 'المحادثة', 'التقييمات', 'إدارة المدربين', 'عمليات الإدارة'],
  },
  {
    title: 'Phase 2',
    titleAr: 'المرحلة 2',
    tone: 'info' as const,
    items: ['Challenges', 'Habits', 'Rewards', 'Advanced Coaching'],
    itemsAr: ['التحديات', 'العادات', 'المكافآت', 'تدريب متقدم'],
  },
  {
    title: 'Phase 3',
    titleAr: 'المرحلة 3',
    tone: 'warning' as const,
    items: ['Marketplace', 'Trainer Store', 'Healthy Food', 'Healthy Gifting', 'Partners'],
    itemsAr: ['المتجر', 'متجر المدرب', 'طعام صحي', 'هدايا صحية', 'الشركاء'],
  },
  {
    title: 'Phase 4',
    titleAr: 'المرحلة 4',
    tone: 'neutral' as const,
    items: ['Wearables', 'AI Tools', 'Video Coaching', 'Community'],
    itemsAr: ['الأجهزة القابلة للارتداء', 'أدوات الذكاء الاصطناعي', 'التدريب بالفيديو', 'المجتمع'],
  },
]

export default function FutureRoadmap() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const bi = useBi()

  return (
    <div className="min-h-screen bg-bg px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-sm font-semibold text-muted hover:text-navy">
            ← {t.common.backToPresentation}
          </button>
          <LanguageToggle compact />
        </div>

        <h1 className="mt-6 text-3xl font-extrabold text-navy">{bi('HEMMA Future Roadmap', 'خارطة طريق هِمَّة المستقبلية')}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          {bi(
            'Only the current phase is deeply implemented in this prototype. Later phases are represented as roadmap concepts.',
            'تم تنفيذ المرحلة الحالية فقط بشكل كامل في هذا النموذج الأولي. المراحل اللاحقة معروضة كمفاهيم مستقبلية على خارطة الطريق.',
          )}
        </p>

        <div className="relative mt-10 space-y-8 ps-6">
          <div className="absolute bottom-2 top-2 start-[3px] w-px bg-border" />
          {phases.map((phase) => (
            <div key={phase.title} className="relative">
              <div className="absolute -start-6 top-1 h-3 w-3 rounded-full border-2 border-white bg-teal" />
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-navy">{language === 'ar' ? phase.titleAr : phase.title}</h2>
                <Badge tone={phase.tone} label={phase.tone === 'success' ? 'Current' : phase.title} />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(language === 'ar' ? phase.itemsAr : phase.items).map((item) => (
                  <span key={item} className="rounded-full border border-border bg-white px-3 py-1.5 text-xs text-navy">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
