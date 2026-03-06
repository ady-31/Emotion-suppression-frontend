import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      const navbarHeight = 80
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-[1200px] mx-auto px-2 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center text-xl font-semibold ml-1">
          <span>Suppresense</span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-4 list-none mr-2">
          {user ? (
            /* ── Logged-in state ── */
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-[0.95rem]"
                >
                  My Results
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF91AF]/10 border border-[#FF91AF]/20">
                    <div className="w-6 h-6 rounded-full bg-[#FF91AF]/30 flex items-center justify-center">
                      <span className="text-[#FF91AF] text-xs font-bold">{user.name?.[0]?.toUpperCase()}</span>
                    </div>
                    <span className="text-[#FF91AF] text-sm font-medium max-w-[100px] truncate">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md text-[#b8a0a8] hover:text-white border border-white/[0.08] hover:border-red-400/30 transition-all text-[0.9rem]"
                  >
                    Sign Out
                  </button>
                </div>
              </li>
            </>
          ) : (
            /* ── Guest state ── */
            <>
              <li>
                <button 
                  onClick={() => navigate('/upload')}
                  className="px-8 py-2 bg-gradient-subtle border border-white/[0.08] rounded-full text-text-secondary hover:text-text-primary hover:border-accent-cyan transition-all duration-200 text-[0.95rem]"
                >
                  Try
                </button>
              </li>
              <li>
                <Link
                  to="/login"
                  className="px-7 py-2 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary border border-white/[0.15] hover:border-[#FF91AF]/60 transition-all duration-200"
                  title="Sign In"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
