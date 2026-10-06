import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { useAppState } from '../context/AppStateContext'
import { useBodyAssessments } from '../context/BodyAssessmentContext'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { StaggerGroup, StaggerItem } from '../components/motion/Stagger'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay, ease: 'easeOut' as const },
})

export default function PresentationHome() {
  const navigate = useNavigate()
  const { t, language, setLanguage } = useLanguage()
  const { resetPrototype } = useAppState()
  const { resetAssessments } = useBodyAssessments()
  const [confirmReset, setConfirmReset] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  const launcherItems = [
    { label: `${t.experiences.subscriber} Experience`, icon: '🏃‍♀️', onClick: () => navigate('/subscriber/splash') },
    { label: `${t.experiences.trainer} Experience`, icon: '🧑‍🏫', onClick: () => navigate('/trainer') },
    { label: `${t.experiences.admin} Portal`, icon: '🖥️', onClick: () => navigate('/admin') },
    {
      label: `${t.experiences.arabic} Experience`,
      icon: '🌐',
      onClick: () => {
        setLanguage('ar')
        navigate('/subscriber/splash')
      },
    },
    { label: t.meetingTools.businessDecisions, icon: '📊', onClick: () => navigate('/business-decisions') },
    { label: t.meetingTools.edgeCases, icon: '⚠️', onClick: () => navigate('/edge-cases') },
    { label: t.meetingTools.futureEcosystem, icon: '🗺️', onClick: () => navigate('/future-roadmap') },
  ]

  const doResetDemo = () => {
    resetPrototype()
    resetAssessments()
    setConfirmReset(false)
    setLanguage('en')
    window.location.reload()
  }

  return (
    <div className="flex min-h-screen flex-col bg-navy text-white">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <motion.div
          className="flex items-center gap-2"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal text-lg font-black text-navy">H</div>
          <div>
            <p className="text-sm font-extrabold leading-none">HEMMA</p>
            <p className="text-[10px] text-white/50">Prototype</p>
          </div>
        </motion.div>
        <div className="flex items-center gap-4">
          <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="text-sm text-white/70 hover:text-white">
            English | العربية
          </button>
          <button onClick={() => setConfirmReset(true)} className="text-xs text-white/40 hover:text-white/70">
            {t.common.resetDemo}
          </button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <motion.span
          {...fadeUp(0.1)}
          className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-teal-light"
        >
          {t.presentation.version}
        </motion.span>
        <motion.h1 {...fadeUp(0.18)} className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t.presentation.title}
        </motion.h1>
        <motion.p {...fadeUp(0.26)} className="mx-auto mt-3 max-w-2xl text-xl font-semibold text-teal-light">
          {t.heroSection.headline}
        </motion.p>
        <motion.p {...fadeUp(0.32)} className="mx-auto mt-4 max-w-xl text-sm text-white/70">
          {t.heroSection.subtext}
        </motion.p>

        <motion.div {...fadeUp(0.42)} className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button onClick={() => navigate('/subscriber/splash')}>{t.heroSection.startDemo}</Button>
          <Button variant="outline" className="!border-white/30 !text-white hover:!bg-white/10" onClick={() => setExploreOpen(true)}>
            {t.heroSection.explorePlatform}
          </Button>
        </motion.div>

        <motion.p {...fadeUp(0.5)} className="mt-5 text-xs text-white/40">
          {t.experiences.subscriber} • {t.experiences.trainer} • {t.experiences.admin}
        </motion.p>
      </div>

      <motion.footer {...fadeUp(0.6)} className="border-t border-white/10 px-6 py-8 text-center">
        <p className="text-sm text-white/50">{t.presentation.developedBy}</p>
        <a href="https://avelorsolutions.com/" target="_blank" rel="noreferrer" className="text-sm font-semibold text-teal hover:underline">
          avelorsolutions.com
        </a>
        <p className="mt-2 text-xs text-white/30">{t.presentation.version}</p>
      </motion.footer>

      <Modal open={exploreOpen} onClose={() => setExploreOpen(false)} title="Explore HEMMA">
        <StaggerGroup className="flex flex-col gap-0.5">
          {launcherItems.map((item) => (
            <StaggerItem key={item.label}>
              <button
                onClick={() => {
                  item.onClick()
                  setExploreOpen(false)
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start text-sm font-medium text-navy hover:bg-teal-light"
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <Button variant="outline" className="mt-3 w-full" onClick={() => setExploreOpen(false)}>
          {t.common.close}
        </Button>
      </Modal>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title={t.common.resetDemoConfirmTitle}>
        <p className="text-sm text-muted">{t.common.resetDemoConfirmBody}</p>
        <div className="mt-5 flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => setConfirmReset(false)}>
            {t.common.cancel}
          </Button>
          <Button variant="destructive" className="flex-1" onClick={doResetDemo}>
            {t.common.resetDemo}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
