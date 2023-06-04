module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  env: { node: true, es6: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  ignorePatterns: ['.eslintrc.js'],
  overrides: [{ files: ['**/__tests__/**/*'], env: { jest: true } }],
  rules: {
    'no-restricted-syntax': ['error', { selector: 'ExportDefaultDeclaration', message: 'Disallow default exports. Prefer named ones.' }],
  },
};
