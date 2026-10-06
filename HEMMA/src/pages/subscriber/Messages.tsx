import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import SearchBar from '../../components/ui/SearchBar'
import { conversationsList } from '../../data/messagesData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function Messages() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()

  return (
    <PhoneFrame>
      <TopBar title={t.messagesPage.title} onBack={() => navigate('/subscriber/home')} />
      <div className="px-5 pb-8 pt-3">
        <SearchBar placeholder={t.messagesPage.searchPlaceholder} readOnly />

        <div className="mt-4 space-y-2">
          {conversationsList.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate(`/subscriber/messages/${c.id}`)}
              className="flex w-full items-center gap-3 rounded-2xl border border-border bg-white p-3 text-start shadow-card"
            >
              <div className="relative">
                <img src={c.photo} className="h-12 w-12 rounded-full object-cover" alt="" />
                {c.online && <span className="absolute bottom-0 end-0 h-3 w-3 rounded-full border-2 border-white bg-success" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-navy">{language === 'ar' ? c.nameAr : c.name}</p>
                  <span className="text-[11px] text-muted">{c.time}</span>
                </div>
                <p className="truncate text-sm text-muted">{language === 'ar' ? c.lastMessageAr : c.lastMessage}</p>
              </div>
              {c.unread > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal text-[10px] font-bold text-white">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted">{t.messagesPage.privacyNote}</p>
      </div>
    </PhoneFrame>
  )
}
