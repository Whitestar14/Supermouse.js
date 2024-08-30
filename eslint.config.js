
export default {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Rules from `eslint:recommended`
    indent: ['error', 2],
    quotes: ['error', 'single'],
    // ... other rules from `eslint:recommended`

    // Rules from `prettier`
    'prettier/prettier': 'error',
  },
};
