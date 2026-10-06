export interface ExerciseSet {
  setNumber: number
  previous: string
  targetKg: number
  targetReps: number
  done: boolean
}

export interface Exercise {
  id: string
  name: string
  nameAr: string
  targetMuscle: string
  targetMuscleAr: string
  sets: number
  reps: number
  restSeconds: number
  instructions: string
  instructionsAr: string
  previous: string
  setLog: ExerciseSet[]
}

export const todaysWorkout = {
  id: 'wk-upper-body-w3',
  name: 'Upper Body Strength',
  nameAr: 'تمرين الجزء العلوي',
  trainerName: 'Sarah Ahmed',
  durationMins: 55,
  exercises: [
    {
      id: 'ex-1',
      name: 'Bench Press',
      nameAr: 'ضغط البنش',
      targetMuscle: 'Chest',
      targetMuscleAr: 'الصدر',
      sets: 4,
      reps: 10,
      restSeconds: 90,
      instructions: 'Keep your shoulder blades retracted and control the bar on the way down.',
      instructionsAr: 'حافظ على لوحي كتفك للخلف وتحكم بالبار أثناء النزول.',
      previous: '70 kg × 10',
      setLog: [
        { setNumber: 1, previous: '70×10', targetKg: 72, targetReps: 10, done: true },
        { setNumber: 2, previous: '70×10', targetKg: 72, targetReps: 10, done: true },
        { setNumber: 3, previous: '70×10', targetKg: 72, targetReps: 10, done: false },
        { setNumber: 4, previous: '68×10', targetKg: 70, targetReps: 10, done: false },
      ],
    },
    {
      id: 'ex-2',
      name: 'Shoulder Press',
      nameAr: 'ضغط الكتف',
      targetMuscle: 'Shoulders',
      targetMuscleAr: 'الكتفين',
      sets: 3,
      reps: 12,
      restSeconds: 75,
      instructions: 'Press straight overhead without arching your lower back.',
      instructionsAr: 'ادفع مباشرة للأعلى دون قوس أسفل الظهر.',
      previous: '20 kg × 12',
      setLog: [
        { setNumber: 1, previous: '20×12', targetKg: 20, targetReps: 12, done: false },
        { setNumber: 2, previous: '20×12', targetKg: 20, targetReps: 12, done: false },
        { setNumber: 3, previous: '18×12', targetKg: 20, targetReps: 12, done: false },
      ],
    },
    {
      id: 'ex-3',
      name: 'Lat Pulldown',
      nameAr: 'سحب علوي',
      targetMuscle: 'Back',
      targetMuscleAr: 'الظهر',
      sets: 4,
      reps: 10,
      restSeconds: 75,
      instructions: 'Pull to your upper chest and squeeze your shoulder blades together.',
      instructionsAr: 'اسحب حتى أعلى الصدر واضغط لوحي كتفك معًا.',
      previous: '55 kg × 10',
      setLog: [
        { setNumber: 1, previous: '55×10', targetKg: 55, targetReps: 10, done: false },
        { setNumber: 2, previous: '55×10', targetKg: 55, targetReps: 10, done: false },
        { setNumber: 3, previous: '55×10', targetKg: 55, targetReps: 10, done: false },
        { setNumber: 4, previous: '50×10', targetKg: 55, targetReps: 10, done: false },
      ],
    },
    {
      id: 'ex-4',
      name: 'Bicep Curl',
      nameAr: 'تمرين العضلة ذات الرأسين',
      targetMuscle: 'Biceps',
      targetMuscleAr: 'العضلة ذات الرأسين',
      sets: 3,
      reps: 12,
      restSeconds: 60,
      instructions: 'Keep elbows fixed at your sides through the full range of motion.',
      instructionsAr: 'حافظ على ثبات مرفقيك بجانبك خلال كامل الحركة.',
      previous: '14 kg × 12',
      setLog: [
        { setNumber: 1, previous: '14×12', targetKg: 14, targetReps: 12, done: false },
        { setNumber: 2, previous: '14×12', targetKg: 14, targetReps: 12, done: false },
        { setNumber: 3, previous: '12×12', targetKg: 14, targetReps: 12, done: false },
      ],
    },
    {
      id: 'ex-5',
      name: 'Tricep Pushdown',
      nameAr: 'مد العضلة ثلاثية الرؤوس',
      targetMuscle: 'Triceps',
      targetMuscleAr: 'العضلة ثلاثية الرؤوس',
      sets: 3,
      reps: 12,
      restSeconds: 60,
      instructions: 'Keep your elbows pinned and fully extend at the bottom.',
      instructionsAr: 'ثبّت مرفقيك ومد ذراعيك بالكامل في الأسفل.',
      previous: '25 kg × 12',
      setLog: [
        { setNumber: 1, previous: '25×12', targetKg: 25, targetReps: 12, done: false },
        { setNumber: 2, previous: '25×12', targetKg: 25, targetReps: 12, done: false },
        { setNumber: 3, previous: '22×12', targetKg: 25, targetReps: 12, done: false },
      ],
    },
  ] as Exercise[],
}

export interface ProgramDay {
  day: string
  dayAr: string
  workout: string
  workoutAr: string
  status: 'completed' | 'upcoming' | 'rest'
}

export const week3Days: ProgramDay[] = [
  { day: 'Monday', dayAr: 'الإثنين', workout: 'Upper Body Strength', workoutAr: 'تمرين الجزء العلوي', status: 'completed' },
  { day: 'Tuesday', dayAr: 'الثلاثاء', workout: 'Cardio', workoutAr: 'كارديو', status: 'completed' },
  { day: 'Wednesday', dayAr: 'الأربعاء', workout: 'Lower Body Strength', workoutAr: 'تمرين الجزء السفلي', status: 'upcoming' },
  { day: 'Thursday', dayAr: 'الخميس', workout: 'Rest', workoutAr: 'راحة', status: 'rest' },
  { day: 'Friday', dayAr: 'الجمعة', workout: 'Conditioning', workoutAr: 'تكييف بدني', status: 'upcoming' },
  { day: 'Saturday', dayAr: 'السبت', workout: 'Weekly Check-In', workoutAr: 'المتابعة الأسبوعية', status: 'upcoming' },
]

export const recentActivity = [
  { key: 'workoutCompleted', date: '14 Sep', dateAr: '١٤ سبتمبر' },
  { key: 'assessmentAdded', date: '12 Sep', dateAr: '١٢ سبتمبر' },
  { key: 'programUpdated', date: '11 Sep', dateAr: '١١ سبتمبر' },
  { key: 'checkInSubmitted', date: '9 Sep', dateAr: '٩ سبتمبر' },
] as const
