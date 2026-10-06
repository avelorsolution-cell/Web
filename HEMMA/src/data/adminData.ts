export const adminMetrics = {
  totalSubscribers: 4820,
  totalTrainers: 312,
  verifiedTrainers: 268,
  pendingVerification: 14,
  bookingsToday: 96,
  bookingsThisMonth: 2140,
  grossBookingValue: 486500,
  commission: 97300,
  trainerEarnings: 389200,
  refunds: 6400,
  openComplaints: 7,
  assessmentAdoptionPercent: 42,
}

export const revenueTrend = [
  { label: 'Apr', value: 62000 },
  { label: 'May', value: 71000 },
  { label: 'Jun', value: 78500 },
  { label: 'Jul', value: 85000 },
  { label: 'Aug', value: 91200 },
  { label: 'Sep', value: 98600 },
]

export const bookingTrend = [
  { label: 'Apr', value: 320 },
  { label: 'May', value: 365 },
  { label: 'Jun', value: 402 },
  { label: 'Jul', value: 448 },
  { label: 'Aug', value: 470 },
  { label: 'Sep', value: 512 },
]

export const topSportsAdmin = [
  { label: 'Fitness', value: 32 },
  { label: 'Bodybuilding', value: 21 },
  { label: 'Running', value: 14 },
  { label: 'Yoga', value: 11 },
  { label: 'Boxing', value: 9 },
]

export const topLocationsAdmin = [
  { label: 'Doha', value: 38 },
  { label: 'West Bay', value: 22 },
  { label: 'The Pearl', value: 18 },
  { label: 'Lusail', value: 14 },
  { label: 'Al Waab', value: 8 },
]

export const verificationQueue = [
  {
    id: 'trn-sarah-ahmed',
    name: 'Sarah Ahmed',
    sport: 'Fitness',
    experience: 8,
    location: 'Doha',
    submitted: '10 Sep 2026',
    status: 'approved' as const,
    reviewer: 'Ahmed Admin',
  },
  {
    id: 'trn-omar-nasser',
    name: 'Omar Nasser',
    sport: 'Running',
    experience: 6,
    location: 'Lusail',
    submitted: '12 Sep 2026',
    status: 'approved' as const,
    reviewer: 'Ahmed Admin',
  },
  {
    id: 'trn-sara-ali',
    name: 'Sara Ali',
    sport: 'Yoga',
    experience: 5,
    location: 'The Pearl',
    submitted: '16 Sep 2026',
    status: 'under_review' as const,
    reviewer: 'Finance Admin',
  },
  {
    id: 'trn-yousef-tariq',
    name: 'Yousef Tariq',
    sport: 'Boxing',
    experience: 4,
    location: 'Aspire Zone',
    submitted: '17 Sep 2026',
    status: 'action_required' as const,
    reviewer: 'Unassigned',
  },
  {
    id: 'trn-huda-said',
    name: 'Huda Said',
    sport: 'Swimming',
    experience: 3,
    location: 'West Bay',
    submitted: '18 Sep 2026',
    status: 'pending' as const,
    reviewer: 'Unassigned',
  },
]

export const adminBookingsList = [
  { id: 'HM-482913', subscriber: 'Maha Al-Kuwari', trainer: 'Sarah Ahmed', pkg: 'Standard', date: '16 Sep 2026', amount: 1104, payment: 'Paid', status: 'Confirmed' },
  { id: 'HM-482811', subscriber: 'Noura Ahmed', trainer: 'Ahmed Khaled', pkg: 'Premium', date: '18 Sep 2026', amount: 2160, payment: 'Paid', status: 'Completed' },
  { id: 'HM-482755', subscriber: 'Khalid Al-Mohannadi', trainer: 'Omar Nasser', pkg: 'Basic', date: '17 Sep 2026', amount: 520, payment: 'Pending', status: 'Pending' },
  { id: 'HM-482602', subscriber: 'Maha Al-Kuwari', trainer: 'Sara Ali', pkg: 'Standard', date: '10 Sep 2026', amount: 980, payment: 'Refunded', status: 'Cancelled' },
]

export const adminComplaintsList = [
  { id: 'CMP-1042', subject: 'Trainer arrived late', priority: 'medium' as const, status: 'open' as const, user: 'Khalid Al-Mohannadi' },
  { id: 'CMP-1039', subject: 'Refund not received', priority: 'high' as const, status: 'inProgress' as const, user: 'Noura Ahmed' },
  { id: 'CMP-1031', subject: 'Package sessions miscounted', priority: 'low' as const, status: 'resolved' as const, user: 'Maha Al-Kuwari' },
]
