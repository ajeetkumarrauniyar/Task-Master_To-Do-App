/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js, jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
       },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  tailwindConfig: './styles/tailwind.config.js',
}

