const WhyItMatters = () => {
  return (
    <section id="why-it-matters" className="py-28 lg:py-32 bg-bg-primary relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-violet/[0.06] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 gradient-text">
            Why It Matters
          </h2>
          
          <div className="space-y-6">
            <p className="animate-on-scroll text-text-secondary text-lg leading-relaxed">
              Emotion suppression is a complex psychological phenomenon where individuals consciously or unconsciously inhibit their natural emotional expressions. Unlike overt emotions that can be detected by standard facial recognition systems, suppressed emotions leave only subtle traces—momentary muscle tensions, delayed reactions, and interrupted expression patterns.
            </p>
            <p className="animate-on-scroll text-text-secondary text-lg leading-relaxed">
              Traditional emotion recognition AI is designed to identify clear, fully-expressed emotions. It fails to capture the nuanced behavioral signals that indicate when someone is actively controlling or hiding their true emotional state. Our system bridges this gap by focusing specifically on the markers of emotional regulation, providing insights that conventional tools simply cannot offer.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyItMatters
