import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import LineChart from '../../components/ui/LineChart'
import SourceBadge from '../../components/cards/SourceBadge'
import Badge from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/States'
import { currentUser } from '../../data/mockData'
import { week3Days } from '../../data/trainingData'
import { trainerClients, trainerCheckIns } from '../../data/trainerAppData'
import { useLanguage } from '../../i18n/LanguageContext'
import { useBodyAssessments } from '../../context/BodyAssessmentContext'

export default function TrainerClientDetail() {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { assessments, latest } = useBodyAssessments()
  const [tab, setTab] = useState('progress')

  const client = trainerClients.find((c) => c.id === clientId)
  const name = clientId === 'sub-maha' || !client ? (language === 'ar' ? currentUser.nameAr : currentUser.name) : language === 'ar' ? client.nameAr : client.name
  const photo = client?.photo || currentUser.photo
  const checkIn = trainerCheckIns.find((c) => c.clientId === clientId)
  const chronological = [...assessments].reverse()

  const tabs = t.trainerClientDetail.tabs

  return (
    <PhoneFrame>
      <TopBar title={name} onBack={() => navigate('/trainer/clients')} />
      <div className="px-5 pb-8 pt-3">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-card">
          <img src={photo} className="h-14 w-14 rounded-full object-cover" alt="" />
          <div>
            <p className="font-bold text-navy">{name}</p>
            <p className="text-xs text-muted">
              {client ? (language === 'ar' ? client.goalAr : client.goal) : 'Strength & Body Composition'}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="hemma-scroll overflow-x-auto pb-1">
            <div className="min-w-[560px]">
              <Tabs
                tabs={[
                  { id: 'overview', label: tabs.overview },
                  { id: 'program', label: tabs.program },
                  { id: 'calendar', label: tabs.calendar },
                  { id: 'progress', label: tabs.progress },
                  { id: 'checkin', label: tabs.checkin },
                  { id: 'messages', label: tabs.messages },
                  { id: 'bookings', label: tabs.bookings },
                ]}
                active={tab}
                onChange={setTab}
              />
            </div>
          </div>
        </div>

        {tab === 'overview' && (
          <div className="mt-4 space-y-2 rounded-2xl border border-border bg-white p-4 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted">{t.trainerClientDetail.packageLabel}</span>
              <span className="font-semibold text-navy">{client?.packageTier || 'Standard'}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted">{t.trainerClientsPage.compliance}</span>
              <span className="font-semibold text-navy">{client?.compliance ?? 86}%</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted">{t.trainerClientDetail.nextSession}</span>
              <span className="font-semibold text-navy">{client?.nextSession || '16 Sep, 3:00 PM'}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted">{t.trainerClientDetail.recentWorkout}</span>
              <span className="font-semibold text-navy">Upper Body Strength</span>
            </div>
            <div>
              <p className="mb-1 text-muted">{t.trainerClientDetail.trainerNotes}</p>
              <p className="rounded-lg bg-black/5 p-2 text-navy">Responding well to strength progression. Continue current split.</p>
            </div>
          </div>
        )}

        {tab === 'program' && (
          <div className="mt-4 space-y-2">
            {week3Days.map((day) => (
              <div key={day.day} className="flex items-center justify-between rounded-xl border border-border bg-white p-3 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase text-muted">{language === 'ar' ? day.dayAr : day.day}</p>
                  <p className="font-semibold text-navy">{language === 'ar' ? day.workoutAr : day.workout}</p>
                </div>
                {day.status === 'completed' && <Badge tone="success" label={t.program.dayStatus.completed} />}
                {day.status === 'upcoming' && <Badge tone="neutral" label={t.program.dayStatus.upcoming} />}
              </div>
            ))}
          </div>
        )}

        {tab === 'calendar' && (
          <div className="mt-4 rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted">
            16 Sep · 3:00 PM — Strength Training
          </div>
        )}

        {tab === 'progress' && (
          <div className="mt-4">
            <p className="mb-3 rounded-lg bg-teal-light px-3 py-2 text-xs text-teal-dark">🔒 {t.trainerClient.consentNote}</p>

            {!latest ? (
              <EmptyState icon="📊" title={t.trainerClient.noAssessment} />
            ) : (
              <>
                <div className="rounded-2xl border border-border bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-navy">{t.trainerClient.latestAssessment}</p>
                    <SourceBadge source={latest.source} />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {latest.weightKg !== undefined && (
                      <div>
                        <p className="text-xs text-muted">{t.bodyAssessment.fields.weight}</p>
                        <p className="text-lg font-extrabold text-navy">{latest.weightKg} kg</p>
                      </div>
                    )}
                    {latest.bmi !== undefined && (
                      <div>
                        <p className="text-xs text-muted">{t.bodyAssessment.fields.bmi}</p>
                        <p className="text-lg font-extrabold text-navy">{latest.bmi}</p>
                      </div>
                    )}
                    {latest.bodyFatPercent !== undefined && (
                      <div>
                        <p className="text-xs text-muted">{t.bodyAssessment.fields.bodyFatPercent}</p>
                        <p className="text-lg font-extrabold text-navy">{latest.bodyFatPercent}%</p>
                      </div>
                    )}
                    {latest.skeletalMuscleMassKg !== undefined && (
                      <div>
                        <p className="text-xs text-muted">{t.bodyAssessment.fields.skeletalMuscleMass}</p>
                        <p className="text-lg font-extrabold text-navy">{latest.skeletalMuscleMassKg} kg</p>
                      </div>
                    )}
                    {latest.waistCm !== undefined && (
                      <div>
                        <p className="text-xs text-muted">{t.bodyAssessment.fields.waist}</p>
                        <p className="text-lg font-extrabold text-navy">{latest.waistCm} cm</p>
                      </div>
                    )}
                  </div>
                </div>

                {chronological.filter((a) => a.weightKg !== undefined).length > 1 && (
                  <div className="mt-4 rounded-2xl border border-border bg-white p-4">
                    <p className="mb-2 text-sm font-bold text-navy">{t.trainerClient.progressCharts}</p>
                    <LineChart
                      data={chronological
                        .filter((a) => a.weightKg !== undefined)
                        .map((a) => ({
                          label: new Date(a.assessmentDate).toLocaleDateString('en-QA', { day: 'numeric', month: 'short' }),
                          value: a.weightKg as number,
                        }))}
                      unit=" kg"
                    />
                  </div>
                )}

                <div className="mt-4">
                  <p className="mb-2 text-sm font-bold text-navy">{t.trainerClient.assessmentHistory}</p>
                  <div className="space-y-2">
                    {assessments.map((a) => (
                      <div key={a.id} className="flex items-center justify-between rounded-xl border border-border bg-white p-3 text-sm">
                        <span className="text-muted">
                          {new Date(a.assessmentDate).toLocaleDateString('en-QA', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="font-semibold text-navy">{a.weightKg ?? '—'} kg</span>
                        <SourceBadge source={a.source} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    className="!text-xs"
                    onClick={() => navigate('/subscriber/coming-soon?feature=Add Trainer Measurement')}
                  >
                    {t.trainerClientDetail.addTrainerMeasurement}
                  </Button>
                  <Button
                    variant="outline"
                    className="!text-xs"
                    onClick={() => navigate('/subscriber/coming-soon?feature=Request New Assessment')}
                  >
                    {t.trainerClientDetail.requestNewAssessment}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {tab === 'checkin' && (
          <div className="mt-4 space-y-3">
            {checkIn ? (
              <div className="rounded-2xl border border-border bg-white p-4">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <p className="text-muted">{t.checkIn.fields.energy}</p>
                    <p className="text-lg font-bold text-navy">{checkIn.energy}</p>
                  </div>
                  <div>
                    <p className="text-muted">{t.checkIn.fields.motivation}</p>
                    <p className="text-lg font-bold text-navy">{checkIn.motivation}</p>
                  </div>
                  <div>
                    <p className="text-muted">{t.checkIn.fields.soreness}</p>
                    <p className="text-lg font-bold text-navy">{checkIn.soreness}</p>
                  </div>
                </div>
                <p className="mt-3 rounded-lg bg-black/5 p-2 text-sm text-navy">
                  {language === 'ar' ? checkIn.commentAr : checkIn.comment}
                </p>
              </div>
            ) : (
              <EmptyState icon="📝" title="No check-in submitted yet." />
            )}
          </div>
        )}

        {tab === 'messages' && (
          <div className="mt-4 rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted">
            Open full conversation from Messages tab in bottom navigation.
          </div>
        )}

        {tab === 'bookings' && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-border bg-white p-3 text-sm">
              <span className="text-navy">Standard Package · 8 Sessions</span>
              <Badge tone="success" label="Active" />
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  )
}
