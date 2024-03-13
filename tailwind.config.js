/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        ashy: "#f5f7f9",
        darkGray: '#6c757d',
      },
    },
  },
  plugins: [],
}

