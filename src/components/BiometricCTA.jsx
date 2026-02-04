import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BiometricCTA = () => {
  const navigate = useNavigate()
  const [scanLine, setScanLine] = useState(0)
  const [metrics, setMetrics] = useState({
    blinkRate: 14.2,
    expressionDelay: 0.34,
    auIntensity: 67,
    microExpression: 0.12
  })

  useEffect(() => {
    // Scanning line animation
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100)
    }, 50)

    // Simulate live metric updates
    const metricsInterval = setInterval(() => {
      setMetrics({
        blinkRate: (14 + Math.random() * 2).toFixed(1),
        expressionDelay: (0.3 + Math.random() * 0.1).toFixed(2),
        auIntensity: Math.floor(65 + Math.random() * 10),
        microExpression: (0.1 + Math.random() * 0.05).toFixed(2)
      })
    }, 2000)

    return () => {
      clearInterval(scanInterval)
      clearInterval(metricsInterval)
    }
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0d12]">
      {/* Background Face Silhouette with Gradient */}
      <div className="absolute inset-0">
        {/* Abstract face silhouette using gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d12] via-[#0d1118] to-[#0a0d12]" />

        {/* Subtle vignette */}
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

      {/* Main Content - Left Text + Right Face */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Side - Text Content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            Emotion Suppression
            <span className="block text-[#FF91AF] font-normal">Detection</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#b8a0a8] font-light mb-10 leading-relaxed max-w-xl">
            Advanced analysis of subtle facial behavior and expressive timing
          </p>

          {/* CTA Buttons */}
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
          {/* Scanning Line - Only within face container */}
          <div 
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF91AF]/60 to-transparent pointer-events-none transition-all duration-75 z-10"
            style={{ top: `${scanLine}%`, boxShadow: '0 0 20px 2px rgba(255, 145, 175, 0.4)' }}
          />
          
          {/* Facial Landmark Mesh SVG */}
          <svg viewBox="0 0 400 500" className="w-full h-full">
            {/* Face outline */}
            <ellipse cx="200" cy="220" rx="140" ry="180" fill="none" stroke="#FF91AF" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
            
            {/* Landmark points - forehead */}
            {[160, 180, 200, 220, 240].map((x, i) => (
              <circle key={`forehead-${i}`} cx={x} cy="80" r="2" fill="#FF91AF" opacity="0.6" className="animate-pulse-slow" />
            ))}
            
            {/* Eyebrow landmarks */}
            {[120, 140, 160, 180].map((x, i) => (
              <circle key={`lbrow-${i}`} cx={x} cy={115 - Math.abs(i-1.5)*3} r="2" fill="#FF91AF" opacity="0.7" />
            ))}
            {[220, 240, 260, 280].map((x, i) => (
              <circle key={`rbrow-${i}`} cx={x} cy={115 - Math.abs(i-1.5)*3} r="2" fill="#FF91AF" opacity="0.7" />
            ))}
            
            {/* Eye landmarks - left */}
            <ellipse cx="150" cy="150" rx="30" ry="15" fill="none" stroke="#FF91AF" strokeWidth="1" opacity="0.5" />
            <circle cx="150" cy="150" r="8" fill="none" stroke="#FF91AF" strokeWidth="0.5" opacity="0.4" />
            {[125, 140, 160, 175].map((x, i) => (
              <circle key={`leye-${i}`} cx={x} cy="150" r="1.5" fill="#FF91AF" opacity="0.8" />
            ))}
            
            {/* Eye landmarks - right */}
            <ellipse cx="250" cy="150" rx="30" ry="15" fill="none" stroke="#FF91AF" strokeWidth="1" opacity="0.5" />
            <circle cx="250" cy="150" r="8" fill="none" stroke="#FF91AF" strokeWidth="0.5" opacity="0.4" />
            {[225, 240, 260, 275].map((x, i) => (
              <circle key={`reye-${i}`} cx={x} cy="150" r="1.5" fill="#FF91AF" opacity="0.8" />
            ))}
            
            {/* Nose landmarks */}
            <path d="M200 160 L200 220 L180 240 M200 220 L220 240" fill="none" stroke="#FF91AF" strokeWidth="0.5" opacity="0.4" />
            {[185, 200, 215].map((x, i) => (
              <circle key={`nose-${i}`} cx={x} cy="245" r="2" fill="#FF91AF" opacity="0.6" />
            ))}
            
            {/* Mouth landmarks */}
            <path d="M150 290 Q175 280 200 285 Q225 280 250 290" fill="none" stroke="#FF91AF" strokeWidth="1" opacity="0.5" />
            <path d="M150 290 Q175 305 200 300 Q225 305 250 290" fill="none" stroke="#FF91AF" strokeWidth="1" opacity="0.5" />
            {[150, 170, 200, 230, 250].map((x, i) => (
              <circle key={`mouth-${i}`} cx={x} cy={i === 2 ? 285 : 290} r="2" fill="#FF91AF" opacity="0.7" />
            ))}
            
            {/* Jaw landmarks */}
            {[100, 120, 150, 200, 250, 280, 300].map((x, i) => (
              <circle key={`jaw-${i}`} cx={x} cy={220 + Math.sin((i/6)*Math.PI)*120} r="2" fill="#FF91AF" opacity="0.5" />
            ))}
            
            {/* Connection lines */}
            <line x1="150" y1="150" x2="200" y2="220" stroke="#FF91AF" strokeWidth="0.3" opacity="0.2" />
            <line x1="250" y1="150" x2="200" y2="220" stroke="#FF91AF" strokeWidth="0.3" opacity="0.2" />
            <line x1="200" y1="220" x2="200" y2="285" stroke="#FF91AF" strokeWidth="0.3" opacity="0.2" />
            
            {/* Measurement guides */}
            <line x1="80" y1="150" x2="110" y2="150" stroke="#FF91AF" strokeWidth="0.5" opacity="0.3" />
            <line x1="290" y1="150" x2="320" y2="150" stroke="#FF91AF" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </div>
      </div>
          {/* Measurement guides */}
          <line x1="80" y1="150" x2="110" y2="150" stroke="#FF91AF" strokeWidth="0.5" opacity="0.3" />
          <line x1="290" y1="150" x2="320" y2="150" stroke="#FF91AF" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      {/* HUD Metrics - Left Panel */}
      <div className="absolute left-8 md:left-24 lg:left-32 top-1/2 -translate-y-1/2 space-y-6 font-mono text-xs">
        <div className="hud-panel p-3 rounded border border-[#FF91AF]/20 bg-[#0a0d12]/80 backdrop-blur-sm">
          <div className="text-[#FF91AF]/60 uppercase tracking-wider mb-1">Blink Rate</div>
          <div className="text-[#FF91AF] text-lg">{metrics.blinkRate}<span className="text-[10px] ml-1 opacity-60">/min</span></div>
          <div className="w-20 h-1 bg-[#FF91AF]/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[#FF91AF]/50 rounded-full transition-all duration-500" style={{ width: `${(metrics.blinkRate / 20) * 100}%` }} />
          </div>
        </div>
        
        <div className="hud-panel p-3 rounded border border-[#FF91AF]/20 bg-[#0a0d12]/80 backdrop-blur-sm">
          <div className="text-[#FF91AF]/60 uppercase tracking-wider mb-1">Expr. Delay</div>
          <div className="text-[#FF91AF] text-lg">{metrics.expressionDelay}<span className="text-[10px] ml-1 opacity-60">sec</span></div>
          <div className="flex gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-3 h-1 rounded-full ${i < Math.floor(metrics.expressionDelay * 10) ? 'bg-[#FF91AF]/60' : 'bg-[#FF91AF]/15'}`} />
            ))}
          </div>
        </div>
        
        <div className="hud-panel p-3 rounded border border-[#FF91AF]/20 bg-[#0a0d12]/80 backdrop-blur-sm">
          <div className="text-[#FF91AF]/60 uppercase tracking-wider mb-1">AU Intensity</div>
          <div className="text-[#FF91AF] text-lg">{metrics.auIntensity}<span className="text-[10px] ml-1 opacity-60">%</span></div>
          <div className="w-20 h-1 bg-[#FF91AF]/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-[#FF91AF]/50 rounded-full transition-all duration-500" style={{ width: `${metrics.auIntensity}%` }} />
          </div>
        </div>
      </div>

      {/* HUD Metrics - Right Panel */}
      <div className="absolute right-8 md:right-24 lg:right-32 top-1/2 -translate-y-1/2 space-y-6 font-mono text-xs text-right">
        <div className="hud-panel p-3 rounded border border-[#FF91AF]/20 bg-[#0a0d12]/80 backdrop-blur-sm">
          <div className="text-[#FF91AF]/60 uppercase tracking-wider mb-1">Micro Expr.</div>
          <div className="text-[#FF91AF] text-lg">{metrics.microExpression}<span className="text-[10px] ml-1 opacity-60">sec</span></div>
        </div>
        
        <div className="hud-panel p-3 rounded border border-[#FF91AF]/20 bg-[#0a0d12]/80 backdrop-blur-sm">
          <div className="text-[#FF91AF]/60 uppercase tracking-wider mb-1">Status</div>
          <div className="flex items-center justify-end gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF91AF] animate-pulse" />
            <span className="text-[#FF91AF]">ANALYZING</span>
          </div>
        </div>
        
        <div className="hud-panel p-3 rounded border border-[#FF91AF]/20 bg-[#0a0d12]/80 backdrop-blur-sm">
          <div className="text-[#FF91AF]/60 uppercase tracking-wider mb-1">Confidence</div>
          <div className="text-[#FF91AF] text-lg">94.7<span className="text-[10px] ml-1 opacity-60">%</span></div>
        </div>
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-20 left-20 w-16 h-16 border-l-2 border-t-2 border-[#FF91AF]/30 hidden md:block" />
      <div className="absolute top-20 right-20 w-16 h-16 border-r-2 border-t-2 border-[#FF91AF]/30 hidden md:block" />
      <div className="absolute bottom-20 left-20 w-16 h-16 border-l-2 border-b-2 border-[#FF91AF]/30 hidden md:block" />
      <div className="absolute bottom-20 right-20 w-16 h-16 border-r-2 border-b-2 border-[#FF91AF]/30 hidden md:block" />

      {/* Center Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Main Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
          Emotion Suppression
          <span className="block text-[#FF91AF] font-normal">Detection</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#b8a0a8] font-light mb-10 leading-relaxed max-w-2xl mx-auto">
          Advanced analysis of subtle facial behavior and expressive timing
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

      {/* Bottom Tech Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-12 border-t border-[#FF91AF]/10 bg-[#0a0d12]/80 backdrop-blur-sm">
        <div className="h-full max-w-6xl mx-auto px-6 flex items-center justify-between text-[10px] font-mono text-[#FF91AF]/40 uppercase tracking-wider">
          <span>Frame: 24fps</span>
          <span>Resolution: 1920×1080</span>
          <span>Model: v2.4.1</span>
          <span className="hidden sm:inline">Latency: 12ms</span>
        </div>
      </div>
    </section>
  )
}

export default BiometricCTA
