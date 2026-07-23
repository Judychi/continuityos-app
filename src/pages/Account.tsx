import { useEffect, useState } from 'react'
import { Badge } from '../components/Badge'
import { HealthSparkline } from '../components/HealthSparkline'
import { healthComponents, milestones } from '../data/account'

const HEALTH_SCORE = 42

function scoreColor(score: number) {
  if (score >= 60) return 'bg-green'
  if (score >= 30) return 'bg-amber'
  return 'bg-red'
}

export function Account() {
  const [displayedScore, setDisplayedScore] = useState(0)
  const [barsFilled, setBarsFilled] = useState(false)

  useEffect(() => {
    const duration = 800
    const start = performance.now()
    let frame: number

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      setDisplayedScore(Math.round(progress * HEALTH_SCORE))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => setBarsFilled(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-navy">Account Overview</h1>
        <p className="mt-1.5 text-sm text-navy/60">PeopleGrid Africa · Tier 1 Enterprise</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Health score</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-navy tabular-nums">{displayedScore}</span>
            <Badge tone="amber">Orange band</Badge>
          </div>
          <div className="mt-3">
            <HealthSparkline />
          </div>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Monthly volume</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-navy">$155K</span>
            <span className="text-sm font-medium text-red">↓26%</span>
          </div>
          <p className="mt-0.5 text-xs text-navy/50">vs baseline</p>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Open incidents</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-navy">2</span>
          </div>
          <p className="mt-0.5 text-xs text-navy/50">1 Sev1 · 1 Sev3</p>
        </div>
        <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">Expansion trigger</p>
          <p className="mt-2 text-sm font-semibold text-navy">Not yet</p>
          <p className="mt-0.5 text-xs text-navy/50">12 of 90 days green</p>
        </div>
      </div>

      <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
        <p className="mb-5 text-sm font-semibold text-navy">Health score components</p>
        <div className="space-y-4">
          {healthComponents.map((c) => (
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
          {milestones.map((m) => (
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
