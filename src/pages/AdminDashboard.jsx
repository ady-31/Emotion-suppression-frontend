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

const UserRow = ({ userData, expanded, onToggle }) => (
  <div className="border border-[#FF91AF]/10 rounded-2xl overflow-hidden bg-[#0d1118]/60">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#FF91AF]/5 transition-colors text-left"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-10 h-10 rounded-full bg-[#FF91AF]/15 border border-[#FF91AF]/25 flex items-center justify-center flex-shrink-0">
          <span className="text-[#FF91AF] font-semibold text-sm">{userData.name?.[0]?.toUpperCase() ?? '?'}</span>
        </div>
        <div className="min-w-0">
          <p className="text-white font-medium text-sm truncate">{userData.name || 'Unnamed User'}</p>
          <p className="text-[#b8a0a8]/60 text-xs truncate">{userData.email || 'No email provided'}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-[#b8a0a8]/60 text-xs">Analyses</p>
          <p className="text-[#FF91AF] font-bold text-sm">{userData.result_count ?? userData.results?.length ?? 0}</p>
        </div>
        <svg
          className={`w-4 h-4 text-[#b8a0a8] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>

    {expanded && (
      <div className="border-t border-[#FF91AF]/10 px-5 pb-5">
        {(userData.subject?.phone || userData.subject?.age || userData.subject?.gender) && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 mb-4">
            {userData.subject.phone && (
              <div className="bg-white/[0.03] rounded-xl px-3 py-2 text-xs">
                <p className="text-[#b8a0a8]/60">Phone</p>
                <p className="text-white">{userData.subject.phone}</p>
              </div>
            )}
            {userData.subject.age && (
              <div className="bg-white/[0.03] rounded-xl px-3 py-2 text-xs">
                <p className="text-[#b8a0a8]/60">Age</p>
                <p className="text-white">{userData.subject.age}</p>
              </div>
            )}
            {userData.subject.gender && (
              <div className="bg-white/[0.03] rounded-xl px-3 py-2 text-xs">
                <p className="text-[#b8a0a8]/60">Gender</p>
                <p className="text-white capitalize">{userData.subject.gender.replace('_', ' ')}</p>
              </div>
            )}
          </div>
        )}

        {userData.results && userData.results.length > 0 ? (
          <div className="space-y-2 mt-3">
            <p className="text-xs text-[#b8a0a8]/60 uppercase tracking-wider mb-2">Analysis History</p>
            {userData.results.map((result, index) => (
              <div key={`${userData.email}-${index}`} className="flex items-center justify-between py-2 border-b border-[#FF91AF]/5 last:border-0 text-sm">
                <div>
                  <p className="text-white/80 text-xs truncate max-w-[180px]">{result.file_name || `Analysis #${index + 1}`}</p>
                  <p className="text-[#b8a0a8]/50 text-[11px]">{fmt(result.created_at?.$date || result.created_at)}</p>
                </div>
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0"
                  style={{
                    color: levelColor[result.level] || '#b8a0a8',
                    backgroundColor: `${levelColor[result.level] || '#b8a0a8'}18`,
                    borderColor: `${levelColor[result.level] || '#b8a0a8'}40`,
                  }}
                >
                  {Math.round((result.normalized_score ?? 0) * 100)}%
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

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { user, token, logout, loading: authLoading } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedUser, setExpandedUser] = useState(null)

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
          <div className="space-y-3">
            <p className="text-xs text-[#b8a0a8]/60 uppercase tracking-wider mb-4">
              {users.length} registered account{users.length !== 1 ? 's' : ''}
            </p>
            {users.map((userData, index) => (
              <UserRow
                key={userData.email || index}
                userData={userData}
                expanded={expandedUser === index}
                onToggle={() => setExpandedUser(expandedUser === index ? null : index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard