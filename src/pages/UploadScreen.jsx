import { useState, useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const UploadScreen = () => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileType, setFileType] = useState(null)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const acceptedFormats = {
    video: ['video/mp4', 'video/avi', 'video/x-msvideo', 'video/quicktime'],
    image: ['image/jpeg', 'image/png', 'image/jpg']
  }

  const handleFile = useCallback((selectedFile) => {
    if (!selectedFile) return

    const isVideo = acceptedFormats.video.includes(selectedFile.type)
    const isImage = acceptedFormats.image.includes(selectedFile.type)

    if (!isVideo && !isImage) {
      alert('Please upload a valid file format (MP4, AVI, JPG, PNG)')
      return
    }

    setFile(selectedFile)
    setFileType(isVideo ? 'video' : 'image')

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(selectedFile)
  }, [])

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0]
    handleFile(selectedFile)
  }

  const handleProceed = () => {
    if (file) {
      // Store file info in sessionStorage for demo purposes
      sessionStorage.setItem('uploadedFile', JSON.stringify({
        name: file.name,
        type: fileType,
        preview: preview
      }))
      navigate('/processing')
    }
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
    setFileType(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0d12] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF91AF]/[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#FF91AF]/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Back to Home */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-[#b8a0a8] hover:text-[#FF91AF] transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Home</span>
      </Link>

      {/* Main Card */}
      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-[#0d1118]/80 backdrop-blur-xl border border-[#FF91AF]/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-[#FF91AF] mb-4">
              <span className="text-3xl">◉</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-light mb-3 text-white">
              Emotion Suppression Detector
            </h1>
            <p className="text-[#b8a0a8] text-lg">
              Upload a video or image for behavioral analysis
            </p>
          </div>

          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-[#FF91AF] bg-[#FF91AF]/10'
                : file
                ? 'border-[#FF91AF]/50 bg-[#FF91AF]/5'
                : 'border-[#FF91AF]/20 hover:border-[#FF91AF]/50 hover:bg-[#FF91AF]/5'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp4,.avi,.mov,.jpg,.jpeg,.png"
              onChange={handleFileInput}
              className="hidden"
            />

            {!file ? (
              <>
                {/* Upload Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#FF91AF]/10 border border-[#FF91AF]/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#FF91AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-white text-lg font-medium mb-2">
                  Drag and drop your file here
                </p>
                <p className="text-[#b8a0a8] mb-4">
                  or click to browse
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {['MP4', 'AVI', 'JPG', 'PNG'].map((format) => (
                    <span
                      key={format}
                      className="px-3 py-1 text-xs font-medium bg-[#FF91AF]/10 border border-[#FF91AF]/20 rounded-full text-[#FF91AF]"
                    >
                      {format}
                    </span>
                  ))}
                </div>
                <p className="text-[#b8a0a8]/60 text-sm">
                  Recommended duration: under 2 minutes
                </p>
              </>
            ) : (
              /* Preview */
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile()
                  }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {fileType === 'video' ? (
                  <video
                    src={preview}
                    className="max-h-64 mx-auto rounded-lg shadow-lg"
                    controls
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg shadow-lg object-contain"
                  />
                )}

                <div className="mt-4 flex items-center justify-center gap-2 text-[#b8a0a8]">
                  <svg className="w-5 h-5 text-[#FF91AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">{file.name}</span>
                  <span className="text-[#b8a0a8]/60">
                    ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            disabled={!file}
            className={`w-full mt-8 py-4 px-8 rounded-xl font-medium text-lg transition-all duration-300 ${
              file
                ? 'bg-[#FF91AF] text-[#0a0d12] shadow-lg shadow-[#FF91AF]/20 hover:bg-[#FFa8c0] hover:-translate-y-0.5'
                : 'bg-[#FF91AF]/10 text-[#b8a0a8]/50 cursor-not-allowed'
            }`}
          >
            {file ? 'Proceed to Analysis' : 'Upload a file to continue'}
          </button>

          {/* Info */}
          <p className="text-center text-[#b8a0a8]/60 text-sm mt-6">
            Your data is processed securely and not stored permanently
          </p>
        </div>
      </div>
    </div>
  )
}

export default UploadScreen
