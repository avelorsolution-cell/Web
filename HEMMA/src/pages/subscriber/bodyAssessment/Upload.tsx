import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PhoneFrame from '../../../components/layout/PhoneFrame'
import TopBar from '../../../components/layout/TopBar'
import Button from '../../../components/ui/Button'
import FilterChip from '../../../components/ui/FilterChip'
import { ErrorState } from '../../../components/ui/States'
import ScanningCard from '../../../components/motion/ScanningCard'
import SuccessCheck from '../../../components/motion/SuccessCheck'
import { useLanguage } from '../../../i18n/LanguageContext'
import { useBodyAssessments } from '../../../context/BodyAssessmentContext'

type Stage = 'empty' | 'uploading' | 'analyzing' | 'success' | 'unsupported' | 'too-large' | 'could-not-read'
type Override = 'success' | 'unsupported' | 'too-large' | 'could-not-read' | null

const ACCEPTED = ['pdf', 'jpg', 'jpeg', 'png']
const MAX_BYTES = 10 * 1024 * 1024

interface LocationState {
  onboarding?: boolean
}

export default function BodyAssessmentUpload() {
  const navigate = useNavigate()
  const location = useLocation()
  const onboarding = (location.state as LocationState | null)?.onboarding
  const { t } = useLanguage()
  const { setDraft } = useBodyAssessments()
  const [stage, setStage] = useState<Stage>('empty')
  const [dragging, setDragging] = useState(false)
  const [override, setOverride] = useState<Override>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const runAnalysis = (fileName: string) => {
    setStage('uploading')
    setTimeout(() => {
      setStage('analyzing')
      setTimeout(() => {
        setDraft({
          source: 'uploaded_report',
          reportFileName: fileName,
          assessmentDate: new Date().toISOString().slice(0, 10),
          heightCm: 175,
          weightKg: 72.0,
          bmi: 23.5,
          bodyFatPercent: 19.8,
          bodyFatMassKg: 14.3,
          skeletalMuscleMassKg: 32.4,
          leanBodyMassKg: 57.7,
          bodyWaterPercent: 58.2,
          visceralFatRating: 7,
          bmrKcal: 1650,
          waistCm: 82,
          chestCm: 98,
          hipsCm: 96,
          leftArmCm: 34,
          rightArmCm: 34,
        })
        setStage('success')
      }, 1600)
    }, 1100)
  }

  const handleFile = (file: File) => {
    if (override && override !== 'success') {
      setStage(override)
      return
    }
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    if (!ACCEPTED.includes(ext)) {
      setStage('unsupported')
      return
    }
    if (file.size > MAX_BYTES) {
      setStage('too-large')
      return
    }
    runAnalysis(file.name)
  }

  const useSampleFile = () => {
    if (override && override !== 'success') {
      setStage(override)
      return
    }
    runAnalysis('InBody_Report_Sample.pdf')
  }

  const u = t.bodyAssessment.upload

  return (
    <PhoneFrame
      footer={
        stage === 'success' ? (
          <Button fullWidth onClick={() => navigate('/subscriber/body-assessment/review', { state: { onboarding } })}>
            {u.continueToReview}
          </Button>
        ) : undefined
      }
    >
      <TopBar title={u.title} backTo="/subscriber/body-assessment" />
      <div className="px-5 pb-8 pt-3">
        {stage === 'empty' && (
          <>
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragging(false)
                const file = e.dataTransfer.files?.[0]
                if (file) handleFile(file)
              }}
              className={[
                'flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition-colors',
                dragging ? 'border-teal bg-teal-light' : 'border-border bg-white',
              ].join(' ')}
            >
              <div className="text-4xl">📤</div>
              <p className="text-sm font-semibold text-navy">{u.dragDrop}</p>
              <p className="text-xs text-muted">{u.or}</p>
              <Button variant="outline" onClick={() => inputRef.current?.click()}>
                {u.browse}
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFile(file)
                }}
              />
              <p className="text-[11px] text-muted">{u.accepted}</p>
            </div>

            <button onClick={useSampleFile} className="mt-3 w-full text-center text-xs font-semibold text-teal-dark">
              ⚡ Use a sample report (demo)
            </button>

            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{u.examplesTitle}</p>
              <div className="flex flex-wrap gap-2">
                {u.examples.map((ex) => (
                  <span key={ex} className="rounded-full bg-black/5 px-3 py-1.5 text-xs text-navy">
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-border p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{u.simulateTitle}</p>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="Success" active={override === 'success' || !override} onClick={() => setOverride('success')} />
                <FilterChip label="Unsupported" active={override === 'unsupported'} onClick={() => setOverride('unsupported')} />
                <FilterChip label="Too Large" active={override === 'too-large'} onClick={() => setOverride('too-large')} />
                <FilterChip label="Could Not Read" active={override === 'could-not-read'} onClick={() => setOverride('could-not-read')} />
              </div>
            </div>
          </>
        )}

        {stage === 'uploading' && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-sm font-medium text-navy">{u.uploading}</p>
            <div className="h-2 w-48 overflow-hidden rounded-full bg-border">
              <motion.div
                className="h-full rounded-full bg-teal"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </div>
          </div>
        )}
        {stage === 'analyzing' && <ScanningCard label={u.analyzing} />}

        {stage === 'success' && (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <SuccessCheck size={64} />
            <motion.h2
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.25 }}
              className="text-lg font-bold text-navy"
            >
              {u.successTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.25 }}
              className="text-sm text-muted"
            >
              {u.successBody}
            </motion.p>
          </div>
        )}

        {stage === 'unsupported' && (
          <ErrorState
            title={u.unsupportedTitle}
            body={u.unsupportedBody}
            action={
              <Button variant="outline" onClick={() => setStage('empty')}>
                {u.tryAnotherFile}
              </Button>
            }
          />
        )}

        {stage === 'too-large' && (
          <ErrorState
            title={u.tooLargeTitle}
            body={u.tooLargeBody}
            action={
              <Button variant="outline" onClick={() => setStage('empty')}>
                {u.tryAnotherFile}
              </Button>
            }
          />
        )}

        {stage === 'could-not-read' && (
          <ErrorState
            title={u.couldNotReadTitle}
            body={u.couldNotReadBody}
            action={
              <div className="flex flex-col items-center gap-2">
                <Button variant="outline" onClick={() => setStage('empty')}>
                  {u.tryAnotherFile}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/subscriber/body-assessment/manual', { state: { onboarding } })}
                >
                  {u.enterManually}
                </Button>
              </div>
            }
          />
        )}
      </div>
    </PhoneFrame>
  )
}
