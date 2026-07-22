type HistoryEntry = { timestamp: string; title: string; detail: string }

export function UpdateHistory({ entries }: { entries: HistoryEntry[] }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-navy">Update history</p>
      <ul className="space-y-5">
        {entries.map((entry) => (
          <li key={entry.timestamp} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-teal" />
              <span className="mt-1 w-px flex-1 bg-navy/10" />
            </div>
            <div className="pb-1">
              <p className="text-xs font-medium text-navy/40">{entry.timestamp}</p>
              <p className="mt-0.5 text-sm font-semibold text-navy">{entry.title}</p>
              <p className="mt-0.5 text-sm text-navy/60">{entry.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
