/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: '500px'
      },
      colors: {
        lavender: {
          DEFAULT: '#EEE5E9'
        },
        'off-red': {
          DEFAULT: '#FE0000'
        },
        'myrtle-green': {
          DEFAULT: '#377771'
        },
        'steel-blue': {
          DEFAULT: '#3F88C5'
        }
      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        title: ['Prata', 'serif'],
        cursive: ['Sofia', 'cursive']
      }
    },
  },
  plugins: [],
}

