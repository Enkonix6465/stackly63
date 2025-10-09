/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        auth: "url('/auth-bg.jpg')"
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in-left': {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'fade-in-right': {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' }
        },
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'zoom-in-out': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'fade-in-left': 'fade-in-left 0.8s ease-out',
        'fade-in-right': 'fade-in-right 0.8s ease-out',
        'float-slow': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotation 12s linear infinite',
        'rotate-slower': 'rotation 24s linear infinite',
        'zoom-in-out': 'zoom-in-out 4s ease-in-out infinite'
      },
      animationDelay: {
        '200': '200ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms'
      }
    }
  },
  plugins: []
} 