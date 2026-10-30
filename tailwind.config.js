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
          blue: '#0755F5',
          'blue-dark': '#0544C7',
          'blue-light': '#3B7BFF',
          navy: '#101E49',
          'navy-dark': '#0A1330',
        },
        text: {
          dark: '#172344',
          muted: '#63718E',
        },
        surface: {
          bg: '#EDF4FF',
          card: '#FFFFFF',
          border: '#DCE7FA',
          subtle: '#F4F8FF',
        },
        accent: {
          start: '#493DFF',
          end: '#0877FF',
        },
        // Keep brand aliases mapped to new palette for backwards compatibility
        brand: {
          navy: '#101E49',
          'navy-dark': '#0A1330',
          'navy-card': '#13214D',
          'navy-light': '#1D2E68',
          ocean: '#0755F5',
          'ocean-light': '#EDF4FF',
          gold: '#0755F5',
          'gold-hover': '#0544C7',
          'gold-light': '#EDF4FF',
          coral: '#0877FF',
          'coral-hover': '#0755F5',
          'coral-light': '#EDF4FF',
          ivory: '#EDF4FF',
          'ivory-card': '#FFFFFF',
          'sky-blue': '#DCE7FA',
          'sky-light': '#F4F8FF',
          muted: '#63718E',
          bg: '#EDF4FF',
          'bg-subtle': '#F4F8FF',
          border: '#DCE7FA',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'Manrope', 'sans-serif'],
        display: ['"Space Grotesk"', 'Sora', '"Plus Jakarta Sans"', 'sans-serif'],
        editorial: ['"Space Grotesk"', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(7, 85, 245, 0.06), 0 2px 6px -1px rgba(16, 30, 73, 0.04)',
        'card': '0 10px 30px -5px rgba(7, 85, 245, 0.08)',
        'card-hover': '0 20px 40px -8px rgba(7, 85, 245, 0.16)',
        'floating': '0 25px 50px -12px rgba(7, 85, 245, 0.22)',
        'blue': '0 10px 25px -5px rgba(7, 85, 245, 0.35)',
        'glass': '0 8px 32px 0 rgba(7, 85, 245, 0.10)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}
