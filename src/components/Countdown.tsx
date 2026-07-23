import { useEffect, useState } from 'react'

function formatRemaining(ms: number) {
  if (ms <= 0) return 'Due now'
  const totalSeconds = Math.floor(ms / 1000)
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

export function Countdown({ target }: { target: Date }) {
  const [remainingMs, setRemainingMs] = useState(() => target.getTime() - Date.now())

  useEffect(() => {
    function recalculate() {
      setRemainingMs(target.getTime() - Date.now())
    }

    recalculate()
    const id = setInterval(recalculate, 60_000)
    return () => clearInterval(id)
  }, [target])

  return <span className="tabular-nums">{formatRemaining(remainingMs)}</span>
}
