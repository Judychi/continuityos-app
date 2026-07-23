import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type CaseStatus = 'OPEN' | 'AWAITING_CONFIRMATION' | 'CLOSED_CONFIRMED'

const STORAGE_KEY = 'continuityos.caseStatus'
const VALID_STATUSES: CaseStatus[] = ['OPEN', 'AWAITING_CONFIRMATION', 'CLOSED_CONFIRMED']

type CaseContextValue = {
  caseStatus: CaseStatus
  setCaseStatus: (value: CaseStatus) => void
}

const CaseContext = createContext<CaseContextValue | undefined>(undefined)

function readInitial(): CaseStatus {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && (VALID_STATUSES as string[]).includes(stored)) return stored as CaseStatus
    return 'OPEN'
  } catch {
    return 'OPEN'
  }
}

export function CaseProvider({ children }: { children: ReactNode }) {
  const [caseStatus, setCaseStatus] = useState<CaseStatus>(readInitial)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, caseStatus)
    } catch {
      // localStorage unavailable (e.g. private browsing) — state still works in-memory
    }
  }, [caseStatus])

  return <CaseContext.Provider value={{ caseStatus, setCaseStatus }}>{children}</CaseContext.Provider>
}

export function useCase() {
  const ctx = useContext(CaseContext)
  if (!ctx) throw new Error('useCase must be used within a CaseProvider')
  return ctx
}
