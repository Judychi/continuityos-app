import type { ReactNode } from 'react'

type BadgeTone = 'navy' | 'teal' | 'red' | 'amber' | 'green' | 'purple' | 'slate'

const toneClasses: Record<BadgeTone, string> = {
  navy: 'bg-navy/10 text-navy ring-navy/20',
  teal: 'bg-teal/10 text-teal ring-teal/20',
  red: 'bg-red/10 text-red ring-red/20',
  amber: 'bg-amber/10 text-amber ring-amber/20',
  green: 'bg-green/10 text-green ring-green/20',
  purple: 'bg-purple/10 text-purple ring-purple/20',
  slate: 'bg-slate-500/10 text-slate-600 ring-slate-500/20',
}

export function Badge({ tone, children, className = '' }: { tone: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset whitespace-nowrap ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
