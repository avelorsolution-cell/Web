/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#172033',
        teal: '#19B8AA',
        'teal-dark': '#0F8F84',
        'teal-light': '#EAF9F7',
        bg: '#F5F7F8',
        muted: '#6B7280',
        border: '#E5E7EB',
        success: '#22A47D',
        warning: '#F0A23A',
        error: '#D94B4B',
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Kufi Arabic"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(23, 32, 51, 0.06)',
        popover: '0 8px 30px rgba(23, 32, 51, 0.12)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
