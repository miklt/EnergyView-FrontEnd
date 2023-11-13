module.exports = {
  // Ignore certain files from linting
  ignorePatterns: [
    'karma.conf.js',
    '.eslintrc.js',
    '.stylelintrc.js'
  ],

  // Environment settings
  env: {
    browser: true,
    es2021: true,
  },

  // Extends configurations from recommended rules
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  // Specify the parser for TypeScript
  parser: '@typescript-eslint/parser',

  // Parser options
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  // Plugins used in the configuration
  plugins: ['@typescript-eslint'],

  // Custom ESLint rules
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    curly: 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    "eol-last": ["error", "always"],
    'brace-style': ['error', 'stroustrup'],
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'keyword-spacing': 'error',
    'space-before-blocks': 'error',
    'arrow-spacing': 'error',
    'switch-colon-spacing': 'error',
  },
};
