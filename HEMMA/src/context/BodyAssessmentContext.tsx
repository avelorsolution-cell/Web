import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { BodyAssessment } from '../data/types'
import { DEMO_SUBSCRIBER_ID, seedAssessments } from '../data/bodyAssessmentData'

interface BodyAssessmentContextValue {
  assessments: BodyAssessment[]
  latest: BodyAssessment | null
  earliest: BodyAssessment | null
  addAssessment: (data: Omit<BodyAssessment, 'id' | 'subscriberId' | 'createdAt'>) => BodyAssessment
  getById: (id: string) => BodyAssessment | undefined
  draft: Partial<BodyAssessment> | null
  setDraft: (draft: Partial<BodyAssessment> | null) => void
  lastSavedId: string | null
  resetAssessments: () => void
}

const BodyAssessmentContext = createContext<BodyAssessmentContextValue | undefined>(undefined)

function sortByDateDesc(list: BodyAssessment[]) {
  return [...list].sort((a, b) => (a.assessmentDate < b.assessmentDate ? 1 : -1))
}

export function BodyAssessmentProvider({ children }: { children: ReactNode }) {
  const [assessments, setAssessments] = useState<BodyAssessment[]>(seedAssessments)
  const [draft, setDraft] = useState<Partial<BodyAssessment> | null>(null)
  const [lastSavedId, setLastSavedId] = useState<string | null>(null)

  const sorted = useMemo(() => sortByDateDesc(assessments), [assessments])

  const value = useMemo<BodyAssessmentContextValue>(
    () => ({
      assessments: sorted,
      latest: sorted[0] || null,
      earliest: sorted[sorted.length - 1] || null,
      addAssessment: (data) => {
        const newAssessment: BodyAssessment = {
          ...data,
          id: `ba-${Date.now()}`,
          subscriberId: DEMO_SUBSCRIBER_ID,
          createdAt: new Date().toISOString(),
        }
        setAssessments((prev) => [...prev, newAssessment])
        setLastSavedId(newAssessment.id)
        return newAssessment
      },
      getById: (id) => assessments.find((a) => a.id === id),
      draft,
      setDraft,
      lastSavedId,
      resetAssessments: () => {
        setAssessments([])
        setDraft(null)
        setLastSavedId(null)
      },
    }),
    [sorted, assessments, draft, lastSavedId],
  )

  return <BodyAssessmentContext.Provider value={value}>{children}</BodyAssessmentContext.Provider>
}

export function useBodyAssessments() {
  const ctx = useContext(BodyAssessmentContext)
  if (!ctx) throw new Error('useBodyAssessments must be used within BodyAssessmentProvider')
  return ctx
}
