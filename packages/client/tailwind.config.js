/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ["**/*.tsx"],
  theme: {
    // Screen breakpoints from Bootstrap, https://getbootstrap.com/docs/5.1/layout/breakpoints
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {},
  },
  plugins: [],
};
