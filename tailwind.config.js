/**
 * @type {import("tailwindcss").Config}
 */
module.exports = {
  content: ["**/*.tsx"],
  darkMode: "class",
  theme: require("./config/tailwindTheme"),
  corePlugins: { aspectRatio: false },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio")],
};
