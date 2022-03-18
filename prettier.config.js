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
};
