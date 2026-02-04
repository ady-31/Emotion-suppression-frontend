import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  const containerRef = useRef(null)

  useEffect(() => {
    // Parallax effect on mouse move
    const handleMouseMove = (e) => {
      if (containerRef.current && window.innerWidth > 768) {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 20
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 20
        containerRef.current.style.setProperty('--mouse-x', `${mouseX}px`)
        containerRef.current.style.setProperty('--mouse-y', `${mouseY}px`)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
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
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ '--mouse-x': '0px', '--mouse-y': '0px' }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Abstract background gradient simulating calm imagery */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f35] to-[#0a0f1a]" />
        
        {/* Soft ambient light spots */}
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0d4a6e]/20 rounded-full blur-[150px] transition-transform duration-700 ease-out"
          style={{ transform: 'translate(var(--mouse-x), var(--mouse-y))' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#1a3a5c]/15 rounded-full blur-[120px] transition-transform duration-700 ease-out"
          style={{ transform: 'translate(calc(var(--mouse-x) * -0.5), calc(var(--mouse-y) * -0.5))' }}
        />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 via-transparent to-[#0a0a0f]/60" />
      </div>

      {/* Decorative Grid Pattern - Left Side */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 opacity-[0.15] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPatternLeft" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#4a9ead" className="animate-pulse-slow" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPatternLeft)" />
        </svg>
      </div>

      {/* Decorative Grid Pattern - Right Side */}
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 opacity-[0.15] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPatternRight" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#4a9ead" className="animate-pulse-slow" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPatternRight)" />
        </svg>
      </div>

      {/* Vertical Signal Lines */}
      <div className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#4a9ead]/30 to-transparent" />
      <div className="absolute right-8 md:right-16 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#4a9ead]/30 to-transparent" />

      {/* Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Logo Icon */}
        <div className="hero-fade-in mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1a3a5c]/50 to-[#0d2840]/50 border border-[#4a9ead]/20 backdrop-blur-sm shadow-lg shadow-[#4a9ead]/5">
            {/* Abstract observation/analysis icon */}
            <svg 
              className="w-10 h-10 text-[#4a9ead]" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" className="animate-pulse-slow" />
              <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Project Name */}
        <h1 className="hero-fade-in-delay-1 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-[#e8eef4]">
          <span className="font-serif italic text-[#4a9ead]">Emotion</span>
          <span className="mx-3 text-[#6b8a9a]">Suppression</span>
          <span className="font-medium">Detector</span>
        </h1>

        {/* Tagline */}
        <p className="hero-fade-in-delay-2 text-lg md:text-xl text-[#7a9aaa] font-light tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed">
          Detecting subtle emotional regulation through behavioral signals
        </p>

        {/* Decorative divider */}
        <div className="hero-fade-in-delay-2 flex items-center justify-center gap-3 mb-12">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#4a9ead]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#4a9ead]/60" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#4a9ead]/40" />
        </div>

        {/* Call to Action Buttons */}
        <div className="hero-fade-in-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary Button */}
          <button 
            onClick={() => navigate('/upload')}
            className="group relative px-8 py-3.5 text-sm font-medium tracking-wider uppercase bg-[#4a9ead]/10 text-[#4a9ead] border border-[#4a9ead]/30 rounded-full backdrop-blur-sm hover:bg-[#4a9ead]/20 hover:border-[#4a9ead]/50 hover:shadow-lg hover:shadow-[#4a9ead]/10 transition-all duration-500 ease-out"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Analysis
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>

          {/* Secondary Button */}
          <a 
            href="#how-it-works"
            onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
            className="px-8 py-3.5 text-sm font-light tracking-wider text-[#7a9aaa] hover:text-[#a0c0d0] transition-colors duration-300"
          >
            Learn More
          </a>
        </div>

        {/* Subtle scroll indicator */}
        <div className="hero-fade-in-delay-4 absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-[#4a9ead]/40">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#4a9ead]/40 to-transparent animate-pulse-slow" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
