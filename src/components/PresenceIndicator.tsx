import { useEffect, useState } from 'react'
import { PresenceAvatar } from './PresenceAvatar'

export function PresenceIndicator() {
  const [showSecond, setShowSecond] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShowSecond(true), 6000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex items-center -space-x-2 pt-1">
      <PresenceAvatar initials="JC" colorClass="bg-teal" label="Judith C. is viewing this case" />
      {showSecond && (
        <PresenceAvatar
          initials="TA"
          colorClass="bg-purple"
          label="Tunde A. is viewing this case"
          className="animate-[presence-slide-in_320ms_ease-out]"
        />
      )}
    </div>
  )
}
