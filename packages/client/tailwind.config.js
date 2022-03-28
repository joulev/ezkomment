const theme = require("./config/tailwind-theme");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ["**/*.tsx"],
  darkMode: "class",
  theme,
  corePlugins: { aspectRatio: false },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio")],
};
