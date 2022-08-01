/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
