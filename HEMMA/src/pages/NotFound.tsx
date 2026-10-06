import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useLanguage } from '../i18n/LanguageContext'

export default function NotFound() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-light text-3xl">🧭</div>
      <h1 className="mt-6 text-2xl font-extrabold text-navy">{t.notFound.title}</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">{t.notFound.body}</p>
      <div className="mt-8 flex gap-3">
        <Button variant="outline" onClick={() => navigate('/')}>
          {t.notFound.backToPrototypeHome}
        </Button>
        <Button onClick={() => navigate('/subscriber/home')}>{t.notFound.subscriberHome}</Button>
      </div>
    </div>
  )
}
