import { useNavigate } from 'react-router-dom'
import { House, LayoutGrid, Languages, RotateCcw } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAppState } from '../../context/AppStateContext'
import { useBodyAssessments } from '../../context/BodyAssessmentContext'
import { useNav } from '../../context/NavContext'
import BottomSheet from '../ui/BottomSheet'

interface PrototypeMenuProps {
  open: boolean
  onClose: () => void
}

/**
 * The mobile header's "•••" overflow menu — a discreet way back to the
 * section home, the main HEMMA prototype root, the language switch and
 * Reset Demo, without permanently occupying header space.
 */
export default function PrototypeMenu({ open, onClose }: PrototypeMenuProps) {
  const navigate = useNavigate()
  const { t, language, setLanguage } = useLanguage()
  const { homeTo } = useNav()
  const { resetPrototype } = useAppState()
  const { resetAssessments } = useBodyAssessments()

  const items = [
    { icon: House, label: t.common.home, onClick: () => navigate(homeTo) },
    { icon: LayoutGrid, label: t.common.prototypeHome, onClick: () => navigate('/') },
    {
      icon: Languages,
      label: `${t.common.language} — ${language === 'en' ? 'EN → AR' : 'AR → EN'}`,
      onClick: () => setLanguage(language === 'en' ? 'ar' : 'en'),
    },
    {
      icon: RotateCcw,
      label: t.common.resetDemo,
      onClick: () => {
        resetPrototype()
        resetAssessments()
        setLanguage('en')
        navigate('/')
        window.location.reload()
      },
    },
  ]

  return (
    <BottomSheet open={open} onClose={onClose} title={t.common.menu}>
      <div className="-mx-1 flex flex-col gap-0.5">
        {items.map((menuItem) => (
          <button
            key={menuItem.label}
            onClick={() => {
              menuItem.onClick()
              onClose()
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-start text-sm font-medium text-navy hover:bg-teal-light"
          >
            <menuItem.icon size={18} className="text-muted" />
            {menuItem.label}
          </button>
        ))}
      </div>
    </BottomSheet>
  )
}
