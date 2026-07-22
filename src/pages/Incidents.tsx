import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { PulsingDot } from '../components/PulsingDot'
import { Countdown } from '../components/Countdown'
import { Toast } from '../components/Toast'
import { ActivityTicker } from '../components/ActivityTicker'
import { incidentRows, selfServeRows } from '../data/incidents'

function SeverityBadge({ severity }: { severity: string }) {
  if (severity === 'Closed') return <Badge tone="green">Closed — Confirmed</Badge>
  if (severity === 'SEV 1') return (
    <Badge tone="red" className="animate-[gentle-pulse_2s_ease-in-out_infinite]">
      SEV 1
    </Badge>
  )
  if (severity === 'SEV 2') return <Badge tone="amber">SEV 2</Badge>
  return <Badge tone="purple">SEV 3</Badge>
}

function TierBadge({ tier }: { tier: string }) {
  if (tier === 'Tier 1 Enterprise') return <Badge tone="navy">Tier 1 Enterprise</Badge>
  if (tier === 'Tier 2 Business') return <Badge tone="slate">Tier 2 Business</Badge>
  return <Badge tone="purple">Tier 3</Badge>
}

function StageCell({ stage }: { stage: string }) {
  if (stage === '—') return <span className="text-navy/40">—</span>
  return (
    <span className="inline-flex items-center gap-1.5 font-medium text-amber">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
      {stage}
    </span>
  )
}

function NextUpdateCell({ value }: { value: string }) {
  if (value === 'countdown') {
    return <span className="font-medium text-navy tabular-nums"><Countdown initialSeconds={3 * 3600 + 12 * 60} /></span>
  }
  if (value === 'missed') {
    return <span className="font-semibold text-red">Missed · escalated</span>
  }
  return <span className="text-navy/60">{value}</span>
}

const columns = ['Account', 'Severity', 'Tier', 'Stage', 'Owner', 'Next update due', 'Revenue at risk']

export function Incidents() {
  const navigate = useNavigate()
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => setToastVisible(true), 4000)
    const hideTimer = setTimeout(() => setToastVisible(false), 9000)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Toast message="⚠ Crestline Logistics: update now overdue — auto-escalated" visible={toastVisible} />

      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-semibold text-navy">Incident Success Room</h1>
          <PulsingDot />
        </div>
        <p className="mt-1.5 text-sm text-navy/60">
          13 enterprise/business accounts · 8 resolved · 4 open · 1 escalation ·{' '}
          <span className="font-medium text-navy">$327K/mo at risk</span>
        </p>
      </div>

      <ActivityTicker />

      <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-navy/10 bg-ice/60">
                {columns.map((col) => (
                  <th key={col} className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wide text-navy/50">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incidentRows.map((row) => (
                <tr
                  key={row.account}
                  onClick={() => row.href && navigate(row.href)}
                  className={`relative border-b border-navy/5 shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-150 last:border-0 hover:z-10 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(31,58,95,0.14)] ${
                    row.href ? 'cursor-pointer hover:bg-teal/5' : 'hover:bg-ice/40'
                  }`}
                >
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-navy">{row.account}</span>
                      <span className="text-xs text-navy/40">#{row.caseId}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <SeverityBadge severity={row.severity} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <TierBadge tier={row.tier} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <StageCell stage={row.stage} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-navy/70">{row.owner}</td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <NextUpdateCell value={row.nextUpdate} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    {row.href ? (
                      <span className="font-semibold text-teal underline decoration-teal/30 underline-offset-2">
                        {row.revenue}
                      </span>
                    ) : (
                      <span className="text-navy/70">{row.revenue}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">Tier 3 · Self-serve</p>
        <p className="mb-2 mt-1 text-xs text-navy/40">
          {selfServeRows.length} self-serve individual cases, no named owner required.
        </p>
        <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <tbody>
                {selfServeRows.map((row) => (
                  <tr
                    key={row.account}
                    className="relative border-b border-navy/5 shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-150 last:border-0 hover:z-10 hover:-translate-y-0.5 hover:bg-ice/40 hover:shadow-[0_8px_20px_rgba(31,58,95,0.14)]"
                  >
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-navy">{row.account}</span>
                        <span className="text-xs text-navy/40">#{row.caseId}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <SeverityBadge severity={row.severity} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <TierBadge tier={row.tier} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <StageCell stage={row.stage} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-navy/70">{row.owner}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-navy/60">{row.nextUpdate}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-navy/70">{row.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-red/20 bg-red/5 px-5 py-4">
        <svg className="mt-0.5 h-5 w-5 shrink-0 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <p className="text-sm font-medium text-red">
          Crestline Logistics: promised update missed by 42 min — auto-escalated to CS Lead.
        </p>
      </div>
    </div>
  )
}
