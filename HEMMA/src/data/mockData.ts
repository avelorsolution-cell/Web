import type { SportOption, SubscriberUser, Trainer } from './types'

export const sports: SportOption[] = [
  { id: 'fitness', labelKey: 'fitness', icon: '💪' },
  { id: 'bodybuilding', labelKey: 'bodybuilding', icon: '🏋️' },
  { id: 'running', labelKey: 'running', icon: '🏃' },
  { id: 'weight-loss', labelKey: 'weightLoss', icon: '⚖️' },
  { id: 'swimming', labelKey: 'swimming', icon: '🏊' },
  { id: 'kids', labelKey: 'kids', icon: '🧒' },
  { id: 'yoga-pilates', labelKey: 'yogaPilates', icon: '🧘' },
  { id: 'boxing', labelKey: 'boxing', icon: '🥊' },
  { id: 'martial-arts', labelKey: 'martialArts', icon: '🥋' },
  { id: 'group-training', labelKey: 'groupTraining', icon: '👥' },
  { id: 'calisthenics', labelKey: 'calisthenics', icon: '🤸' },
]

export const locations = ['Doha', 'West Bay', 'The Pearl', 'Lusail', 'Al Waab', 'Aspire Zone']
export const locationsAr: Record<string, string> = {
  Doha: 'الدوحة',
  'West Bay': 'الخليج الغربي',
  'The Pearl': 'اللؤلؤة',
  Lusail: 'لوسيل',
  'Al Waab': 'الوعب',
  'Aspire Zone': 'المدينة الرياضية',
}

export const currentUser: SubscriberUser = {
  name: 'Maha',
  nameAr: 'مها',
  photo: 'https://i.pravatar.cc/150?img=47',
}

function makePackages(base: number): Trainer['packages'] {
  return [
    {
      id: 'basic',
      tier: 'basic',
      sessions: 4,
      price: base * 4,
      sessionDurationMins: 60,
      trainingType: 'in-person',
      validityDays: 30,
      includedServices: ['Session tracking', 'Basic nutrition tips'],
    },
    {
      id: 'standard',
      tier: 'standard',
      sessions: 8,
      price: Math.round(base * 8 * 0.92),
      sessionDurationMins: 60,
      trainingType: 'in-person',
      validityDays: 60,
      includedServices: ['Session tracking', 'Custom training plan', 'Weekly check-in'],
      popular: true,
    },
    {
      id: 'premium',
      tier: 'premium',
      sessions: 12,
      price: Math.round(base * 12 * 0.85),
      sessionDurationMins: 60,
      trainingType: 'in-person',
      validityDays: 90,
      includedServices: [
        'Session tracking',
        'Custom training plan',
        'Weekly check-in',
        'Nutrition guidance',
        'Priority chat support',
      ],
    },
  ]
}

