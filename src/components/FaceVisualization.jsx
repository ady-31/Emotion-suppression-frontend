const FaceVisualization = ({ svgRef }) => {
  return (
    <div className="relative w-[280px] h-[280px] lg:w-[350px] lg:h-[350px] flex justify-center items-center">
      <svg 
        ref={svgRef}
        viewBox="0 0 300 300" 
        className="w-full h-full drop-shadow-[0_0_30px_rgba(0,212,212,0.2)] transition-transform duration-200"
      >
        {/* Abstract face outline */}
        <ellipse 
          cx="150" cy="150" rx="100" ry="120" 
          className="fill-none stroke-accent-cyan stroke-1 opacity-60 animate-pulse-slow"
        />
        
        {/* Facial landmarks */}
        <circle cx="110" cy="120" r="4" className="fill-accent-violet animate-blink" />
        <circle cx="190" cy="120" r="4" className="fill-accent-violet animate-blink" />
        <circle cx="150" cy="160" r="3" className="fill-accent-violet animate-blink" />
        <circle cx="150" cy="190" r="3" className="fill-accent-violet animate-blink" />
        
        {/* Eye regions */}
        <ellipse cx="110" cy="120" rx="20" ry="10" className="stroke-accent-cyan stroke-1 opacity-40 fill-none" />
        <ellipse cx="190" cy="120" rx="20" ry="10" className="stroke-accent-cyan stroke-1 opacity-40 fill-none" />
        
        {/* Mouth region */}
        <path d="M 120 190 Q 150 210 180 190" className="stroke-accent-cyan stroke-1 opacity-40 fill-none" />
        
        {/* Signal lines */}
        <path 
          d="M 50 100 Q 30 150 50 200" 
          className="fill-none stroke-accent-violet stroke-[1.5] opacity-60 signal-line"
        />
        <path 
          d="M 250 100 Q 270 150 250 200" 
          className="fill-none stroke-accent-violet stroke-[1.5] opacity-60 signal-line signal-line-delay-1"
        />
        <path 
          d="M 100 50 Q 150 30 200 50" 
          className="fill-none stroke-accent-violet stroke-[1.5] opacity-60 signal-line signal-line-delay-2"
        />
        
        {/* Data points */}
        <circle cx="60" cy="130" r="2" className="fill-accent-cyan data-point" />
        <circle cx="55" cy="160" r="2" className="fill-accent-cyan data-point data-point-delay-1" />
        <circle cx="60" cy="190" r="2" className="fill-accent-cyan data-point data-point-delay-2" />
        <circle cx="240" cy="130" r="2" className="fill-accent-cyan data-point data-point-delay-3" />
        <circle cx="245" cy="160" r="2" className="fill-accent-cyan data-point data-point-delay-4" />
        <circle cx="240" cy="190" r="2" className="fill-accent-cyan data-point data-point-delay-5" />
        
        {/* Mesh lines */}
        <line x1="110" y1="120" x2="150" y2="160" className="stroke-accent-cyan stroke-[0.5] opacity-30" />
        <line x1="190" y1="120" x2="150" y2="160" className="stroke-accent-cyan stroke-[0.5] opacity-30" />
        <line x1="150" y1="160" x2="150" y2="190" className="stroke-accent-cyan stroke-[0.5] opacity-30" />
        <line x1="110" y1="120" x2="190" y2="120" className="stroke-accent-cyan stroke-[0.5] opacity-30" />
      </svg>
      
      {/* Pulse rings */}
      <div className="absolute w-[280px] h-[280px] lg:w-[320px] lg:h-[320px] border border-accent-cyan rounded-full opacity-0 pulse-ring" />
      <div className="absolute w-[280px] h-[280px] lg:w-[320px] lg:h-[320px] border border-accent-cyan rounded-full opacity-0 pulse-ring pulse-ring-delay" />
    </div>
  )
}

export default FaceVisualization
