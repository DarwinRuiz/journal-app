module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'object-curly-spacing': ["error", "always"],
    '@typescript-eslint/explicit-function-return-type': 'error',
    "@typescript-eslint/no-explicit-any": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
