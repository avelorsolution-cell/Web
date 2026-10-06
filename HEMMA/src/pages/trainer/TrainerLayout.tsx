import { NavProvider } from '../../context/NavContext'
import PresenterMenu from '../../components/layout/PresenterMenu'
import AnimatedOutlet from '../../components/motion/AnimatedOutlet'

export default function TrainerLayout() {
  return (
    <NavProvider homeTo="/trainer/dashboard">
      <AnimatedOutlet variant="slide" />
      <PresenterMenu />
    </NavProvider>
  )
}
