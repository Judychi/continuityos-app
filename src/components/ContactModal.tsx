import { useEffect, useState, type FormEvent } from 'react'
import { Modal } from './Modal'
import { Toast } from './Toast'
import type { Csm } from '../data/csm'

export function ContactModal({
  open,
  onClose,
  recipient,
  initialSubject = '',
}: {
  open: boolean
  onClose: () => void
  recipient: Csm
  initialSubject?: string
}) {
  const [subject, setSubject] = useState(initialSubject)
  const [message, setMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setSubject(initialSubject)
      setMessage('')
    }
  }, [open, initialSubject])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onClose()
    setMessage('')
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 5000)
  }

  return (
    <>
      <Toast
        tone="green"
        message={`Message sent to ${recipient.name} — typically responds within 2 hours`}
        visible={toastVisible}
      />
      <Modal open={open} onClose={onClose}>
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-2xl">
          <div className="mb-5 flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white ${recipient.colorClass}`}
            >
              {recipient.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">Message {recipient.name}</p>
              <p className="text-xs text-navy/50">{recipient.role}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="contact-subject"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What's this about?"
                className="w-full rounded-xl border border-navy/15 px-3.5 py-2.5 text-sm text-navy placeholder:text-navy/30 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
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
              Send message
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
