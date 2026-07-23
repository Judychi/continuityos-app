export type HealthComponent = { name: string; weight: number; score: number }
export type Milestone = { label: string; day: number; status: 'done' | 'paused' }

export type NextReview =
  | { kind: 'due' }
  | { kind: 'not-due' }
  | { kind: 'completed'; date: string }

export type AccountProfile = {
  name: string
  tier: 'Tier 1 Enterprise' | 'Tier 2 Business'
  healthScore: number
  band: 'Green' | 'Orange' | 'Red'
  monthlyVolume: string
  volumeTrendLabel: string
  volumeTrendTone: 'green' | 'red'
  openIncidents: number
  openIncidentsNote: string
  expansionHeadline: string
  expansionSubtext: string
  healthComponents: HealthComponent[]
  milestones: Milestone[]
  sparkline: number[]
  nextReview: NextReview
}

const genericMilestones: Milestone[] = [
  { label: 'Onboarding', day: 30, status: 'done' },
  { label: 'First incident-free quarter', day: 120, status: 'done' },
  { label: 'Expansion readiness review', day: 180, status: 'done' },
]

export const accountNames = [
  'PeopleGrid Africa',
  'Crestline Logistics',
  'NairaWorks Ltd',
  'Obiageli Health Systems',
  'Lagos Creative Agency',
  'Accra Exports Co',
  'Kigali Tech Studio',
  'Nairobi Freight Ltd',
  'Ibadan Payroll Services',
  'Kumasi Media Group',
]

