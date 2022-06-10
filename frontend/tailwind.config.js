module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "brand": "#24ab8f",
        "brand-hover": "#268d77",
        "ui-dark-primary": "#293340",
      },
      animation: {
        "loader": "loader 600ms linear infinite",
      },
      keyframes: {
        loader: {
          "0%": { transform: "rotate(0)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      }
    },
  },
  plugins: [],
}
