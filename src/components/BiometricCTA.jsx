import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BiometricCTA = () => {
  const navigate = useNavigate()
  const [scanLine, setScanLine] = useState(0)

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100)
    }, 50)

    return () => {
      clearInterval(scanInterval)
    }
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0d12]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d12] via-[#0d1118] to-[#0a0d12]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0d12_70%)]" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridCTA" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FF91AF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridCTA)" />
        </svg>
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-20 left-20 w-16 h-16 border-l-2 border-t-2 border-[#FF91AF]/30 hidden md:block" />
      <div className="absolute top-20 right-20 w-16 h-16 border-r-2 border-t-2 border-[#FF91AF]/30 hidden md:block" />
      <div className="absolute bottom-20 left-20 w-16 h-16 border-l-2 border-b-2 border-[#FF91AF]/30 hidden md:block" />
      <div className="absolute bottom-20 right-20 w-16 h-16 border-r-2 border-b-2 border-[#FF91AF]/30 hidden md:block" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Side - Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            Emotion Suppression
            <span className="block text-[#FF91AF] font-normal">Detection</span>
          </h2>

          <p className="text-lg md:text-xl text-[#b8a0a8] font-light mb-10 leading-relaxed max-w-xl">
            Advanced analysis of subtle facial behavior and expressive timing
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <button 
              onClick={() => navigate('/upload')}
              className="group relative px-8 py-4 text-sm font-medium tracking-wider uppercase bg-[#FF91AF] text-[#0a0d12] rounded hover:bg-[#FFa8c0] transition-all duration-300 shadow-lg shadow-[#FF91AF]/20"
            >
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Start Analysis
              </span>
            </button>

            <a 
              href="#what-it-does"
              className="px-8 py-4 text-sm font-medium tracking-wider uppercase text-[#FF91AF] border border-[#FF91AF]/30 rounded hover:bg-[#FF91AF]/10 hover:border-[#FF91AF]/50 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right Side - Face with Scanning Line */}
        <div className="relative w-[280px] h-[350px] md:w-[320px] md:h-[400px] lg:w-[380px] lg:h-[480px]">
          <div 
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF91AF]/60 to-transparent pointer-events-none transition-all duration-75 z-10"
            style={{ top: `${scanLine}%`, boxShadow: '0 0 20px 2px rgba(255, 145, 175, 0.4)' }}
          />
          
          <svg viewBox="0 0 400 500" className="w-full h-full">
            <ellipse cx="200" cy="220" rx="140" ry="180" fill="none" stroke="#FF91AF" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
            
            <circle cx="160" cy="80" r="2" fill="#FF91AF" opacity="0.6" />
            <circle cx="180" cy="80" r="2" fill="#FF91AF" opacity="0.6" />
            <circle cx="200" cy="80" r="2" fill="#FF91AF" opacity="0.6" />
            <circle cx="220" cy="80" r="2" fill="#FF91AF" opacity="0.6" />
            <circle cx="240" cy="80" r="2" fill="#FF91AF" opacity="0.6" />
            
            <circle cx="120" cy="112" r="2" fill="#FF91AF" opacity="0.7" />
            <circle cx="140" cy="113" r="2" fill="#FF91AF" opacity="0.7" />
            <circle cx="160" cy="114" r="2" fill="#FF91AF" opacity="0.7" />
            <circle cx="180" cy="113" r="2" fill="#FF91AF" opacity="0.7" />
            
            <circle cx="220" cy="113" r="2" fill="#FF91AF" opacity="0.7" />
            <circle cx="240" cy="114" r="2" fill="#FF91AF" opacity="0.7" />
            <circle cx="260" cy="113" r="2" fill="#FF91AF" opacity="0.7" />
            <circle cx="280" cy="112" r="2" fill="#FF91AF" opacity="0.7" />
            
            <ellipse cx="150" cy="150" rx="30" ry="15" fill="none" stroke="#FF91AF" strokeWidth="1" opacity="0.5" />
            <circle cx="150" cy="150" r="8" fill="none" stroke="#FF91AF" strokeWidth="0.5" opacity="0.4" />
            <circle cx="125" cy="150" r="1.5" fill="#FF91AF" opacity="0.8" />
            <circle cx="140" cy="150" r="1.5" fill="#FF91AF" opacity="0.8" />
            <circle cx="160" cy="150" r="1.5" fill="#FF91AF" opacity="0.8" />
            <circle cx="175" cy="150" r="1.5" fill="#FF91AF" opacity="0.8" />
            
            <ellipse cx="250" cy="150" rx="30" ry="15" fill="none" stroke="#FF91AF" strokeWidth="1" opacity="0.5" />
            <circle cx="250" cy="150" r="8" fill="none" stroke="#FF91AF" strokeWidth="0.5" opacity="0.4" />
            <circle cx="225" cy="150" r="1.5" fill="#FF91AF" opacity="0.8" />
            <circle cx="240" cy="150" r="1.5" fill="#FF91AF" opacity="0.8" />
            <circle cx="260" cy="150" r="1.5" fill="#FF91AF" opacity="0.8" />
            <circle cx="275" cy="150" r="1.5" fill="#FF91AF" opacity="0.8" />
            
            <path d="M200 160 L200 220 L180 240 M200 220 L220 240" fill="none" stroke="#FF91AF" strokeWidth="0.5" opacity="0.4" />
            <circle cx="185" cy="245" r="2" fill="#FF91AF" opacity="0.6" />
            <circle cx="200" cy="245" r="2" fill="#FF91AF" opacity="0.6" />
            <circle cx="215" cy="245" r="2" fill="#FF91AF" opacity="0.6" />
            
            <path d="M150 290 Q175 280 200 285 Q225 280 250 290" fill="none" stroke="#FF91AF" strokeWidth="1" opacity="0.5" />
            <path d="M150 290 Q175 305 200 300 Q225 305 250 290" fill="none" stroke="#FF91AF" strokeWidth="1" opacity="0.5" />
            <circle cx="150" cy="290" r="2" fill="#FF91AF" opacity="0.7" />
            <circle cx="170" cy="290" r="2" fill="#FF91AF" opacity="0.7" />
            <circle cx="200" cy="285" r="2" fill="#FF91AF" opacity="0.7" />
            <circle cx="230" cy="290" r="2" fill="#FF91AF" opacity="0.7" />
            <circle cx="250" cy="290" r="2" fill="#FF91AF" opacity="0.7" />
            
            <circle cx="100" cy="220" r="2" fill="#FF91AF" opacity="0.5" />
            <circle cx="120" cy="280" r="2" fill="#FF91AF" opacity="0.5" />
            <circle cx="150" cy="330" r="2" fill="#FF91AF" opacity="0.5" />
            <circle cx="200" cy="340" r="2" fill="#FF91AF" opacity="0.5" />
            <circle cx="250" cy="330" r="2" fill="#FF91AF" opacity="0.5" />
            <circle cx="280" cy="280" r="2" fill="#FF91AF" opacity="0.5" />
            <circle cx="300" cy="220" r="2" fill="#FF91AF" opacity="0.5" />
            
            <line x1="150" y1="150" x2="200" y2="220" stroke="#FF91AF" strokeWidth="0.3" opacity="0.2" />
            <line x1="250" y1="150" x2="200" y2="220" stroke="#FF91AF" strokeWidth="0.3" opacity="0.2" />
            <line x1="200" y1="220" x2="200" y2="285" stroke="#FF91AF" strokeWidth="0.3" opacity="0.2" />
            <line x1="80" y1="150" x2="110" y2="150" stroke="#FF91AF" strokeWidth="0.5" opacity="0.3" />
            <line x1="290" y1="150" x2="320" y2="150" stroke="#FF91AF" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* Bottom Tech Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-12 border-t border-[#FF91AF]/10 bg-[#0a0d12]/80 backdrop-blur-sm">
        <div className="h-full max-w-6xl mx-auto px-6 flex items-center justify-between text-[10px] font-mono text-[#FF91AF]/40 uppercase tracking-wider">
          <span>Frame: 24fps</span>
          <span>Resolution: 1920x1080</span>
          <span>Model: v2.4.1</span>
          <span className="hidden sm:inline">Latency: 12ms</span>
        </div>
      </div>
    </section>
  )
}

export default BiometricCTA
