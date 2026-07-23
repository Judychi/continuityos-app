import { useState, type FormEvent } from 'react'
import { Badge } from '../components/Badge'
import { Modal } from '../components/Modal'
import { Toast } from '../components/Toast'
import { selfServeRows } from '../data/incidents'
import { faqs, issueTypes } from '../data/selfService'

const myCase = selfServeRows[0]

export function SelfService() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [requestOpen, setRequestOpen] = useState(false)
  const [issueType, setIssueType] = useState(issueTypes[0])
  const [description, setDescription] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Your case</p>
            <p className="mt-1 text-lg font-semibold text-navy">Case #{myCase.caseId}</p>
          </div>
          <Badge tone="purple">SEV 3 · Self-serve</Badge>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Current stage</p>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-amber">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
              {myCase.stage}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Next heartbeat check-in</p>
            <p className="mt-1.5 text-sm font-semibold text-navy">In ~72 hours</p>
            <p className="mt-0.5 text-xs text-navy/50">Automated — self-serve cases don't get a committed callback time</p>
          </div>
        </div>
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

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <p className="mb-1 text-sm font-semibold text-navy">Need something else?</p>
        <p className="mb-4 text-sm text-navy/60">Submit a request and it'll be reviewed at your next heartbeat check-in.</p>
        <button
          onClick={() => setRequestOpen(true)}
          className="rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal/90"
        >
          Submit a new request
        </button>
      </div>

      <Modal open={requestOpen} onClose={() => setRequestOpen(false)}>
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-2xl">
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
