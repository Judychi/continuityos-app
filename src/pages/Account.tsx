import { useEffect, useMemo, useRef, useState } from 'react'
import { Calendar } from 'lucide-react'
import { Badge } from '../components/Badge'
import { HealthSparkline } from '../components/HealthSparkline'
import { accountNames, accountProfiles, type AccountProfile } from '../data/account'

function scoreColor(score: number) {
  if (score >= 60) return 'bg-green'
  if (score >= 30) return 'bg-amber'
  return 'bg-red'
}

function bandTone(band: AccountProfile['band']) {
  if (band === 'Green') return 'green' as const
  if (band === 'Orange') return 'amber' as const
  return 'red' as const
}

function addBusinessDays(start: Date, days: number) {
  const result = new Date(start)
  let added = 0
  while (added < days) {
    result.setDate(result.getDate() + 1)
    const dayOfWeek = result.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) added++
  }
  return result
}

function formatReviewDate(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function Account() {
  const [selectedAccount, setSelectedAccount] = useState(accountNames[0])
  const profile = accountProfiles[selectedAccount]

  const [displayedScore, setDisplayedScore] = useState(0)
  const [barsFilled, setBarsFilled] = useState(false)
  const hasAnimatedScoreRef = useRef(false)

  useEffect(() => {
    if (!hasAnimatedScoreRef.current) {
      hasAnimatedScoreRef.current = true
      const duration = 800
      const start = performance.now()
      let frame: number

      function tick(now: number) {
        const progress = Math.min((now - start) / duration, 1)
        setDisplayedScore(Math.round(progress * profile.healthScore))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }

      frame = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(frame)
    }

    // Switching accounts updates the score instantly rather than replaying the count-up.
    setDisplayedScore(profile.healthScore)
  }, [profile.healthScore])

  useEffect(() => {
    const frame = requestAnimationFrame(() => setBarsFilled(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const nextReviewDueDate = useMemo(() => formatReviewDate(addBusinessDays(new Date(), 5)), [])

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-semibold text-navy">Account Overview</h1>
          <Badge tone="navy">Internal — account health & planning</Badge>
        </div>

        <div className="mt-3 max-w-xs">
          <label htmlFor="account-select" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy/50">
            Viewing account
          </label>
          <select
            id="account-select"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-sm font-medium text-navy focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          >
            {accountNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-3 text-sm text-navy/60">
          {profile.name} · {profile.tier}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Health score</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-navy tabular-nums">{displayedScore}</span>
            <Badge tone={bandTone(profile.band)}>{profile.band} band</Badge>
          </div>
          <div className="mt-3">
            <HealthSparkline history={profile.sparkline} />
          </div>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Monthly volume</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-navy">{profile.monthlyVolume}</span>
            <span className={`text-sm font-medium ${profile.volumeTrendTone === 'red' ? 'text-red' : 'text-green'}`}>
              {profile.volumeTrendLabel}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-navy/50">vs baseline</p>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Open incidents</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-navy">{profile.openIncidents}</span>
          </div>
          <p className="mt-0.5 text-xs text-navy/50">{profile.openIncidentsNote}</p>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Expansion trigger</p>
          <p className="mt-2 text-sm font-semibold text-navy">{profile.expansionHeadline}</p>
          <p className="mt-0.5 text-xs text-navy/50">{profile.expansionSubtext}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0 text-navy/40" strokeWidth={1.75} />
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Next Business Review</p>
        </div>

        {profile.nextReview.kind === 'due' && (
          <>
            <p className="mt-2 text-sm font-semibold text-navy">Due by {nextReviewDueDate}</p>
            <p className="mt-0.5 text-xs text-navy/50">
              Triggered by case closure — per the Incident Management Playbook.
            </p>
            <p className="mt-2 text-xs text-navy/40">
              Full review runs in PandaDoc — Section 2.8 covers the advocacy check.
            </p>
          </>
        )}

        {profile.nextReview.kind === 'not-due' && (
          <p className="mt-2 text-sm font-semibold text-navy/60">Not due — no recent closure</p>
        )}

        {profile.nextReview.kind === 'completed' && (
          <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-green">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Completed {profile.nextReview.date}
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <p className="mb-5 text-sm font-semibold text-navy">Health score components</p>
        <div className="space-y-4">
          {profile.healthComponents.map((c) => (
            <div key={c.name}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-navy/80">
                  {c.name} <span className="text-navy/40">· {c.weight}% weight</span>
                </span>
                <span className="font-semibold text-navy">{c.score}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-navy/5">
                <div
                  className={`h-full rounded-full transition-[width] duration-700 ease-out ${scoreColor(c.score)}`}
                  style={{ width: barsFilled ? `${c.score}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <p className="mb-5 text-sm font-semibold text-navy">Success plan milestones</p>
        <ul className="space-y-4">
          {profile.milestones.map((m) => (
            <li key={m.label} className="flex items-center justify-between rounded-xl bg-ice/60 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    m.status === 'done' ? 'bg-green text-white' : 'bg-amber/15 text-amber'
                  }`}
                >
                  {m.status === 'done' ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium text-navy">{m.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-navy/50">Day {m.day}</span>
                {m.status === 'done' ? <Badge tone="green">Done</Badge> : <Badge tone="amber">Paused</Badge>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
