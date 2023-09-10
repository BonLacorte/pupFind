/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customBackground: "#f4f6f9",
        primaryColor: "#800000",
        secondaryColor: "#FFDF00"
        // Add other custom colors here if needed
      },
    },
  },
  plugins: [],
}

