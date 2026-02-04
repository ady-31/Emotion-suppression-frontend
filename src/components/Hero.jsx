const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#0a0d12]">
      {/* HERO SECTION - Brand Name Centered */}
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d12] via-[#0d1118] to-[#0a0d12]" />
        
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF91AF]/5 rounded-full blur-[150px]" />
        
        {/* Center Brand Content */}
        <div className="relative z-10 text-center px-6">
          {/* Brand Name */}
          <h1 className="hero-fade-in text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight">
            Suppresense
          </h1>
          
          {/* Tagline */}
          <p className="hero-fade-in-delay-1 text-lg md:text-xl text-[#b8a0a8] font-light tracking-wide italic">
            "Detecting what isn't expressed"
          </p>
          
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
