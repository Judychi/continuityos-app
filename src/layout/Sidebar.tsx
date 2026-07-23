import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Settings, MessageCircle, LifeBuoy } from 'lucide-react'
import { PulsingDot } from '../components/PulsingDot'

type NavItem = { to: string; label: string; tag: string; renderIcon: (className: string) => ReactNode }

const primaryNavItems: NavItem[] = [
  {
    to: '/incidents',
    label: 'Incident Success Room',
    tag: 'Internal',
    renderIcon: (className) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M12 9v3.75m0 3.375h.008v.008H12v-.008ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    to: '/status',
    label: 'Status Hub',
    tag: 'Customer view',
    renderIcon: (className) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    ),
  },
  {
    to: '/account',
    label: 'Account Overview',
    tag: 'Health & plan',
    renderIcon: (className) => (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
          d="M3.75 13.5l6-6 4 4 6.75-6.75M21 13.5V7.5h-6"
        />
      </svg>
    ),
  },
  {
    to: '/contact',
    label: 'Contact Your CSM',
    tag: 'Reach Judith C.',
    renderIcon: (className) => <MessageCircle className={className} strokeWidth={1.75} />,
  },
]

const secondaryNavItems: NavItem[] = [
  {
    to: '/self-service',
    label: 'Self Service',
    tag: 'Individual accounts',
    renderIcon: (className) => <LifeBuoy className={className} strokeWidth={1.75} />,
  },
]

function SidebarNavLink({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors ${
          isActive ? 'bg-white/10 text-white' : 'text-ice/70 hover:bg-white/5 hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {item.renderIcon(`mt-0.5 h-5 w-5 shrink-0 ${isActive ? 'text-teal' : 'text-ice/50 group-hover:text-teal'}`)}
          <span className="flex flex-col">
            <span className="text-sm font-medium leading-tight">{item.label}</span>
            <span className="text-xs text-ice/50">{item.tag}</span>
          </span>
        </>
      )}
    </NavLink>
  )
}

export function Sidebar() {
  return (
    <aside className="flex min-h-screen w-72 shrink-0 flex-col bg-navy text-ice">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-sm font-bold text-white">
          C
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">ContinuityOS</p>
          <p className="text-[11px] text-ice/60">Success Operations</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {primaryNavItems.map((item) => (
          <SidebarNavLink key={item.to} item={item} />
        ))}

        <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wide text-ice/50">
          Individual / Tier 3
        </p>

        {secondaryNavItems.map((item) => (
          <SidebarNavLink key={item.to} item={item} />
        ))}
      </nav>

      <div className="border-t border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/20 text-sm font-semibold text-teal">
            JC
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-sm font-medium text-white">
              <Settings className="h-3.5 w-3.5 shrink-0 text-ice/50" />
              Judith C.
            </p>
            <p className="text-xs text-ice/50">Enterprise Success</p>
            <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ice/50">
              <PulsingDot />
              3 CSMs active
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
