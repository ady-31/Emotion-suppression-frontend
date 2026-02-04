const Footer = () => {
  return (
    <footer className="py-16 bg-bg-primary border-t border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center">
          {/* Brand */}
          <div className="inline-flex items-center gap-2.5 text-xl font-semibold mb-4">
            <span className="text-accent-cyan text-2xl">◉</span>
            <span>Suppresense</span>
          </div>
          
          <p className="text-text-muted mb-6">
            Advanced tool for understanding human emotional expression
          </p>
          
          {/* Links */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
            <a 
              href="#" 
              className="text-text-secondary hover:text-accent-cyan transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-text-secondary hover:text-accent-cyan transition-colors duration-200 text-sm"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-text-secondary hover:text-accent-cyan transition-colors duration-200 text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
