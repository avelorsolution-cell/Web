import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Trainer, TrainerPackage } from '../data/types'

interface BookingSelection {
  trainer: Trainer | null
  pkg: TrainerPackage | null
  date: string | null
  time: string | null
}

interface AppStateValue {
  onboardingComplete: boolean
  setOnboardingComplete: (v: boolean) => void
  userName: string
  setUserName: (v: string) => void
  goal: string | null
  setGoal: (v: string | null) => void
  trainingPreference: string | null
  setTrainingPreference: (v: string | null) => void
  selectedSports: string[]
  setSelectedSports: (v: string[]) => void
  progressConsent: boolean
  setProgressConsent: (v: boolean) => void
  compareList: string[]
  toggleCompare: (trainerId: string) => void
  clearCompare: () => void
  booking: BookingSelection
  setBookingTrainer: (t: Trainer) => void
  setBookingPackage: (p: TrainerPackage) => void
  setBookingDate: (d: string) => void
  setBookingTime: (t: string) => void
  resetBooking: () => void
  lastBookingId: string | null
  setLastBookingId: (id: string) => void
  resetPrototype: () => void
}

const emptyBooking: BookingSelection = { trainer: null, pkg: null, date: null, time: null }

const AppStateContext = createContext<AppStateValue | undefined>(undefined)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [userName, setUserName] = useState('Maha')
  const [goal, setGoal] = useState<string | null>(null)
  const [trainingPreference, setTrainingPreference] = useState<string | null>(null)
  const [selectedSports, setSelectedSports] = useState<string[]>([])
  const [progressConsent, setProgressConsent] = useState(false)
  const [compareList, setCompareList] = useState<string[]>([])
  const [booking, setBooking] = useState<BookingSelection>(emptyBooking)
  const [lastBookingId, setLastBookingId] = useState<string | null>(null)

  const toggleCompare = (trainerId: string) => {
    setCompareList((prev) => {
      if (prev.includes(trainerId)) return prev.filter((id) => id !== trainerId)
      if (prev.length >= 3) return prev
      return [...prev, trainerId]
    })
  }

  const value = useMemo<AppStateValue>(
    () => ({
      onboardingComplete,
      setOnboardingComplete,
      userName,
      setUserName,
      goal,
      setGoal,
      trainingPreference,
      setTrainingPreference,
      selectedSports,
      setSelectedSports,
      progressConsent,
      setProgressConsent,
      compareList,
      toggleCompare,
      clearCompare: () => setCompareList([]),
      booking,
      setBookingTrainer: (t) => setBooking((prev) => ({ ...prev, trainer: t, pkg: null, date: null, time: null })),
      setBookingPackage: (p) => setBooking((prev) => ({ ...prev, pkg: p })),
      setBookingDate: (d) => setBooking((prev) => ({ ...prev, date: d, time: null })),
      setBookingTime: (t) => setBooking((prev) => ({ ...prev, time: t })),
      resetBooking: () => setBooking(emptyBooking),
      lastBookingId,
      setLastBookingId,
      resetPrototype: () => {
        setOnboardingComplete(false)
        setUserName('Maha')
        setGoal(null)
        setTrainingPreference(null)
        setSelectedSports([])
        setProgressConsent(false)
        setCompareList([])
        setBooking(emptyBooking)
        setLastBookingId(null)
      },
    }),
    [onboardingComplete, userName, goal, trainingPreference, selectedSports, progressConsent, compareList, booking, lastBookingId],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
