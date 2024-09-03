// @ts-nocheck
import { defineConfig } from 'eslint-define-config';
import prettier from 'eslint-config-prettier';
import eslintRecommended from '@eslint/js'; // Import the recommended config

export default defineConfig([
  eslintRecommended.configs.recommended, // Use the recommended ESLint rules directly
  prettier,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
    },
  },
  {
    files: ['**/*.test.js', '**/*.test.jsx'],
    rules: {
      'no-unused-expressions': 'off', // Allow unused expressions in tests
    },
  },
]);
