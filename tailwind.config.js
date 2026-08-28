/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base
        cream: {
          50: '#FDFBF7',
          100: '#F9F6F1',
          200: '#F0EBE0',
          300: '#E2D9C8',
        },
        charcoal: {
          900: '#111010',
          800: '#1A1A1A',
          700: '#2A2A2A',
          600: '#3A3A3A',
          500: '#5A5A5A',
          400: '#7A7A7A',
          300: '#9A9A9A',
          200: '#C4C4C4',
          100: '#E8E8E8',
        },
        // Accent – sage green
        sage: {
          900: '#1E3A2B',
          800: '#2C5540',
          700: '#3A6B52',
          600: '#4A7C59',
          500: '#5A9068',
          400: '#7AAD85',
          300: '#A0C8AA',
          200: '#C6E0CA',
          100: '#E8F4EB',
          50: '#F4FAF5',
        },
        // Amber highlight
        amber: {
          900: '#4D2A00',
          700: '#8A4800',
          500: '#C96A00',
          400: '#E07D00',
          300: '#F59E2A',
          200: '#FBCF82',
          100: '#FDE9C0',
          50: '#FEF6E8',
        },
        // Status
        'card-lg': '0 12px 32px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
        inner: 'inset 0 1px 3px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        shimmer: 'shimmer 1.5s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};