import { useState, type FormEvent } from 'react'
import { Modal } from './Modal'
import { Toast } from './Toast'

export function SupportContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('')
  const [caseNumber, setCaseNumber] = useState('')
  const [message, setMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onClose()
    setName('')
    setCaseNumber('')
    setMessage('')
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 5000)
  }

  return (
    <>
      <Toast
        tone="green"
        message="Message sent — our support team typically responds within 24 hours"
        visible={toastVisible}
      />
      <Modal open={open} onClose={onClose}>
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-2xl">
          <p className="text-sm font-semibold text-navy">Contact Support</p>
          <p className="mt-1 mb-5 text-xs text-navy/50">
            Reaches our shared support queue — not a specific CSM. Typically responds within 24 hours.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="support-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50">
                Name <span className="normal-case text-navy/30">(optional)</span>
              </label>
              <input
                id="support-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-navy/15 px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              />
            </div>
            <div>
              <label htmlFor="support-case" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50">
                Case number <span className="normal-case text-navy/30">(optional)</span>
              </label>
              <input
                id="support-case"
                type="text"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                placeholder="e.g. RN-4906"
                className="w-full rounded-xl border border-navy/15 px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              />
            </div>
            <div>
              <label
                htmlFor="support-message"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50"
              >
                Message
              </label>
              <textarea
                id="support-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                className="w-full resize-none rounded-xl border border-navy/15 px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="text-sm font-medium text-navy/50 hover:text-navy">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal/90"
            >
              Send
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
