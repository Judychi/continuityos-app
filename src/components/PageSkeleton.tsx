function Block({ className }: { className: string }) {
  return <div className={`bg-navy/10 ${className}`} />
}

function TrackerSkeleton() {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <Block className="h-4 w-28 rounded-md" />
        <Block className="h-3 w-20 rounded-md" />
      </div>
      <div className="flex items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-1 items-center last:flex-none">
            <Block className="h-9 w-9 shrink-0 rounded-full" />
            {i < 3 && <Block className="mx-2 h-0.5 flex-1 rounded-full" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function IncidentsSkeleton() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse space-y-6">
      <div className="space-y-2">
        <Block className="h-7 w-72 rounded-md" />
        <Block className="h-4 w-96 rounded-md" />
      </div>

      <Block className="h-9 w-full rounded-xl" />

      <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
        <div className="border-b border-navy/10 bg-ice/60 px-5 py-3">
          <Block className="h-3 w-48 rounded-md" />
        </div>
        <div className="divide-y divide-navy/5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-5 py-4">
              <Block className="h-4 w-32 rounded-md" />
              <Block className="h-5 w-16 rounded-full" />
              <Block className="h-5 w-24 rounded-full" />
              <Block className="h-4 w-28 rounded-md" />
              <Block className="h-4 w-20 rounded-md" />
              <Block className="h-4 w-16 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Block className="h-3 w-40 rounded-md" />
        <div className="space-y-3 rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
          {Array.from({ length: 2 }).map((_, i) => (
            <Block key={i} className="h-4 w-full rounded-md" />
          ))}
        </div>
      </div>

      <Block className="h-16 w-full rounded-2xl" />
    </div>
  )
}

function StatusHubSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse space-y-6">
      <div className="space-y-2">
        <Block className="h-7 w-80 rounded-md" />
        <Block className="h-4 w-56 rounded-md" />
      </div>

      <TrackerSkeleton />

      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
            <Block className="h-3 w-20 rounded-md" />
            <Block className="h-4 w-28 rounded-md" />
          </div>
        ))}
      </div>

      <div className="space-y-3 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <Block className="h-4 w-32 rounded-md" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Block key={i} className="h-4 w-full rounded-md" />
        ))}
      </div>

      <div className="space-y-3 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <Block className="h-4 w-32 rounded-md" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Block key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
    </div>
  )
}

function CaseDetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Block className="h-7 w-80 rounded-md" />
          <Block className="h-4 w-40 rounded-md" />
        </div>
        <Block className="h-8 w-8 rounded-full" />
      </div>

      <TrackerSkeleton />

      <div className="space-y-3 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <Block className="h-4 w-32 rounded-md" />
        <Block className="h-9 w-48 rounded-xl" />
      </div>

      <div className="space-y-3 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <Block className="h-4 w-32 rounded-md" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Block key={i} className="h-4 w-full rounded-md" />
        ))}
      </div>

      <div className="space-y-3 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <Block className="h-4 w-32 rounded-md" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Block key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
    </div>
  )
}

function AccountSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-6">
      <div className="space-y-2">
        <Block className="h-7 w-56 rounded-md" />
        <Block className="h-4 w-64 rounded-md" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2 rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
            <Block className="h-3 w-24 rounded-md" />
            <Block className="h-7 w-16 rounded-md" />
          </div>
        ))}
      </div>

      <div className="space-y-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <Block className="h-4 w-48 rounded-md" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <Block className="h-3 w-full rounded-md" />
            <Block className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>

      <div className="space-y-3 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <Block className="h-4 w-48 rounded-md" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Block key={i} className="h-12 w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}

function ContactSkeleton() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse space-y-6">
      <div className="space-y-2">
        <Block className="h-7 w-56 rounded-md" />
        <Block className="h-4 w-72 rounded-md" />
      </div>

      <div className="space-y-3 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Block className="h-12 w-12 rounded-full" />
          <div className="space-y-1.5">
            <Block className="h-4 w-24 rounded-md" />
            <Block className="h-3 w-32 rounded-md" />
          </div>
        </div>
        <Block className="h-3 w-56 rounded-md" />
      </div>

      <div className="space-y-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <Block className="h-9 w-full rounded-xl" />
        <Block className="h-28 w-full rounded-xl" />
        <Block className="h-10 w-32 rounded-xl" />
      </div>
    </div>
  )
}

function SelfServiceSkeleton() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse space-y-6">
      <div className="space-y-2">
        <Block className="h-7 w-48 rounded-md" />
        <Block className="h-4 w-80 rounded-md" />
      </div>

      <div className="space-y-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <Block className="h-5 w-32 rounded-md" />
          <Block className="h-5 w-24 rounded-full" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Block className="h-10 w-full rounded-md" />
          <Block className="h-10 w-full rounded-md" />
        </div>
      </div>

      <div className="space-y-3 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <Block className="h-4 w-56 rounded-md" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Block key={i} className="h-9 w-full rounded-md" />
        ))}
      </div>

      <Block className="h-24 w-full rounded-2xl" />
    </div>
  )
}

function DefaultSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse space-y-6">
      <Block className="h-7 w-64 rounded-md" />
      <Block className="h-40 w-full rounded-2xl" />
      <Block className="h-40 w-full rounded-2xl" />
    </div>
  )
}

export function PageSkeleton({ pathname }: { pathname: string }) {
  if (pathname === '/incidents') return <IncidentsSkeleton />
  if (pathname === '/status') return <StatusHubSkeleton />
  if (pathname === '/account') return <AccountSkeleton />
  if (pathname === '/incidents/rn-4821') return <CaseDetailSkeleton />
  if (pathname === '/contact') return <ContactSkeleton />
  if (pathname === '/self-service') return <SelfServiceSkeleton />
  return <DefaultSkeleton />
}
