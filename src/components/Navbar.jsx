import { useState, useEffect } from 'react'

const Navbar = () => {
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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/95 shadow-lg shadow-black/30' : 'bg-bg-primary/80'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 text-xl font-semibold">
          <span className="text-accent-cyan text-2xl">◉</span>
          <span>EmotionAI</span>
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
          <li>
            <a 
              href="#"
              className="px-5 py-2.5 bg-gradient-subtle border border-white/[0.08] rounded-md text-text-secondary hover:text-text-primary hover:border-accent-cyan transition-all duration-200 text-[0.95rem]"
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
