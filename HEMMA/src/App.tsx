import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { AppStateProvider } from './context/AppStateContext'
import { BodyAssessmentProvider } from './context/BodyAssessmentContext'
import { ToastProvider } from './context/ToastContext'

import PresentationHome from './pages/PresentationHome'
import BusinessDecisions from './pages/BusinessDecisions'
import EdgeCases from './pages/EdgeCases'
import FutureRoadmap from './pages/FutureRoadmap'
import NotFound from './pages/NotFound'

import SubscriberLayout from './pages/subscriber/SubscriberLayout'
import Splash from './pages/subscriber/Splash'
import Onboarding from './pages/subscriber/Onboarding'
import Login from './pages/subscriber/Login'
import SignUp from './pages/subscriber/SignUp'
import Otp from './pages/subscriber/Otp'
import UserType from './pages/subscriber/UserType'
import GoalSelection from './pages/subscriber/GoalSelection'
import TrainingPreference from './pages/subscriber/TrainingPreference'
import SportSelection from './pages/subscriber/SportSelection'
import ProgressConsent from './pages/subscriber/ProgressConsent'
import Home from './pages/subscriber/Home'
import TrainerDiscovery from './pages/subscriber/TrainerDiscovery'
import TrainerComparison from './pages/subscriber/TrainerComparison'
import TrainerProfile from './pages/subscriber/TrainerProfile'
import Packages from './pages/subscriber/Packages'
import Booking from './pages/subscriber/Booking'
import Payment from './pages/subscriber/Payment'
import Confirmation from './pages/subscriber/Confirmation'
import FeaturePreview from './pages/subscriber/FeaturePreview'
import Progress from './pages/subscriber/Progress'
import MyTraining from './pages/subscriber/MyTraining'
import TrainingProgram from './pages/subscriber/TrainingProgram'
import Workout from './pages/subscriber/Workout'
import TrainingCalendar from './pages/subscriber/TrainingCalendar'
import CheckIn from './pages/subscriber/CheckIn'
import Messages from './pages/subscriber/Messages'
import Conversation from './pages/subscriber/Conversation'
import ReviewSubmit from './pages/subscriber/ReviewSubmit'
import Notifications from './pages/subscriber/Notifications'
import Profile from './pages/subscriber/Profile'

import BodyAssessmentLanding from './pages/subscriber/bodyAssessment/Landing'
import BodyAssessmentUpload from './pages/subscriber/bodyAssessment/Upload'
import BodyAssessmentManual from './pages/subscriber/bodyAssessment/Manual'
import BodyAssessmentReview from './pages/subscriber/bodyAssessment/Review'
import BodyAssessmentSuccess from './pages/subscriber/bodyAssessment/Success'
import BodyAssessmentHistory from './pages/subscriber/bodyAssessment/History'
import BodyAssessmentDetail from './pages/subscriber/bodyAssessment/Detail'
import BodyAssessmentCompare from './pages/subscriber/bodyAssessment/Compare'

import TrainerLayout from './pages/trainer/TrainerLayout'
import TrainerRegistration from './pages/trainer/Registration'
import TrainerVerification from './pages/trainer/Verification'
import TrainerDashboard from './pages/trainer/Dashboard'
import TrainerClients from './pages/trainer/Clients'
import TrainerClientDetail from './pages/trainer/ClientProgress'
import TrainerCalendar from './pages/trainer/Calendar'
import TrainerMessages from './pages/trainer/Messages'
import TrainerConversation from './pages/trainer/Conversation'
import TrainerEarnings from './pages/trainer/Earnings'
import TrainerPackages from './pages/trainer/Packages'
import TrainerProgramBuilder from './pages/trainer/ProgramBuilder'
import TrainerCheckIns from './pages/trainer/CheckIns'
import TrainerOwnProfile from './pages/trainer/Profile'

import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminVerification from './pages/admin/Verification'
import AdminVerificationDetail from './pages/admin/VerificationDetail'
import AdminUsers from './pages/admin/Users'
import AdminBookings from './pages/admin/Bookings'
import AdminFinance from './pages/admin/Finance'
import AdminComplaints from './pages/admin/Complaints'
import AdminReports from './pages/admin/Reports'
import AdminSimple from './pages/admin/AdminSimple'

