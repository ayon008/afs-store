// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Primary font - Alliance No.2
        'alliance': ['var(--font-alliance-no2)', 'ui-sans-serif', 'system-ui'],
        // Fallback sans font
        'sans': ['Roboto', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1025px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        'primary': '#FFF',
        'primaryText': '#fffFFFCC',
        'secondary': '#10B981',
        'lightGray': '#F5F5F5',
        'gray': '#E9E9E9',
        'darkGray': '#5B5B5B',
        'charcoal': '#1A1A1A',
        'hamburgerBg': '#4A4A4A',
        'grayText': '#B3B3B3',
        'loader': '#222222',
      },
      fontSize: {
        '150px': 'clamp(3.75rem, 7.5vw, 9.375rem)',
        '120px': 'clamp(3rem, 6.25vw, 7.5rem)',
        '102px': 'clamp(2.5rem, 6.25vw, 6.375rem)',
        '90px': 'clamp(2.25rem, 4.6875vw, 5.625rem)',
        '60px': 'clamp(1.5rem, 3.125vw, 3.75rem)',
        '50px': 'clamp(1.25rem, 2.6042vw, 3.125rem)',
        '35px': 'clamp(1rem, 1.822vw, 2.1875rem)',
      },
      boxShadow: {
        'hero-image': '33px 40px 0px 9px #313131',
        'aboutme-image': '-23px 40px 0px 4px #3B82F6',
      },
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
      });
    }
  ],
}