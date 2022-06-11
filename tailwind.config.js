/**
 * @type {import("@types/tailwindcss/tailwind-config").TailwindConfig}
 */
module.exports = {
  content: ["**/*.tsx"],
  darkMode: "class",
  theme: require("./config/tailwindTheme"),
  corePlugins: { aspectRatio: false },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
