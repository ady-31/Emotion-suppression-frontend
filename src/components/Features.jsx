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
    <section id="what-it-does" className="py-28 lg:py-32 bg-bg-secondary">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 gradient-text">
          What It Does
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[500px] md:max-w-none mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="animate-on-scroll bg-bg-card border border-white/[0.08] rounded-2xl p-8 lg:p-10 text-center transition-all duration-400 hover:-translate-y-2 hover:border-accent-cyan/30 hover:shadow-glow"
            >
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-gradient-subtle rounded-2xl text-accent-cyan">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-text-primary">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-[0.95rem] leading-relaxed">
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
