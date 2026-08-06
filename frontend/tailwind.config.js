/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8edf5',
          100: '#c5d0e6',
          200: '#9fb0d5',
          300: '#7890c3',
          400: '#5a75b6',
          500: '#3d5aa8',
          600: '#304d9a',
          700: '#243e88',
          800: '#1a2f73',
          900: '#0d1b3e',
          DEFAULT: '#1a2744',
        },
        accent: {
          50: '#fff9e0',
          100: '#fff0b3',
          200: '#ffe680',
          300: '#ffdb4d',
          400: '#ffd31a',
          500: '#FFC300',
          600: '#e6af00',
          700: '#cc9b00',
          800: '#b38600',
          900: '#8a6700',
          DEFAULT: '#FFC300',
        },
        dark: {
          bg: '#0a0f1e',
          card: '#111827',
          card2: '#1f2937',
          border: '#374151',
          text: '#f9fafb',
          muted: '#9ca3af',
          sidebar: '#0d1b3e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px rgba(255, 195, 0, 0.2)',
        'glow-blue': '0 0 25px rgba(13, 27, 62, 0.5)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.5)',
        'sidebar': '4px 0 20px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideIn: { '0%': { transform: 'translateX(-20px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        slideRight: { '0%': { transform: 'translateX(20px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        scaleIn: { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0d1b3e 0%, #1a2744 50%, #243e88 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FFC300 0%, #e6af00 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0f1e 0%, #111827 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0d1b3e 0%, #1a2744 40%, #243e88 80%, #FFC300 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(31,41,55,0.9), rgba(17,24,39,0.95))',
        'gradient-sidebar': 'linear-gradient(180deg, #0d1b3e 0%, #1a2f73 100%)',
      },
    },
  },
  plugins: [],
}
