import type { StepState } from '../data/caseDetail'

function StepIcon({ state }: { state: StepState }) {
  if (state === 'done') {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green text-white">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
    )
  }
  if (state === 'current') {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber text-white ring-4 ring-amber/20">
        <span className="h-2.5 w-2.5 rounded-full bg-white" />
      </div>
    )
  }
  return <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-navy/15 bg-white text-navy/30" />
}

export function CaseProgress({
  steps,
  stageLabel,
}: {
  steps: { label: string; state: StepState }[]
  stageLabel: string
}) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-semibold text-navy">Case progress</p>
        <p className="text-xs font-medium text-navy/50">{stageLabel}</p>
      </div>
      <div className="flex items-start">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2 text-center">
              <StepIcon state={step.state} />
              <span
                className={`w-24 text-xs font-medium leading-tight ${
                  step.state === 'pending' ? 'text-navy/40' : 'text-navy'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-2 mb-6 h-0.5 flex-1 ${step.state === 'done' ? 'bg-green' : 'bg-navy/10'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
