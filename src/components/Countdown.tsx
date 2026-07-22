import { useEffect, useState } from 'react'

function format(totalSeconds: number) {
  if (totalSeconds <= 0) return 'Due now'
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

export function Countdown({ initialSeconds }: { initialSeconds: number }) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((prev) => Math.max(prev - 60, 0))
    }, 60_000)
    return () => clearInterval(id)
  }, [])

  return <span className="tabular-nums">{format(seconds)}</span>
}
