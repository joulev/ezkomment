/**
 * @type {import("tailwindcss").Config}
 */
module.exports = {
  content: ["**/*.tsx"],
  theme: require("./misc/config/tailwind-theme"),
  corePlugins: { aspectRatio: false },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio")],
};
