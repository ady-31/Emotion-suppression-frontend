import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { signupUser, loginUser } from '../services/api'

const LoginScreen = () => {
  const [tab,         setTab]         = useState('login')   // 'login' | 'signup'
  const [form,        setForm]        = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors,      setErrors]      = useState({})
  const [apiError,    setApiError]    = useState('')
  const [isLoading,   setIsLoading]   = useState(false)
  const { login }  = useAuth()
  const navigate   = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    setApiError('')
  }

  const validateLogin = () => {
    const errs = {}
    if (!form.email.trim())    errs.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
    if (!form.password)        errs.password = 'Password is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateSignup = () => {
    const errs = {}
    if (!form.name.trim())     errs.name     = 'Name is required'
    if (!form.email.trim())    errs.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
    if (!form.password)        errs.password = 'Password is required'
    else if (form.password.length < 8) errs.password = 'At least 8 characters'
    if (form.confirmPassword !== form.password) errs.confirmPassword = 'Passwords do not match'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (tab === 'login'  && !validateLogin())  return
    if (tab === 'signup' && !validateSignup()) return

    setIsLoading(true)
    setApiError('')
    try {
      let data
      if (tab === 'login') {
        data = await loginUser({ email: form.email, password: form.password })
      } else {
        data = await signupUser({ name: form.name, email: form.email, password: form.password })
      }
      login(data.token, data.user)
      navigate('/dashboard')
    } catch (err) {
      setApiError(err.message || (tab === 'login' ? 'Login failed' : 'Signup failed'))
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-[#0a0d12] border ${
      errors[field] ? 'border-red-500/60' : 'border-[#FF91AF]/20'
    } text-white placeholder-[#b8a0a8]/40 focus:outline-none focus:border-[#FF91AF]/60 transition-colors text-sm`

  return (
    <div className="min-h-screen bg-[#0a0d12] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF91AF]/[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FF91AF]/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">

        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#b8a0a8] hover:text-[#FF91AF] transition-colors mb-6 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-[#FF91AF] mb-3">
              <span className="text-3xl">◉</span>
            </div>
            <h1 className="text-2xl font-light text-white">Suppresense</h1>
            <p className="text-[#b8a0a8] text-sm mt-1">
              {tab === 'login' ? 'Sign in to your account' : 'Create a new account'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#0a0d12] rounded-xl p-1 mb-6">
            {['login', 'signup'].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setErrors({}); setApiError('') }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  tab === t
                    ? 'bg-[#FF91AF] text-[#0a0d12]'
                    : 'text-[#b8a0a8] hover:text-white'
                }`}
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* API Error */}
          {apiError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name – signup only */}
            {tab === 'signup' && (
              <div>
                <label className="block text-sm text-[#b8a0a8] mb-1.5">
                  Full Name <span className="text-[#FF91AF]">*</span>
                </label>
                <input
                  type="text" name="name" value={form.name}
                  onChange={handleChange} placeholder="Enter your full name"
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm text-[#b8a0a8] mb-1.5">
                Email Address <span className="text-[#FF91AF]">*</span>
              </label>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="email@example.com"
                className={inputClass('email')}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-[#b8a0a8] mb-1.5">
                Password <span className="text-[#FF91AF]">*</span>
              </label>
              <input
                type="password" name="password" value={form.password}
                onChange={handleChange} placeholder={tab === 'signup' ? 'At least 8 characters' : 'Enter your password'}
                className={inputClass('password')}
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password – signup only */}
            {tab === 'signup' && (
              <div>
                <label className="block text-sm text-[#b8a0a8] mb-1.5">
                  Confirm Password <span className="text-[#FF91AF]">*</span>
                </label>
                <input
                  type="password" name="confirmPassword" value={form.confirmPassword}
                  onChange={handleChange} placeholder="Repeat password"
                  className={inputClass('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-2 py-3.5 px-8 rounded-xl font-medium text-base transition-all duration-300 ${
                isLoading
                  ? 'bg-[#FF91AF]/40 text-[#b8a0a8]/50 cursor-not-allowed'
                  : 'bg-[#FF91AF] text-[#0a0d12] shadow-lg shadow-[#FF91AF]/20 hover:bg-[#FFa8c0] hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  {tab === 'login' ? 'Signing in…' : 'Creating account…'}
                </span>
              ) : tab === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-[#b8a0a8]/60 text-xs mt-6">
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setTab(tab === 'login' ? 'signup' : 'login'); setErrors({}); setApiError('') }}
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

export default LoginScreen
