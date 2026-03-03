import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyzeVideo } from '../services/api'

const processingSteps = [
  { id: 1, name: 'Uploading Video',           description: 'Sending video to server...'                },
  { id: 2, name: 'Extracting Action Units',   description: 'Running OpenFace feature extraction...'   },
  { id: 3, name: 'Running LSTM Model',        description: 'Predicting suppression windows...'         },
  { id: 4, name: 'Analysing Emotions',        description: 'DeepFace: detecting visible emotions...'  },
  { id: 5, name: 'Analysing Speech Patterns', description: 'Detecting speech-latency events...'       },
  { id: 6, name: 'Generating Results',        description: 'Preparing analysis output...'             },
]

const ProcessingScreen = () => {
  const navigate = useNavigate()
  const [currentStep,    setCurrentStep]    = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [progress,       setProgress]       = useState(0)
  const [uploadData,     setUploadData]     = useState(null)
  const [error,          setError]          = useState(null)
  const [signals,        setSignals]        = useState({
    currentOperation: 'Initializing…',
    estimatedTime:    '~30-60 s',
  })

  useEffect(() => {
    const storedData = sessionStorage.getItem('uploadData')
    if (storedData) setUploadData(JSON.parse(storedData))

    const video = window.__uploadedVideo
    if (!video) {
      setError('No video found. Please upload a video file.')
      return
    }
    processVideo(video)
  }, [])

  // ── Animated steps while we wait for the real API call ─────────────────────
  const processVideo = async (videoFile) => {
    try {
      // Step 1 – Upload
      setCurrentStep(0)
      setSignals(s => ({ ...s, currentOperation: 'Uploading video…' }))
      await delay(400)
      setCompletedSteps([0])
      setProgress(10)

      // Step 2 – OpenFace (the real API call happens here)
      setCurrentStep(1)
      setSignals(s => ({ ...s, currentOperation: 'Extracting action units via OpenFace…' }))
      setProgress(20)

      // ← actual network call (can take 30-120 s for a full video)
      const result = await analyzeVideo(videoFile)

      setCompletedSteps([0, 1])
      setProgress(55)

      // Step 3 – LSTM (already done server-side; animate for UX)
      setCurrentStep(2)
      setSignals(s => ({ ...s, currentOperation: 'LSTM model inference complete.' }))
      await delay(400)
      setCompletedSteps([0, 1, 2])
      setProgress(70)

      // Step 4 – Emotions
      setCurrentStep(3)
      setSignals(s => ({ ...s, currentOperation: 'Emotion detection complete.' }))
      await delay(400)
      setCompletedSteps([0, 1, 2, 3])
      setProgress(82)

      // Step 5 – Speech
      setCurrentStep(4)
      setSignals(s => ({ ...s, currentOperation: 'Speech latency analysis complete.' }))
      await delay(350)
      setCompletedSteps([0, 1, 2, 3, 4])
      setProgress(92)

      // Step 6 – Finalise
      setCurrentStep(5)
      setSignals(s => ({ ...s, currentOperation: 'Finalising results…' }))
      await delay(400)
      setCompletedSteps([0, 1, 2, 3, 4, 5])
      setProgress(100)

      sessionStorage.setItem('analysisResults', JSON.stringify(result))

      // Create a persistent object URL so the results screen can play the video
      if (window.__uploadedVideo) {
        window.__videoObjectURL = URL.createObjectURL(window.__uploadedVideo)
        delete window.__uploadedVideo
      }

      setTimeout(() => navigate('/results'), 700)
    } catch (err) {
      console.error('Analysis error:', err)
      setError(err.message || 'Analysis failed. Please try again.')
    }
  }

  const delay = (ms) => new Promise(res => setTimeout(res, ms))

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0d12] flex items-center justify-center p-6">
        <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-white mb-2">Analysis Failed</h2>
          <p className="text-[#b8a0a8] mb-6">{error}</p>
          <button onClick={() => navigate('/upload')}
            className="px-6 py-3 bg-[#FF91AF] text-[#0a0d12] font-medium rounded-xl hover:bg-[#FFa8c0] transition-all">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // ── Main layout ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0d12] p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#FF91AF]/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#FF91AF]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center py-10 mb-8">
          <h1 className="text-2xl md:text-3xl font-light text-white">Analysing Emotion Suppression</h1>
          <p className="text-[#b8a0a8] mt-2">Please wait — video analysis can take up to 60 seconds</p>
        </div>

        {/* Progress bar */}
        <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-sm font-medium">{signals.currentOperation}</span>
            <span className="text-[#FF91AF] font-bold">{progress}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF91AF] to-[#FFd0e0] rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps list */}
        <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-6 mb-6">
          <h3 className="text-sm font-medium text-[#b8a0a8]/60 uppercase tracking-wider mb-5">
            Pipeline Steps
          </h3>
          <div className="space-y-4">
            {processingSteps.map((step, idx) => {
              const done    = completedSteps.includes(idx)
              const active  = currentStep === idx && !done
              const pending = !done && !active

              return (
                <div key={step.id} className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    done   ? 'bg-[#FF91AF]/20 border border-[#FF91AF]/40' :
                    active ? 'bg-[#FF91AF]/10 border border-[#FF91AF]/30 animate-pulse' :
                             'bg-white/5 border border-white/10'
                  }`}>
                    {done ? (
                      <svg className="w-4 h-4 text-[#FF91AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : active ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF91AF] animate-ping" />
                    ) : (
                      <span className="text-[#b8a0a8]/40 text-xs font-bold">{step.id}</span>
                    )}
                  </div>

                  {/* Label */}
                  <div>
                    <p className={`text-sm font-medium transition-colors ${
                      done ? 'text-[#FF91AF]' : active ? 'text-white' : 'text-[#b8a0a8]/50'
                    }`}>
                      {step.name}
                    </p>
                    {(active || done) && (
                      <p className="text-xs text-[#b8a0a8]/60 mt-0.5">{step.description}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* File info */}
        {uploadData && (
          <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-5">
            <h3 className="text-xs font-medium text-[#b8a0a8]/60 uppercase tracking-wider mb-3">Video</h3>
            <p className="text-white text-sm font-medium truncate">{uploadData.fileName}</p>
            {uploadData.userName && (
              <p className="text-[#b8a0a8] text-xs mt-1">Subject: {uploadData.userName}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProcessingScreen
