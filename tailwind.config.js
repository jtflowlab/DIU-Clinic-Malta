/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#27CFC3',
        brandBlue: '#004A9C',
        brandGray: '#707E8C',
        darkBg: '#05070a',
      },
      fontFamily: {
        sans: ['Sora', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

