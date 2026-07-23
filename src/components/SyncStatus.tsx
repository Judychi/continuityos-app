import { useEffect, useState } from 'react'
import { PulsingDot } from './PulsingDot'

const SYNC_INTERVAL_MS = 30_000
const FLASH_DURATION_MS = 500

export function SyncStatus() {
  const [secondsAgo, setSecondsAgo] = useState(0)
  const [isFlashing, setIsFlashing] = useState(false)

  useEffect(() => {
    const tickId = setInterval(() => setSecondsAgo((s) => s + 1), 1000)
    return () => clearInterval(tickId)
  }, [])

  useEffect(() => {
    const syncId = setInterval(() => {
      setSecondsAgo(0)
      setIsFlashing(true)
    }, SYNC_INTERVAL_MS)
    return () => clearInterval(syncId)
  }, [])

  useEffect(() => {
    if (!isFlashing) return
    const timeout = setTimeout(() => setIsFlashing(false), FLASH_DURATION_MS)
    return () => clearTimeout(timeout)
  }, [isFlashing])

  return (
    <span className="flex items-center gap-1.5">
      <PulsingDot flash={isFlashing} />
      <span className="text-xs text-navy/50 tabular-nums">
        Synced {secondsAgo === 0 ? 'just now' : `${secondsAgo}s ago`}
      </span>
    </span>
  )
}
