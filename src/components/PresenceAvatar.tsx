export function PresenceAvatar({
  initials,
  colorClass,
  label,
  className = '',
}: {
  initials: string
  colorClass: string
  label: string
  className?: string
}) {
  return (
    <div className={`group relative ${className}`}>
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ring-2 ring-white ${colorClass}`}
      >
        {initials}
      </div>
      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green ring-2 ring-white" />
      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-max -translate-x-1/2 rounded-md bg-navy px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        {label}
      </div>
    </div>
  )
}
