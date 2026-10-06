import type { BodyAssessment } from './types'

export const DEMO_SUBSCRIBER_ID = 'sub-maha'

export const seedAssessments: BodyAssessment[] = [
  {
    id: 'ba-3',
    subscriberId: DEMO_SUBSCRIBER_ID,
    assessmentDate: '2026-09-15',
    source: 'uploaded_report',
    reportFileName: 'InBody_Report_Sep2026.pdf',
    heightCm: 175,
    weightKg: 72.0,
    bmi: 23.5,
    bodyFatPercent: 19.8,
    bodyFatMassKg: 14.3,
    skeletalMuscleMassKg: 32.4,
    leanBodyMassKg: 57.7,
    bodyWaterPercent: 58.2,
    visceralFatRating: 7,
    bmrKcal: 1650,
    waistCm: 82,
    chestCm: 98,
    hipsCm: 96,
    leftArmCm: 34,
    rightArmCm: 34,
    leftThighCm: 56,
    rightThighCm: 56,
    createdAt: '2026-09-15T09:00:00Z',
  },
  {
    id: 'ba-2',
    subscriberId: DEMO_SUBSCRIBER_ID,
    assessmentDate: '2026-08-15',
    source: 'manual',
    heightCm: 175,
    weightKg: 73.4,
    bmi: 24.0,
    bodyFatPercent: 20.6,
    skeletalMuscleMassKg: 31.8,
    waistCm: 84,
    createdAt: '2026-08-15T09:00:00Z',
  },
  {
    id: 'ba-1',
    subscriberId: DEMO_SUBSCRIBER_ID,
    assessmentDate: '2026-07-15',
    source: 'uploaded_report',
    reportFileName: 'Gym_Assessment_Jul2026.pdf',
    heightCm: 175,
    weightKg: 75.0,
    bmi: 24.5,
    bodyFatPercent: 21.5,
    skeletalMuscleMassKg: 31.1,
    waistCm: 87,
    createdAt: '2026-07-15T09:00:00Z',
  },
]

export function calculateBmi(heightCm: number, weightKg: number): number {
  const heightM = heightCm / 100
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10
}

export function bmiStatus(bmi: number): { key: 'below' | 'within' | 'above'; range: string } {
  if (bmi < 18.5) return { key: 'below', range: '18.5 – 24.9' }
  if (bmi <= 24.9) return { key: 'within', range: '18.5 – 24.9' }
  return { key: 'above', range: '18.5 – 24.9' }
}
