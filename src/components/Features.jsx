const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="8" r="5" />
        <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
        <circle cx="9" cy="7" r="1" fill="currentColor" />
        <circle cx="15" cy="7" r="1" fill="currentColor" />
      </svg>
    ),
    title: 'Observes Facial Micro-Movements',
    description: 'Tracks subtle muscle activations and micro-expressions that occur in fractions of a second, revealing involuntary emotional responses.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    ),
    title: 'Analyzes Expression Timing & Pauses',
    description: 'Measures the temporal dynamics of facial expressions, identifying delays, interruptions, and unnatural timing patterns.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M3 12h4l3-9 4 18 3-9h4" />
      </svg>
    ),
    title: 'Detects Emotional Regulation Patterns',
    description: 'Identifies behavioral signatures of active emotion suppression, distinguishing between natural expressions and controlled responses.'
  }
]

const Features = () => {
  return (
    <section id="what-it-does" className="py-28 lg:py-32 bg-[#0a0d12] relative overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="featuresGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FF91AF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#featuresGrid)" />
        </svg>
      </div>

      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF91AF]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full border border-[#FF91AF]/20 bg-[#FF91AF]/5 text-[#FF91AF] text-xs font-mono uppercase tracking-wider mb-6">
            Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-white">
            What It Does
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[500px] md:max-w-none mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="animate-on-scroll bg-[#0d1118]/80 backdrop-blur-sm border border-[#FF91AF]/10 rounded-xl p-8 lg:p-10 text-center transition-all duration-400 hover:border-[#FF91AF]/30 hover:bg-[#0d1118]"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[#FF91AF]/10 border border-[#FF91AF]/20 rounded-xl text-[#FF91AF]">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-[#b8a0a8] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
