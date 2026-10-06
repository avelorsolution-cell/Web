import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PhoneFrame from '../../components/layout/PhoneFrame'
import TopBar from '../../components/layout/TopBar'
import Button from '../../components/ui/Button'
import ProgressBar from '../../components/ui/ProgressBar'
import Badge from '../../components/ui/Badge'
import SuccessCheck from '../../components/motion/SuccessCheck'
import { StaggerGroup, StaggerItem } from '../../components/motion/Stagger'
import { todaysWorkout, type ExerciseSet } from '../../data/trainingData'
import { useLanguage } from '../../i18n/LanguageContext'
import { useToast } from '../../context/ToastContext'

export default function Workout() {
  const navigate = useNavigate()
  const { t, language } = useLanguage()
  const { showToast } = useToast()
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [log, setLog] = useState(() => todaysWorkout.exercises.map((ex) => ex.setLog.map((s) => ({ ...s }))))
  const [finished, setFinished] = useState(false)
  const [note, setNote] = useState('')

  const exercise = todaysWorkout.exercises[exerciseIndex]
  const sets = log[exerciseIndex]
  const exerciseComplete = sets.every((s: ExerciseSet) => s.done)

  const completedExercises = useMemo(
    () => log.filter((sets) => sets.every((s: ExerciseSet) => s.done)).length,
    [log],
  )
  const totalSetsCompleted = useMemo(() => log.flat().filter((s: ExerciseSet) => s.done).length, [log])
  const totalSets = useMemo(() => log.flat().length, [log])

  const toggleSet = (setIdx: number) => {
    setLog((prev) => {
      const next = prev.map((sets) => [...sets])
      next[exerciseIndex][setIdx] = { ...next[exerciseIndex][setIdx], done: !next[exerciseIndex][setIdx].done }
      return next
    })
  }

  const updateField = (setIdx: number, field: 'targetKg' | 'targetReps', value: number) => {
    setLog((prev) => {
      const next = prev.map((sets) => [...sets])
      next[exerciseIndex][setIdx] = { ...next[exerciseIndex][setIdx], [field]: value }
      return next
    })
  }

  if (finished) {
    return (
      <PhoneFrame
        footer={
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate(`/subscriber/coming-soon?feature=${encodeURIComponent(t.profile.message)}`)}
            >
              {t.workout.complete.messageTrainer}
            </Button>
            <Button className="flex-1" onClick={() => navigate('/subscriber/progress')}>
              {t.workout.complete.viewProgress}
            </Button>
          </div>
        }
      >
        <TopBar showBack={false} title="" />
        <div className="flex flex-col items-center px-8 pb-8 pt-10 text-center">
          <SuccessCheck size={88} />
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="mt-4 text-2xl font-extrabold text-navy"
          >
            {t.workout.complete.title}
          </motion.h1>
          <StaggerGroup className="mt-6 grid w-full grid-cols-3 gap-3">
            <StaggerItem className="rounded-2xl border border-border bg-white p-3">
              <p className="text-xs text-muted">{t.workout.complete.duration}</p>
              <p className="mt-1 text-lg font-extrabold text-navy">{todaysWorkout.durationMins}m</p>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-border bg-white p-3">
              <p className="text-xs text-muted">{t.workout.complete.exercises}</p>
              <p className="mt-1 text-lg font-extrabold text-navy">{todaysWorkout.exercises.length}</p>
            </StaggerItem>
            <StaggerItem className="rounded-2xl border border-border bg-white p-3">
              <p className="text-xs text-muted">{t.workout.complete.totalSets}</p>
              <p className="mt-1 text-lg font-extrabold text-navy">{totalSets}</p>
            </StaggerItem>
          </StaggerGroup>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="mt-4 w-full rounded-2xl border border-teal bg-teal-light p-3"
          >
            <Badge tone="info" icon="🏅" label={t.workout.complete.personalBest} />
            <p className="mt-1 text-sm text-navy">Bench Press 72kg × 10 — new best!</p>
          </motion.div>
        </div>
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame
      footer={
        <div className="flex gap-2">
          {exerciseIndex < todaysWorkout.exercises.length - 1 ? (
            <Button fullWidth onClick={() => setExerciseIndex((i) => i + 1)}>
              {t.workout.nextExercise}
            </Button>
          ) : (
            <Button
              fullWidth
              onClick={() => {
                setFinished(true)
                showToast(t.toast.workoutSaved)
              }}
            >
              {t.workout.finishWorkout}
            </Button>
          )}
        </div>
      }
    >
      <TopBar title={language === 'ar' ? todaysWorkout.nameAr : todaysWorkout.name} backTo="/subscriber/training" />
      <div className="px-5 pb-8 pt-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-border bg-white p-2">
            <p className="text-[10px] text-muted">{t.workout.trainerLabel}</p>
            <p className="text-xs font-bold text-navy">{todaysWorkout.trainerName}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-2">
            <p className="text-[10px] text-muted">{t.workout.duration}</p>
            <p className="text-xs font-bold text-navy">{todaysWorkout.durationMins} min</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-2">
            <p className="text-[10px] text-muted">{t.workout.exercisesLabel}</p>
            <p className="text-xs font-bold text-navy">{todaysWorkout.exercises.length}</p>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{t.workout.progressLabel}</span>
            <span>
              {completedExercises} / {todaysWorkout.exercises.length}
            </span>
          </div>
          <div className="mt-1">
            <ProgressBar value={totalSetsCompleted} max={totalSets} />
          </div>
        </div>

        <div className="hemma-scroll mt-4 flex gap-2 overflow-x-auto pb-1">
          {todaysWorkout.exercises.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => setExerciseIndex(i)}
              className={[
                'shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold',
                i === exerciseIndex ? 'border-teal bg-teal text-white' : 'border-border bg-white text-navy',
              ].join(' ')}
            >
              {i + 1}. {language === 'ar' ? ex.nameAr : ex.name}
            </button>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white">
          <img
            src={`https://picsum.photos/seed/${exercise.id}/600/300`}
            alt=""
            className="h-36 w-full object-cover"
          />
          <div className="p-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-navy">{language === 'ar' ? exercise.nameAr : exercise.name}</h2>
              <AnimatePresence>
                {exerciseComplete && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge tone="success" icon="✓" label="Exercise Complete" />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <p className="mt-0.5 text-xs text-muted">🎯 {language === 'ar' ? exercise.targetMuscleAr : exercise.targetMuscle}</p>
            <p className="mt-2 text-sm font-semibold text-navy">
              {exercise.sets} × {exercise.reps}
            </p>
            <p className="text-xs text-muted">
              {t.workout.restTimer}: {exercise.restSeconds}s
            </p>
            <p className="mt-2 text-xs text-muted">
              {t.workout.previous}: <span className="font-semibold text-navy">{exercise.previous}</span>
            </p>
            <p className="mt-3 rounded-lg bg-black/5 p-2.5 text-xs text-navy">
              💬 {language === 'ar' ? exercise.instructionsAr : exercise.instructions}
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-black/5 text-muted">
                <th className="p-2 font-medium">{t.workout.set}</th>
                <th className="p-2 font-medium">{t.workout.previous}</th>
                <th className="p-2 font-medium">{t.workout.kg}</th>
                <th className="p-2 font-medium">{t.workout.reps}</th>
                <th className="p-2 font-medium">{t.workout.done}</th>
              </tr>
            </thead>
            <tbody>
              {sets.map((s: ExerciseSet, idx: number) => (
                <tr key={s.setNumber} className={['border-t border-border transition-colors', s.done ? 'bg-success/5' : ''].join(' ')}>
                  <td className="p-2 text-center font-semibold text-navy">{s.setNumber}</td>
                  <td className="p-2 text-center text-muted">{s.previous}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={s.targetKg}
                      onChange={(e) => updateField(idx, 'targetKg', Number(e.target.value))}
                      className="w-12 rounded border border-border px-1 py-1 text-center"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={s.targetReps}
                      onChange={(e) => updateField(idx, 'targetReps', Number(e.target.value))}
                      className="w-12 rounded border border-border px-1 py-1 text-center"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      animate={{ scale: s.done ? [1, 1.15, 1] : 1 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => toggleSet(idx)}
                      className={[
                        'mx-auto flex h-6 w-6 items-center justify-center rounded-full border-2',
                        s.done ? 'border-success bg-success text-white' : 'border-border text-transparent',
                      ].join(' ')}
                    >
                      ✓
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t.workout.addNote}
          rows={2}
          className="mt-3 w-full rounded-xl border border-border bg-white p-3 text-sm outline-none focus:border-teal"
        />
      </div>
    </PhoneFrame>
  )
}
