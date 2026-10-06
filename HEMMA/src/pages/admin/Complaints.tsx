import { useState } from 'react'
import AdminTable from '../../components/admin/AdminTable'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { adminComplaintsList } from '../../data/adminData'
import { useLanguage } from '../../i18n/LanguageContext'

const canonicalComplaint = {
  id: 'CMP-1007',
  subscriber: 'Maha Al-Kuwari',
  trainer: 'Sarah Ahmed',
  bookingId: 'HM-482913',
  category: 'Session / Booking Issue',
  priority: 'medium' as const,
  status: 'inProgress' as const,
  assignedAgent: 'Finance Admin',
  messages: [
    { from: 'Maha Al-Kuwari', text: 'My trainer arrived 15 minutes late to the session.' },
    { from: 'Finance Admin', text: "We're sorry for the inconvenience — looking into this now." },
  ],
  timeline: ['Ticket opened by subscriber', 'Assigned to Finance Admin', 'Awaiting trainer response'],
}

const priorityTone: Record<string, 'neutral' | 'warning' | 'error'> = { low: 'neutral', medium: 'warning', high: 'error', critical: 'error' }
const statusTone: Record<string, 'neutral' | 'warning' | 'success'> = { open: 'warning', inProgress: 'warning', resolved: 'success' }

export default function AdminComplaints() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-extrabold text-navy">{t.adminComplaintsPage.title}</h1>

      <AdminTable
        onRowClick={() => setOpen(true)}
        columns={[
          { key: 'id', label: 'Ticket', render: (r) => <span className="font-mono text-xs">{r.id}</span> },
          { key: 'subject', label: 'Subject', render: (r) => r.subject },
          { key: 'user', label: 'User', render: (r) => r.user },
          { key: 'priority', label: 'Priority', render: (r) => <Badge tone={priorityTone[r.priority]} label={t.adminComplaintsPage.priority[r.priority]} /> },
          { key: 'status', label: 'Status', render: (r) => <Badge tone={statusTone[r.status]} label={t.adminComplaintsPage.status[r.status]} /> },
        ]}
        rows={[{ id: canonicalComplaint.id, subject: 'Trainer arrived late to session', user: canonicalComplaint.subscriber, priority: canonicalComplaint.priority, status: canonicalComplaint.status }, ...adminComplaintsList]}
      />

      {open && (
        <div className="rounded-2xl border border-border bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-navy">{canonicalComplaint.id} — {canonicalComplaint.category}</h2>
            <button onClick={() => setOpen(false)} className="text-sm text-muted">Close</button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                <div><p className="text-xs text-muted">Subscriber</p><p className="font-semibold text-navy">{canonicalComplaint.subscriber}</p></div>
                <div><p className="text-xs text-muted">Trainer</p><p className="font-semibold text-navy">{canonicalComplaint.trainer}</p></div>
                <div><p className="text-xs text-muted">Related Booking</p><p className="font-mono text-xs font-semibold text-navy">{canonicalComplaint.bookingId}</p></div>
                <div><p className="text-xs text-muted">Assigned Agent</p><p className="font-semibold text-navy">{canonicalComplaint.assignedAgent}</p></div>
              </div>
              <p className="mb-1 text-xs font-semibold uppercase text-muted">Messages</p>
              <div className="space-y-2">
                {canonicalComplaint.messages.map((m, i) => (
                  <div key={i} className="rounded-lg bg-black/5 p-2 text-sm">
                    <span className="font-semibold text-navy">{m.from}: </span>
                    <span className="text-navy">{m.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase text-muted">Timeline</p>
              <div className="mb-4 space-y-1.5">
                {canonicalComplaint.timeline.map((t, i) => (
                  <p key={i} className="text-xs text-muted">• {t}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="!text-xs">Respond</Button>
                <Button variant="outline" className="!text-xs">Request Information</Button>
                <Button variant="outline" className="!text-xs">Escalate</Button>
                <Button variant="outline" className="!text-xs">Open Refund</Button>
                <Button className="!text-xs">Resolve</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
