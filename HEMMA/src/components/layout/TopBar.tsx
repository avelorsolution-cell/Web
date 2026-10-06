import type { ReactNode } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, House, MoreVertical } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useNav } from '../../context/NavContext'
import PrototypeMenu from './PrototypeMenu'

interface TopBarProps {
  title?: string
  /** Explicit back handler — takes precedence over backTo. */
  onBack?: () => void
  /** Explicit fallback route for Back, used when onBack isn't given. Preferred over relying on browser history. */
  backTo?: string
  showBack?: boolean
  /** Hide the Home icon for screens where it doesn't apply (auth/onboarding flow). */
  hideHome?: boolean
  /** Hide the "•••" prototype menu (rarely needed — keep it available by default). */
  hideMenu?: boolean
  right?: ReactNode
  transparent?: boolean
}

/**
 * The shared mobile screen header (fulfils the "MobilePageHeader" role from
 * the navigation spec) — Back (left), title (center), Home + overflow menu
 * (right). Used by ~50 subscriber/trainer screens so the whole app's
 * navigation logic lives in one place instead of being duplicated per page.
 *
 * Back never blindly calls browser history (-1): it uses an explicit
 * `onBack` handler or `backTo` route when given, and otherwise falls back
 * to this section's Home (subscriber/trainer dashboard) — never off the
 * back stack and out of the prototype entirely.
 */
export default function TopBar({ title, onBack, backTo, showBack = true, hideHome, hideMenu, right, transparent }: TopBarProps) {
  const navigate = useNavigate()
  const { dir } = useLanguage()
  const { homeTo } = useNav()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleBack = onBack ?? (backTo ? () => navigate(backTo) : () => navigate(homeTo))

  return (
    <div
      className={[
        'sticky top-0 z-10 flex items-center gap-2 px-3 py-2.5 backdrop-blur',
        transparent ? 'bg-transparent' : 'border-b border-border bg-white/95',
      ].join(' ')}
    >
      {showBack ? (
        <button
          type="button"
          onClick={handleBack}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/5 text-navy hover:bg-black/10"
          aria-label="Back"
          title="Back"
        >
          <ArrowLeft size={19} style={dir === 'rtl' ? { transform: 'scaleX(-1)' } : undefined} />
        </button>
      ) : (
        <div className="w-2 shrink-0" />
      )}

      {title && <h1 className="flex-1 truncate text-center text-base font-bold text-navy">{title}</h1>}
      {!title && <div className="flex-1" />}

      <div className="flex shrink-0 items-center gap-1">
        {right}
        {!hideHome && (
          <button
            type="button"
            onClick={() => navigate(homeTo)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/5 text-navy hover:bg-black/10"
            aria-label="Home"
            title="Home"
          >
            <House size={19} />
          </button>
        )}
        {!hideMenu && (
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-navy hover:bg-black/5"
            aria-label="Menu"
            title="Menu"
          >
            <MoreVertical size={19} />
          </button>
        )}
      </div>

      {!hideMenu && <PrototypeMenu open={menuOpen} onClose={() => setMenuOpen(false)} />}
    </div>
  )
}
