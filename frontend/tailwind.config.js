/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yandex: {
          yellow: '#FFCC00',
          red: '#FC3F1D',
          dark: '#0F1015',
          card: '#181A20',
          cardHover: '#22252E',
          border: '#2C303E',
          text: '#F3F4F6',
          muted: '#9CA3AF',
        },
        primary: {
          900: '#0F1015',
          DEFAULT: '#FFCC00',
        },
        accent: {
          DEFAULT: '#FFCC00',
        },
        dark: {
          bg: '#0F1015',
          card: '#181A20',
          card2: '#22252E',
          border: '#2C303E',
          text: '#F3F4F6',
          muted: '#9CA3AF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'yandex': '0 8px 30px rgba(255, 204, 0, 0.25)',
        'yandex-red': '0 8px 30px rgba(252, 63, 29, 0.25)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
