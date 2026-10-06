import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', id, ...rest }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <label className="block" htmlFor={inputId}>
      {label && <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>}
      <input
        id={inputId}
        className={[
          'w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy placeholder:text-muted',
          'focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal',
          error ? 'border-error' : 'border-border',
          className,
        ].join(' ')}
        {...rest}
      />
      {error && <span className="mt-1 block text-xs text-error">{error}</span>}
    </label>
  )
}
