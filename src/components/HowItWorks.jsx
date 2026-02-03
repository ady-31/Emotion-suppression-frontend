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
    description: 'AI processes facial landmarks, movements, and temporal patterns'
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
    <section id="how-it-works" className="py-28 lg:py-32 bg-bg-secondary">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 gradient-text">
          How It Works
        </h2>
        
        {/* Desktop horizontal flow */}
        <div className="hidden lg:flex items-start justify-between gap-4">
          {steps.map((step, index) => (
            <div key={index} className="contents">
              <div className="animate-on-scroll flex-1 text-center px-4">
                <div className="text-5xl font-bold gradient-text opacity-30 mb-4">
                  {step.number}
                </div>
                <div className="w-[72px] h-[72px] mx-auto mb-5 flex items-center justify-center bg-bg-card border border-white/[0.08] rounded-full text-accent-cyan transition-all duration-400 hover:border-accent-cyan hover:shadow-[0_0_30px_rgba(0,212,212,0.2)] hover:scale-110">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-text-primary">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="flex-shrink-0 w-[60px] h-0.5 bg-gradient-to-r from-accent-cyan to-accent-violet opacity-30 mt-[100px] relative">
                  <div className="absolute -right-1 -top-[3px] w-2 h-2 bg-accent-cyan rounded-full" />
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
                <div className="text-5xl font-bold gradient-text opacity-30 mb-4">
                  {step.number}
                </div>
                <div className="w-[72px] h-[72px] mx-auto mb-5 flex items-center justify-center bg-bg-card border border-white/[0.08] rounded-full text-accent-cyan transition-all duration-400">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-text-primary">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Vertical connector */}
              {index < steps.length - 1 && (
                <div className="w-0.5 h-10 bg-gradient-to-b from-accent-cyan to-accent-violet opacity-30 relative">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent-cyan rounded-full" />
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
