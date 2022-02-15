module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      'heading-color': '#00BA7C',
      'text-color': '#ffffff',
      'container-color-1': '#2D2D2D',
      'container-color-2': '#1A1A1A',
      'warning-color': '#E50000',
    },
    extend: {
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0,
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          }
        },
        slideLeft: {
          '0%': {
            opacity: 0,
            transform: 'translateX(-300%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          }
        }
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in-out',
        slideLeft: 'slideLeft 3s ease-in-out',
      }
    }
  },
  plugins: [],
}
