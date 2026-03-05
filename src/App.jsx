import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import WhyItMatters from './components/WhyItMatters'
import HowItWorks from './components/HowItWorks'
import UseCases from './components/UseCases'
import BiometricCTA from './components/BiometricCTA'
import UploadScreen from './pages/UploadScreen'
import ProcessingScreen from './pages/ProcessingScreen'
import ResultsScreen from './pages/ResultsScreen'
import LoginScreen from './pages/LoginScreen'
import UserDashboard from './pages/UserDashboard'

function LandingPage() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    const animateElements = document.querySelectorAll('.animate-on-scroll')
    animateElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <WhyItMatters />
      <HowItWorks />
      <UseCases />
      <BiometricCTA />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-bg-primary text-text-primary font-inter overflow-x-hidden">
        <Routes>
          <Route path="/"           element={<LandingPage />} />
          <Route path="/upload"     element={<UploadScreen />} />
          <Route path="/processing" element={<ProcessingScreen />} />
          <Route path="/results"    element={<ResultsScreen />} />
          <Route path="/login"      element={<LoginScreen />} />
          <Route path="/dashboard"  element={<UserDashboard />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
