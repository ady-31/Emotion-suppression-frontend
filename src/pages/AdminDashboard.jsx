import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getAllUsers } from '../services/api'

const levelColor = {
  'Low Suppression': '#22c55e',
  'Moderate Suppression': '#f59e0b',
  'High Suppression': '#ef4444',
}

const fmt = (iso) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

const readDateValue = (value) => {
  if (!value) return null
  if (typeof value === 'object') return value.$date || value.date || null
  return value
}

const safeToTime = (value) => {
  const date = readDateValue(value)
  if (!date) return 0
  const time = new Date(date).getTime()
  return Number.isNaN(time) ? 0 : time
}

const normalizeText = (value) => {
  if (!value && value !== 0) return '—'
  return String(value)
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const toTitleCase = (value) => {
  const text = normalizeText(value)
  if (text === '—') return text
  return text.replace(/\b\w/g, (c) => c.toUpperCase())
}

const getUserKey = (userData, index) => {
  if (userData.email) return userData.email
  if (userData._id) return userData._id
  if (userData.id) return String(userData.id)
  return `${userData.name || 'user'}-${index}`
}

const scoreToPercent = (value) => {
  const num = Number(value)
  if (!Number.isFinite(num)) return '—'
  return `${Math.round(num * 100)}%`
}

const DetailField = ({ label, value }) => {
  const displayValue = value === null || value === undefined || value === '' ? '—' : value
  return (
    <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-3 py-2">
      <p className="text-[11px] uppercase tracking-wider text-[#b8a0a8]/60 mb-1">{label}</p>
      <p className="text-white text-sm break-words">{displayValue}</p>
    </div>
  )
}

const UserRow = ({ userData, isSelected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    className={`w-full border rounded-2xl px-5 py-4 text-left transition-all ${
      isSelected
        ? 'border-[#FF91AF]/50 bg-[#FF91AF]/10 shadow-[0_0_0_1px_#FF91AF33_inset]'
        : 'border-[#FF91AF]/10 bg-[#0d1118]/60 hover:bg-[#FF91AF]/5 hover:border-[#FF91AF]/30'
    }`}
  >
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-10 h-10 rounded-full bg-[#FF91AF]/15 border border-[#FF91AF]/25 flex items-center justify-center flex-shrink-0">
          <span className="text-[#FF91AF] font-semibold text-sm">{userData.name?.[0]?.toUpperCase() ?? '?'}</span>
        </div>
        <div className="min-w-0">
          <p className="text-white font-medium text-sm truncate">{userData.name || 'Unnamed User'}</p>
          <p className="text-[#b8a0a8]/60 text-xs truncate">{userData.email || 'No email provided'}</p>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="text-[#b8a0a8]/60 text-xs">Analyses</p>
        <p className="text-[#FF91AF] font-bold text-sm">{userData.result_count ?? userData.results?.length ?? 0}</p>
      </div>
    </div>
  </button>
)

const UserDetailsPanel = ({ userData }) => {
  if (!userData) {
    return (
      <div className="bg-[#0d1118]/70 border border-[#FF91AF]/10 rounded-2xl p-5 text-sm text-[#b8a0a8]/60">
        Select a user account to view details.
      </div>
    )
  }

  const rawResults = Array.isArray(userData.results) ? [...userData.results] : []
  const sortedResults = rawResults.sort((a, b) => {
    const bDate = b.created_at || b.createdAt
    const aDate = a.created_at || a.createdAt
    return safeToTime(bDate) - safeToTime(aDate)
  })

  const analysesCount = userData.result_count ?? sortedResults.length ?? 0
  const averageScore = sortedResults.length
    ? scoreToPercent(
      sortedResults.reduce((sum, result) => sum + (Number(result.normalized_score) || 0), 0) / sortedResults.length
    )
    : '—'
  const lastAnalysis = sortedResults[0]
    ? fmt(readDateValue(sortedResults[0].created_at || sortedResults[0].createdAt))
    : '—'

  const subjectData = userData.subject || {}
  const subjectFields = [
    { label: 'Phone', value: subjectData.phone || userData.phone || userData.phone_number || '—' },
    { label: 'Age', value: subjectData.age || userData.age || '—' },
    {
      label: 'Gender',
      value: toTitleCase(subjectData.gender || userData.gender || '—'),
    },
  ]

  const accountFields = [
    { label: 'Full Name', value: userData.name || '—' },
    { label: 'Email', value: userData.email || '—' },
    { label: 'Role', value: toTitleCase(userData.role || 'user') },
    { label: 'User ID', value: userData._id || userData.id || userData.user_id || '—' },
    {
      label: 'Registered',
      value: fmt(readDateValue(userData.created_at || userData.createdAt || userData.registered_at)),
    },
    {
      label: 'Last Login',
      value: fmt(readDateValue(userData.last_login || userData.lastLogin || userData.last_seen_at)),
    },
  ]

  return (
    <div className="bg-[#0d1118]/80 border border-[#FF91AF]/10 rounded-2xl p-5 lg:sticky lg:top-6">
      <div className="mb-5 border-b border-[#FF91AF]/10 pb-4">
        <p className="text-xs uppercase tracking-wider text-[#b8a0a8]/60 mb-2">Selected Account</p>
        <h2 className="text-white text-xl font-light break-words">{userData.name || 'Unnamed User'}</h2>
        <p className="text-[#FF91AF] text-sm break-all mt-1">{userData.email || 'No email provided'}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-5">
        <DetailField label="Analyses" value={String(analysesCount)} />
        <DetailField label="Avg Score" value={averageScore} />
        <DetailField label="Last Activity" value={lastAnalysis} />
      </div>

      <div className="mb-5">
        <p className="text-xs uppercase tracking-wider text-[#b8a0a8]/60 mb-2">Account Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {accountFields.map((field) => (
            <DetailField key={field.label} label={field.label} value={field.value} />
          ))}
        </div>
      </div>

      <div className="mb-5">
        <p className="text-xs uppercase tracking-wider text-[#b8a0a8]/60 mb-2">Subject Profile</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {subjectFields.map((field) => (
            <DetailField key={field.label} label={field.label} value={field.value} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wider text-[#b8a0a8]/60 mb-2">Analysis History</p>
        {sortedResults.length > 0 ? (
          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {sortedResults.map((result, index) => {
              const color = levelColor[result.level] || '#b8a0a8'
              return (
                <div
                  key={`${userData.email || userData.name || 'user'}-${index}`}
                  className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <p className="text-white text-sm truncate">{result.file_name || `Analysis #${index + 1}`}</p>
                      <p className="text-[#b8a0a8]/60 text-[11px] mt-0.5">
                        {fmt(readDateValue(result.created_at || result.createdAt))}
                      </p>
                    </div>
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0"
                      style={{
                        color,
                        backgroundColor: `${color}18`,
                        borderColor: `${color}40`,
                      }}
                    >
                      {scoreToPercent(result.normalized_score)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <DetailField label="Suppression Level" value={result.level || '—'} />
                    <DetailField label="Dominant Emotion" value={toTitleCase(result.dominant_emotion || '—')} />
                    <DetailField label="Suppressed Emotion" value={toTitleCase(result.suppressed_emotion || '—')} />
                    <DetailField label="Confidence" value={scoreToPercent(result.confidence_score ?? result.confidence)} />
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-[#b8a0a8]/40 text-xs">No analyses yet</p>
        )}
      </div>
    </div>
  )
}

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { user, token, logout, loading: authLoading } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedUserKey, setSelectedUserKey] = useState('')

  useEffect(() => {
    if (authLoading) return

    const isAdmin = user?.role === 'admin'
    if (!token || !isAdmin) {
      navigate('/admin-login')
      return
    }
    fetchAllUsers()
  }, [authLoading, user, token])

  const fetchAllUsers = async () => {
    if (!token) {
      setError('Authentication required. Please sign in again.')
      navigate('/admin-login')
      return
    }

    setLoading(true)
    setError('')
    try {
      const data = await getAllUsers(token)
      setUsers(data.users || [])
    } catch (err) {
      if (err.status === 401) {
        setError('Authentication required. Your admin session is missing, invalid, or expired. Please sign in again.')
        logout()
        navigate('/admin-login')
      } else if (err.status === 403) {
        setError('Access denied. Your account is authenticated but does not have admin permissions.')
      } else {
        setError(err.message || 'Failed to load users')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    if (users.length === 0) {
      setSelectedUserKey('')
      return
    }

    const stillExists = users.some((userData, index) => getUserKey(userData, index) === selectedUserKey)
    if (!stillExists) {
      setSelectedUserKey(getUserKey(users[0], 0))
    }
  }, [users, selectedUserKey])

  const selectedUser = users.find((userData, index) => getUserKey(userData, index) === selectedUserKey) || null

  return (
    <div className="min-h-screen bg-[#0a0d12] p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#FF91AF]/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#FF91AF]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-light text-white">Admin Dashboard</h1>
            <p className="text-[#b8a0a8] mt-1 text-sm">
              Welcome back, <span className="text-[#FF91AF]">{user?.name || 'Admin'}</span>
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
            <button
              onClick={fetchAllUsers}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FF91AF] text-[#0a0d12] font-medium rounded-xl text-sm hover:bg-[#FFa8c0] transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M5.64 18.36A9 9 0 0018.36 5.64" />
              </svg>
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d1118] border border-[#FF91AF]/20 rounded-xl text-[#b8a0a8] text-sm hover:border-[#FF91AF]/50 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-[#0d1118]/80 border border-[#FF91AF]/10 rounded-2xl p-1 mb-6">
          <div className="py-3 px-4 rounded-xl bg-[#FF91AF] text-[#0a0d12] text-sm font-medium text-center">
            View All Users
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <svg className="w-8 h-8 text-[#FF91AF] animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <p className="text-center text-[#b8a0a8]/60 py-16">No registered users yet</p>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_430px] gap-4 lg:gap-6 items-start">
            <div className="space-y-3">
              <p className="text-xs text-[#b8a0a8]/60 uppercase tracking-wider mb-4">
                {users.length} registered account{users.length !== 1 ? 's' : ''}
              </p>
              {users.map((userData, index) => {
                const key = getUserKey(userData, index)
                return (
                  <UserRow
                    key={key}
                    userData={userData}
                    isSelected={selectedUserKey === key}
                    onSelect={() => setSelectedUserKey(key)}
                  />
                )
              })}
            </div>

            <UserDetailsPanel userData={selectedUser} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard