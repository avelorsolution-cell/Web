import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Badge from '../../components/ui/Badge'
import { conversationsList, sarahConversation } from '../../data/messagesData'
import { useLanguage } from '../../i18n/LanguageContext'
import { useToast } from '../../context/ToastContext'

export default function Conversation() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { showToast } = useToast()
  const [text, setText] = useState('')
  const [messages, setMessages] = useState(sarahConversation)
  const conversation = conversationsList.find((c) => c.id === id) || conversationsList[0]

  const send = () => {
    if (!text.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: `local-${Date.now()}`, sender: 'subscriber', text, textAr: text, time: 'Now', read: false },
    ])
    setText('')
    showToast(t.toast.messageSent)
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
          <button onClick={send} className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-white">
            ➤
          </button>
        </div>
      }
    >
      <TopBar
        title={language === 'ar' ? conversation.nameAr : conversation.name}
        onBack={() => navigate('/subscriber/messages')}
        right={conversation.online ? <Badge tone="success" label={t.messagesPage.online} /> : undefined}
      />
      <div className="flex flex-col gap-3 px-5 pb-4 pt-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'subscriber' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[75%]">
              {m.attachment && (
                <div className="mb-1 flex items-center gap-2 rounded-xl border border-teal/40 bg-teal-light px-3 py-2 text-xs font-semibold text-teal-dark">
                  📎 {t.messagesPage[m.attachment.labelKey]}
                </div>
              )}
              <div
                className={[
                  'rounded-2xl px-4 py-2.5 text-sm',
                  m.sender === 'subscriber' ? 'bg-teal text-white' : 'bg-black/5 text-navy',
                ].join(' ')}
              >
                {language === 'ar' ? m.textAr : m.text}
              </div>
              <p className={`mt-1 text-[10px] text-muted ${m.sender === 'subscriber' ? 'text-end' : ''}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  )
}
