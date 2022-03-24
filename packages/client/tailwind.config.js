const theme = require("./config/tailwind-theme");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ["**/*.tsx"],
  darkMode: "class",
  theme,
  plugins: [require("@tailwindcss/forms")],
};
