/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#12121a',
        'bg-tertiary': '#1a1a24',
        'bg-card': '#15151f',
        'text-primary': '#f0f0f5',
        'text-secondary': '#a0a0b0',
        'text-muted': '#6a6a7a',
        'accent-cyan': '#00d4d4',
        'accent-cyan-dark': '#00a0a0',
        'accent-violet': '#8b5cf6',
        'accent-violet-dark': '#6d28d9',
      },
      fontFamily: {
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'blink': 'blink 2s ease-in-out infinite',
        'dash': 'dash 3s linear infinite',
        'data-flow': 'data-flow 2s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s ease-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'fade-in': 'fade-in 1s ease-out 0.3s both',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'dash': {
          'to': { strokeDashoffset: '-24' },
        },
        'data-flow': {
          '0%, 100%': { opacity: '0.3', r: '2' },
          '50%': { opacity: '1', r: '4' },
        },
        'pulse-ring': {
          '0%': { opacity: '0.6', transform: 'scale(0.8)' },
          '100%': { opacity: '0', transform: 'scale(1.2)' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00d4d4 0%, #8b5cf6 100%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(0, 212, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(0, 212, 212, 0.15)',
        'glow-cyan': '0 4px 20px rgba(0, 212, 212, 0.3)',
        'glow-cyan-lg': '0 8px 30px rgba(0, 212, 212, 0.4)',
      },
    },
  },
  plugins: [],
}
