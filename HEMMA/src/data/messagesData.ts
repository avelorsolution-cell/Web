export interface ChatMessage {
  id: string
  sender: 'trainer' | 'subscriber'
  text: string
  textAr: string
  time: string
  attachment?: { labelKey: 'attachWorkout' | 'attachProgram' | 'attachAssessment' }
  read?: boolean
}

export const sarahConversation: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'trainer',
    text: "Great work on today's session 👏",
    textAr: 'عمل رائع في حصة اليوم 👏',
    time: '6:45 PM',
    read: true,
  },
  {
    id: 'm2',
    sender: 'trainer',
    text: 'Your bench press numbers improved this week.',
    textAr: 'تحسّنت أرقام ضغط البنش لديك هذا الأسبوع.',
    time: '6:45 PM',
    read: true,
  },
  {
    id: 'm3',
    sender: 'subscriber',
    text: 'Thank you! I felt much stronger today.',
    textAr: 'شكرًا لك! شعرت بقوة أكبر اليوم.',
    time: '6:50 PM',
    read: true,
  },
  {
    id: 'm4',
    sender: 'trainer',
    text: "I've adjusted Friday's workout slightly.",
    textAr: 'قمت بتعديل تمرين الجمعة قليلاً.',
    time: '7:02 PM',
    attachment: { labelKey: 'attachWorkout' },
    read: true,
  },
]

export const conversationsList = [
  {
    id: 'trn-sarah-ahmed',
    name: 'Sarah Ahmed',
    nameAr: 'سارة أحمد',
    photo: 'https://i.pravatar.cc/400?img=32',
    lastMessage: "I've adjusted Friday's workout slightly.",
    lastMessageAr: 'قمت بتعديل تمرين الجمعة قليلاً.',
    time: '7:02 PM',
    unread: 1,
    online: true,
  },
]
