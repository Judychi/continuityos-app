import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Settings, MessageCircle, LifeBuoy, ChevronDown } from 'lucide-react'
import { PulsingDot } from '../components/PulsingDot'
import { ContactModal } from '../components/ContactModal'
import { csmDirectory, type Csm } from '../data/csm'

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

function CsmDirectory() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCsm, setSelectedCsm] = useState<Csm>(csmDirectory[0])

  function handleMessage(csm: Csm) {
    setSelectedCsm(csm)
    setModalOpen(true)
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
          isOpen ? 'bg-white/10 text-white' : 'text-ice/70 hover:bg-white/5 hover:text-white'
        }`}
      >
        <MessageCircle
          className={`h-5 w-5 shrink-0 ${isOpen ? 'text-teal' : 'text-ice/50 group-hover:text-teal'}`}
          strokeWidth={1.75}
        />
        <span className="flex-1 text-sm font-medium leading-tight">Contact Your CSM</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-ice/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="mt-1 space-y-1 rounded-xl bg-white/5 p-2">
          {csmDirectory.map((csm) => (
            <div key={csm.name} className="flex items-center justify-between gap-2 rounded-lg px-2 py-2">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-white">{csm.name}</p>
                <p className="truncate text-[11px] text-ice/50">{csm.role}</p>
              </div>
              <button
                type="button"
                onClick={() => handleMessage(csm)}
                className="shrink-0 rounded-lg bg-teal/20 px-2.5 py-1 text-[11px] font-semibold text-teal transition-colors hover:bg-teal/30"
              >
                Message
              </button>
            </div>
          ))}
        </div>
      )}

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} recipient={selectedCsm} />
    </div>
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

        <CsmDirectory />

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
