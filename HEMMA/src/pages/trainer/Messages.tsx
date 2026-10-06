import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import TrainerBottomNav from '../../components/layout/TrainerBottomNav'
import SearchBar from '../../components/ui/SearchBar'
import { trainerClients } from '../../data/trainerAppData'
import { sarahConversation } from '../../data/messagesData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function TrainerMessages() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const lastMsg = sarahConversation[sarahConversation.length - 1]

  return (
    <PhoneFrame footer={<TrainerBottomNav active="messages" />}>
      <TopBar title={t.messagesPage.title} showBack={false} />
      <div className="px-5 pb-8 pt-3">
        <SearchBar placeholder={t.messagesPage.searchPlaceholder} readOnly />
        <div className="mt-4 space-y-2">
          {trainerClients.map((c, i) => (
            <button
              key={c.id}
              onClick={() => navigate(`/trainer/messages/${c.id}`)}
              className="flex w-full items-center gap-3 rounded-2xl border border-border bg-white p-3 text-start shadow-card"
            >
              <img src={c.photo} className="h-12 w-12 rounded-full object-cover" alt="" />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-navy">{language === 'ar' ? c.nameAr : c.name}</p>
                <p className="truncate text-sm text-muted">
                  {i === 0 ? (language === 'ar' ? lastMsg.textAr : lastMsg.text) : 'Tap to message'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
