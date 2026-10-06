import { useLanguage } from '../../i18n/LanguageContext'

export default function LanguageToggle({ compact }: { compact?: boolean }) {
  const { language, toggleLanguage } = useLanguage()
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex h-9 items-center justify-center rounded-full bg-black/5 px-3 text-xs font-semibold text-navy"
    >
      {compact ? (language === 'en' ? 'ع' : 'EN') : language === 'en' ? 'العربية' : 'English'}
    </button>
  )
}
