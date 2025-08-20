module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'import/extensions': ['off', 'always'],
    'react/jsx-one-expression-per-line': 'off',
    'react/function-component-definition': 'off',
    'react/forbid-prop-types': 'off',
    'import/no-extraneous-dependencies': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'prefer-destructuring': 'warn',
    'consistent-return': 'warn',
    'import/order': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
