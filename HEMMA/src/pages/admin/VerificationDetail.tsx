import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { verificationQueue } from '../../data/adminData'
import { getTrainerById } from '../../data/mockData'
import { useLanguage } from '../../i18n/LanguageContext'

export default function AdminVerificationDetail() {
  const { trainerId } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const entry = verificationQueue.find((v) => v.id === trainerId)
  const trainer = getTrainerById(trainerId || '')
  const [status, setStatus] = useState<'approved' | 'under_review' | 'action_required' | 'pending' | 'rejected'>(
    entry?.status || 'pending',
  )
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState<string[]>([])
  const [audit, setAudit] = useState<string[]>([`Submitted by trainer on ${entry?.submitted || '—'}`])
  const [showReasonFor, setShowReasonFor] = useState<'reject' | 'update' | null>(null)

  if (!entry) return <p className="text-sm text-muted">Application not found.</p>

  const act = (action: 'approve' | 'update' | 'reject') => {
    if (action !== 'approve' && !reason.trim()) {
      setShowReasonFor(action === 'reject' ? 'reject' : 'update')
      return
    }
    const nextStatus = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'action_required'
    setStatus(nextStatus)
    setAudit((prev) => [
      `Ahmed Admin ${action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'requested update from'} ${entry.name}${reason ? `: "${reason}"` : ''}`,
      ...prev,
    ])
    setShowReasonFor(null)
    setReason('')
  }

  return (
    <div className="space-y-4">
      <button onClick={() => navigate('/admin/verification')} className="text-sm font-semibold text-muted hover:text-navy">
        ← {t.adminVerificationPage.title}
      </button>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center gap-4">
              {trainer && <img src={trainer.photo} className="h-16 w-16 rounded-xl object-cover" alt="" />}
              <div>
                <h2 className="text-lg font-bold text-navy">{entry.name}</h2>
                <p className="text-sm text-muted">{entry.sport} · {entry.location}</p>
              </div>
              <Badge tone={status === 'approved' ? 'success' : status === 'rejected' ? 'error' : 'info'} label={status.replace('_', ' ')} />
            </div>
            {trainer && <p className="mt-4 text-sm text-muted">{trainer.bio}</p>}
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted">{t.adminVerificationPage.experience}</p>
                <p className="font-semibold text-navy">{entry.experience} years</p>
              </div>
              <div>
                <p className="text-xs text-muted">{t.adminVerificationPage.submitted}</p>
                <p className="font-semibold text-navy">{entry.submitted}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-navy">{t.adminVerificationPage.documents}</h3>
            <div className="space-y-2 text-sm">
              {['Government ID', 'CV', 'Certificate 1', 'Certificate 2'].map((doc) => (
                <div key={doc} className="flex items-center justify-between rounded-lg border border-border p-2.5">
                  <span className="text-navy">📄 {doc}</span>
                  <Badge tone="success" icon="✓" label="Verified" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-navy">{t.adminVerificationPage.checklist}</h3>
            {['Identity Verified', 'Certificate Verified', 'Profile Complete'].map((c) => (
              <div key={c} className="flex items-center gap-2 py-1 text-sm text-navy">
                <span className="text-success">✓</span> {c}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-navy">Actions</h3>
            {showReasonFor && (
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t.adminVerificationPage.reasonRequired}
                rows={3}
                className="mb-3 w-full rounded-lg border border-border p-2.5 text-sm outline-none focus:border-teal"
              />
            )}
            <div className="flex flex-col gap-2">
              <Button onClick={() => act('approve')}>{t.adminVerificationPage.approve}</Button>
              <Button variant="outline" onClick={() => act('update')}>
                {t.adminVerificationPage.requestUpdate}
              </Button>
              <Button variant="destructive" onClick={() => act('reject')}>
                {t.adminVerificationPage.reject}
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-navy">{t.adminVerificationPage.internalNotes}</h3>
            <textarea
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  const val = (e.target as HTMLTextAreaElement).value
                  if (val.trim()) {
                    setNotes((prev) => [val, ...prev])
                    ;(e.target as HTMLTextAreaElement).value = ''
                  }
                }
              }}
              placeholder="Add a note and press Enter…"
              rows={2}
              className="w-full rounded-lg border border-border p-2.5 text-sm outline-none focus:border-teal"
            />
            <div className="mt-2 space-y-1.5">
              {notes.map((n, i) => (
                <p key={i} className="rounded-lg bg-black/5 p-2 text-xs text-navy">
                  {n}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-navy">{t.adminVerificationPage.auditHistory}</h3>
            <div className="space-y-2 text-xs text-muted">
              {audit.map((a, i) => (
                <p key={i} className="border-b border-border pb-2 last:border-0">
                  {a}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
