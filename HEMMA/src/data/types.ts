export type TrainingType = 'in-person' | 'online' | 'group' | 'digital'

export interface SportOption {
  id: string
  labelKey:
    | 'fitness'
    | 'bodybuilding'
    | 'running'
    | 'weightLoss'
    | 'swimming'
    | 'kids'
    | 'yogaPilates'
    | 'boxing'
    | 'martialArts'
    | 'groupTraining'
    | 'calisthenics'
  icon: string
}

export interface TrainerPackage {
  id: string
  tier: 'basic' | 'standard' | 'premium'
  sessions: number
  price: number
  sessionDurationMins: number
  trainingType: TrainingType
  validityDays: number
  includedServices: string[]
  popular?: boolean
}

export interface Review {
  id: string
  reviewerName: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface Trainer {
  id: string
  name: string
  nameAr: string
  photo: string
  verified: boolean
  sportIds: string[]
  specialties: string[]
  rating: number
  reviewCount: number
  experienceYears: number
  location: string
  locationAr: string
  trainingTypes: TrainingType[]
  languages: string[]
  startingPrice: number
  nextAvailable: string
  bio: string
  bioAr: string
  certifications: { name: string; verified: boolean }[]
  achievements: string[]
  packages: TrainerPackage[]
  reviews: Review[]
  gender: 'male' | 'female'
}

export interface SubscriberUser {
  name: string
  nameAr: string
  photo: string
}

export type AssessmentSource = 'manual' | 'uploaded_report' | 'trainer' | 'future_device'

export interface BodyAssessment {
  id: string
  subscriberId: string
  assessmentDate: string
  source: AssessmentSource
  reportFileName?: string
  heightCm?: number
  weightKg?: number
  bmi?: number
  bodyFatPercent?: number
  bodyFatMassKg?: number
  skeletalMuscleMassKg?: number
  leanBodyMassKg?: number
  bodyWaterPercent?: number
  visceralFatRating?: number
  bmrKcal?: number
  neckCm?: number
  chestCm?: number
  waistCm?: number
  hipsCm?: number
  leftArmCm?: number
  rightArmCm?: number
  leftForearmCm?: number
  rightForearmCm?: number
  leftThighCm?: number
  rightThighCm?: number
  leftCalfCm?: number
  rightCalfCm?: number
  notes?: string
  createdAt: string
}
