import { useRef, useState, type FormEvent } from 'react'
import { Clock, FileText, ShieldAlert, HelpCircle, Search } from 'lucide-react'
import { Badge } from '../components/Badge'
import { Modal } from '../components/Modal'
import { Toast } from '../components/Toast'
import { faqs, issueTypes } from '../data/selfService'

const helpOptions = [
  { label: 'Payment delayed', icon: Clock, action: 'scroll' as const },
  { label: 'Document requested', icon: FileText, action: 'scroll' as const },
  { label: 'Account restricted', icon: ShieldAlert, action: 'scroll' as const },
  { label: 'Something else', icon: HelpCircle, action: 'request' as const },
]

export function SelfService() {
  const lookupRef = useRef<HTMLDivElement>(null)

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [requestOpen, setRequestOpen] = useState(false)
  const [issueType, setIssueType] = useState(issueTypes[0])
  const [description, setDescription] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  const [caseNumberInput, setCaseNumberInput] = useState('')
  const [submittedCaseNumber, setSubmittedCaseNumber] = useState('')

  function scrollToLookup() {
    lookupRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleHelpOptionClick(action: 'scroll' | 'request') {
    if (action === 'scroll') {
      scrollToLookup()
    } else {
      setRequestOpen(true)
    }
  }

  function handleCheckStatus(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmittedCaseNumber(caseNumberInput.trim())
  }

  function handleSubmitRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setRequestOpen(false)
    setDescription('')
    setIssueType(issueTypes[0])
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 5000)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Toast
        tone="green"
        message="Request submitted — you'll get an update at your next heartbeat check-in"
        visible={toastVisible}
      />

      <div>
        <h1 className="text-2xl font-semibold text-navy">Self Service</h1>
        <p className="mt-1.5 text-sm text-navy/60">Track your case and get help — no need to wait on a dedicated rep.</p>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-navy">What can we help with?</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {helpOptions.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => handleHelpOptionClick(option.action)}
                className="flex flex-col items-center gap-2 rounded-2xl border border-navy/10 bg-white p-5 text-center shadow-sm transition-colors hover:border-teal/40 hover:bg-teal/5"
              >
                <Icon className="h-6 w-6 text-teal" strokeWidth={1.75} />
                <span className="text-sm font-medium text-navy">{option.label}</span>
              </button>
            )
          })}
        </div>
        <p className="mt-3 text-xs text-navy/50">
          Don't see your issue above? Use "Something else" to log a new case.
        </p>
      </div>

      <div ref={lookupRef} className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-navy">Check status of your case</p>
        <form onSubmit={handleCheckStatus} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="case-number" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50">
              Enter your case number
            </label>
            <input
              id="case-number"
              type="text"
              required
              value={caseNumberInput}
              onChange={(e) => setCaseNumberInput(e.target.value)}
              placeholder="e.g. RN-4906"
              className="w-full rounded-xl border border-navy/15 px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal/90"
          >
            <Search className="h-4 w-4" strokeWidth={2} />
            Check status
          </button>
        </form>

        {submittedCaseNumber && (
          <div className="mt-6 rounded-2xl border border-navy/10 bg-ice/40 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Your case</p>
                <p className="mt-1 text-lg font-semibold text-navy">Case #{submittedCaseNumber}</p>
              </div>
              <Badge tone="purple">SEV 3 · Self-serve</Badge>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Current stage</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-amber">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  Payment tracing
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Next heartbeat check-in</p>
                <p className="mt-1.5 text-sm font-semibold text-navy">In ~72 hours</p>
                <p className="mt-0.5 text-xs text-navy/50">Automated — self-serve cases don't get a committed callback time</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm font-semibold text-navy">Frequently asked questions</p>
        <ul className="divide-y divide-navy/5">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIndex === i
            return (
              <li key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-3.5 text-left text-sm font-medium text-navy"
                >
                  {faq.question}
                  <svg
                    className={`h-4 w-4 shrink-0 text-navy/40 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {isOpen && <p className="pb-4 text-sm text-navy/60">{faq.answer}</p>}
              </li>
            )
          })}
        </ul>
      </div>

      <Modal open={requestOpen} onClose={() => setRequestOpen(false)}>
        <form onSubmit={handleSubmitRequest} className="rounded-2xl bg-white p-6 shadow-2xl">
          <p className="mb-4 text-sm font-semibold text-navy">Submit a new request</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="issue-type" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50">
                Issue type
              </label>
              <select
                id="issue-type"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full rounded-xl border border-navy/15 px-3.5 py-2.5 text-sm text-navy focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              >
                {issueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="issue-description"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50"
              >
                Description
              </label>
              <textarea
                id="issue-description"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us what's going on..."
                className="w-full resize-none rounded-xl border border-navy/15 px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setRequestOpen(false)}
              className="text-sm font-medium text-navy/50 hover:text-navy"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal/90"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
