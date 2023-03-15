/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      color: {
        primary: "#121826",
        secondary: "#b1e457"
      },
      backgroundColor: {
        primary: "#121826",
        secondary: "#b1e457"
      },
      boxShadowColor: {
        primary: "rgba(22,255,201,0.39)",
        secondary: "rgba(177,228,87,0.34)"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
