/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          coral: '#F05838',
          'coral-hover': '#DD4828',
          'coral-light': '#FFF0EB',
          navy: '#122644',
          'navy-dark': '#0B192C',
          'navy-light': '#1E3A60',
          muted: '#5F7288',
          bg: '#F8FAFC',
          'bg-subtle': '#F2F6FA',
          teal: '#0D9488',
          'teal-light': '#EEFBF9',
          amber: '#F59E0B',
          'amber-light': '#FEF7EC',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(18, 38, 68, 0.06), 0 2px 6px -1px rgba(18, 38, 68, 0.04)',
        'card': '0 10px 30px -5px rgba(18, 38, 68, 0.08)',
        'card-hover': '0 20px 40px -8px rgba(18, 38, 68, 0.14)',
        'floating': '0 25px 50px -12px rgba(18, 38, 68, 0.18)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '28px',
      }
    },
  },
  plugins: [],
}
