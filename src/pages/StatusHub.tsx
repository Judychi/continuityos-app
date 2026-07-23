import { useEffect, useMemo, useState } from 'react'
import { Badge } from '../components/Badge'
import { CaseProgress } from '../components/CaseProgress'
import { DocumentChecklist } from '../components/DocumentChecklist'
import { UpdateHistory } from '../components/UpdateHistory'
import { ConfettiBurst } from '../components/ConfettiBurst'
import { ContactModal } from '../components/ContactModal'
import { useCase } from '../context/CaseContext'
import { documents, getHistory, getStageLabel, getSteps } from '../data/caseDetail'
import { csmDirectory } from '../data/csm'
import { formatFriendlyDate } from '../utils/date'

type BurstPhase = 'idle' | 'bursting'

const caseOwner = csmDirectory[0]

export function StatusHub() {
  const { caseStatus, setCaseStatus } = useCase()
  const [burstPhase, setBurstPhase] = useState<BurstPhase>('idle')
  const [contactOpen, setContactOpen] = useState(false)

  const resolutionDate = useMemo(() => formatFriendlyDate(new Date()), [])

  useEffect(() => {
    if (caseStatus === 'OPEN') setBurstPhase('idle')
  }, [caseStatus])

  useEffect(() => {
    if (burstPhase !== 'bursting') return
    const timeout = setTimeout(() => {
      setCaseStatus('CLOSED_CONFIRMED')
      setBurstPhase('idle')
    }, 850)
    return () => clearTimeout(timeout)
  }, [burstPhase, setCaseStatus])

  const steps = getSteps(caseStatus)

  const currentStage =
    caseStatus === 'CLOSED_CONFIRMED'
      ? 'Closed — Confirmed'
      : caseStatus === 'AWAITING_CONFIRMATION'
        ? 'Resolved — awaiting your confirmation'
        : 'Compliance review'

  // Base timeline entries are always shown oldest→newest from data; display newest-first.
  const baseHistory = [...getHistory('OPEN')].reverse()

  const historyEntries =
    caseStatus !== 'OPEN'
      ? [
          {
            timestamp: 'Just now',
            title: 'Resolution drafted',
            detail: (
              <div className="space-y-3">
                <p>
                  Review complete. Account fully restored. Your resolution letter has been sent — please confirm
                  your key transaction works.
                </p>

                {caseStatus === 'AWAITING_CONFIRMATION' && burstPhase === 'idle' && (
                  <button
                    onClick={() => setBurstPhase('bursting')}
                    className="rounded-xl bg-green px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green/90"
                  >
                    ✓ Confirm — my payroll ran successfully
                  </button>
                )}

                {burstPhase === 'bursting' && <ConfettiBurst />}

                {caseStatus === 'CLOSED_CONFIRMED' && burstPhase === 'idle' && (
                  <p className="flex items-center gap-1.5 font-semibold text-green">
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.25}
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Case closed by customer confirmation ✓ · Recovery call scheduled within 48 hours
                  </p>
                )}
              </div>
            ),
          },
          ...baseHistory,
        ]
      : baseHistory

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-semibold text-navy">Case #RN-4821 — PeopleGrid Africa</h1>
          <Badge tone="teal">Customer-facing view</Badge>
        </div>
        <p className="mt-1.5 text-sm text-navy/60">Track the live progress of your compliance case.</p>
      </div>

      <CaseProgress steps={steps} stageLabel={getStageLabel(caseStatus)} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Current stage</p>
          <p
            className={`mt-1.5 flex items-center gap-1.5 text-sm font-semibold ${
              caseStatus === 'CLOSED_CONFIRMED' ? 'text-green' : caseStatus === 'AWAITING_CONFIRMATION' ? 'text-navy' : 'text-amber'
            }`}
          >
            {caseStatus === 'OPEN' && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />}
            {currentStage}
          </p>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Next update</p>
          {caseStatus === 'CLOSED_CONFIRMED' ? (
            <p className="mt-1.5 text-sm font-semibold text-navy">Resolved {resolutionDate}</p>
          ) : caseStatus === 'AWAITING_CONFIRMATION' ? (
            <p className="mt-1.5 text-sm font-semibold text-navy">Awaiting customer confirmation</p>
          ) : (
            <>
              <p className="mt-1.5 text-sm font-semibold text-navy">Thursday 2:00 PM</p>
              <p className="mt-0.5 text-xs text-navy/50">Whether or not the review is complete</p>
            </>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-navy">Your Case Owner</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white ${caseOwner.colorClass}`}
            >
              {caseOwner.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">{caseOwner.name}</p>
              <p className="text-xs text-navy/50">{caseOwner.role}</p>
            </div>
          </div>
          <button
            onClick={() => setContactOpen(true)}
            className="rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal/90"
          >
            Message Judith
          </button>
        </div>
      </div>

      <DocumentChecklist documents={documents} />
      <UpdateHistory entries={historyEntries} />

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        recipient={caseOwner}
        initialSubject="Case #RN-4821"
      />
    </div>
  )
}
