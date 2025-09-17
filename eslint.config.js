import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const lintRules = [
  ...compat.extends('next/core-web-vitals'),
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
    },
    rules: {
      'import/extensions': ['off', 'always'],
      'react/jsx-one-expression-per-line': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'semi': ['error', 'always'],
      'eol-last': ['error', 'always'],
      'prefer-destructuring': 'warn',
      'consistent-return': 'warn',
      'import/order': 'warn',
    },
  },
];

export default lintRules;
