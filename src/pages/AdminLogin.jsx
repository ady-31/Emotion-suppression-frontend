import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginAdmin, signupAdmin } from '../services/api'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [tab, setTab] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    setApiError('')
    setSuccess('')
  }

  const validateLogin = () => {
    const nextErrors = {}
    if (!form.email.trim()) nextErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Invalid email'
    if (!form.password) nextErrors.password = 'Password is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const validateSignup = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required'
    if (!form.email.trim()) nextErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Invalid email'
    if (!form.password) nextErrors.password = 'Password is required'
    else if (form.password.length < 8) nextErrors.password = 'At least 8 characters'
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (tab === 'login' && !validateLogin()) return
    if (tab === 'signup' && !validateSignup()) return

    setIsLoading(true)
    setApiError('')
    setSuccess('')
    const email = form.email.trim()

    try {
      if (tab === 'login') {
        const data = await loginAdmin({ email, password: form.password })
        if (!data?.token) {
          setApiError('Login failed: backend did not return a token')
          return
        }
        login(data.token, {
          ...(data.user || {}),
          name: data.user?.name || 'Admin',
          email: data.user?.email || email,
          role: 'admin'
        })
        navigate('/admin-dashboard')
        return
      }

      await signupAdmin({
          name: form.name.trim(),
          email,
          password: form.password
      })
      setSuccess('Admin account created. Sign in now.')
      setTab('login')
      setForm({ name: '', email, password: '', confirmPassword: '' })
    } catch (err) {
      if (err.status === 401) {
        setApiError('Invalid admin credentials')
      } else if (err.status === 403) {
        setApiError('Access denied. This account is not an admin')
      } else if (tab === 'signup' && err.status === 404) {
        setApiError('Admin signup is not available on backend yet (expected POST /api/admin/register)')
      } else {
        setApiError(err.message || (tab === 'login' ? 'Admin login failed' : 'Admin signup failed'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-[#0a0d12] border ${
      errors[field] ? 'border-red-500/60' : 'border-[#FF91AF]/20'
    } text-white placeholder-[#b8a0a8]/40 focus:outline-none focus:border-[#FF91AF]/60 transition-colors text-sm`

  return (
    <div className="min-h-screen h-screen flex items-center justify-center p-6 relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/img/christoph-keil-KTKvnZ42QQE-unsplash.jpg)' }}>
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-[#b8a0a8] hover:text-[#FF91AF] transition-colors mb-6 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-[#FF91AF] mb-3">
              <span className="text-3xl">◉</span>
            </div>
            <h1 className="text-2xl font-light text-white/80">Welcome Back</h1>
            <p className="text-[#b8a0a8] text-sm mt-1">
              {tab === 'login' ? 'Sign in to your admin account' : 'Create a new admin account'}
            </p>
          </div>

          <div className="flex bg-[#2B0515]/60 rounded-xl p-1 mb-6 border border-[#FF91AF]/10">
            <button
              type="button"
              onClick={() => { setTab('login'); setErrors({}); setApiError(''); setSuccess('') }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                tab === 'login' ? 'bg-[#FFA8C0] text-[#2B0515]' : 'text-[#b8a0a8] hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setTab('signup'); setErrors({}); setApiError(''); setSuccess('') }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                tab === 'signup' ? 'bg-[#FFA8C0] text-[#2B0515]' : 'text-[#b8a0a8] hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {success && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm">
              {success}
            </div>
          )}

          {apiError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm shadow-[0_0_8px_#FF91AF33]">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div>
                <label className="block text-sm text-[#b8a0a8] mb-1.5">Full Name <span className="text-[#FF91AF]">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm text-[#b8a0a8] mb-1.5">Email Address <span className="text-[#FF91AF]">*</span></label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className={inputClass('email')}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm text-[#b8a0a8] mb-1.5">Password <span className="text-[#FF91AF]">*</span></label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={inputClass('password')}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {tab === 'signup' && (
              <div>
                <label className="block text-sm text-[#b8a0a8] mb-1.5">Confirm Password <span className="text-[#FF91AF]">*</span></label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className={inputClass('confirmPassword')}
                />
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-2 py-3.5 px-8 rounded-xl font-medium text-base transition-all duration-300 ${
                isLoading
                  ? 'bg-[#FFA8C0]/40 text-[#b8a0a8]/50 cursor-not-allowed'
                  : 'bg-[#FFA8C0] text-[#2B0515] shadow-lg shadow-[#FFA8C0]/20 hover:bg-[#FF91AF] hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (tab === 'login' ? 'Signing in…' : 'Creating account…') : (tab === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <p className="text-center text-[#b8a0a8]/60 text-xs mt-6">
            {tab === 'login' ? "Need an admin account? " : 'Already have an admin account? '}
            <button
              onClick={() => {
                setTab(tab === 'login' ? 'signup' : 'login')
                setErrors({})
                setApiError('')
                setSuccess('')
              }}
              className="text-[#FF91AF] hover:underline"
            >
              {tab === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
