import { useEffect, useState } from 'react'
import { PresenceAvatar } from './PresenceAvatar'

const MEMBERS = [
  { initials: 'JC', colorClass: 'bg-teal', name: 'Judith C.' },
  { initials: 'TA', colorClass: 'bg-purple', name: 'Tunde A.' },
  { initials: 'KB', colorClass: 'bg-navy', name: 'Kemi B.' },
]

const STAGGER_MS = 1000

export function TeamPresence() {
  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    const timeouts = [2, 3].map((count, i) => setTimeout(() => setVisibleCount(count), (i + 1) * STAGGER_MS))
    return () => timeouts.forEach(clearTimeout)
  }, [])

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center -space-x-2">
        {MEMBERS.slice(0, visibleCount).map((member, i) => (
          <PresenceAvatar
            key={member.initials}
            initials={member.initials}
            colorClass={member.colorClass}
            label={`${member.name} is active`}
            className={i === visibleCount - 1 && i > 0 ? 'animate-[presence-slide-in_320ms_ease-out]' : ''}
          />
        ))}
      </div>
      <span className="text-xs text-navy/50">3 CSMs active</span>
    </div>
  )
}
