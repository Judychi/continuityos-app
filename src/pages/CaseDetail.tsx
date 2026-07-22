import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Modal } from '../components/Modal'
import { CaseProgress } from '../components/CaseProgress'
import { DocumentChecklist } from '../components/DocumentChecklist'
import { UpdateHistory } from '../components/UpdateHistory'
import { useCase } from '../context/CaseContext'
import { documents, getHistory, getStageLabel, getSteps, resolutionLetter } from '../data/caseDetail'

const sequenceLabels = ['Stage moved', 'Letter generated', 'Sent to client', 'Logged on timeline']

export function CaseDetail() {
  const { caseResolved, setCaseResolved } = useCase()
  const [isAdvancing, setIsAdvancing] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [letterOpen, setLetterOpen] = useState(false)

  useEffect(() => {
    if (!isAdvancing) return
    if (visibleSteps >= sequenceLabels.length) {
      const timeout = setTimeout(() => {
        setCaseResolved(true)
        setIsAdvancing(false)
      }, 700)
      return () => clearTimeout(timeout)
    }
    const timeout = setTimeout(() => setVisibleSteps((v) => v + 1), 1000)
    return () => clearTimeout(timeout)
  }, [isAdvancing, visibleSteps, setCaseResolved])

  function handleAdvance() {
    setVisibleSteps(0)
    setIsAdvancing(true)
  }

  function handleReset() {
    setIsAdvancing(false)
    setVisibleSteps(0)
    setLetterOpen(false)
    setCaseResolved(false)
  }

  const steps = getSteps(caseResolved)
  const history = getHistory(caseResolved)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-semibold text-navy">Case #RN-4821 — PeopleGrid Africa</h1>
          <Badge tone="navy">Internal case detail</Badge>
          {caseResolved && <Badge tone="green">Resolved</Badge>}
        </div>
        <Link to="/incidents" className="mt-1.5 inline-block text-sm text-teal hover:underline">
          ← Back to Incident Success Room
        </Link>
      </div>

      <CaseProgress steps={steps} stageLabel={getStageLabel(caseResolved)} />

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-navy">Resolution actions</p>

        {!caseResolved && !isAdvancing && (
          <button
            onClick={handleAdvance}
            className="rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal/90"
          >
            Advance to Resolution Drafted
          </button>
        )}

        {isAdvancing && (
          <div className="rounded-xl border border-teal/20 bg-teal/5 p-5">
            <p className="mb-3 text-sm font-semibold text-navy">Advancing to resolution…</p>
            <ul className="space-y-2.5">
              {sequenceLabels.map((label, i) => {
                const done = i < visibleSteps
                return (
                  <li key={label} className="flex items-center gap-2.5 text-sm">
                    {done ? (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green text-white">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </span>
                    ) : (
                      <span className="h-5 w-5 shrink-0 rounded-full border-2 border-navy/15" />
                    )}
                    <span className={done ? 'font-medium text-navy' : 'text-navy/40'}>{label}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {caseResolved && !isAdvancing && (
          <div className="flex flex-wrap items-center gap-4">
            <Badge tone="green">Resolution drafted ✓</Badge>
            <button onClick={() => setLetterOpen(true)} className="text-sm font-medium text-teal hover:underline">
              Open letter
            </button>
          </div>
        )}

        <div className="mt-5 border-t border-navy/5 pt-4">
          <button onClick={handleReset} className="text-xs font-medium text-navy/40 hover:text-navy/70 hover:underline">
            Reset demo
          </button>
        </div>
      </div>

      <DocumentChecklist documents={documents} />
      <UpdateHistory entries={history} />

      <Modal open={letterOpen} onClose={() => setLetterOpen(false)}>
        <div className="relative max-h-[85vh] overflow-y-auto rounded-lg bg-white p-10 font-serif text-navy shadow-2xl">
          <button
            onClick={() => setLetterOpen(false)}
            className="absolute right-5 top-5 font-sans text-navy/40 hover:text-navy"
            aria-label="Close letter"
          >
            ✕
          </button>
          <div className="mb-8 flex items-start justify-between border-b border-navy/10 pb-5">
            <div>
              <p className="text-sm font-semibold tracking-wide">ContinuityCX Technologies</p>
              <p className="mt-0.5 font-sans text-xs text-navy/50">Enterprise Success · Case Resolution</p>
            </div>
            <p className="font-sans text-xs text-navy/50">{resolutionLetter.date}</p>
          </div>
          <p className="mb-6 font-sans text-xs uppercase tracking-wide text-navy/50">
            Re: Case #{resolutionLetter.caseId} — {resolutionLetter.recipient}
          </p>
          <div className="space-y-4 text-sm leading-relaxed">
            {resolutionLetter.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10">
            <p className="text-sm">{resolutionLetter.signOff}</p>
            <p className="mt-4 text-base font-semibold italic">{resolutionLetter.signature}</p>
            <p className="font-sans text-xs text-navy/50">{resolutionLetter.signatureTitle}</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}
