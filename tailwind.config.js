/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f8',
          100: '#d9e0ec',
          200: '#b3c1d9',
          300: '#8da3c6',
          400: '#5e7ba8',
          500: '#3d5a82',
          600: '#2c4467',
          700: '#213452',
          800: '#172640',
          900: '#0f1a30',
          950: '#0a1120',
        },
        cream: {
          50: '#fdfcf8',
          100: '#faf6ee',
          200: '#f4ecd9',
          300: '#ecdfc0',
          400: '#e0cba0',
          500: '#d4b87f',
          600: '#c2a062',
          700: '#a8834e',
          800: '#8a6b41',
          900: '#704f30',
        },
        brass: {
          50: '#fbf7ed',
          100: '#f6edd0',
          200: '#ecd79e',
          300: '#e0bb66',
          400: '#d8a344',
          500: '#c98a2e',
          600: '#a96e25',
          700: '#855421',
          800: '#6e4421',
          900: '#5d3920',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
