export type IncidentRow = {
  account: string
  caseId: string
  severity: 'SEV 1' | 'SEV 2' | 'SEV 3' | 'Closed'
  tier: 'Tier 1 Enterprise' | 'Tier 2 Business' | 'Tier 3'
  stage: string
  owner: string
  nextUpdate: 'missed' | string
  revenue: string
  href?: string
}

export const incidentRows: IncidentRow[] = [
  {
    account: 'PeopleGrid Africa',
    caseId: 'RN-4821',
    severity: 'SEV 1',
    tier: 'Tier 1 Enterprise',
    stage: 'Compliance review',
    owner: 'Judith C.',
    nextUpdate: 'countdown',
    revenue: '$210K/mo',
    href: '/incidents/rn-4821',
  },
  {
    account: 'Crestline Logistics',
    caseId: 'RN-4790',
    severity: 'SEV 2',
    tier: 'Tier 1 Enterprise',
    stage: 'Docs requested',
    owner: 'Tunde A.',
    nextUpdate: 'missed',
    revenue: '$85K/mo',
  },
  {
    account: 'NairaWorks Ltd',
    caseId: 'RN-4655',
    severity: 'SEV 2',
    tier: 'Tier 2 Business',
    stage: 'Decision & release',
    owner: 'Kemi B.',
    nextUpdate: 'Tue, Jul 28 · 10:00 AM',
    revenue: '$32K/mo',
  },
  {
    account: 'Obiageli Health Systems',
    caseId: 'RN-4598',
    severity: 'Closed',
    tier: 'Tier 1 Enterprise',
    stage: '—',
    owner: '—',
    nextUpdate: 'Resolved',
    revenue: '—',
  },
  {
    account: 'Lagos Creative Agency',
    caseId: 'RN-4572',
    severity: 'Closed',
    tier: 'Tier 2 Business',
    stage: '—',
    owner: '—',
    nextUpdate: 'Resolved',
    revenue: '—',
  },
  {
    account: 'Accra Exports Co',
    caseId: 'RN-4540',
    severity: 'Closed',
    tier: 'Tier 2 Business',
    stage: '—',
    owner: '—',
    nextUpdate: 'Resolved',
    revenue: '—',
  },
  {
    account: 'Kigali Tech Studio',
    caseId: 'RN-4501',
    severity: 'Closed',
    tier: 'Tier 2 Business',
    stage: '—',
    owner: '—',
    nextUpdate: 'Resolved',
    revenue: '—',
  },
  {
    account: 'Nairobi Freight Ltd',
    caseId: 'RN-4468',
    severity: 'Closed',
    tier: 'Tier 1 Enterprise',
    stage: '—',
    owner: '—',
    nextUpdate: 'Resolved',
    revenue: '—',
  },
  {
    account: 'Ibadan Payroll Services',
    caseId: 'RN-4432',
    severity: 'Closed',
    tier: 'Tier 2 Business',
    stage: '—',
    owner: '—',
    nextUpdate: 'Resolved',
    revenue: '—',
  },
  {
    account: 'Kumasi Media Group',
    caseId: 'RN-4390',
    severity: 'Closed',
    tier: 'Tier 2 Business',
    stage: '—',
    owner: '—',
    nextUpdate: 'Resolved',
    revenue: '—',
  },
]

export const selfServeRows: IncidentRow[] = [
  {
    account: 'Tobi A. (individual)',
    caseId: 'RN-4901',
    severity: 'SEV 3',
    tier: 'Tier 3',
    stage: 'Payment tracing',
    owner: 'Self-serve · Status Hub',
    nextUpdate: 'Auto heartbeat +72h',
    revenue: '—',
  },
  {
    account: 'Ngozi K. (individual)',
    caseId: 'RN-4906',
    severity: 'SEV 3',
    tier: 'Tier 3',
    stage: 'Payment tracing',
    owner: 'Self-serve · Status Hub',
    nextUpdate: 'Auto heartbeat +72h',
    revenue: '—',
  },
  {
    account: 'Femi O. (individual)',
    caseId: 'RN-4912',
    severity: 'SEV 3',
    tier: 'Tier 3',
    stage: 'Docs requested',
    owner: 'Self-serve · Status Hub',
    nextUpdate: 'Auto heartbeat +72h',
    revenue: '—',
  },
  {
    account: 'Amaka T. (individual)',
    caseId: 'RN-4919',
    severity: 'SEV 3',
    tier: 'Tier 3',
    stage: 'Awaiting documents',
    owner: 'Self-serve · Status Hub',
    nextUpdate: 'Auto heartbeat +72h',
    revenue: '—',
  },
]
