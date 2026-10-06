import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import { trainerClients } from '../../data/trainerAppData'
import { sarahConversation } from '../../data/messagesData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function TrainerConversation() {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const [text, setText] = useState('')
  const [messages, setMessages] = useState(sarahConversation)
  const client = trainerClients.find((c) => c.id === clientId) || trainerClients[0]

  const send = () => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { id: `local-${Date.now()}`, sender: 'trainer', text, textAr: text, time: 'Now' }])
    setText('')
  }

  return (
    <PhoneFrame
      footer={
        <div className="flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder={t.messagesPage.sendPlaceholder}
            className="flex-1 rounded-full border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-teal"
          />
          <button onClick={send} className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white">
            ➤
          </button>
        </div>
      }
    >
      <TopBar title={language === 'ar' ? client.nameAr : client.name} onBack={() => navigate('/trainer/messages')} />
      <div className="flex flex-col gap-3 px-5 pb-4 pt-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'trainer' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[75%]">
              {m.attachment && (
                <div className="mb-1 flex items-center gap-2 rounded-xl border border-navy/20 bg-black/5 px-3 py-2 text-xs font-semibold text-navy">
                  📎 {t.messagesPage[m.attachment.labelKey]}
                </div>
              )}
              <div
                className={['rounded-2xl px-4 py-2.5 text-sm', m.sender === 'trainer' ? 'bg-navy text-white' : 'bg-black/5 text-navy'].join(' ')}
              >
                {language === 'ar' ? m.textAr : m.text}
              </div>
              <p className={`mt-1 text-[10px] text-muted ${m.sender === 'trainer' ? 'text-end' : ''}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  )
}
