import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getMyResults, getAllUsers } from '../services/api'

const levelColor = {
  'Low Suppression':      '#22c55e',
  'Moderate Suppression': '#f59e0b',
  'High Suppression':     '#ef4444',
}

const fmt = (iso) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

// ── My-Results card ────────────────────────────────────────────────────────────
const ResultCard = ({ r, index, onOpen }) => {
  const color = levelColor[r.level] || '#b8a0a8'
  const pct   = Math.round((r.normalized_score ?? 0) * 100)
  return (
    <button
      type="button"
      onClick={() => onOpen(r)}
      className="w-full text-left bg-[#0d1118]/80 border border-[#FF91AF]/10 rounded-2xl p-5 hover:border-[#FF91AF]/30 transition-all"
      aria-label={`Open report for ${r.file_name || `Analysis ${index + 1}`}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-white font-medium text-sm truncate max-w-[200px]">{r.file_name || `Analysis #${index + 1}`}</p>
          <p className="text-[#b8a0a8]/60 text-xs mt-0.5">{fmt(r.created_at?.$date || r.created_at)}</p>
        </div>
        <span
          className="flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-full border"
          style={{ color, backgroundColor: `${color}18`, borderColor: `${color}40` }}
        >
          {r.level?.replace(' Suppression', '') ?? '—'}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/[0.03] rounded-lg px-3 py-2">
          <p className="text-[#b8a0a8]/60 mb-0.5">Score</p>
          <p className="text-white font-bold">{pct}%</p>
        </div>
        <div className="bg-white/[0.03] rounded-lg px-3 py-2">
          <p className="text-[#b8a0a8]/60 mb-0.5">Dominant</p>
          <p className="text-white font-medium capitalize">{r.dominant_emotion ?? '—'}</p>
        </div>
        {r.suppressed_emotion && (
          <div className="col-span-2 bg-white/[0.03] rounded-lg px-3 py-2">
            <p className="text-[#b8a0a8]/60 mb-0.5">Suppressed Emotion</p>
            <p className="text-[#FF91AF] font-medium capitalize">{r.suppressed_emotion}</p>
          </div>
        )}
      </div>
    </button>
  )
}

// ── User row in "All Users" table ──────────────────────────────────────────────
const UserRow = ({ u, expanded, onToggle }) => (
  <div className="border border-[#FF91AF]/10 rounded-2xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#FF91AF]/5 transition-colors text-left"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#FF91AF]/15 border border-[#FF91AF]/25 flex items-center justify-center">
          <span className="text-[#FF91AF] font-semibold text-sm">{u.name?.[0]?.toUpperCase() ?? '?'}</span>
        </div>
        <div>
          <p className="text-white font-medium text-sm">{u.name}</p>
          <p className="text-[#b8a0a8]/60 text-xs">{u.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-[#b8a0a8]/60 text-xs">Analyses</p>
          <p className="text-[#FF91AF] font-bold text-sm">{u.result_count}</p>
        </div>
        <svg
          className={`w-4 h-4 text-[#b8a0a8] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>

    {expanded && (
      <div className="border-t border-[#FF91AF]/10 px-5 pb-5">
        {/* Subject details */}
        {(u.subject?.phone || u.subject?.age || u.subject?.gender) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 mb-4">
            {u.subject.phone && (
              <div className="bg-white/[0.03] rounded-xl px-3 py-2 text-xs">
                <p className="text-[#b8a0a8]/60">Phone</p>
                <p className="text-white">{u.subject.phone}</p>
              </div>
            )}
            {u.subject.age && (
              <div className="bg-white/[0.03] rounded-xl px-3 py-2 text-xs">
                <p className="text-[#b8a0a8]/60">Age</p>
                <p className="text-white">{u.subject.age}</p>
              </div>
            )}
            {u.subject.gender && (
              <div className="bg-white/[0.03] rounded-xl px-3 py-2 text-xs">
                <p className="text-[#b8a0a8]/60">Gender</p>
                <p className="text-white capitalize">{u.subject.gender.replace('_', ' ')}</p>
              </div>
            )}
          </div>
        )}

        {u.results && u.results.length > 0 ? (
          <div className="space-y-2 mt-3">
            <p className="text-xs text-[#b8a0a8]/60 uppercase tracking-wider mb-2">Analysis History</p>
            {u.results.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#FF91AF]/5 last:border-0 text-sm">
                <div>
                  <p className="text-white/80 text-xs truncate max-w-[180px]">{r.file_name || `Analysis #${i + 1}`}</p>
                  <p className="text-[#b8a0a8]/50 text-[11px]">{fmt(r.created_at?.$date || r.created_at)}</p>
                </div>
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0"
                  style={{
                    color: levelColor[r.level] || '#b8a0a8',
                    backgroundColor: `${levelColor[r.level] || '#b8a0a8'}18`,
                    borderColor: `${levelColor[r.level] || '#b8a0a8'}40`,
                  }}
                >
                  {Math.round((r.normalized_score ?? 0) * 100)}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#b8a0a8]/40 text-xs mt-3">No analyses yet</p>
        )}
      </div>
    )}
  </div>
)

