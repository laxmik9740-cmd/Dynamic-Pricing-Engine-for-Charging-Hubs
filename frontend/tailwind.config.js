/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#111827",
        card: "#1f2937",
        accent: "#22d3ee",
      },
    },
  },
  plugins: [],
};
