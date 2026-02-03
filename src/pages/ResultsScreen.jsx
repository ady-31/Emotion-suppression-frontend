import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

// Generate mock data
const generateTimelineData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    time: `${i * 2}s`,
    suppression: Math.floor(Math.random() * 40 + 30 + Math.sin(i * 0.5) * 20)
  }))
}

const generateActionUnitData = () => {
  const units = ['AU1', 'AU2', 'AU4', 'AU6', 'AU7', 'AU12', 'AU14', 'AU15']
  return units.map(unit => ({
    name: unit,
    stability: Math.floor(Math.random() * 40 + 60)
  }))
}

const generateExpressionDelayData = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    segment: `Seg ${i + 1}`,
    delay: (Math.random() * 0.4 + 0.1).toFixed(2)
  }))
}

const ResultsScreen = () => {
  const [fileInfo, setFileInfo] = useState(null)
  const [timelineData] = useState(generateTimelineData)
  const [actionUnitData] = useState(generateActionUnitData)
  const [expressionDelayData] = useState(generateExpressionDelayData)
  
  // Mock results
  const results = {
    suppressionScore: 72,
    suppressionLevel: 'Moderate',
    confidenceScore: 87,
    insights: 'Moderate emotion suppression detected during emotionally loaded segments. Notable patterns include delayed facial responses and inconsistent muscle activation in the upper face region. Speech pause patterns suggest cognitive load during response formulation.'
  }

  useEffect(() => {
    const storedFile = sessionStorage.getItem('uploadedFile')
    if (storedFile) {
      setFileInfo(JSON.parse(storedFile))
    }
  }, [])

  const getSuppressionColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-400'
      case 'Moderate': return 'text-amber-400'
      case 'High': return 'text-red-400'
      default: return 'text-text-secondary'
    }
  }

  const getScoreColor = (score) => {
    if (score < 40) return 'from-green-400 to-green-600'
    if (score < 70) return 'from-amber-400 to-amber-600'
    return 'from-red-400 to-red-600'
  }

  return (
    <div className="min-h-screen bg-bg-primary p-4 md:p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent-violet/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent-cyan/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">
              Emotion Suppression Analysis Results
            </h1>
            <p className="text-text-secondary mt-1">Analysis completed successfully</p>
          </div>
          <Link
            to="/upload"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-subtle border border-white/[0.1] rounded-xl text-text-primary hover:border-accent-cyan transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload New File
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left - Media Preview */}
          <div className="lg:col-span-1">
            <div className="bg-bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 h-full">
              <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
                Analyzed Media
              </h3>
              
              <div className="relative aspect-video bg-bg-primary rounded-xl overflow-hidden mb-4">
                {fileInfo?.preview ? (
                  <>
                    {fileInfo.type === 'video' ? (
                      <video
                        src={fileInfo.preview}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={fileInfo.preview}
                        alt="Analyzed"
                        className="w-full h-full object-cover"
                      />
                    )}
                    {/* Landmark overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="35" cy="35" r="2" fill="#00d4d4" opacity="0.8" />
                        <circle cx="65" cy="35" r="2" fill="#00d4d4" opacity="0.8" />
                        <circle cx="50" cy="50" r="1.5" fill="#8b5cf6" opacity="0.8" />
                        <path d="M 35 65 Q 50 75 65 65" fill="none" stroke="#00d4d4" strokeWidth="0.5" opacity="0.6" />
                        <rect x="25" y="20" width="50" height="60" rx="10" fill="none" stroke="#00d4d4" strokeWidth="0.3" opacity="0.4" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted">
                    <span>No media available</span>
                  </div>
                )}
              </div>

              {fileInfo?.name && (
                <p className="text-text-secondary text-sm truncate">{fileInfo.name}</p>
              )}
            </div>
          </div>

          {/* Right - Key Results */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Suppression Score */}
              <div className="bg-bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
                  Suppression Score
                </h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-white/[0.05]"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="url(#scoreGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${results.suppressionScore * 3.52} 352`}
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00d4d4" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">{results.suppressionScore}</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-text-muted text-sm mt-2">out of 100</p>
              </div>

              {/* Suppression Level */}
              <div className="bg-bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
                  Suppression Level
                </h3>
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getSuppressionColor(results.suppressionLevel)}`}>
                      {results.suppressionLevel}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      {['Low', 'Moderate', 'High'].map((level) => (
                        <div
                          key={level}
                          className={`w-3 h-3 rounded-full ${
                            level === results.suppressionLevel
                              ? level === 'Low'
                                ? 'bg-green-400'
                                : level === 'Moderate'
                                ? 'bg-amber-400'
                                : 'bg-red-400'
                              : 'bg-white/[0.1]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="bg-bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
                <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
                  Confidence Score
                </h3>
                <div className="flex items-center justify-center h-32">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-accent-cyan">
                      {results.confidenceScore}%
                    </div>
                    <div className="w-full bg-white/[0.05] rounded-full h-2 mt-4">
                      <div
                        className="h-full bg-gradient-to-r from-accent-cyan to-accent-violet rounded-full transition-all duration-1000"
                        style={{ width: `${results.confidenceScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Timeline Chart */}
          <div className="bg-bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
              Suppression Intensity Over Time
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="suppressionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="time" stroke="#6a6a7a" fontSize={12} />
                  <YAxis stroke="#6a6a7a" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#15151f',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0f0f5'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="suppression"
                    stroke="#00d4d4"
                    fillOpacity={1}
                    fill="url(#suppressionGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action Unit Stability */}
          <div className="bg-bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
              Facial Action Unit Stability
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={actionUnitData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis type="number" stroke="#6a6a7a" fontSize={12} domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" stroke="#6a6a7a" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#15151f',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0f0f5'
                    }}
                  />
                  <Bar dataKey="stability" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Expression Delay Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
              Expression Delay Per Segment
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expressionDelayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="segment" stroke="#6a6a7a" fontSize={12} />
                  <YAxis stroke="#6a6a7a" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#15151f',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#f0f0f5'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="delay"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights */}
          <div className="lg:col-span-1 bg-bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
              Analysis Insights
            </h3>
            <div className="bg-gradient-subtle rounded-xl p-4 border border-white/[0.05]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {results.insights}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                <span className="text-text-muted text-sm">Peak Suppression</span>
                <span className="text-text-primary font-medium">78%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/[0.05]">
                <span className="text-text-muted text-sm">Avg. Expression Delay</span>
                <span className="text-text-primary font-medium">0.32s</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-text-muted text-sm">Segments Analyzed</span>
                <span className="text-text-primary font-medium">15</span>
              </div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-bg-card/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Export Your Results</h3>
              <p className="text-text-muted text-sm">Download the analysis report in your preferred format</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-violet text-bg-primary font-medium rounded-xl hover:shadow-glow-cyan transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Report (PDF)
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] border border-white/[0.1] text-text-primary font-medium rounded-xl hover:bg-white/[0.08] hover:border-accent-violet transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsScreen
