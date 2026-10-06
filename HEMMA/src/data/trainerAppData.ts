export interface TrainerClient {
  id: string
  name: string
  nameAr: string
  photo: string
  goal: string
  goalAr: string
  packageTier: string
  sessionsUsed: number
  sessionsTotal: number
  compliance: number
  nextSession: string
  tags: ('active' | 'highCompliance' | 'packageExpiring' | 'needsFollowUp')[]
}

export const trainerClients: TrainerClient[] = [
  {
    id: 'sub-maha',
    name: 'Maha Al-Kuwari',
    nameAr: 'مها الكواري',
    photo: 'https://i.pravatar.cc/150?img=47',
    goal: 'Build Strength',
    goalAr: 'بناء القوة',
    packageTier: 'Standard',
    sessionsUsed: 3,
    sessionsTotal: 8,
    compliance: 86,
    nextSession: '16 Sep, 3:00 PM',
    tags: ['active', 'highCompliance'],
  },
  {
    id: 'sub-ahmed',
    name: 'Ahmed',
    nameAr: 'أحمد',
    photo: 'https://i.pravatar.cc/150?img=12',
    goal: 'Online Coaching',
    goalAr: 'تدريب عن بُعد',
    packageTier: 'Premium',
    sessionsUsed: 9,
    sessionsTotal: 12,
    compliance: 74,
    nextSession: '17 Sep, 12:00 PM',
    tags: ['active', 'packageExpiring'],
  },
  {
    id: 'sub-khalid',
    name: 'Khalid',
    nameAr: 'خالد',
    photo: 'https://i.pravatar.cc/150?img=15',
    goal: 'Weight Loss',
    goalAr: 'خسارة الوزن',
    packageTier: 'Basic',
    sessionsUsed: 1,
    sessionsTotal: 4,
    compliance: 52,
    nextSession: '17 Sep, 5:30 PM',
    tags: ['needsFollowUp'],
  },
  {
    id: 'sub-noura',
    name: 'Noura',
    nameAr: 'نورة',
    photo: 'https://i.pravatar.cc/150?img=44',
    goal: 'General Fitness',
    goalAr: 'اللياقة العامة',
    packageTier: 'Standard',
    sessionsUsed: 6,
    sessionsTotal: 8,
    compliance: 91,
    nextSession: '18 Sep, 9:00 AM',
    tags: ['active', 'highCompliance'],
  },
]

export const todaysSchedule = [
  { time: '09:00', clientName: 'Maha', clientNameAr: 'مها', type: 'Strength Training', typeAr: 'تدريب القوة' },
  { time: '12:00', clientName: 'Ahmed', clientNameAr: 'أحمد', type: 'Online Coaching', typeAr: 'تدريب عن بُعد' },
  { time: '17:30', clientName: 'Khalid', clientNameAr: 'خالد', type: 'Assessment', typeAr: 'تقييم' },
]

export const trainerCheckIns = [
  {
    id: 'ci-maha',
    clientId: 'sub-maha',
    clientName: 'Maha',
    clientNameAr: 'مها',
    status: 'new' as const,
    energy: 8,
    motivation: 9,
    soreness: 4,
    sleep: 7,
    stress: 5,
    comment: 'Feeling great this week, ready to push harder.',
    commentAr: 'أشعر بحال رائعة هذا الأسبوع، مستعدة لبذل مجهود أكبر.',
  },
  {
    id: 'ci-khalid',
    clientId: 'sub-khalid',
    clientName: 'Khalid',
    clientNameAr: 'خالد',
    status: 'reviewed' as const,
    energy: 6,
    motivation: 6,
    soreness: 6,
    sleep: 5,
    stress: 7,
    comment: 'A bit tired from work, kept sessions light.',
    commentAr: 'أشعر بتعب بسيط من العمل، حافظت على حصص خفيفة.',
  },
]

export const trainerEarningsSummary = {
  grossQar: 10000,
  commissionRate: 0.2,
  refundsQar: 200,
}

export const trainerTransactions = [
  { id: 'tx-1', bookingId: 'HM-482913', customer: 'Maha Al-Kuwari', gross: 1104, status: 'Paid' },
  { id: 'tx-2', bookingId: 'HM-482811', customer: 'Ahmed', gross: 2160, status: 'Paid' },
  { id: 'tx-3', bookingId: 'HM-482755', customer: 'Khalid', gross: 520, status: 'Pending' },
]
