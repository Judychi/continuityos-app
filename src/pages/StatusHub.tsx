import { useEffect, useState } from 'react'
import { Badge } from '../components/Badge'
import { CaseProgress } from '../components/CaseProgress'
import { DocumentChecklist } from '../components/DocumentChecklist'
import { UpdateHistory } from '../components/UpdateHistory'
import { ConfettiBurst } from '../components/ConfettiBurst'
import { useCase } from '../context/CaseContext'
import { documents, getHistory, getStageLabel, getSteps } from '../data/caseDetail'

type ConfirmPhase = 'idle' | 'bursting' | 'confirmed'

export function StatusHub() {
  const { caseResolved } = useCase()
  const [confirmPhase, setConfirmPhase] = useState<ConfirmPhase>('idle')

  useEffect(() => {
    if (!caseResolved) setConfirmPhase('idle')
  }, [caseResolved])

  useEffect(() => {
    if (confirmPhase !== 'bursting') return
    const timeout = setTimeout(() => setConfirmPhase('confirmed'), 850)
    return () => clearTimeout(timeout)
  }, [confirmPhase])

  const steps = getSteps(caseResolved)
  const history = getHistory(caseResolved)
  const currentStage = caseResolved ? 'Resolved — awaiting your confirmation' : 'Compliance review'

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-semibold text-navy">Case #RN-4821 — PeopleGrid Africa</h1>
          <Badge tone="teal">Customer-facing view</Badge>
        </div>
        <p className="mt-1.5 text-sm text-navy/60">Track the live progress of your compliance case.</p>
      </div>

      <CaseProgress steps={steps} stageLabel={getStageLabel(caseResolved)} />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Current stage</p>
          <p className={`mt-1.5 flex items-center gap-1.5 text-sm font-semibold ${caseResolved ? 'text-navy' : 'text-amber'}`}>
            {!caseResolved && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />}
            {currentStage}
          </p>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Next update</p>
          {caseResolved ? (
            <p className="mt-1.5 text-sm font-semibold text-navy">None — case resolved</p>
          ) : (
            <>
              <p className="mt-1.5 text-sm font-semibold text-navy">Thursday 2:00 PM</p>
              <p className="mt-0.5 text-xs text-navy/50">Whether or not the review is complete</p>
            </>
          )}
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Case owner</p>
          <p className="mt-1.5 text-sm font-semibold text-navy">Judith C.</p>
        </div>
      </div>

      {caseResolved && (
        <div className="rounded-2xl border border-green/20 bg-green/5 p-6 shadow-sm">
          {confirmPhase === 'confirmed' && (
            <p className="flex items-center gap-2 text-sm font-semibold text-green">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.25}
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Case closed by customer confirmation ✓
            </p>
          )}

          {confirmPhase === 'bursting' && <ConfettiBurst />}

          {confirmPhase === 'idle' && (
            <>
              <p className="mb-3 text-sm text-navy/70">
                Your compliance review is complete and a resolution letter has been sent. Please confirm the outcome
                below.
              </p>
              <button
                onClick={() => setConfirmPhase('bursting')}
                className="rounded-xl bg-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green/90"
              >
                Confirm — my payroll ran successfully
              </button>
            </>
          )}
        </div>
      )}

      <DocumentChecklist documents={documents} />
      <UpdateHistory entries={history} />
    </div>
  )
}
