// tailwind.config.mjs
import typography from '@tailwindcss/typography';

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
        'sans': [
          'Roboto', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          '"Segoe UI"', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif',
          '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'
        ],
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
      boxShadow: {
        'hero-image': '33px 40px 0px 9px #313131',
        'aboutme-image': '-23px 40px 0px 4px #3B82F6',
      },
    },
  },
  plugins: [
    typography, // ✅ Tailwind Typography plugin
    function ({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
      });
    }
  ],
};
