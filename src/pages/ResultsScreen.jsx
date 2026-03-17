import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  AreaChart, Area,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

// ── Helpers ────────────────────────────────────────────────────────────────────
const levelMeta = {
  'Low Suppression':      { color: '#22c55e', bg: 'bg-green-500/10',  border: 'border-green-500/30',  short: 'Low'      },
  'Moderate Suppression': { color: '#f59e0b', bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  short: 'Moderate' },
  'High Suppression':     { color: '#ef4444', bg: 'bg-red-500/10',    border: 'border-red-500/30',    short: 'High'     },
}

const emotionEmoji = {
  happy:     '😊', happiness: '😊',
  sad:       '😢', sadness:   '😢',
  angry:     '😠', anger:     '😠',
  fear:      '😨',
  surprise:  '😲', surprised: '😲',
  disgust:   '🤢',
  neutral:   '😐',
}

const capitalise = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '—'

// ── Component ──────────────────────────────────────────────────────────────────
const ResultsScreen = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [results,    setResults]    = useState(null)
  const [uploadData, setUploadData] = useState(null)
  const [videoUrl,   setVideoUrl]   = useState(null)

  useEffect(() => {
    const storedResults    = sessionStorage.getItem('analysisResults')
    const storedUploadData = sessionStorage.getItem('uploadData')

    if (!storedResults) { navigate('/upload'); return }
    setResults(JSON.parse(storedResults))
    if (storedUploadData) setUploadData(JSON.parse(storedUploadData))

    // Grab the object URL created by ProcessingScreen
    if (window.__videoObjectURL) setVideoUrl(window.__videoObjectURL)
  }, [navigate])

  if (!results) {
    return (
      <div className="min-h-screen bg-[#0a0d12] flex items-center justify-center">
        <p className="text-[#b8a0a8]">Loading results…</p>
      </div>
    )
  }

  const {
    suppression_score  = 0,
    normalized_score   = 0,
    level              = 'Low Suppression',
    dominant_emotion   = null,
    suppressed_emotion = null,
    timeline           = [],
    latency_events     = [],
    files_processed    = 1,
  } = results

  const meta         = levelMeta[level] || levelMeta['Low Suppression']
  const pct          = Math.round(normalized_score * 100)
  const circumference = 2 * Math.PI * 48   // r = 48

  const handleExportCSV = () => {
    const rows = [
      ['Metric', 'Value'],
      ['Suppression Score (raw)', suppression_score],
      ['Normalized Score (0-1)',  normalized_score],
      ['Level',                  level],
      ['Dominant Emotion',       dominant_emotion  || 'N/A'],
      ['Suppressed Emotion',     suppressed_emotion || 'None'],
      ['Files Processed',        files_processed],
      [],
      ['Timeline'],
      ['Time (s)', 'Suppression Score'],
      ...timeline.map(p => [p.time, p.score]),
      [],
      ['Speech Latency Events'],
      ['Time (s)', 'Duration (s)'],
      ...latency_events.map(e => [e.time, e.duration]),
    ].map(r => r.join(',')).join('\n')

    const blob = new Blob([rows], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'suppression_results.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen p-4 md:p-6 relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/img/christoph-keil-KTKvnZ42QQE-unsplash.jpg)' }}>
      {/* Background overlay for readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-light text-white">Emotion Suppression Results</h1>
            <p className="text-[#b8a0a8] mt-1">
              {uploadData?.fileName ? `Video: ${uploadData.fileName}` : 'Analysis complete'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {user && (
              <>
                <Link to="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d1118] border border-[#FF91AF]/20 rounded-xl text-white text-sm hover:border-[#FF91AF]/50 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  My Results
                </Link>
              </>
            )}
            {!user && (
              <Link to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0d1118] border border-[#FF91AF]/20 rounded-xl text-[#b8a0a8] text-sm hover:border-[#FF91AF]/50 hover:text-white transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign in to save results
              </Link>
            )}
            <Link to="/upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0d1118] border border-[#FF91AF]/20 rounded-xl text-white hover:border-[#FF91AF]/50 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Analyse New Video
            </Link>
          </div>
        </div>

        {/* ── Video Player ── */}
        {videoUrl && (
          <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-6 mb-6">
            <h3 className="text-sm font-medium text-[#b8a0a8]/60 uppercase tracking-wider mb-4">
              Uploaded Video
            </h3>
            <div className="flex justify-center">
              <video
                src={videoUrl}
                controls
                className="w-full max-w-3xl rounded-xl border border-[#FF91AF]/10 bg-black"
                style={{ maxHeight: '420px' }}
              />
            </div>
          </div>
        )}

        {/* ── Metric Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* Suppression Score gauge */}
          <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-6 flex flex-col items-center">
            <h3 className="text-xs font-medium text-[#b8a0a8]/60 uppercase tracking-wider mb-4">
              Suppression Score
            </h3>
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                <circle cx="56" cy="56" r="48" fill="none" stroke="currentColor" strokeWidth="8"
                  className="text-white/[0.05]" />
                <circle cx="56" cy="56" r="48" fill="none" stroke={meta.color} strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * circumference} ${circumference}`}
                  className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white leading-none">{pct}%</span>
              </div>
            </div>
          </div>

          {/* Suppression Level */}
          <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-6 flex flex-col items-center justify-center">
            <h3 className="text-xs font-medium text-[#b8a0a8]/60 uppercase tracking-wider mb-4">
              Suppression Level
            </h3>
            <div className={`px-6 py-3 rounded-xl border text-lg font-semibold ${meta.bg} ${meta.border}`}
              style={{ color: meta.color }}>
              {meta.short}
            </div>
            <p className="text-[#b8a0a8]/60 text-xs mt-3 text-center">{level}</p>
          </div>

          {/* Dominant Emotion */}
          <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-6 flex flex-col items-center justify-center">
            <h3 className="text-xs font-medium text-[#b8a0a8]/60 uppercase tracking-wider mb-4">
              Dominant Emotion
            </h3>
            <span className="text-5xl mb-2">
              {emotionEmoji[dominant_emotion] || '🎭'}
            </span>
            <p className="text-white font-medium text-base">{capitalise(dominant_emotion)}</p>
            <p className="text-[#b8a0a8]/60 text-xs mt-1">Visible expression</p>
          </div>

          {/* Suppressed Emotion */}
          <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-6 flex flex-col items-center justify-center">
            <h3 className="text-xs font-medium text-[#b8a0a8]/60 uppercase tracking-wider mb-4">
              Suppressed Emotion
            </h3>
            {suppressed_emotion ? (
              <>
                <span className="text-5xl mb-2">{emotionEmoji[suppressed_emotion] || '🎭'}</span>
                <p className="text-[#FF91AF] font-medium text-base">{capitalise(suppressed_emotion)}</p>
                <p className="text-[#b8a0a8]/60 text-xs mt-1">Hidden / suppressed</p>
              </>
            ) : (
              <>
                <span className="text-5xl mb-2 opacity-30">😶</span>
                <p className="text-[#b8a0a8] font-medium text-base">None detected</p>
                <p className="text-[#b8a0a8]/60 text-xs mt-1">No suppression signal</p>
              </>
            )}
          </div>
        </div>

        {/* ── Timeline Chart ── */}
        <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-6 mb-6">
          <h3 className="text-sm font-medium text-[#b8a0a8]/60 uppercase tracking-wider mb-1">
            Suppression Over Time
          </h3>
          <p className="text-[#b8a0a8] text-xs mb-5">
            LSTM window confidence scores — each point covers ≈0.67 s (20 frames @ 30 fps)
          </p>

          {timeline.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeline} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tlGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={meta.color} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={meta.color} stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis dataKey="time" stroke="#b8a0a8" fontSize={11}
                    label={{ value: 'Time (s)', position: 'insideBottomRight', offset: -8, fill: '#b8a0a8', fontSize: 11 }} />
                  <YAxis stroke="#b8a0a8" fontSize={11}
                    label={{ value: 'Score', angle: -90, position: 'insideLeft', offset: 12, fill: '#b8a0a8', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0d1118', border: '1px solid rgba(255,145,175,0.2)', borderRadius: '8px', color: '#f0f0f5' }}
                    formatter={(v) => [v.toFixed(4), 'Suppression']}
                    labelFormatter={(t) => `t = ${t} s`}
                  />
                  {/* reference line at global mean */}
                  <ReferenceLine y={suppression_score} stroke={meta.color} strokeDasharray="4 4" strokeOpacity={0.5} />
                  <Area type="monotone" dataKey="score" stroke={meta.color} fill="url(#tlGrad)" dot={false} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-[#b8a0a8]/40">
              No timeline data available
            </div>
          )}
        </div>

        {/* ── Lower grid: stats + latency ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Stats summary */}
          <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-[#b8a0a8]/60 uppercase tracking-wider mb-5">
              Analysis Summary
            </h3>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-[#FF91AF]/5">
                {[
                  ['Raw suppression score',    suppression_score.toFixed(4)],
                  ['Normalized score (0–1)',   normalized_score.toFixed(4)],
                  ['Suppression level',        level],
                  ['Dominant emotion',         capitalise(dominant_emotion)],
                  ['Suppressed emotion',       capitalise(suppressed_emotion) || 'None'],
                  ['LSTM windows analysed',    timeline.length],
                  ['Speech latency events',    latency_events.length],
                  ['Files processed',          files_processed],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="py-3 text-[#b8a0a8]">{label}</td>
                    <td className="py-3 text-white font-medium text-right">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Speech latency events */}
          <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-[#b8a0a8]/60 uppercase tracking-wider mb-1">
              Speech Latency Events
            </h3>
            <p className="text-[#b8a0a8] text-xs mb-5">
              Pauses between speech segments longer than 0.2 s
            </p>

            {latency_events.length > 0 ? (
              <div className="overflow-auto max-h-60">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#FF91AF]/10">
                      <th className="text-left py-2 px-3 text-[#b8a0a8]/60 font-medium">#</th>
                      <th className="text-left py-2 px-3 text-[#b8a0a8]/60 font-medium">Time (s)</th>
                      <th className="text-left py-2 px-3 text-[#b8a0a8]/60 font-medium">Duration (s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latency_events.map((e, i) => (
                      <tr key={i} className="border-b border-[#FF91AF]/5 hover:bg-[#FF91AF]/5 transition-colors">
                        <td className="py-2 px-3 text-[#b8a0a8]">{i + 1}</td>
                        <td className="py-2 px-3 text-white font-medium">{e.time.toFixed(3)}</td>
                        <td className="py-2 px-3 text-[#FF91AF]">{e.duration.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-[#b8a0a8]/40 gap-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M9 11V7a3 3 0 016 0v4" />
                </svg>
                <p className="text-sm">No latency events detected</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Insight card ── */}
        <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: `${meta.color}20`, border: `1px solid ${meta.color}40` }}>
              <svg className="w-5 h-5" style={{ color: meta.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Interpretation</h3>
              <p className="text-[#b8a0a8] text-sm leading-relaxed">
                {level === 'Low Suppression' &&
                  'Low suppression detected. Facial expressions align closely with detected emotional cues — natural expressive behaviour with minimal regulatory signals.'}
                {level === 'Moderate Suppression' &&
                  `Moderate suppression detected. Visible emotion (${capitalise(dominant_emotion)}) shows some misalignment with underlying AU patterns${suppressed_emotion ? `, suggesting concealed ${suppressed_emotion}` : ''}. Emotional regulation is occurring.`}
                {level === 'High Suppression' &&
                  `High suppression detected. Strong mismatch between visible expression (${capitalise(dominant_emotion)}) and underlying AU activity${suppressed_emotion ? ` — predicted hidden emotion: ${suppressed_emotion}` : ''}. Significant emotional regulation is present.`}
              </p>
            </div>
          </div>
        </div>

        {/* ── Export ── */}
        <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-white">Export Results</h3>
              <p className="text-[#b8a0a8]/60 text-sm">Download the full analysis report as CSV</p>
              {user ? (
                <p className="text-green-400/80 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Results saved to your account
                </p>
              ) : (
                <p className="text-[#b8a0a8]/50 text-xs mt-1">
                  <Link to="/login" className="text-[#FF91AF] hover:underline">Sign in</Link>
                  {' '}to save results to your account
                </p>
              )}
            </div>
            <button onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF91AF] text-[#0a0d12] font-medium rounded-xl hover:bg-[#FFa8c0] shadow-lg shadow-[#FF91AF]/20 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ResultsScreen
