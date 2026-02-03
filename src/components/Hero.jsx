import { useEffect, useRef } from 'react'
import FaceVisualization from './FaceVisualization'

const Hero = () => {
  const visualRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (visualRef.current && window.pageYOffset < window.innerHeight) {
        const rate = window.pageYOffset * 0.3
        visualRef.current.style.transform = `translateY(${rate}px)`
      }
    }

    const handleMouseMove = (e) => {
      if (svgRef.current && window.innerWidth > 768) {
        const mouseX = e.clientX / window.innerWidth - 0.5
        const mouseY = e.clientY / window.innerHeight - 0.5
        svgRef.current.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousemove', handleMouseMove)
    }
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
    <section className="min-h-screen flex items-center pt-20 bg-bg-primary relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/[0.08] rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[600px] h-[600px] bg-accent-violet/[0.08] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        {/* Content */}
        <div className="animate-fade-in-up text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-6 hero-title-gradient">
            Emotion Suppression Detection System
          </h1>
          <p className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed">
            AI-based analysis of facial behavior and speech timing to detect suppressed emotional expression
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a 
              href="#" 
              className="btn-ripple inline-flex items-center justify-center px-8 py-3.5 text-base font-medium bg-gradient-to-br from-accent-cyan to-accent-violet text-bg-primary rounded-lg shadow-glow-cyan hover:shadow-glow-cyan-lg hover:-translate-y-0.5 transition-all duration-400"
            >
              Start Analysis
            </a>
            <a 
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium bg-transparent text-text-primary border border-white/[0.08] rounded-lg hover:border-accent-cyan hover:text-accent-cyan hover:bg-accent-cyan/5 transition-all duration-400"
            >
              How It Works
            </a>
          </div>
        </div>

        {/* Visual */}
        <div 
          ref={visualRef}
          className="flex justify-center items-center relative animate-fade-in order-1 lg:order-2"
        >
          <FaceVisualization svgRef={svgRef} />
        </div>
      </div>
    </section>
  )
}

export default Hero
