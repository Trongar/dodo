/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      base:{
        container:"#ffffff",
        side:"#f9f9f9",
        focus:"#f7f7f7",
        selected:"#ebebeb",
        divider:"#f0f0f0",
        content:"#2c2c2e"
      }
    },
    extend: {},
  },
  plugins: [],
}
