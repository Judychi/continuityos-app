import type { ReactNode } from 'react'

type BadgeTone = 'navy' | 'teal' | 'red' | 'amber' | 'green' | 'purple' | 'slate' | 'grey'
type BadgeVariant = 'soft' | 'solid'

const softToneClasses: Record<BadgeTone, string> = {
  navy: 'bg-navy/10 text-navy ring-navy/20',
  teal: 'bg-teal/10 text-teal ring-teal/20',
  red: 'bg-red/10 text-red ring-red/20',
  amber: 'bg-amber/10 text-amber ring-amber/20',
  green: 'bg-green/10 text-green ring-green/20',
  purple: 'bg-purple/10 text-purple ring-purple/20',
  slate: 'bg-slate-500/10 text-slate-600 ring-slate-500/20',
  grey: 'bg-grey/10 text-grey ring-grey/20',
}

const solidToneClasses: Record<BadgeTone, string> = {
  navy: 'bg-navy text-white',
  teal: 'bg-teal text-white',
  red: 'bg-red text-white',
  amber: 'bg-amber text-white',
  green: 'bg-green text-white',
  purple: 'bg-purple text-white',
  slate: 'bg-slate-500 text-white',
  grey: 'bg-grey text-white',
}

export function Badge({
  tone,
  variant = 'soft',
  children,
  className = '',
}: {
  tone: BadgeTone
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}) {
  const toneClass = variant === 'solid' ? solidToneClasses[tone] : softToneClasses[tone]
  const ringClass = variant === 'soft' ? 'ring-1 ring-inset' : ''
  const weightClass = variant === 'solid' ? 'font-semibold' : 'font-medium'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs whitespace-nowrap ${weightClass} ${ringClass} ${toneClass} ${className}`}
    >
      {children}
    </span>
  )
}