// ── Main Dashboard ─────────────────────────────────────────────────────────────
const UserDashboard = () => {
  const { user, token, logout } = useAuth()
  const navigate   = useNavigate()
  const [tab,           setTab]           = useState('my')   // 'my' | 'all'
  const [myResults,     setMyResults]     = useState([])
  const [allUsers,      setAllUsers]      = useState([])
  const [loadingMy,     setLoadingMy]     = useState(false)
  const [loadingAll,    setLoadingAll]    = useState(false)
  const [errorMy,       setErrorMy]       = useState('')
  const [errorAll,      setErrorAll]      = useState('')
  const [expandedUser,  setExpandedUser]  = useState(null)

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchMyResults()
  }, [user])

  const fetchMyResults = async () => {
    setLoadingMy(true); setErrorMy('')
    try {
      const data = await getMyResults(token)
      setMyResults(data.results || [])
    } catch (err) {
      setErrorMy(err.message || 'Failed to load results')
    } finally {
      setLoadingMy(false)
    }
  }

  const fetchAllUsers = async () => {
    if (allUsers.length > 0) return   // already loaded
    setLoadingAll(true); setErrorAll('')
    try {
      const data = await getAllUsers(token)
      setAllUsers(data.users || [])
    } catch (err) {
      setErrorAll(err.message || 'Failed to load users')
    } finally {
      setLoadingAll(false)
    }
  }

  const handleTabChange = (t) => {
    setTab(t)
    if (t === 'all') fetchAllUsers()
  }

  const handleLogout = () => { logout(); navigate('/') }

  const handleOpenResult = (result) => {
    if (window.__videoObjectURL) {
      delete window.__videoObjectURL
    }

    sessionStorage.setItem('analysisResults', JSON.stringify(result))
    sessionStorage.setItem('uploadData', JSON.stringify({
      fileName: result.file_name || 'Selected Analysis',
      userName: user?.name,
      userEmail: user?.email,
    }))
    navigate('/results')
  }

  return (
    <div className="min-h-screen bg-[#0a0d12] p-4 md:p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#FF91AF]/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#FF91AF]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-light text-white">My Dashboard</h1>
            <p className="text-[#b8a0a8] mt-1 text-sm">
              Welcome back, <span className="text-[#FF91AF]">{user?.name}</span>
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 text-[#FF91AF] font-medium text-sm hover:underline">
                <svg className="w-5 h-5 text-[#FF91AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FF91AF] text-[#0a0d12] font-medium rounded-xl text-sm hover:bg-[#FFa8c0] transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 4v16m8-8H4" />
              </svg>
              New Analysis
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d1118] border border-[#FF91AF]/20 rounded-xl text-[#b8a0a8] text-sm hover:border-[#FF91AF]/50 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#0d1118]/80 border border-[#FF91AF]/10 rounded-2xl p-1 mb-6">
          <button
            onClick={() => handleTabChange('my')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              tab === 'my' ? 'bg-[#FF91AF] text-[#0a0d12]' : 'text-[#b8a0a8] hover:text-white'
            }`}
          >
            My Results
            {myResults.length > 0 && (
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                tab === 'my' ? 'bg-[#0a0d12]/20 text-[#0a0d12]' : 'bg-[#FF91AF]/20 text-[#FF91AF]'
              }`}>
                {myResults.length}
              </span>
            )}
          </button>
        </div>

        {/* ── My Results Tab ── */}
        {tab === 'my' && (
          <div>
            {loadingMy && (
              <div className="flex items-center justify-center py-20">
                <svg className="w-8 h-8 text-[#FF91AF] animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              </div>
            )}
            {errorMy && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 text-red-400 text-sm text-center">
                {errorMy}
              </div>
            )}
            {!loadingMy && !errorMy && myResults.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#FF91AF]/10 border border-[#FF91AF]/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#FF91AF]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-white font-medium mb-2">No analyses yet</p>
                <p className="text-[#b8a0a8]/60 text-sm mb-6">
                  Upload a video to run your first emotion suppression analysis.
                </p>
                <Link to="/upload"
                  className="px-6 py-3 bg-[#FF91AF] text-[#0a0d12] font-medium rounded-xl hover:bg-[#FFa8c0] transition-all text-sm">
                  Start Analysis
                </Link>
              </div>
            )}
            {!loadingMy && myResults.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {myResults.map((r, i) => (
                  <ResultCard key={i} r={r} index={i} onOpen={handleOpenResult} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── All Users Tab ── */}
        {tab === 'all' && (
          <div>
            {loadingAll && (
              <div className="flex items-center justify-center py-20">
                <svg className="w-8 h-8 text-[#FF91AF] animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              </div>
            )}
            {errorAll && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 text-red-400 text-sm text-center">
                {errorAll}
              </div>
            )}
            {!loadingAll && !errorAll && allUsers.length === 0 && (
              <p className="text-center text-[#b8a0a8]/60 py-16">No registered users yet</p>
            )}
            {!loadingAll && allUsers.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs text-[#b8a0a8]/60 uppercase tracking-wider mb-4">
                  {allUsers.length} registered account{allUsers.length !== 1 ? 's' : ''}
                </p>
                {allUsers.map((u, i) => (
                  <UserRow
                    key={u.email}
                    u={u}
                    expanded={expandedUser === i}
                    onToggle={() => setExpandedUser(expandedUser === i ? null : i)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default UserDashboard
