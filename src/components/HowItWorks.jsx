const steps = [
  {
    number: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17,8 12,3 7,8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    title: 'Upload Video or Image',
    description: 'Submit your media file through our secure upload interface'
  },
  {
    number: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Extract Behavioral Signals',
    description: 'System processes facial landmarks, movements, and temporal patterns'
  },
  {
    number: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Analyze Suppression Patterns',
    description: 'Advanced algorithms detect emotional regulation signatures'
  },
  {
    number: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: 'Display Results on Dashboard',
    description: 'View comprehensive analysis with visual insights and metrics'
  }
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-28 lg:py-32 bg-[#0d1118] relative overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="howItWorksGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4a9ead" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#howItWorksGrid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full border border-[#4a9ead]/20 bg-[#4a9ead]/5 text-[#4a9ead] text-xs font-mono uppercase tracking-wider mb-6">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-white">
            How It Works
          </h2>
        </div>
        
        {/* Desktop horizontal flow */}
        <div className="hidden lg:flex items-start justify-between gap-4">
          {steps.map((step, index) => (
            <div key={index} className="contents">
              <div className="animate-on-scroll flex-1 text-center px-4">
                <div className="text-5xl font-light text-[#4a9ead]/20 mb-4 font-mono">
                  {step.number}
                </div>
                <div className="w-[72px] h-[72px] mx-auto mb-5 flex items-center justify-center bg-[#0a0d12] border border-[#4a9ead]/20 rounded-full text-[#4a9ead] transition-all duration-400 hover:border-[#4a9ead]/50 hover:shadow-[0_0_30px_rgba(74,158,173,0.15)]">
                  {step.icon}
                </div>
                <h3 className="text-lg font-medium mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-[#7a9aaa] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="flex-shrink-0 w-[60px] h-px bg-gradient-to-r from-[#4a9ead]/30 to-[#4a9ead]/10 mt-[100px] relative">
                  <div className="absolute -right-1 -top-[3px] w-2 h-2 bg-[#4a9ead]/50 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile/Tablet vertical flow */}
        <div className="lg:hidden flex flex-col items-center gap-4">
          {steps.map((step, index) => (
            <div key={index} className="contents">
              <div className="animate-on-scroll text-center px-4 max-w-md">
                <div className="text-5xl font-light text-[#4a9ead]/20 mb-4 font-mono">
                  {step.number}
                </div>
                <div className="w-[72px] h-[72px] mx-auto mb-5 flex items-center justify-center bg-[#0a0d12] border border-[#4a9ead]/20 rounded-full text-[#4a9ead] transition-all duration-400">
                  {step.icon}
                </div>
                <h3 className="text-lg font-medium mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-[#7a9aaa] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Vertical connector */}
              {index < steps.length - 1 && (
                <div className="w-px h-10 bg-gradient-to-b from-[#4a9ead]/30 to-transparent relative">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#4a9ead]/50 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
