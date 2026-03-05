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
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/95 shadow-lg shadow-black/30' : 'bg-bg-primary/80'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 text-xl font-semibold">
          <span className="text-accent-cyan text-2xl">🧠</span>
          <span>Suppresense</span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          <li>
            <a 
              href="#what-it-does" 
              onClick={(e) => handleSmoothScroll(e, '#what-it-does')}
              className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-[0.95rem]"
            >
              Features
            </a>
          </li>
          <li>
            <a 
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
              className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-[0.95rem]"
            >
              How It Works
            </a>
          </li>
          <li>
            <a 
              href="#use-cases"
              onClick={(e) => handleSmoothScroll(e, '#use-cases')}
              className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-[0.95rem]"
            >
              Use Cases
            </a>
          </li>

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
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-text-secondary hover:text-text-primary border border-white/[0.08] hover:border-[#FF91AF]/40 transition-all duration-200 text-[0.95rem]"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/upload')}
                  className="px-5 py-2.5 bg-gradient-subtle border border-white/[0.08] rounded-md text-text-secondary hover:text-text-primary hover:border-accent-cyan transition-all duration-200 text-[0.95rem]"
                >
                  Get Started
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
