import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'continuityos.caseResolved'

type CaseContextValue = {
  caseResolved: boolean
  setCaseResolved: (value: boolean) => void
}

const CaseContext = createContext<CaseContextValue | undefined>(undefined)

function readInitial(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function CaseProvider({ children }: { children: ReactNode }) {
  const [caseResolved, setCaseResolved] = useState<boolean>(readInitial)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(caseResolved))
    } catch {
      // localStorage unavailable (e.g. private browsing) — state still works in-memory
    }
  }, [caseResolved])

  return <CaseContext.Provider value={{ caseResolved, setCaseResolved }}>{children}</CaseContext.Provider>
}

export function useCase() {
  const ctx = useContext(CaseContext)
  if (!ctx) throw new Error('useCase must be used within a CaseProvider')
  return ctx
}
