const useCases = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 8h2" />
        <path d="M7 11h4" />
      </svg>
    ),
    title: 'Online Exams',
    description: 'Monitor test-takers for signs of stress, anxiety, or deceptive behavior during remote proctored examinations.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Interviews',
    description: 'Gain deeper insights into candidate responses during job interviews or sensitive interrogations.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <path d="M12 18v-6" />
        <path d="M9 15l3 3 3-3" />
      </svg>
    ),
    title: 'Behavioral Research',
    description: 'Support psychological studies on emotional regulation, deception detection, and affective computing.'
  }
]

const UseCases = () => {
  return (
    <section id="use-cases" className="py-28 lg:py-32 bg-bg-primary">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 gradient-text">
          Use Cases
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[500px] md:max-w-none mx-auto">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="animate-on-scroll bg-gradient-subtle border border-white/[0.08] rounded-2xl p-8 lg:p-10 transition-all duration-400 hover:border-accent-violet hover:-translate-y-1"
            >
              <div className="w-14 h-14 mb-6 flex items-center justify-center text-accent-violet">
                {useCase.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">
                {useCase.title}
              </h3>
              <p className="text-text-secondary text-[0.95rem] leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases
