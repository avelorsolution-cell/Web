import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
  icon?: ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-teal text-white hover:bg-teal-dark active:bg-teal-dark shadow-sm',
  secondary: 'bg-navy text-white hover:bg-navy/90',
  outline: 'bg-transparent text-navy border border-border hover:border-teal hover:text-teal',
  destructive: 'bg-error text-white hover:bg-error/90',
  ghost: 'bg-transparent text-navy hover:bg-black/5',
}

export default function Button({
  variant = 'primary',
  fullWidth,
  icon,
  className = '',
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      disabled={disabled}
      whileHover={!disabled && !reduceMotion ? { y: -2 } : undefined}
      whileTap={!disabled && !reduceMotion ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2',
        !disabled && variant === 'primary' ? 'hover:shadow-md' : '',
        fullWidth ? 'w-full' : '',
        disabled ? 'cursor-not-allowed bg-border text-muted hover:bg-border' : variantStyles[variant],
        className,
      ].join(' ')}
      {...(rest as HTMLMotionProps<'button'>)}
    >
      {icon}
      {children}
    </motion.button>
  )
}
