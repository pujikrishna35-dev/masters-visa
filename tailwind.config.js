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
          navy: '#10243F',
          'navy-dark': '#0B1A2D',
          'navy-card': '#132B4A',
          'navy-light': '#1C385C',
          ocean: '#1769AA',
          'ocean-light': '#EBF4FC',
          gold: '#D99A35',
          'gold-hover': '#C58524',
          'gold-light': '#FDF7EC',
          coral: '#F16B55',
          'coral-hover': '#DE533D',
          'coral-light': '#FDF1EE',
          ivory: '#FAF7F1',
          'ivory-card': '#FFFFFF',
          'sky-blue': '#DCEEFF',
          'sky-light': '#F2F8FF',
          muted: '#64748B',
          bg: '#FAF7F1',
          'bg-subtle': '#F4EFE6',
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
        'soft': '0 4px 20px -2px rgba(16, 36, 63, 0.05), 0 2px 6px -1px rgba(16, 36, 63, 0.03)',
        'card': '0 10px 30px -5px rgba(16, 36, 63, 0.07)',
        'card-hover': '0 20px 40px -8px rgba(16, 36, 63, 0.12)',
        'floating': '0 25px 50px -12px rgba(16, 36, 63, 0.18)',
        'gold': '0 10px 25px -5px rgba(217, 154, 53, 0.3)',
        'coral': '0 10px 25px -5px rgba(241, 107, 85, 0.3)',
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
