import { useRef, useState } from 'react'

interface OtpFieldProps {
  length?: number
  onComplete?: (code: string) => void
}

export default function OtpField({ length = 4, onComplete }: OtpFieldProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''))
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1)
    const next = [...values]
    next[index] = digit
    setValues(next)
    if (digit && index < length - 1) inputs.current[index + 1]?.focus()
    if (next.every((v) => v !== '')) onComplete?.(next.join(''))
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-center gap-3" dir="ltr">
      {values.map((v, i) => (
        <input
          key={i}
          ref={(el) => {
            inputs.current[i] = el
          }}
          value={v}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          inputMode="numeric"
          maxLength={1}
          className="h-14 w-12 rounded-xl border border-border bg-white text-center text-xl font-semibold text-navy focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/40"
        />
      ))}
    </div>
  )
}
