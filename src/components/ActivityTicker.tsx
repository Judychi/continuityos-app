const TICKER_ITEMS = [
  'Kigali Tech Studio confirmed resolution · 2m ago',
  'New document received — NairaWorks · 5m ago',
  'Owner reassigned — Zanzibar Freight · 8m ago',
]

export function ActivityTicker() {
  const track = TICKER_ITEMS.join('   •   ') + '   •   '

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
