/**
 * @type {import("@types/prettier").Config}
 */
module.exports = {
  semi: true,
  printWidth: 100,
  arrowParens: "avoid",
  tabWidth: 4,
  overrides: [
    {
      files: [
        // XML-like syntax
        "*.jsx",
        "*.tsx",
        "*.html",
        "*.xml",
        "*.svg",
        // JS object-like syntax
        "*.config.js",
        "*.config.mjs",
        "*.json",
        // Others where 4-space tabs are also too much
        "*.md",
        "*.yml",
        "*.yaml",
      ],
      options: {
        tabWidth: 2,
      },
    },
  ],
  importOrder: [
    // Server import order
    "^@server/(.*)$",
    // Client import order
    "^@mui/(.*)$",
    "^@client/(config|lib|context|hooks)/(.*)$",
    "^@client/(layouts|components)/(.*)$",
    "^@client/types/(.*)$",
    "^@client/public/(.*)$",
    "^@client/styles/(.*)$",
    "^@client/sample/(.*)$",
    // Relative import
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
};
