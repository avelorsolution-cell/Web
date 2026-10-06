import { useLanguage } from './LanguageContext'

export function useBi() {
  const { language } = useLanguage()
  return (en: string, ar: string) => (language === 'ar' ? ar : en)
}
