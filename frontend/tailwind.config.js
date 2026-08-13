/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#D97706',
          accent: '#FBBF24',
        },
        uzgo: {
          black: '#0F1015',
          gold: '#F59E0B',
          bg: '#FAFAFC',
          card: '#FFFFFF',
          border: '#E5E7EB',
          text: '#111827',
          soft: '#6B7280',
          muted: '#9CA3AF',
        },
        brand: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FEF3C7',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'apple-hover': '0 20px 40px rgba(0, 0, 0, 0.08)',
        'gold': '0 8px 25px rgba(245, 158, 11, 0.25)',
        'dock': '0 12px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};

