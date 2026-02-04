const WhyItMatters = () => {
  return (
    <section id="why-it-matters" className="py-28 lg:py-32 bg-[#0a0d12] relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#FF91AF]/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Decorative lines */}
      <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#FF91AF]/20 to-transparent hidden lg:block" />
      <div className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#FF91AF]/20 to-transparent hidden lg:block" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="max-w-[800px] mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full border border-[#FF91AF]/20 bg-[#FF91AF]/5 text-[#FF91AF] text-xs font-mono uppercase tracking-wider mb-6">
            The Science
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12">
            Why It Matters
          </h2>
          
          <div className="space-y-8">
            <div className="animate-on-scroll bg-[#0d1118]/60 backdrop-blur-sm border border-[#FF91AF]/10 rounded-xl p-8">
              <p className="text-[#b8a0a8] text-lg leading-relaxed">
                Emotion suppression is a complex psychological phenomenon where individuals consciously or unconsciously inhibit their natural emotional expressions. Unlike overt emotions that can be detected by standard facial recognition systems, suppressed emotions leave only subtle traces—momentary muscle tensions, delayed reactions, and interrupted expression patterns.
              </p>
            </div>
            <div className="animate-on-scroll bg-[#0d1118]/60 backdrop-blur-sm border border-[#FF91AF]/10 rounded-xl p-8">
              <p className="text-[#b8a0a8] text-lg leading-relaxed">
                Traditional emotion recognition tools are designed to identify clear, fully-expressed emotions. They fail to capture the nuanced behavioral signals that indicate when someone is actively controlling or hiding their true emotional state. Our tool bridges this gap by focusing specifically on the markers of emotional regulation, providing insights that conventional tools simply cannot offer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyItMatters
