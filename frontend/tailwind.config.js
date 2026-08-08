/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#16C2B2',
          hover: '#13B0A2',
          light: '#20E3D1',
        },
        gold: {
          DEFAULT: '#F2A93B',
          hover: '#E0982A',
        },
        coral: {
          DEFAULT: '#FF5B4C',
          hover: '#E5493A',
        },
        emerald: {
          DEFAULT: '#22C55E',
          hover: '#16A34A',
        },
        uzgo: {
          bg: '#0F1015',
          card: '#181A20',
          cardHover: '#22252E',
          border: '#2C303E',
          text: '#F5F5F7',
          soft: '#8B8D98',
          faint: '#5A5D6B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 8px 30px rgba(22, 194, 178, 0.25)',
        'coral': '0 8px 30px rgba(255, 91, 76, 0.25)',
        'gold': '0 8px 30px rgba(242, 169, 59, 0.25)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
