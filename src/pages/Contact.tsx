import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Toast } from '../components/Toast'

export function Contact() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    }
  }, [])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubject('')
    setMessage('')
    setToastVisible(true)
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
    hideTimeoutRef.current = setTimeout(() => setToastVisible(false), 5000)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Toast
        tone="green"
        message="Message sent to Judith C. — she typically responds within 2 hours"
        visible={toastVisible}
      />

      <div>
        <h1 className="text-2xl font-semibold text-navy">Contact Your CSM</h1>
        <p className="mt-1.5 text-sm text-navy/60">Reach your dedicated Customer Success Manager directly.</p>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/15 text-sm font-semibold text-teal">
            JC
          </div>
          <div>
            <p className="text-base font-semibold text-navy">Judith C.</p>
            <p className="text-xs text-navy/50">Enterprise Success</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-navy/60">Your dedicated contact for PeopleGrid Africa.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50">
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
          <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50">
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
        <button
          type="submit"
          className="rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal/90"
        >
          Send message
        </button>
      </form>
    </div>
  )
}
