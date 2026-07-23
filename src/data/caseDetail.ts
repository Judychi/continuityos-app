export type StepState = 'done' | 'current' | 'pending'

export function getSteps(caseResolved: boolean): { label: string; state: StepState }[] {
  return [
    { label: 'Case received', state: 'done' },
    { label: 'Documents confirmed', state: 'done' },
    { label: 'Compliance review', state: caseResolved ? 'done' : 'current' },
    { label: 'Decision & release', state: caseResolved ? 'done' : 'pending' },
  ]
}

export function getStageLabel(caseResolved: boolean) {
  return caseResolved ? 'Stage 4 of 4' : 'Stage 3 of 4'
}

export const documents = [
  { name: 'Certificate of incorporation', status: 'received' as const },
  { name: 'Client payment contract', status: 'received' as const },
  { name: 'Source-of-funds statement', status: 'under review' as const },
]

const baseHistory = [
  {
    timestamp: 'Mon, Jul 20 · 9:14 AM',
    title: 'Case received',
    detail: 'RN-4821 opened for PeopleGrid Africa. Initial document request sent to client.',
  },
  {
    timestamp: 'Mon, Jul 20 · 4:52 PM',
    title: 'Documents confirmed',
    detail: 'Certificate of incorporation and client payment contract received and verified.',
  },
  {
    timestamp: 'Wed, Jul 22 · 10:05 AM',
    title: 'Compliance review started',
    detail: 'Source-of-funds statement moved to compliance for review. Judith C. assigned as case owner.',
  },
]

const resolutionEntry = {
  timestamp: 'Wed, Jul 22 · 2:14 PM',
  title: 'Resolution drafted',
  detail: 'Compliance review completed. Resolution letter generated and sent to client — awaiting customer confirmation.',
}

export function getHistory(caseResolved: boolean) {
  return caseResolved ? [...baseHistory, resolutionEntry] : baseHistory
}

export const resolutionLetter = {
  date: 'July 22, 2026',
  caseId: 'RN-4821',
  recipient: 'PeopleGrid Africa',
  body: [
    'Dear PeopleGrid Africa Team,',
    'We are writing to confirm that the compliance review associated with Case #RN-4821 has been completed. Following a thorough assessment of the submitted documentation — including your certificate of incorporation, client payment contract, and source-of-funds statement — we are pleased to advise that no further action is required on your part at this stage.',
    'This case has been marked as resolved in our systems. As a final step, we kindly ask that you confirm receipt of this letter and verify that your payroll run completed successfully on your end.',
    'Thank you for your patience and cooperation throughout this review. Should you have any questions, please do not hesitate to reach out to your dedicated success manager.',
  ],
  signOff: 'Sincerely,',
  signature: 'Judith C.',
  signatureTitle: 'Enterprise Success Manager, ContinuityCX Technologies',
}
