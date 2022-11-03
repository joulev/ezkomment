/**
 * @type {import("tailwindcss").Config}
 */
module.exports = {
  content: ["**/*.tsx"],
  theme: require("./config/tailwindTheme"),
  corePlugins: { aspectRatio: false },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio")],
};
