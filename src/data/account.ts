export const healthComponents = [
  { name: 'Incident load', weight: 30, score: 50 },
  { name: 'Sentiment', weight: 20, score: 30 },
  { name: 'Trend', weight: 25, score: 74 },
  { name: 'Effort', weight: 15, score: 10 },
  { name: 'Recovery', weight: 10, score: 13 },
]

export const milestones = [
  { label: 'Payroll', day: 30, status: 'done' as const },
  { label: 'Vendor payments', day: 45, status: 'done' as const },
  { label: 'Corporate cards', day: 75, status: 'paused' as const },
]
