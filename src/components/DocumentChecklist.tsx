import { Badge } from './Badge'

type Document = { name: string; status: 'received' | 'under review' }

function DocBadge({ status }: { status: Document['status'] }) {
  if (status === 'received') return <Badge tone="green">Received</Badge>
  return <Badge tone="amber">Under review</Badge>
}

export function DocumentChecklist({ documents }: { documents: Document[] }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <p className="mb-4 text-sm font-semibold text-navy">Document checklist</p>
      <ul className="divide-y divide-navy/5">
        {documents.map((doc) => (
          <li key={doc.name} className="flex items-center justify-between py-3">
            <span className="text-sm text-navy/80">{doc.name}</span>
            <DocBadge status={doc.status} />
          </li>
        ))}
      </ul>
    </div>
  )
}
