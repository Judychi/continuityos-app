export function PulsingDot({
  colorClass = 'bg-green',
  flash = false,
}: {
  colorClass?: string
  flash?: boolean
}) {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${colorClass} opacity-60`} />
      <span
        className={`relative inline-flex h-2.5 w-2.5 rounded-full ${colorClass} ${
          flash ? 'animate-[sync-flash_500ms_ease-out]' : ''
        }`}
      />
    </span>
  )
}