export default function App() {
  return (
    <LanguageProvider>
      <AppStateProvider>
        <BodyAssessmentProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PresentationHome />} />
              <Route path="/business-decisions" element={<BusinessDecisions />} />
              <Route path="/edge-cases" element={<EdgeCases />} />
              <Route path="/future-roadmap" element={<FutureRoadmap />} />

              <Route element={<SubscriberLayout />}>
                <Route path="/subscriber/splash" element={<Splash />} />
                <Route path="/subscriber/onboarding" element={<Onboarding />} />
                <Route path="/subscriber/login" element={<Login />} />
                <Route path="/subscriber/signup" element={<SignUp />} />
                <Route path="/subscriber/otp" element={<Otp />} />
                <Route path="/subscriber/user-type" element={<UserType />} />
                <Route path="/subscriber/goal" element={<GoalSelection />} />
                <Route path="/subscriber/training-preference" element={<TrainingPreference />} />
                <Route path="/subscriber/sport-select" element={<SportSelection />} />
                <Route path="/subscriber/consent" element={<ProgressConsent />} />
                <Route path="/subscriber/home" element={<Home />} />
                <Route path="/subscriber/trainers" element={<TrainerDiscovery />} />
                <Route path="/subscriber/trainers/compare" element={<TrainerComparison />} />
                <Route path="/subscriber/trainers/:trainerId" element={<TrainerProfile />} />
                <Route path="/subscriber/trainers/:trainerId/packages" element={<Packages />} />
                <Route path="/subscriber/booking" element={<Booking />} />
                <Route path="/subscriber/payment" element={<Payment />} />
                <Route path="/subscriber/confirmation" element={<Confirmation />} />
                <Route path="/subscriber/coming-soon" element={<FeaturePreview />} />
                <Route path="/subscriber/progress" element={<Progress />} />
                <Route path="/subscriber/training" element={<MyTraining />} />
                <Route path="/subscriber/my-training" element={<MyTraining />} />
                <Route path="/subscriber/training/program" element={<TrainingProgram />} />
                <Route path="/subscriber/training/workout" element={<Workout />} />
                <Route path="/subscriber/training/calendar" element={<TrainingCalendar />} />
                <Route path="/subscriber/check-in" element={<CheckIn />} />
                <Route path="/subscriber/messages" element={<Messages />} />
                <Route path="/subscriber/messages/:id" element={<Conversation />} />
                <Route path="/subscriber/review" element={<ReviewSubmit />} />
                <Route path="/subscriber/notifications" element={<Notifications />} />
                <Route path="/subscriber/profile" element={<Profile />} />

                <Route path="/subscriber/body-assessment" element={<BodyAssessmentLanding />} />
                <Route path="/subscriber/body-assessment/upload" element={<BodyAssessmentUpload />} />
                <Route path="/subscriber/body-assessment/manual" element={<BodyAssessmentManual />} />
                <Route path="/subscriber/body-assessment/review" element={<BodyAssessmentReview />} />
                <Route path="/subscriber/body-assessment/success" element={<BodyAssessmentSuccess />} />
                <Route path="/subscriber/body-assessment/history" element={<BodyAssessmentHistory />} />
                <Route path="/subscriber/body-assessment/compare" element={<BodyAssessmentCompare />} />
                <Route path="/subscriber/body-assessment/:assessmentId" element={<BodyAssessmentDetail />} />
              </Route>

              <Route path="/trainer" element={<TrainerRegistration />} />
              <Route element={<TrainerLayout />}>
                <Route path="/trainer/verification" element={<TrainerVerification />} />
                <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
                <Route path="/trainer/clients" element={<TrainerClients />} />
                <Route path="/trainer/clients/:clientId" element={<TrainerClientDetail />} />
                <Route path="/trainer/calendar" element={<TrainerCalendar />} />
                <Route path="/trainer/messages" element={<TrainerMessages />} />
                <Route path="/trainer/messages/:clientId" element={<TrainerConversation />} />
                <Route path="/trainer/earnings" element={<TrainerEarnings />} />
                <Route path="/trainer/packages" element={<TrainerPackages />} />
                <Route path="/trainer/program-builder" element={<TrainerProgramBuilder />} />
                <Route path="/trainer/check-ins" element={<TrainerCheckIns />} />
                <Route path="/trainer/profile" element={<TrainerOwnProfile />} />
              </Route>

              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/verification" element={<AdminVerification />} />
                <Route path="/admin/verification/:trainerId" element={<AdminVerificationDetail />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/finance" element={<AdminFinance />} />
                <Route path="/admin/complaints" element={<AdminComplaints />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/sports" element={<AdminSimple section="sports" />} />
                <Route path="/admin/challenges" element={<AdminSimple section="challenges" />} />
                <Route path="/admin/marketplace" element={<AdminSimple section="marketplace" />} />
                <Route path="/admin/promotions" element={<AdminSimple section="promotions" />} />
                <Route path="/admin/cms" element={<AdminSimple section="cms" />} />
                <Route path="/admin/roles" element={<AdminSimple section="roles" />} />
                <Route path="/admin/audit-log" element={<AdminSimple section="auditLog" />} />
                <Route path="/admin/settings" element={<AdminSimple section="settings" />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
        </BodyAssessmentProvider>
      </AppStateProvider>
    </LanguageProvider>
  )
}
