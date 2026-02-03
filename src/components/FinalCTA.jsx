import { useNavigate } from 'react-router-dom'

const FinalCTA = () => {
  const navigate = useNavigate()
  return (
    <section className="py-28 lg:py-32 bg-bg-secondary relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-violet/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center max-w-[600px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 gradient-text">
            Explore the subtle signals behind emotional control
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            Uncover what lies beneath the surface of human expression
          </p>
          <button 
            onClick={() => navigate('/upload')}
            className="btn-ripple inline-flex items-center justify-center px-12 py-4 text-lg font-medium bg-gradient-to-br from-accent-cyan to-accent-violet text-bg-primary rounded-lg shadow-glow-cyan hover:shadow-glow-cyan-lg hover:-translate-y-0.5 transition-all duration-400"
          >
            Begin Analysis
          </button>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
