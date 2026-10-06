import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import en from './translations/en'
import ar from './translations/ar'
import type { TranslationSchema } from './translations/en'

export type Language = 'en' | 'ar'

interface LanguageContextValue {
  language: Language
  dir: 'ltr' | 'rtl'
  t: TranslationSchema
  toggleLanguage: () => void
  setLanguage: (lang: Language) => void
  formatNumber: (value: number) => string
  formatCurrency: (value: number) => string
}

const dictionaries: Record<Language, TranslationSchema> = { en, ar }

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const STORAGE_KEY = 'hemma-language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en'
    return (window.localStorage.getItem(STORAGE_KEY) as Language) || 'en'
  })

  const dir = language === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = dir
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language, dir])

  const setLanguage = (lang: Language) => setLanguageState(lang)
  const toggleLanguage = () => setLanguageState((prev) => (prev === 'en' ? 'ar' : 'en'))

  const value = useMemo<LanguageContextValue>(() => {
    const numberFormatter = new Intl.NumberFormat(language === 'ar' ? 'ar-QA' : 'en-QA')
    return {
      language,
      dir,
      t: dictionaries[language],
      toggleLanguage,
      setLanguage,
      formatNumber: (v: number) => numberFormatter.format(v),
      formatCurrency: (v: number) =>
        `${dictionaries[language].common.qar} ${numberFormatter.format(v)}`,
    }
  }, [language, dir])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
