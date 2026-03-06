import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/api'
import { useAuth } from '../context/AuthContext'

const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/x-msvideo', 'video/quicktime', 'video/x-matroska', 'video/webm']
const ACCEPTED_EXTENSIONS  = ['.mp4', '.avi', '.mov', '.mkv', '.webm']

const UploadScreen = () => {
  const [videoFile,       setVideoFile]       = useState(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null)
  const [isDragging,      setIsDragging]      = useState(false)
  const [userForm,        setUserForm]        = useState({ name: '', email: '', phone: '', age: '', gender: '' })
  const [formErrors,      setFormErrors]      = useState({})
  const [formSubmitted,   setFormSubmitted]   = useState(false)
  const [isSubmitting,    setIsSubmitting]    = useState(false)
  const videoInputRef = useRef(null)
  const navigate      = useNavigate()
  const { user }      = useAuth()

  // Pre-fill name & email when user is logged in
  useEffect(() => {
    if (user) {
      setUserForm(prev => ({
        ...prev,
        name:  prev.name  || user.name  || '',
        email: prev.email || user.email || '',
      }))
    }
  }, [user])

  // ── Validation ────────────────────────────────────────────────────────────
  const validateForm = () => {
    const errors = {}
    if (!userForm.name.trim())  errors.name  = 'Name is required'
    if (!userForm.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(userForm.email)) errors.email = 'Invalid email'
    if (!userForm.phone.trim()) errors.phone = 'Phone is required'
    else if (!/^\d{10}$/.test(userForm.phone.replace(/[\s\-()]/g, '')))
      errors.phone = 'Enter a valid 10-digit number'
    if (userForm.age && (isNaN(userForm.age) || userForm.age < 1 || userForm.age > 120))
      errors.age = 'Enter a valid age'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setUserForm(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }))
  }

  // ── File helpers ──────────────────────────────────────────────────────────
  const isVideoFile = (f) =>
    ACCEPTED_VIDEO_TYPES.includes(f.type) ||
    ACCEPTED_EXTENSIONS.some(ext => f.name.toLowerCase().endsWith(ext))

  const handleFiles = useCallback((selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return
    const file = selectedFiles[0]
    if (!isVideoFile(file)) {
      alert(`Unsupported file type.\nAccepted formats: ${ACCEPTED_EXTENSIONS.join(', ')}`)
      return
    }
    setVideoFile(file)
    setVideoPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
  }, [])

  // ── Drag-and-drop ─────────────────────────────────────────────────────────
  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true)  }
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false) }
  const handleDrop      = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }
  const handleFileInput = (e) => handleFiles(e.target.files)

  // ── Proceed ───────────────────────────────────────────────────────────────
  const handleProceed = async () => {
    if (!videoFile) return
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await registerUser(userForm)
      setFormSubmitted(true)
    } catch (err) {
      console.error('Failed to save user info:', err)
      // Continue even if MongoDB save fails
    }

    sessionStorage.setItem('uploadData', JSON.stringify({
      type:      'video',
      fileName:  videoFile.name,
      fileSize:  videoFile.size,
      userName:  userForm.name,
      userEmail: userForm.email,
    }))

    window.__uploadedVideo = videoFile
    navigate('/processing')
  }

  const readableSize = (bytes) => {
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(1)} MB`
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/img/christoph-keil-KTKvnZ42QQE-unsplash.jpg)' }}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Back to Home */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-[#b8a0a8] hover:text-[#FF91AF] transition-colors z-20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Home</span>
      </Link>

      {/* Main Layout */}
      <div className="w-full max-w-7xl relative z-10 flex flex-col lg:flex-row gap-6 mt-12">

        {/* Left Panel – Video Upload */}
        <div className="flex-[3] bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-[#FF91AF] mb-3">
              <span className="text-3xl">◉</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-light mb-2 text-white">
              Emotion Suppression Detector
            </h1>
            <p className="text-[#b8a0a8] text-base">
              Upload a video to detect emotion suppression
            </p>
          </div>

          {/* Drop Zone */}
          <div
            onClick={() => { if (!videoFile) videoInputRef.current?.click() }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl overflow-hidden transition-all duration-300 ${
              videoFile
                ? 'border-[#FF91AF]/50 cursor-default'
                : isDragging
                ? 'border-[#FF91AF] bg-[#FF91AF]/10 p-8 text-center min-h-[260px] flex flex-col justify-center cursor-pointer'
                : 'border-[#FF91AF]/20 hover:border-[#FF91AF]/50 hover:bg-[#FF91AF]/5 p-8 text-center min-h-[260px] flex flex-col justify-center cursor-pointer'
            }`}
          >
            <input
              ref={videoInputRef}
              type="file"
              accept={ACCEPTED_EXTENSIONS.join(',')}
              onChange={handleFileInput}
              className="hidden"
            />

            {!videoFile ? (
              <>
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#FF91AF]/10 border border-[#FF91AF]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#FF91AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M15 10l4.553-2.277A1 1 0 0121 8.68v6.641a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                </div>
                <p className="text-white text-base font-medium mb-2">Drop your video here</p>
                <p className="text-[#b8a0a8] text-sm mb-4">or click to browse</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {ACCEPTED_EXTENSIONS.map(ext => (
                    <span key={ext} className="px-2 py-1 text-xs rounded-lg bg-[#FF91AF]/10 text-[#FF91AF] border border-[#FF91AF]/20">
                      {ext}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div>
                {/* Video player */}
                <video
                  src={videoPreviewUrl}
                  controls
                  onClick={(e) => e.stopPropagation()}
                  className="w-full bg-black"
                  style={{ maxHeight: '360px', display: 'block' }}
                />
                {/* File info bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#0a0d12]">
                  <div className="flex items-center gap-2 min-w-0">
                    <svg className="w-4 h-4 text-[#FF91AF] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 10l4.553-2.277A1 1 0 0121 8.68v6.641a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                    <span className="text-[#FF91AF] text-sm font-medium truncate">{videoFile.name}</span>
                    <span className="text-[#b8a0a8]/60 text-xs flex-shrink-0">{readableSize(videoFile.size)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl)
                      setVideoPreviewUrl(null)
                      setVideoFile(null)
                      if (videoInputRef.current) videoInputRef.current.value = ''
                    }}
                    className="flex-shrink-0 ml-3 flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs font-medium transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Info note */}
          <div className="mt-4 p-4 bg-[#FF91AF]/5 border border-[#FF91AF]/15 rounded-xl text-sm text-[#b8a0a8] flex items-start gap-3">
            <svg className="w-5 h-5 text-[#FF91AF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              The system extracts facial action units with OpenFace, runs an LSTM model for suppression
              scoring and uses DeepFace to detect visible emotions. Results include a suppression level,
              hidden emotion estimate, and speech-latency events.
            </span>
          </div>
        </div>

        {/* Right Panel – Subject Details */}
        <div className="flex-[2] bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#FF91AF]/10 border border-[#FF91AF]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FF91AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-light text-white">Subject Details</h2>
            </div>
            <p className="text-[#b8a0a8] text-sm">Enter the subject information for this analysis session</p>
          </div>

          <div className="space-y-4 flex-1">
            {/* Name */}
            <div>
              <label className="block text-sm text-[#b8a0a8] mb-1.5">Full Name <span className="text-[#FF91AF]">*</span></label>
              <input type="text" name="name" value={userForm.name} onChange={handleFormChange}
                placeholder="Enter full name"
                className={`w-full px-4 py-3 rounded-xl bg-[#0a0d12] border ${formErrors.name ? 'border-red-500/60' : 'border-[#FF91AF]/20'} text-white placeholder-[#b8a0a8]/40 focus:outline-none focus:border-[#FF91AF]/60 transition-colors text-sm`} />
              {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-[#b8a0a8] mb-1.5">Email Address <span className="text-[#FF91AF]">*</span></label>
              <input type="email" name="email" value={userForm.email} onChange={handleFormChange}
                placeholder="email@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-[#0a0d12] border ${formErrors.email ? 'border-red-500/60' : 'border-[#FF91AF]/20'} text-white placeholder-[#b8a0a8]/40 focus:outline-none focus:border-[#FF91AF]/60 transition-colors text-sm`} />
              {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-[#b8a0a8] mb-1.5">Phone Number <span className="text-[#FF91AF]">*</span></label>
              <input type="tel" name="phone" value={userForm.phone} onChange={handleFormChange}
                placeholder="Enter 10-digit phone number"
                className={`w-full px-4 py-3 rounded-xl bg-[#0a0d12] border ${formErrors.phone ? 'border-red-500/60' : 'border-[#FF91AF]/20'} text-white placeholder-[#b8a0a8]/40 focus:outline-none focus:border-[#FF91AF]/60 transition-colors text-sm`} />
              {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
            </div>

            {/* Age & Gender */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-[#b8a0a8] mb-1.5">Age</label>
                <input type="number" name="age" min="1" max="120" value={userForm.age} onChange={handleFormChange}
                  placeholder="Age"
                  className={`w-full px-4 py-3 rounded-xl bg-[#0a0d12] border ${formErrors.age ? 'border-red-500/60' : 'border-[#FF91AF]/20'} text-white placeholder-[#b8a0a8]/40 focus:outline-none focus:border-[#FF91AF]/60 transition-colors text-sm`} />
                {formErrors.age && <p className="text-red-400 text-xs mt-1">{formErrors.age}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-sm text-[#b8a0a8] mb-1.5">Gender</label>
                <select name="gender" value={userForm.gender} onChange={handleFormChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0d12] border border-[#FF91AF]/20 text-white focus:outline-none focus:border-[#FF91AF]/60 transition-colors text-sm appearance-none cursor-pointer">
                  <option value=""             className="bg-[#0a0d12]">Select</option>
                  <option value="male"         className="bg-[#0a0d12]">Male</option>
                  <option value="female"       className="bg-[#0a0d12]">Female</option>
                  <option value="other"        className="bg-[#0a0d12]">Other</option>
                  <option value="prefer_not"   className="bg-[#0a0d12]">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>

          {/* Proceed */}
          <button
            onClick={handleProceed}
            disabled={!videoFile || isSubmitting}
            className={`w-full mt-6 py-4 px-8 rounded-xl font-medium text-lg transition-all duration-300 ${
              videoFile && !isSubmitting
                ? 'bg-[#FF91AF] text-[#0a0d12] shadow-lg shadow-[#FF91AF]/20 hover:bg-[#FFa8c0] hover:-translate-y-0.5'
                : 'bg-[#FF91AF]/10 text-[#b8a0a8]/50 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Preparing analysis…
              </span>
            ) : videoFile ? 'Analyze Video' : 'Upload a video to continue'}
          </button>

          <p className="text-center text-[#b8a0a8]/60 text-xs mt-4">
            {user
              ? <span>Signed in as <span className="text-[#FF91AF]">{user.email}</span> — results will be saved automatically</span>
              : <span>
                  <Link to="/login" className="text-[#FF91AF] hover:underline">Sign in</Link>
                  {' '}to save results to your account
                </span>
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default UploadScreen
