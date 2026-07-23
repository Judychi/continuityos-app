import { useEffect, useState } from 'react'

type TickerEvent = {
  id: string
  text: string
  at: Date
}

function formatRelative(at: Date, now: Date) {
  const diffMinutes = Math.max(0, Math.round((now.getTime() - at.getTime()) / 60_000))
  if (diffMinutes < 1) return 'just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  const diffHours = Math.round(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.round(diffHours / 24)
  return `${diffDays}d ago`
}

export function ActivityTicker() {
  const [events] = useState<TickerEvent[]>(() => {
    const mountedAt = Date.now()
    return [
      { id: 'kigali', text: 'Kigali Tech Studio confirmed resolution', at: new Date(mountedAt - 2 * 60_000) },
      { id: 'nairaworks', text: 'New document received — NairaWorks', at: new Date(mountedAt - 5 * 60_000) },
      { id: 'zanzibar', text: 'Owner reassigned — Zanzibar Freight', at: new Date(mountedAt - 8 * 60_000) },
    ]
  })
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const track = events.map((event) => `${event.text} · ${formatRelative(event.at, now)}`).join('   •   ') + '   •   '

  return (
    <div className="overflow-hidden rounded-xl border border-navy/10 bg-white/70 py-2">
      <div className="flex w-max animate-[ticker-scroll_26s_linear_infinite] whitespace-nowrap text-xs text-navy/50">
        <span className="px-4">{track}</span>
        <span className="px-4" aria-hidden="true">
          {track}
        </span>
      </div>
    </div>
  )
}
