const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.extends("next/core-web-vitals"),
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
      },
    },
    rules: {
      "import/extensions": ["off", "always"],
      "react/jsx-one-expression-per-line": "off",
      "comma-dangle": "off",
      semi: ["error", "always"],
      "eol-last": ["error", "always"],
      "prefer-destructuring": "warn",
      "consistent-return": "warn",
      "import/order": "warn",
    },
  },
];