export const trainers: Trainer[] = [
  {
    id: 'trn-sarah-ahmed',
    name: 'Sarah Ahmed',
    nameAr: 'سارة أحمد',
    photo: 'https://i.pravatar.cc/400?img=32',
    verified: true,
    sportIds: ['fitness', 'weight-loss', 'calisthenics'],
    specialties: ['Weight Loss', 'Strength & Conditioning', 'Nutrition Coaching'],
    rating: 4.9,
    reviewCount: 120,
    experienceYears: 8,
    location: 'West Bay',
    locationAr: locationsAr['West Bay'],
    trainingTypes: ['in-person', 'online'],
    languages: ['English', 'Arabic'],
    startingPrice: 150,
    nextAvailable: 'Today 6:00 PM',
    bio: 'Sarah has helped over 300 clients in Qatar reach sustainable fitness goals through personalized strength and nutrition programs.',
    bioAr: 'ساعدت سارة أكثر من 300 عميل في قطر على تحقيق أهداف لياقة مستدامة من خلال برامج قوة وتغذية مخصصة.',
    certifications: [
      { name: 'ACE Certified Personal Trainer', verified: true },
      { name: 'Precision Nutrition L1', verified: true },
    ],
    achievements: ['Top Rated Trainer 2024', '300+ Clients Coached'],
    packages: makePackages(150),
    gender: 'female',
    reviews: [
      {
        id: 'r1',
        reviewerName: 'Noura A.',
        rating: 5,
        comment: 'Sarah completely changed how I approach fitness. Highly recommend!',
        date: '2025-08-12',
        verified: true,
      },
      {
        id: 'r2',
        reviewerName: 'Khalid M.',
        rating: 5,
        comment: 'Professional, punctual, and genuinely cares about progress.',
        date: '2025-07-02',
        verified: true,
      },
    ],
  },
  {
    id: 'trn-ahmed-khaled',
    name: 'Ahmed Khaled',
    nameAr: 'أحمد خالد',
    photo: 'https://i.pravatar.cc/400?img=13',
    verified: true,
    sportIds: ['bodybuilding', 'fitness'],
    specialties: ['Bodybuilding', 'Muscle Gain', 'Powerlifting'],
    rating: 4.8,
    reviewCount: 96,
    experienceYears: 10,
    location: 'Doha',
    locationAr: locationsAr['Doha'],
    trainingTypes: ['in-person'],
    languages: ['Arabic', 'English'],
    startingPrice: 180,
    nextAvailable: 'Tomorrow 5:00 PM',
    bio: 'Former national powerlifting competitor specializing in hypertrophy and strength programming for serious lifters.',
    bioAr: 'منافس سابق في رفع الأثقال الوطني متخصص في برامج تضخيم العضلات والقوة للرياضيين الجادين.',
    certifications: [
      { name: 'ISSA Bodybuilding Specialist', verified: true },
      { name: 'First Aid & CPR', verified: true },
    ],
    achievements: ['National Powerlifting Finalist', '10 Years Experience'],
    packages: makePackages(180),
    gender: 'male',
    reviews: [
      {
        id: 'r3',
        reviewerName: 'Yousef T.',
        rating: 5,
        comment: 'Gained 6kg of muscle in 4 months following his program.',
        date: '2025-06-20',
        verified: true,
      },
    ],
  },
  {
    id: 'trn-omar-nasser',
    name: 'Omar Nasser',
    nameAr: 'عمر ناصر',
    photo: 'https://i.pravatar.cc/400?img=51',
    verified: true,
    sportIds: ['running', 'fitness'],
    specialties: ['Endurance Running', 'Marathon Prep', 'Conditioning'],
    rating: 4.7,
    reviewCount: 64,
    experienceYears: 6,
    location: 'Lusail',
    locationAr: locationsAr['Lusail'],
    trainingTypes: ['in-person', 'online', 'group'],
    languages: ['Arabic', 'English', 'French'],
    startingPrice: 130,
    nextAvailable: 'Today 7:30 AM',
    bio: 'Certified running coach who has guided over 50 athletes through their first marathon in Doha and Lusail.',
    bioAr: 'مدرب جري معتمد قاد أكثر من 50 رياضيًا في أول ماراثون لهم في الدوحة ولوسيل.',
    certifications: [{ name: 'UESCA Running Coach', verified: true }],
    achievements: ['50+ Marathon Finishers Coached'],
    packages: makePackages(130),
    gender: 'male',
    reviews: [
      {
        id: 'r4',
        reviewerName: 'Maha K.',
        rating: 4,
        comment: 'Great structure for beginners training for their first 10K.',
        date: '2025-05-11',
        verified: true,
      },
    ],
  },
  {
    id: 'trn-sara-ali',
    name: 'Sara Ali',
    nameAr: 'سارة علي',
    photo: 'https://i.pravatar.cc/400?img=25',
    verified: false,
    sportIds: ['yoga-pilates', 'fitness'],
    specialties: ['Yoga', 'Pilates', 'Mobility'],
    rating: 4.6,
    reviewCount: 41,
    experienceYears: 5,
    location: 'The Pearl',
    locationAr: locationsAr['The Pearl'],
    trainingTypes: ['in-person', 'online'],
    languages: ['English'],
    startingPrice: 140,
    nextAvailable: 'Fri 9:00 AM',
    bio: 'Sara blends yoga and pilates methods to help clients build long-term mobility and reduce injury risk.',
    bioAr: 'تمزج سارة بين اليوغا والبيلاتس لمساعدة العملاء على بناء مرونة طويلة الأمد وتقليل خطر الإصابة.',
    certifications: [{ name: 'RYT-200 Yoga Alliance', verified: false }],
    achievements: ['200+ Sessions Delivered'],
    packages: makePackages(140),
    gender: 'female',
    reviews: [],
  },
]

export function getTrainerById(id: string) {
  return trainers.find((t) => t.id === id)
}

export function getTrainersBySport(sportId: string | null) {
  if (!sportId) return trainers
  return trainers.filter((t) => t.sportIds.includes(sportId))
}