export const accountProfiles: Record<string, AccountProfile> = {
  'PeopleGrid Africa': {
    name: 'PeopleGrid Africa',
    tier: 'Tier 1 Enterprise',
    healthScore: 42,
    band: 'Orange',
    monthlyVolume: '$155K',
    volumeTrendLabel: '↓26%',
    volumeTrendTone: 'red',
    openIncidents: 2,
    openIncidentsNote: '1 Sev1 · 1 Sev3',
    expansionHeadline: 'Not yet',
    expansionSubtext: '12 of 90 days green',
    healthComponents: [
      { name: 'Incident load', weight: 30, score: 50 },
      { name: 'Sentiment', weight: 20, score: 30 },
      { name: 'Trend', weight: 25, score: 74 },
      { name: 'Effort', weight: 15, score: 10 },
      { name: 'Recovery', weight: 10, score: 13 },
    ],
    milestones: [
      { label: 'Payroll', day: 30, status: 'done' },
      { label: 'Vendor payments', day: 45, status: 'done' },
      { label: 'Corporate cards', day: 75, status: 'paused' },
    ],
    sparkline: [68, 65, 61, 55, 47, 39, 34, 33, 35, 37, 38, 39, 40, 42],
    nextReview: { kind: 'due' },
  },

  // Crestline is an actively open SEV 2 (escalated) case on the Incident Success Room —
  // not "Closed — Confirmed" — so its profile reflects that instead of a healthy default.
  'Crestline Logistics': {
    name: 'Crestline Logistics',
    tier: 'Tier 1 Enterprise',
    healthScore: 46,
    band: 'Orange',
    monthlyVolume: '$85K',
    volumeTrendLabel: '↓9%',
    volumeTrendTone: 'red',
    openIncidents: 1,
    openIncidentsNote: '1 Sev2 · escalated',
    expansionHeadline: 'Not yet',
    expansionSubtext: '2 of 90 days green',
    healthComponents: [
      { name: 'Incident load', weight: 30, score: 38 },
      { name: 'Sentiment', weight: 20, score: 42 },
      { name: 'Trend', weight: 25, score: 48 },
      { name: 'Effort', weight: 15, score: 55 },
      { name: 'Recovery', weight: 10, score: 25 },
    ],
    milestones: [
      { label: 'Onboarding', day: 20, status: 'done' },
      { label: 'Vendor rollout', day: 60, status: 'done' },
      { label: 'First incident-free quarter', day: 120, status: 'paused' },
    ],
    sparkline: [78, 76, 73, 70, 66, 61, 55, 50, 47, 46, 46, 45, 46, 46],
    nextReview: { kind: 'not-due' },
  },

  // NairaWorks is also an open SEV 2, but later-stage ("Decision & release") — trending
  // toward recovery rather than freshly escalated like Crestline.
  'NairaWorks Ltd': {
    name: 'NairaWorks Ltd',
    tier: 'Tier 2 Business',
    healthScore: 61,
    band: 'Orange',
    monthlyVolume: '$32K',
    volumeTrendLabel: '↓4%',
    volumeTrendTone: 'red',
    openIncidents: 1,
    openIncidentsNote: '1 Sev2',
    expansionHeadline: 'Not yet',
    expansionSubtext: '9 of 90 days green',
    healthComponents: [
      { name: 'Incident load', weight: 30, score: 58 },
      { name: 'Sentiment', weight: 20, score: 52 },
      { name: 'Trend', weight: 25, score: 62 },
      { name: 'Effort', weight: 15, score: 48 },
      { name: 'Recovery', weight: 10, score: 57 },
    ],
    milestones: [
      { label: 'Onboarding', day: 25, status: 'done' },
      { label: 'Vendor payments', day: 70, status: 'done' },
      { label: 'First incident-free quarter', day: 130, status: 'paused' },
    ],
    sparkline: [52, 50, 47, 44, 42, 45, 49, 53, 57, 59, 60, 61, 61, 61],
    nextReview: { kind: 'not-due' },
  },

  'Obiageli Health Systems': {
    name: 'Obiageli Health Systems',
    tier: 'Tier 1 Enterprise',
    healthScore: 88,
    band: 'Green',
    monthlyVolume: '$148K',
    volumeTrendLabel: '↑5%',
    volumeTrendTone: 'green',
    openIncidents: 0,
    openIncidentsNote: 'None — all clear',
    expansionHeadline: 'Ready',
    expansionSubtext: '90 of 90 days green',
    healthComponents: [
      { name: 'Incident load', weight: 30, score: 90 },
      { name: 'Sentiment', weight: 20, score: 85 },
      { name: 'Trend', weight: 25, score: 88 },
      { name: 'Effort', weight: 15, score: 78 },
      { name: 'Recovery', weight: 10, score: 92 },
    ],
    milestones: genericMilestones,
    sparkline: [80, 81, 83, 84, 85, 86, 86, 87, 87, 88, 88, 88, 88, 88],
    nextReview: { kind: 'completed', date: 'Wed, Jul 15' },
  },

  'Lagos Creative Agency': {
    name: 'Lagos Creative Agency',
    tier: 'Tier 2 Business',
    healthScore: 84,
    band: 'Green',
    monthlyVolume: '$38K',
    volumeTrendLabel: '↑3%',
    volumeTrendTone: 'green',
    openIncidents: 0,
    openIncidentsNote: 'None — all clear',
    expansionHeadline: 'Ready',
    expansionSubtext: '90 of 90 days green',
    healthComponents: [
      { name: 'Incident load', weight: 30, score: 86 },
      { name: 'Sentiment', weight: 20, score: 80 },
      { name: 'Trend', weight: 25, score: 82 },
      { name: 'Effort', weight: 15, score: 75 },
      { name: 'Recovery', weight: 10, score: 88 },
    ],
    milestones: genericMilestones,
    sparkline: [76, 77, 78, 79, 80, 81, 82, 82, 83, 83, 84, 84, 84, 84],
    nextReview: { kind: 'completed', date: 'Fri, Jul 10' },
  },

  'Accra Exports Co': {
    name: 'Accra Exports Co',
    tier: 'Tier 2 Business',
    healthScore: 91,
    band: 'Green',
    monthlyVolume: '$46K',
    volumeTrendLabel: '↑7%',
    volumeTrendTone: 'green',
    openIncidents: 0,
    openIncidentsNote: 'None — all clear',
    expansionHeadline: 'Ready',
    expansionSubtext: '90 of 90 days green',
    healthComponents: [
      { name: 'Incident load', weight: 30, score: 93 },
      { name: 'Sentiment', weight: 20, score: 89 },
      { name: 'Trend', weight: 25, score: 90 },
      { name: 'Effort', weight: 15, score: 85 },
      { name: 'Recovery', weight: 10, score: 94 },
    ],
    milestones: genericMilestones,
    sparkline: [84, 85, 86, 87, 88, 88, 89, 89, 90, 90, 91, 91, 91, 91],
    nextReview: { kind: 'completed', date: 'Mon, Jul 20' },
  },

  'Kigali Tech Studio': {
    name: 'Kigali Tech Studio',
    tier: 'Tier 2 Business',
    healthScore: 80,
    band: 'Green',
    monthlyVolume: '$29K',
    volumeTrendLabel: '↑1%',
    volumeTrendTone: 'green',
    openIncidents: 0,
    openIncidentsNote: 'None — all clear',
    expansionHeadline: 'On track',
    expansionSubtext: '81 of 90 days green',
    healthComponents: [
      { name: 'Incident load', weight: 30, score: 82 },
      { name: 'Sentiment', weight: 20, score: 76 },
      { name: 'Trend', weight: 25, score: 78 },
      { name: 'Effort', weight: 15, score: 71 },
      { name: 'Recovery', weight: 10, score: 83 },
    ],
    milestones: genericMilestones,
    sparkline: [72, 73, 74, 75, 76, 77, 77, 78, 78, 79, 79, 80, 80, 80],
    nextReview: { kind: 'completed', date: 'Wed, Jul 8' },
  },

  'Nairobi Freight Ltd': {
    name: 'Nairobi Freight Ltd',
    tier: 'Tier 1 Enterprise',
    healthScore: 86,
    band: 'Green',
    monthlyVolume: '$172K',
    volumeTrendLabel: '↑4%',
    volumeTrendTone: 'green',
    openIncidents: 0,
    openIncidentsNote: 'None — all clear',
    expansionHeadline: 'Ready',
    expansionSubtext: '90 of 90 days green',
    healthComponents: [
      { name: 'Incident load', weight: 30, score: 88 },
      { name: 'Sentiment', weight: 20, score: 83 },
      { name: 'Trend', weight: 25, score: 85 },
      { name: 'Effort', weight: 15, score: 79 },
      { name: 'Recovery', weight: 10, score: 90 },
    ],
    milestones: genericMilestones,
    sparkline: [78, 79, 80, 81, 82, 83, 84, 84, 85, 85, 86, 86, 86, 86],
    nextReview: { kind: 'completed', date: 'Tue, Jul 14' },
  },

  'Ibadan Payroll Services': {
    name: 'Ibadan Payroll Services',
    tier: 'Tier 2 Business',
    healthScore: 90,
    band: 'Green',
    monthlyVolume: '$54K',
    volumeTrendLabel: '↑6%',
    volumeTrendTone: 'green',
    openIncidents: 0,
    openIncidentsNote: 'None — all clear',
    expansionHeadline: 'Ready',
    expansionSubtext: '90 of 90 days green',
    healthComponents: [
      { name: 'Incident load', weight: 30, score: 92 },
      { name: 'Sentiment', weight: 20, score: 87 },
      { name: 'Trend', weight: 25, score: 89 },
      { name: 'Effort', weight: 15, score: 83 },
      { name: 'Recovery', weight: 10, score: 93 },
    ],
    milestones: genericMilestones,
    sparkline: [82, 83, 84, 85, 86, 87, 87, 88, 88, 89, 89, 90, 90, 90],
    nextReview: { kind: 'completed', date: 'Thu, Jul 16' },
  },

  'Kumasi Media Group': {
    name: 'Kumasi Media Group',
    tier: 'Tier 2 Business',
    healthScore: 83,
    band: 'Green',
    monthlyVolume: '$31K',
    volumeTrendLabel: '↑2%',
    volumeTrendTone: 'green',
    openIncidents: 0,
    openIncidentsNote: 'None — all clear',
    expansionHeadline: 'On track',
    expansionSubtext: '77 of 90 days green',
    healthComponents: [
      { name: 'Incident load', weight: 30, score: 85 },
      { name: 'Sentiment', weight: 20, score: 79 },
      { name: 'Trend', weight: 25, score: 81 },
      { name: 'Effort', weight: 15, score: 74 },
      { name: 'Recovery', weight: 10, score: 87 },
    ],
    milestones: genericMilestones,
    sparkline: [75, 76, 77, 78, 79, 80, 80, 81, 81, 82, 82, 83, 83, 83],
    nextReview: { kind: 'completed', date: 'Thu, Jul 9' },
  },
}
