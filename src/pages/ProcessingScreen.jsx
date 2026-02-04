import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const processingSteps = [
  { id: 1, name: 'Face Detection', description: 'Locating facial regions...' },
  { id: 2, name: 'Facial Action Unit Extraction', description: 'Analyzing muscle movements...' },
  { id: 3, name: 'Micro-expression Timing Analysis', description: 'Measuring expression dynamics...' },
  { id: 4, name: 'Speech Pause & Delay Analysis', description: 'Processing temporal patterns...' },
  { id: 5, name: 'Suppression Pattern Modeling', description: 'Building behavioral model...' }
]

const ProcessingScreen = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [progress, setProgress] = useState(0)
  const [fileInfo, setFileInfo] = useState(null)
  const [signals, setSignals] = useState({
    blinkRate: 0,
    muscleStability: 0,
    expressionDelay: 0,
    speechPause: 0
  })

  useEffect(() => {
    // Get file info from session storage
    const storedFile = sessionStorage.getItem('uploadedFile')
    if (storedFile) {
      setFileInfo(JSON.parse(storedFile))
    }

    // Simulate processing steps
    const stepDuration = 2000 // 2 seconds per step
    const totalSteps = processingSteps.length

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < totalSteps) {
          setCompletedSteps(prevCompleted => [...prevCompleted, prev])
          return prev + 1
        }
        return prev
      })
    }, stepDuration)

    // Update progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 1
        }
        return prev
      })
    }, (stepDuration * totalSteps) / 100)

    // Simulate signal updates
    const signalInterval = setInterval(() => {
      setSignals({
        blinkRate: Math.floor(Math.random() * 30) + 10,
        muscleStability: Math.floor(Math.random() * 40) + 60,
        expressionDelay: (Math.random() * 0.5 + 0.1).toFixed(2),
        speechPause: (Math.random() * 2 + 0.5).toFixed(2)
      })
    }, 500)

    // Navigate to results after processing
    const timeout = setTimeout(() => {
      navigate('/results')
    }, stepDuration * totalSteps + 1000)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
      clearInterval(signalInterval)
      clearTimeout(timeout)
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-bg-primary p-4 md:p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-cyan/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-violet/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center py-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold gradient-text">
            Analyzing Emotion Suppression
          </h1>
          <p className="text-text-secondary mt-2">Please wait while we process your file</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Preview */}
          <div className="lg:col-span-3">
            <div className="bg-bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 h-full">
              <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
                Input Preview
              </h3>
              
              <div className="relative aspect-video bg-bg-primary rounded-xl overflow-hidden flex items-center justify-center">
                {fileInfo?.preview ? (
                  <>
                    {fileInfo.type === 'video' ? (
                      <video
                        src={fileInfo.preview}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                      />
                    ) : (
                      <img
                        src={fileInfo.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {/* Face Detection Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-32 border-2 border-accent-cyan rounded-lg animate-pulse relative">
                        {/* Landmark dots */}
                        <div className="absolute top-6 left-4 w-2 h-2 bg-accent-violet rounded-full animate-ping" />
                        <div className="absolute top-6 right-4 w-2 h-2 bg-accent-violet rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent-violet rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 h-1 bg-accent-cyan/50 rounded animate-pulse" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-text-muted">
                    <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">No preview</p>
                  </div>
                )}
              </div>

              {fileInfo?.name && (
                <p className="text-text-secondary text-sm mt-4 truncate">
                  {fileInfo.name}
                </p>
              )}
            </div>
          </div>

          {/* Center Panel - Processing Steps */}
          <div className="lg:col-span-6">
            <div className="bg-bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 md:p-8">
              <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-6">
                Processing Pipeline
              </h3>

              {/* Steps */}
              <div className="space-y-4 mb-8">
                {processingSteps.map((step, index) => {
                  const isCompleted = completedSteps.includes(index)
                  const isActive = currentStep === index
                  
                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                        isActive
                          ? 'bg-accent-cyan/10 border border-accent-cyan/30'
                          : isCompleted
                          ? 'bg-green-500/5 border border-green-500/20'
                          : 'bg-white/[0.02] border border-transparent'
                      }`}
                    >
                      {/* Status Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500/20 text-green-400'
                          : isActive
                          ? 'bg-accent-cyan/20 text-accent-cyan'
                          : 'bg-white/[0.05] text-text-muted'
                      }`}>
                        {isCompleted ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : isActive ? (
                          <div className="w-5 h-5 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <span className="text-sm font-medium">{step.id}</span>
                        )}
                      </div>

                      {/* Step Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium transition-colors ${
                          isActive ? 'text-accent-cyan' : isCompleted ? 'text-green-400' : 'text-text-secondary'
                        }`}>
                          {step.name}
                        </h4>
                        <p className="text-text-muted text-sm truncate">
                          {isActive ? step.description : isCompleted ? 'Completed' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
                    Processing behavioral signals...
                  </span>
                  <span className="text-text-muted">{progress}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Live Signals */}
          <div className="lg:col-span-3">
            <div className="bg-bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 h-full">
              <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
                Live Signals
              </h3>

              <div className="space-y-4">
                {/* Blink Rate */}
                <SignalCard
                  label="Blink Rate"
                  value={signals.blinkRate}
                  unit="bpm"
                  color="cyan"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  }
                />

                {/* Facial Muscle Stability */}
                <SignalCard
                  label="Facial Muscle Stability"
                  value={signals.muscleStability}
                  unit="%"
                  color="violet"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  }
                />

                {/* Expression Delay */}
                <SignalCard
                  label="Expression Delay"
                  value={signals.expressionDelay}
                  unit="s"
                  color="green"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />

                {/* Speech Pause Duration */}
                <SignalCard
                  label="Speech Pause Duration"
                  value={signals.speechPause}
                  unit="s"
                  color="amber"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  }
                />
              </div>

              {/* Waveform Animation */}
              <div className="mt-6 p-4 bg-white/[0.02] rounded-xl">
                <div className="flex items-center justify-center gap-1 h-16">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-accent-cyan to-accent-violet rounded-full"
                      style={{
                        height: `${Math.random() * 100}%`,
                        animation: `waveform 0.5s ease-in-out infinite`,
                        animationDelay: `${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation for waveform */}
      <style>{`
        @keyframes waveform {
          0%, 100% { height: 20%; }
          50% { height: ${Math.random() * 80 + 20}%; }
        }
      `}</style>
    </div>
  )
}

const SignalCard = ({ label, value, unit, color, icon }) => {
  const colorClasses = {
    cyan: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20',
    violet: 'text-accent-violet bg-accent-violet/10 border-accent-violet/20',
    green: 'text-green-400 bg-green-400/10 border-green-400/20',
    amber: 'text-amber-400 bg-amber-400/10 border-amber-400/20'
  }

  return (
    <div className={`p-4 rounded-xl border transition-all duration-300 ${colorClasses[color]}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="opacity-70">{icon}</div>
        <span className="text-sm text-text-secondary">{label}</span>
      </div>
      <div className="text-2xl font-bold">
        {value}
        <span className="text-sm font-normal text-text-muted ml-1">{unit}</span>
      </div>
    </div>
  )
}

export default ProcessingScreen
