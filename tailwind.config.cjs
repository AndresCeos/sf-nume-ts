module.exports = {
  content: [
    "./index.html",
    "./node_modules/flowbite-react/lib/**/*.{js,ts}",
    "./node_modules/react-tailwindcss-datepicker/dist/*.js",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#693061',
      },
    },
  },
  plugins: [],
}
