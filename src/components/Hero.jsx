import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Hero = () => {
  const { user, loading } = useAuth()
  const isLoggedIn = !loading && Boolean(user)

  return (
    <section className="relative overflow-hidden bg-[#0a0d12]">
      {/* HERO SECTION - Brand Name Centered */}
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-100 brightness-50"
          >
            <source src="/img/vid3.mp4" type="video/mp4" />
          </video>
          {/* Optional: Reduce overlay for some readability, but much lighter */}
          <div className="absolute inset-0 bg-[#0a0d12]/10" />
        </div>
        
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF91AF]/5 rounded-full blur-[150px] z-[1]" />
        
        {/* Center Brand Content */}
        <div className="relative z-10 text-center px-6">
          {/* Brand Name */}
          <h1 className="hero-fade-in text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight">
            SuppreSense
          </h1>
          {/* Tagline */}
          <p className="hero-fade-in-delay-1 text-lg md:text-xl text-[#b8a0a8] font-light tracking-wide italic">
            "Detecting what isn't expressed"
          </p>

          {/* Login Buttons (guest only) */}
          {!isLoggedIn && (
            <div className="hero-fade-in-delay-2 mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="px-8 py-3 bg-[#FF91AF] text-[#0a0d12] font-semibold rounded-xl text-lg shadow-md hover:bg-[#FFa8c0] transition-all"
              >
                User Login
              </Link>
              <Link
                to="/admin-login"
                className="px-8 py-3 bg-[#0d1118] border border-[#FF91AF]/30 text-[#FF91AF] font-semibold rounded-xl text-lg shadow-md hover:bg-[#FF91AF]/10 hover:text-white transition-all"
              >
                Admin Login
              </Link>
            </div>
          )}

          {/* Scroll indicator */}
          <div className="hero-fade-in-delay-2 mt-20 flex flex-col items-center gap-3 text-[#FF91AF]/50">
            <span className="text-xs tracking-widest uppercase font-mono">Scroll to explore</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
