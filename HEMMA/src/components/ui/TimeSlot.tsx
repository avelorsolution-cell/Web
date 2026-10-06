export type SlotState = 'available' | 'unavailable' | 'booked' | 'selected'

interface TimeSlotProps {
  time: string
  state: SlotState
  onClick?: () => void
}

const stateStyles: Record<SlotState, string> = {
  available: 'border-border bg-white text-navy hover:border-teal/60',
  unavailable: 'cursor-not-allowed border-border bg-black/5 text-muted/50 line-through',
  booked: 'cursor-not-allowed border-warning/40 bg-warning/10 text-warning',
  selected: 'border-teal bg-teal text-white',
}

export default function TimeSlot({ time, state, onClick }: TimeSlotProps) {
  return (
    <button
      type="button"
      disabled={state === 'unavailable' || state === 'booked'}
      onClick={onClick}
      className={['rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors', stateStyles[state]].join(' ')}
    >
      {time}
    </button>
  )
}
