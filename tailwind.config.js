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
          DEFAULT: '#5B4FE9',
          hover: '#4F43D1',
          light: '#8B85F0'
        },
        accent: {
          DEFAULT: '#FFB547',
          hover: '#FF9F1A'
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        success: '#4ADE80',
        warning: '#FBBF24',
        error: '#EF4444',
        info: '#3B82F6',
        background: '#F8F9FD'
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        'card': '12px',
        'button': '8px'
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'button': '0 1px 3px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
}