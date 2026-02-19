/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy (kept for compatibility)
        'neon-purple': '#8b5cf6',
        'neon-pink': '#e879f9',
        // Space theme palette
        'dark-bg': '#050b18',
        'dark-card': '#0d1a2e',
        'dark-border': '#1a2f4a',
        'space-navy': '#0a1628',
        'electric-blue': '#00b4d8',
        'cosmic-violet': '#8b5cf6',
        'cosmic-cyan': '#22d3ee',
        'star-white': '#e2e8f0',
        'nebula-pink': '#e879f9',
        'deep-space': '#020810',
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite alternate',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'warp-burst': 'warpBurst 0.8s ease-out forwards',
        'constellation-draw': 'constellationDraw 1.5s ease-out forwards',
        'entry-reveal': 'entryReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 8px #8b5cf6, 0 0 16px rgba(139,92,246,0.4)' },
          '100%': { boxShadow: '0 0 16px #22d3ee, 0 0 32px rgba(34,211,238,0.35)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.8' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        warpBurst: {
          '0%': { transform: 'scaleX(1)', opacity: '0.6' },
          '100%': { transform: 'scaleX(8)', opacity: '0' },
        },
        constellationDraw: {
          from: { strokeDashoffset: '400' },
          to: { strokeDashoffset: '0' },
        },
        entryReveal: {
          '0%': { opacity: '0', transform: 'scale(0.94) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0px)' },
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
